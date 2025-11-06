import { _decorator, Component, Node, Prefab, instantiate, ScrollView, UITransform, CCFloat, Mask, Size, Enum, Vec3 } from "cc";
const { ccclass, property } = _decorator;

export enum EListLayoutMode {
    REAL,
    VIRTUAL,
}

export enum EListMode {
    GRID,
    FLOW,
}

Enum(EListLayoutMode);
Enum(EListMode);

@ccclass("CommonList")
export class CommonList extends Component {
    @property(Prefab)
    public itemPrefab: Prefab | null = null;

    @property({ type: EListLayoutMode })
    public listType: EListLayoutMode = EListLayoutMode.REAL;

    @property({ type: EListMode })
    public listMode: EListMode = EListMode.GRID;

    @property
    public columns: number = 3;

    @property
    public horizontal: boolean = false; // true = 横向滚动

    @property({ type: CCFloat, tooltip: "水平方向间距（列与列之间）" })
    public spacingX: number = 8;

    @property({ type: CCFloat, tooltip: "竖直方向间距（行与行之间）" })
    public spacingY: number = 8;

    @property({ type: CCFloat, tooltip: "列表左右内边距（Content 相对 View）" })
    public paddingX: number = 0;

    @property({ type: CCFloat, tooltip: "列表上下内边距（Content 相对 View）" })
    public paddingY: number = 0;

    private _scrollView!: ScrollView;
    private _view!: Node;
    private _content!: Node;
    private _items: Node[] = [];
    private _data: any[] = [];
    private _onScrollToBottom: (() => void) | null = null;
    private _bottomTriggered = false;

    onLoad() {
        // 要求宿主节点必须带 UITransform（用来确定列表可视尺寸）
        const ui = this.node.getComponent(UITransform);
        if (!ui) {
            this.node.addComponent(UITransform);
        }
        this._initStructure();
    }

    /**
     * 初始化 ScrollView 结构
     */
    private _initStructure() {
        // 保证宿主节点大小由编辑器设置（width/height）
        const hostUI = this.node.getComponent(UITransform)!;
        const hostSize = hostUI.contentSize;

        // 清空原有子节点
        this.node.removeAllChildren();

        // 1) ScrollView 节点（ScrollView 组件会自动添加 UITransform）
        const scrollNode = new Node("AutoScrollView");
        scrollNode.setParent(this.node);
        const scroll = scrollNode.addComponent(ScrollView);
        const svUI = scrollNode.getComponent(UITransform) ?? scrollNode.addComponent(UITransform);
        // 把 ScrollView 的尺寸与宿主一致，并把锚点设为中点（中心对齐宿主）
        svUI.setContentSize(hostSize);
        svUI.setAnchorPoint(0.5, 0.5);
        scrollNode.setPosition(0, 0, 0);
        scroll.horizontal = this.horizontal;
        scroll.vertical = !this.horizontal;

        // 2) View（带 Mask）
        const viewNode = new Node("View");
        viewNode.setParent(scrollNode);
        const viewUI = viewNode.addComponent(UITransform);
        viewUI.setContentSize(hostSize);
        // View 也用中点锚点，这样 view 的 (0,0,0) 与 scrollNode 对齐
        viewUI.setAnchorPoint(0.5, 0.5);
        viewNode.setPosition(0, 0, 0);

        const mask = viewNode.addComponent(Mask);
        // 默认就是 RECT

        // 3) Content（放 item 的节点）
        const contentNode = new Node("Content");
        contentNode.setParent(viewNode);
        const contentUI = contentNode.addComponent(UITransform);
        // Content 用顶部中点，方便纵向滚动时顶对齐
        contentUI.setAnchorPoint(0.5, 1);
        // content 相对于 view 的 position 设为 (0, viewH/2, 0) 使 content 的左上角与 view 顶部对齐
        // 但更稳妥把 content 初始 position 置 (0, viewH/2) 会被我们后面设为 (0,0) 并用相对坐标计算
        contentNode.setPosition(0, 0, 0);

        // 只需要设置 content，ScrollView 会自动识别 view
        scroll.content = contentNode;

        this._scrollView = scroll;
        this._view = viewNode;
        this._content = contentNode;
    }

    private _onScrolling() {
        if (!this._scrollView || !this._content) return;

        const view = this._view.getComponent(UITransform)!;
        const content = this._content.getComponent(UITransform)!;
        const offset = this._scrollView.getScrollOffset();

        // 注意：offset.y 越大表示越往下滚
        const maxScroll = this._scrollView.getMaxScrollOffset();

        // 判定阈值（10px 以内视为到达底部）
        const threshold = 10;

        const isBottom = offset.y >= maxScroll.y - threshold;

        if (isBottom) {
            if (!this._bottomTriggered) {
                this._bottomTriggered = true;
                if (this._onScrollToBottom) {
                    this._onScrollToBottom();
                }
            }
        } else {
            // 如果离开底部区域，重置触发状态
            this._bottomTriggered = false;
        }
    }

    /**
     * 设置数据
     */
    public setData<T>(data: T[]) {
        this._data = data;
        this._refresh();
    }

    private _refresh() {
        if (!this.itemPrefab) {
            console.warn("[CommonList] itemPrefab is null.");
            return;
        }

        // 清空旧 item
        this._items.forEach((n) => n.destroy());
        this._items = [];
        this._content.removeAllChildren();

        const total = this._data.length;
        const spacingX = Math.max(0, this.spacingX);
        const spacingY = Math.max(0, this.spacingY);

        // view 的显示尺寸（可视区）
        const viewUI = this._view.getComponent(UITransform)!;
        const viewW = viewUI.width;
        const viewH = viewUI.height;

        // 预先实例化一个临时获取 prefab 原始尺寸
        const tmp = instantiate(this.itemPrefab);
        const tmpUI = tmp.getComponent(UITransform)!;
        const prefabW = Math.max(1, tmpUI.width);
        const prefabH = Math.max(1, tmpUI.height);
        tmp.destroy();

        // 计算列数/行数与每项尺寸
        let colCount = 1;
        let rowCount = 1;
        let itemW = prefabW;
        let itemH = prefabH;

        if (this.listMode === EListMode.GRID) {
            colCount = Math.max(1, Math.floor(this.columns));
            let usableW = viewW - this.paddingX * 2 - spacingX * (colCount - 1);
            if (usableW <= 0) usableW = 1;
            itemW = usableW / colCount;
            if (itemW < 1) itemW = 1;
            const scale = itemW / prefabW;
            itemH = Math.max(1, prefabH * scale);
            rowCount = Math.ceil(total / colCount);
        } else {
            colCount = Math.max(1, Math.floor((viewW + spacingX) / (prefabW + spacingX)));
            itemW = prefabW;
            itemH = prefabH;
            rowCount = Math.ceil(total / colCount);
        }

        // content 的尺寸（宽 = viewW， 高 = spacing + rows*(itemH) + spacing*(rows+1)）
        const contentW = viewW;
        const contentH = spacingY + rowCount * itemH + (rowCount - 1) * spacingY + spacingY;
        const contentUI = this._content.getComponent(UITransform)!;
        contentUI.setContentSize(new Size(Math.round(contentW), Math.round(contentH)));

        for (let i = 0; i < total; i++) {
            const item = instantiate(this.itemPrefab);
            const itemUI = item.getComponent(UITransform);
            if (itemUI) {
                itemUI.setContentSize(new Size(Math.round(itemW), Math.round(itemH)));
            }
            item.setParent(this._content);
            const row = Math.floor(i / colCount);
            const col = i % colCount;
            // 使用 paddingX/paddingY 作为首尾内边距，col 与 col 之间使用 spacingX
            const x_local = -contentW / 2 + this.paddingX + col * (itemW + spacingX) + itemW / 2;
            const y_local = -(this.paddingY + row * (itemH + spacingY) + itemH / 2);
            item.setPosition(new Vec3(x_local, y_local, 0));
            try {
                (item as any).setData?.(this._data[i], i);
            } catch (e) {
                /* ignore */
            }
            this._items.push(item);
        }

        // 延迟一帧确保 ScrollView 能识别 view（因为 view 识别依赖 Mask 等组件首次挂载后的周期）
        this.scheduleOnce(() => {
            // 确保 content 的位置在 view 的顶部对齐处（y=0），x=0 居中
            this._content.setPosition(new Vec3(0, 0, 0));
            this._scrollView.stopAutoScroll();
            this._scrollView.scrollToTop(0);
        }, 0);
    }

    /**
     * 向列表追加数据
     * @param newData 要追加的数据数组
     */
    public addData<T>(newData: T[]) {
        if (!newData || newData.length === 0) return;
        if (!this.itemPrefab) {
            console.warn("[CommonList] itemPrefab is null.");
            return;
        }

        // 追加数据
        const startIndex = this._data.length;
        this._data.push(...newData);

        const total = this._data.length;
        const spacingX = Math.max(0, this.spacingX);
        const spacingY = Math.max(0, this.spacingY);

        const viewUI = this._view.getComponent(UITransform)!;
        const viewW = viewUI.width;

        // 获取 prefab 尺寸
        const tmp = instantiate(this.itemPrefab);
        const tmpUI = tmp.getComponent(UITransform)!;
        const prefabW = Math.max(1, tmpUI.width);
        const prefabH = Math.max(1, tmpUI.height);
        tmp.destroy();

        let colCount = 1;
        let itemW = prefabW;
        let itemH = prefabH;

        if (this.listMode === EListMode.GRID) {
            let usableW = viewW - this.paddingX * 2 - spacingX * (colCount - 1);
            if (usableW <= 0) usableW = 1;
            itemW = usableW / colCount;
            if (itemW < 1) itemW = 1;
            const scale = itemW / prefabW;
            itemH = Math.max(1, prefabH * scale);
        } else {
            colCount = Math.max(1, Math.floor((viewW + spacingX) / (prefabW + spacingX)));
            itemW = prefabW;
            itemH = prefabH;
        }

        // 当前行数
        const oldCount = startIndex;
        const oldRowCount = Math.ceil(oldCount / colCount);

        // content 原始尺寸
        const contentUI = this._content.getComponent(UITransform)!;
        const oldContentH = contentUI.height;

        // 计算新的行数与 content 高度
        const newRowCount = Math.ceil(total / colCount);
        const newContentH = this.paddingY + newRowCount * itemH + (newRowCount - 1) * spacingY + this.paddingY;
        contentUI.setContentSize(new Size(viewW, Math.round(newContentH)));

        // 逐个创建新 item
        for (let i = startIndex; i < total; i++) {
            const item = instantiate(this.itemPrefab);
            const itemUI = item.getComponent(UITransform);
            if (itemUI) itemUI.setContentSize(new Size(Math.round(itemW), Math.round(itemH)));
            item.setParent(this._content);

            const row = Math.floor(i / colCount);
            const col = i % colCount;

            const x_local = -viewW / 2 + this.paddingX + col * (itemW + spacingX) + itemW / 2;
            const y_local = -(this.paddingY + row * (itemH + spacingY) + itemH / 2);

            item.setPosition(new Vec3(x_local, y_local, 0));
            try {
                (item as any).setData?.(this._data[i], i);
            } catch (e) {}
            this._items.push(item);
        }
    }

    /**
     * 滚动到指定 index
     */
    public scrollToIndex(index: number, duration = 0.25) {
        if (index < 0 || index >= this._items.length) return;
        const item = this._items[index];
        this.scrollToItem(item, duration);
    }

    public scrollToItem(item: Node, duration = 0.25) {
        if (!item || !this._scrollView) return;

        const contentUI = this._content.getComponent(UITransform)!;
        const viewUI = this._view.getComponent(UITransform)!;
        const itemPos = item.getPosition(); // 在 content 本地坐标系

        this._scrollView.stopAutoScroll();

        if (this.horizontal) {
            const viewW = viewUI.width;
            const contentW = contentUI.width;
            const maxOffset = Math.max(0, contentW - viewW);
            const targetLeftPx = itemPos.x - viewW / 2 + contentW / 2;
            const clamped = Math.max(0, Math.min(targetLeftPx, maxOffset));
            const ratio = maxOffset === 0 ? 0 : clamped / maxOffset;
            this._scrollView.scrollToPercentHorizontal(ratio, duration, true);
        } else {
            const viewH = viewUI.height;
            const contentH = contentUI.height;
            const maxScroll = Math.max(0, contentH - viewH);
            const topToItemCenter = -itemPos.y;
            let needScrollPx = topToItemCenter - viewH / 2;
            needScrollPx = Math.max(0, Math.min(needScrollPx, maxScroll));
            const normalized = maxScroll === 0 ? 0 : needScrollPx / maxScroll;
            const percentForScrollAPI = 1 - normalized;
            this._scrollView.scrollToPercentVertical(percentForScrollAPI, duration, true);
        }
    }

    public getItemArray(): Node[] {
        return this._items;
    }

    public getItemNodeAt(index: number): Node | null {
        return index >= 0 && index < this._items.length ? this._items[index] : null;
    }

    public getItemCount(): number {
        return this._items.length;
    }

    /**
     * 设置滚动到底部时的回调
     * @param cb 回调函数
     */
    public setOnScrollToBottom(cb: () => void) {
        this._onScrollToBottom = cb;

        if (this._scrollView) {
            // 监听滚动事件
            this._scrollView.node.on(ScrollView.EventType.SCROLLING, this._onScrolling, this);
        }
    }
}
