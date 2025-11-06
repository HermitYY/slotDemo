export class AbortableQueue {
    private _queue: Array<() => Promise<void>> = [];
    private _aborted = false;
    private _paused = false;
    private _pausePromise: Promise<void> | null = null;
    private _resumeResolver: (() => void) | null = null;

    private _runningPromise: Promise<void> | null = null;
    private _abortResolver: (() => void) | null = null;
    private _pendingWaits: Set<Promise<unknown>> = new Set();

    add(task: () => Promise<void>) {
        this._queue.push(task);
    }

    get isAborted() {
        return this._aborted;
    }

    get isPaused() {
        return this._paused;
    }

    /** 暂停执行 */
    pause() {
        if (this._paused || this._aborted) return;
        this._paused = true;
        this._pausePromise = new Promise<void>((resolve) => {
            this._resumeResolver = resolve;
        });
    }

    /** 继续执行 */
    resume() {
        if (!this._paused) return;
        this._paused = false;
        if (this._resumeResolver) {
            this._resumeResolver();
            this._resumeResolver = null;
        }
        this._pausePromise = null;
    }

    /** 普通中断 */
    abort() {
        this._aborted = true;
        this.resume(); // 防止卡在暂停状态
    }

    /** 安全中断（等待当前执行完毕） */
    async safeAbort(): Promise<void> {
        if (this._aborted) return;
        this._aborted = true;
        this.resume();

        if (this._runningPromise || this._pendingWaits.size > 0) {
            await new Promise<void>((resolve) => {
                this._abortResolver = resolve;
            });
        }
    }

    async run() {
        for (const task of this._queue) {
            if (this._aborted) break;

            // 等待恢复
            if (this._paused && this._pausePromise) {
                await this._pausePromise;
            }

            if (this._aborted) break;

            const p = task();
            this._runningPromise = p;

            try {
                await p;
            } finally {
                this._runningPromise = null;
                this._checkAbortResolution();
            }

            if (this._aborted) break;
        }

        this._runningPromise = null;
        this._checkAbortResolution();
    }

    async wait<T>(promise: Promise<T>, obeyPause = false): Promise<T | undefined> {
        if (this._aborted) return undefined;

        // 如果 obeyPause=true，则暂停时挂起；false 则不用等
        if (obeyPause && this._paused && this._pausePromise) {
            await this._pausePromise;
        }

        if (this._aborted) return undefined;

        const waitPromise = this._createWaitPromise(promise, obeyPause);
        this._pendingWaits.add(waitPromise);

        try {
            return await waitPromise;
        } finally {
            this._pendingWaits.delete(waitPromise);
            this._checkAbortResolution();
        }
    }

    private async _createWaitPromise<T>(promise: Promise<T>, obeyPause: boolean): Promise<T | undefined> {
        if (this._aborted) return undefined;

        return new Promise<T | undefined>((resolve) => {
            let resolved = false;

            const cleanup = () => {
                if (!resolved) {
                    resolved = true;
                    resolve(undefined);
                }
            };

            const process = async () => {
                while (true) {
                    // 中断时立即退出
                    if (this._aborted) {
                        cleanup();
                        return;
                    }
                    if (obeyPause && this._paused && this._pausePromise) {
                        await this._pausePromise;
                        continue;
                    }
                    try {
                        const result = await Promise.race([promise, new Promise((_, rej) => setTimeout(() => rej(null), 50))]);
                        if (result !== null) {
                            resolved = true;
                            resolve(result as T);
                            return;
                        }
                    } catch {
                        // ignore timeout
                    }
                }
            };

            process();
        });
    }

    private _checkAbortResolution() {
        if (this._aborted && !this._runningPromise && this._pendingWaits.size === 0 && this._abortResolver) {
            this._abortResolver();
            this._abortResolver = null;
        }
    }
}
