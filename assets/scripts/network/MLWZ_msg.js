/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = window.protobuf;

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.newxxs = (function() {

    /**
     * Namespace newxxs.
     * @exports newxxs
     * @namespace
     */
    var newxxs = {};

    /**
     * enIconType_Moro enum.
     * @name newxxs.enIconType_Moro
     * @enum {number}
     * @property {number} NoneIcon=0 NoneIcon value
     * @property {number} ePokerA=1 </summary>
     * @property {number} ePokerB=2 </summary>
     * @property {number} ePokerC=3 </summary>
     * @property {number} ePokerD=4 </summary>
     * @property {number} ePokerE=5 </summary>
     * @property {number} eObjectA=6 </summary>
     * @property {number} eObjectB=7 </summary>
     * @property {number} eObjectC=8 </summary>
     * @property {number} eObjectD=9 </summary>
     * @property {number} eMultipleA=10 </summary>
     * @property {number} eScatter=14 </summary>
     */
    newxxs.enIconType_Moro = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "NoneIcon"] = 0;
        values[valuesById[1] = "ePokerA"] = 1;
        values[valuesById[2] = "ePokerB"] = 2;
        values[valuesById[3] = "ePokerC"] = 3;
        values[valuesById[4] = "ePokerD"] = 4;
        values[valuesById[5] = "ePokerE"] = 5;
        values[valuesById[6] = "eObjectA"] = 6;
        values[valuesById[7] = "eObjectB"] = 7;
        values[valuesById[8] = "eObjectC"] = 8;
        values[valuesById[9] = "eObjectD"] = 9;
        values[valuesById[10] = "eMultipleA"] = 10;
        values[valuesById[14] = "eScatter"] = 14;
        return values;
    })();

    /**
     * enSceneType_Moro enum.
     * @name newxxs.enSceneType_Moro
     * @enum {number}
     * @property {number} NoneScene=0 NoneScene value
     * @property {number} Normal1=1 </summary>
     * @property {number} Free1=2 </summary>
     */
    newxxs.enSceneType_Moro = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "NoneScene"] = 0;
        values[valuesById[1] = "Normal1"] = 1;
        values[valuesById[2] = "Free1"] = 2;
        return values;
    })();

    /**
     * enFreeType_Moro enum.
     * @name newxxs.enFreeType_Moro
     * @enum {number}
     * @property {number} NoneFree=0 NoneFree value
     * @property {number} Normal2=1 </summary>
     * @property {number} Free2=2 </summary>
     * @property {number} BuyFree1=3 </summary>
     */
    newxxs.enFreeType_Moro = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "NoneFree"] = 0;
        values[valuesById[1] = "Normal2"] = 1;
        values[valuesById[2] = "Free2"] = 2;
        values[valuesById[3] = "BuyFree1"] = 3;
        return values;
    })();

    /**
     * enRunType_Moro enum.
     * @name newxxs.enRunType_Moro
     * @enum {number}
     * @property {number} NoneRun=0 NoneRun value
     * @property {number} Normal3=1 </summary>
     * @property {number} Free3=2 </summary>
     * @property {number} BuyFree2=3 </summary>
     */
    newxxs.enRunType_Moro = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "NoneRun"] = 0;
        values[valuesById[1] = "Normal3"] = 1;
        values[valuesById[2] = "Free3"] = 2;
        values[valuesById[3] = "BuyFree2"] = 3;
        return values;
    })();

    /**
     * enSignalType_Moro enum.
     * @name newxxs.enSignalType_Moro
     * @enum {number}
     * @property {number} NoneSignal=0 NoneSignal value
     * @property {number} BeatTime_10000=10000 </summary>
     * @property {number} BeatTimeResult_10001=10001 </summary>
     * @property {number} LoginPlayer_11000=11000 </summary>
     * @property {number} LoginPlayerResult_11001=11001 </summary>
     * @property {number} OfflineResult_11002=11002 </summary>
     * @property {number} CurBet_12000=12000 </summary>
     * @property {number} CurBetResult_12001=12001 </summary>
     * @property {number} CurBuyFree_12002=12002 </summary>
     * @property {number} CurBuyFreeResult_12003=12003 </summary>
     * @property {number} CurFree_12004=12004 </summary>
     * @property {number} CurFreeResult_12005=12005 </summary>
     * @property {number} CurCombo7_12018=12018 </summary>
     * @property {number} CurCombo7Result_12019=12019 </summary>
     * @property {number} CurScene_13000=13000 </summary>
     * @property {number} CurSceneResult_13001=13001 </summary>
     * @property {number} AllSet_14000=14000 </summary>
     * @property {number} AllSetResult_14001=14001 </summary>
     * @property {number} SelectChips_14002=14002 </summary>
     * @property {number} SelectChipsResult_14003=14003 </summary>
     * @property {number} SetMultiple_15000=15000 </summary>
     * @property {number} SetMultipleResult_15001=15001 </summary>
     * @property {number} NoticeResult_66666=66666 </summary>
     */
    newxxs.enSignalType_Moro = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "NoneSignal"] = 0;
        values[valuesById[10000] = "BeatTime_10000"] = 10000;
        values[valuesById[10001] = "BeatTimeResult_10001"] = 10001;
        values[valuesById[11000] = "LoginPlayer_11000"] = 11000;
        values[valuesById[11001] = "LoginPlayerResult_11001"] = 11001;
        values[valuesById[11002] = "OfflineResult_11002"] = 11002;
        values[valuesById[12000] = "CurBet_12000"] = 12000;
        values[valuesById[12001] = "CurBetResult_12001"] = 12001;
        values[valuesById[12002] = "CurBuyFree_12002"] = 12002;
        values[valuesById[12003] = "CurBuyFreeResult_12003"] = 12003;
        values[valuesById[12004] = "CurFree_12004"] = 12004;
        values[valuesById[12005] = "CurFreeResult_12005"] = 12005;
        values[valuesById[12018] = "CurCombo7_12018"] = 12018;
        values[valuesById[12019] = "CurCombo7Result_12019"] = 12019;
        values[valuesById[13000] = "CurScene_13000"] = 13000;
        values[valuesById[13001] = "CurSceneResult_13001"] = 13001;
        values[valuesById[14000] = "AllSet_14000"] = 14000;
        values[valuesById[14001] = "AllSetResult_14001"] = 14001;
        values[valuesById[14002] = "SelectChips_14002"] = 14002;
        values[valuesById[14003] = "SelectChipsResult_14003"] = 14003;
        values[valuesById[15000] = "SetMultiple_15000"] = 15000;
        values[valuesById[15001] = "SetMultipleResult_15001"] = 15001;
        values[valuesById[66666] = "NoticeResult_66666"] = 66666;
        return values;
    })();

    /**
     * enErrType_Moro enum.
     * @name newxxs.enErrType_Moro
     * @enum {number}
     * @property {number} NoneErr=0 NoneErr value
     * @property {number} Successful_20000=20000 </summary>
     * @property {number} ChipsLack_10000=10000 </summary>
     * @property {number} ChipsOut_10001=10001 </summary>
     * @property {number} GameClosed_11000=11000 </summary>
     * @property {number} GameNotExist_11001=11001 </summary>
     * @property {number} BetError_12000=12000 </summary>
     * @property {number} BuyFreeError_12001=12001 </summary>
     * @property {number} SceneError_13000=13000 </summary>
     * @property {number} BatchnoError_13001=13001 </summary>
     * @property {number} TokenInvalid_14000=14000 </summary>
     * @property {number} BeawayOffline_15000=15000 </summary>
     * @property {number} PalyerNotExist_16000=16000 </summary>
     * @property {number} PalyerBlack_16001=16001 </summary>
     */
    newxxs.enErrType_Moro = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "NoneErr"] = 0;
        values[valuesById[20000] = "Successful_20000"] = 20000;
        values[valuesById[10000] = "ChipsLack_10000"] = 10000;
        values[valuesById[10001] = "ChipsOut_10001"] = 10001;
        values[valuesById[11000] = "GameClosed_11000"] = 11000;
        values[valuesById[11001] = "GameNotExist_11001"] = 11001;
        values[valuesById[12000] = "BetError_12000"] = 12000;
        values[valuesById[12001] = "BuyFreeError_12001"] = 12001;
        values[valuesById[13000] = "SceneError_13000"] = 13000;
        values[valuesById[13001] = "BatchnoError_13001"] = 13001;
        values[valuesById[14000] = "TokenInvalid_14000"] = 14000;
        values[valuesById[15000] = "BeawayOffline_15000"] = 15000;
        values[valuesById[16000] = "PalyerNotExist_16000"] = 16000;
        values[valuesById[16001] = "PalyerBlack_16001"] = 16001;
        return values;
    })();

    /**
     * enUpDownType_Moro enum.
     * @name newxxs.enUpDownType_Moro
     * @enum {number}
     * @property {number} NoneUpDown=0 NoneUpDown value
     * @property {number} Up=1 </summary>
     * @property {number} Down=2 </summary>
     */
    newxxs.enUpDownType_Moro = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "NoneUpDown"] = 0;
        values[valuesById[1] = "Up"] = 1;
        values[valuesById[2] = "Down"] = 2;
        return values;
    })();

    /**
     * enBetType_Moro enum.
     * @name newxxs.enBetType_Moro
     * @enum {number}
     * @property {number} NoneBet=0 </summary>
     * @property {number} Min=1 </summary>
     * @property {number} Max=2 </summary>
     */
    newxxs.enBetType_Moro = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "NoneBet"] = 0;
        values[valuesById[1] = "Min"] = 1;
        values[valuesById[2] = "Max"] = 2;
        return values;
    })();

    /**
     * </summary>
     * @name newxxs.enBigType_Moro
     * @enum {number}
     * @property {number} None=0 </summary>
     * @property {number} Normal=1 </summary>
     * @property {number} Small=2 </summary>
     * @property {number} Big=3 </summary>
     * @property {number} Super=4 </summary>
     */
    newxxs.enBigType_Moro = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "None"] = 0;
        values[valuesById[1] = "Normal"] = 1;
        values[valuesById[2] = "Small"] = 2;
        values[valuesById[3] = "Big"] = 3;
        values[valuesById[4] = "Super"] = 4;
        return values;
    })();

    /**
     * </summary>
     * @name newxxs.enIsMultiple_Moro
     * @enum {number}
     * @property {number} NoneIsMul=0 </summary>
     * @property {number} Open=1 </summary>
     * @property {number} Close=2 </summary>
     */
    newxxs.enIsMultiple_Moro = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "NoneIsMul"] = 0;
        values[valuesById[1] = "Open"] = 1;
        values[valuesById[2] = "Close"] = 2;
        return values;
    })();

    newxxs.C2S_BeatTime_10000 = (function() {

        /**
         * Properties of a C2S_BeatTime_10000.
         * @memberof newxxs
         * @interface IC2S_BeatTime_10000
         * @property {string|null} [identify] C2S_BeatTime_10000 identify
         */

        /**
         * Constructs a new C2S_BeatTime_10000.
         * @memberof newxxs
         * @classdesc Represents a C2S_BeatTime_10000.
         * @implements IC2S_BeatTime_10000
         * @constructor
         * @param {newxxs.IC2S_BeatTime_10000=} [properties] Properties to set
         */
        function C2S_BeatTime_10000(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * C2S_BeatTime_10000 identify.
         * @member {string} identify
         * @memberof newxxs.C2S_BeatTime_10000
         * @instance
         */
        C2S_BeatTime_10000.prototype.identify = "";

        /**
         * Creates a new C2S_BeatTime_10000 instance using the specified properties.
         * @function create
         * @memberof newxxs.C2S_BeatTime_10000
         * @static
         * @param {newxxs.IC2S_BeatTime_10000=} [properties] Properties to set
         * @returns {newxxs.C2S_BeatTime_10000} C2S_BeatTime_10000 instance
         */
        C2S_BeatTime_10000.create = function create(properties) {
            return new C2S_BeatTime_10000(properties);
        };

        /**
         * Encodes the specified C2S_BeatTime_10000 message. Does not implicitly {@link newxxs.C2S_BeatTime_10000.verify|verify} messages.
         * @function encode
         * @memberof newxxs.C2S_BeatTime_10000
         * @static
         * @param {newxxs.IC2S_BeatTime_10000} message C2S_BeatTime_10000 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2S_BeatTime_10000.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.identify != null && Object.hasOwnProperty.call(message, "identify"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.identify);
            return writer;
        };

        /**
         * Encodes the specified C2S_BeatTime_10000 message, length delimited. Does not implicitly {@link newxxs.C2S_BeatTime_10000.verify|verify} messages.
         * @function encodeDelimited
         * @memberof newxxs.C2S_BeatTime_10000
         * @static
         * @param {newxxs.IC2S_BeatTime_10000} message C2S_BeatTime_10000 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2S_BeatTime_10000.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2S_BeatTime_10000 message from the specified reader or buffer.
         * @function decode
         * @memberof newxxs.C2S_BeatTime_10000
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {newxxs.C2S_BeatTime_10000} C2S_BeatTime_10000
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2S_BeatTime_10000.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.newxxs.C2S_BeatTime_10000();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.identify = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a C2S_BeatTime_10000 message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof newxxs.C2S_BeatTime_10000
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {newxxs.C2S_BeatTime_10000} C2S_BeatTime_10000
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2S_BeatTime_10000.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a C2S_BeatTime_10000 message.
         * @function verify
         * @memberof newxxs.C2S_BeatTime_10000
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        C2S_BeatTime_10000.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.identify != null && message.hasOwnProperty("identify"))
                if (!$util.isString(message.identify))
                    return "identify: string expected";
            return null;
        };

        /**
         * Creates a C2S_BeatTime_10000 message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof newxxs.C2S_BeatTime_10000
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {newxxs.C2S_BeatTime_10000} C2S_BeatTime_10000
         */
        C2S_BeatTime_10000.fromObject = function fromObject(object) {
            if (object instanceof $root.newxxs.C2S_BeatTime_10000)
                return object;
            var message = new $root.newxxs.C2S_BeatTime_10000();
            if (object.identify != null)
                message.identify = String(object.identify);
            return message;
        };

        /**
         * Creates a plain object from a C2S_BeatTime_10000 message. Also converts values to other types if specified.
         * @function toObject
         * @memberof newxxs.C2S_BeatTime_10000
         * @static
         * @param {newxxs.C2S_BeatTime_10000} message C2S_BeatTime_10000
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        C2S_BeatTime_10000.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.identify = "";
            if (message.identify != null && message.hasOwnProperty("identify"))
                object.identify = message.identify;
            return object;
        };

        /**
         * Converts this C2S_BeatTime_10000 to JSON.
         * @function toJSON
         * @memberof newxxs.C2S_BeatTime_10000
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        C2S_BeatTime_10000.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return C2S_BeatTime_10000;
    })();

    newxxs.C2S_BeatTimeResult_10001 = (function() {

        /**
         * Properties of a C2S_BeatTimeResult_10001.
         * @memberof newxxs
         * @interface IC2S_BeatTimeResult_10001
         * @property {number|null} [error] C2S_BeatTimeResult_10001 error
         * @property {string|null} [identify] C2S_BeatTimeResult_10001 identify
         */

        /**
         * Constructs a new C2S_BeatTimeResult_10001.
         * @memberof newxxs
         * @classdesc Represents a C2S_BeatTimeResult_10001.
         * @implements IC2S_BeatTimeResult_10001
         * @constructor
         * @param {newxxs.IC2S_BeatTimeResult_10001=} [properties] Properties to set
         */
        function C2S_BeatTimeResult_10001(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * C2S_BeatTimeResult_10001 error.
         * @member {number} error
         * @memberof newxxs.C2S_BeatTimeResult_10001
         * @instance
         */
        C2S_BeatTimeResult_10001.prototype.error = 0;

        /**
         * C2S_BeatTimeResult_10001 identify.
         * @member {string} identify
         * @memberof newxxs.C2S_BeatTimeResult_10001
         * @instance
         */
        C2S_BeatTimeResult_10001.prototype.identify = "";

        /**
         * Creates a new C2S_BeatTimeResult_10001 instance using the specified properties.
         * @function create
         * @memberof newxxs.C2S_BeatTimeResult_10001
         * @static
         * @param {newxxs.IC2S_BeatTimeResult_10001=} [properties] Properties to set
         * @returns {newxxs.C2S_BeatTimeResult_10001} C2S_BeatTimeResult_10001 instance
         */
        C2S_BeatTimeResult_10001.create = function create(properties) {
            return new C2S_BeatTimeResult_10001(properties);
        };

        /**
         * Encodes the specified C2S_BeatTimeResult_10001 message. Does not implicitly {@link newxxs.C2S_BeatTimeResult_10001.verify|verify} messages.
         * @function encode
         * @memberof newxxs.C2S_BeatTimeResult_10001
         * @static
         * @param {newxxs.IC2S_BeatTimeResult_10001} message C2S_BeatTimeResult_10001 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2S_BeatTimeResult_10001.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.error);
            if (message.identify != null && Object.hasOwnProperty.call(message, "identify"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.identify);
            return writer;
        };

        /**
         * Encodes the specified C2S_BeatTimeResult_10001 message, length delimited. Does not implicitly {@link newxxs.C2S_BeatTimeResult_10001.verify|verify} messages.
         * @function encodeDelimited
         * @memberof newxxs.C2S_BeatTimeResult_10001
         * @static
         * @param {newxxs.IC2S_BeatTimeResult_10001} message C2S_BeatTimeResult_10001 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2S_BeatTimeResult_10001.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2S_BeatTimeResult_10001 message from the specified reader or buffer.
         * @function decode
         * @memberof newxxs.C2S_BeatTimeResult_10001
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {newxxs.C2S_BeatTimeResult_10001} C2S_BeatTimeResult_10001
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2S_BeatTimeResult_10001.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.newxxs.C2S_BeatTimeResult_10001();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.error = reader.int32();
                    break;
                case 2:
                    message.identify = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a C2S_BeatTimeResult_10001 message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof newxxs.C2S_BeatTimeResult_10001
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {newxxs.C2S_BeatTimeResult_10001} C2S_BeatTimeResult_10001
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2S_BeatTimeResult_10001.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a C2S_BeatTimeResult_10001 message.
         * @function verify
         * @memberof newxxs.C2S_BeatTimeResult_10001
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        C2S_BeatTimeResult_10001.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.error != null && message.hasOwnProperty("error"))
                if (!$util.isInteger(message.error))
                    return "error: integer expected";
            if (message.identify != null && message.hasOwnProperty("identify"))
                if (!$util.isString(message.identify))
                    return "identify: string expected";
            return null;
        };

        /**
         * Creates a C2S_BeatTimeResult_10001 message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof newxxs.C2S_BeatTimeResult_10001
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {newxxs.C2S_BeatTimeResult_10001} C2S_BeatTimeResult_10001
         */
        C2S_BeatTimeResult_10001.fromObject = function fromObject(object) {
            if (object instanceof $root.newxxs.C2S_BeatTimeResult_10001)
                return object;
            var message = new $root.newxxs.C2S_BeatTimeResult_10001();
            if (object.error != null)
                message.error = object.error | 0;
            if (object.identify != null)
                message.identify = String(object.identify);
            return message;
        };

        /**
         * Creates a plain object from a C2S_BeatTimeResult_10001 message. Also converts values to other types if specified.
         * @function toObject
         * @memberof newxxs.C2S_BeatTimeResult_10001
         * @static
         * @param {newxxs.C2S_BeatTimeResult_10001} message C2S_BeatTimeResult_10001
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        C2S_BeatTimeResult_10001.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.error = 0;
                object.identify = "";
            }
            if (message.error != null && message.hasOwnProperty("error"))
                object.error = message.error;
            if (message.identify != null && message.hasOwnProperty("identify"))
                object.identify = message.identify;
            return object;
        };

        /**
         * Converts this C2S_BeatTimeResult_10001 to JSON.
         * @function toJSON
         * @memberof newxxs.C2S_BeatTimeResult_10001
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        C2S_BeatTimeResult_10001.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return C2S_BeatTimeResult_10001;
    })();

    newxxs.C2S_LoginPlayer_11000 = (function() {

        /**
         * Properties of a C2S_LoginPlayer_11000.
         * @memberof newxxs
         * @interface IC2S_LoginPlayer_11000
         * @property {string|null} [token] C2S_LoginPlayer_11000 token
         */

        /**
         * Constructs a new C2S_LoginPlayer_11000.
         * @memberof newxxs
         * @classdesc Represents a C2S_LoginPlayer_11000.
         * @implements IC2S_LoginPlayer_11000
         * @constructor
         * @param {newxxs.IC2S_LoginPlayer_11000=} [properties] Properties to set
         */
        function C2S_LoginPlayer_11000(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * C2S_LoginPlayer_11000 token.
         * @member {string} token
         * @memberof newxxs.C2S_LoginPlayer_11000
         * @instance
         */
        C2S_LoginPlayer_11000.prototype.token = "";

        /**
         * Creates a new C2S_LoginPlayer_11000 instance using the specified properties.
         * @function create
         * @memberof newxxs.C2S_LoginPlayer_11000
         * @static
         * @param {newxxs.IC2S_LoginPlayer_11000=} [properties] Properties to set
         * @returns {newxxs.C2S_LoginPlayer_11000} C2S_LoginPlayer_11000 instance
         */
        C2S_LoginPlayer_11000.create = function create(properties) {
            return new C2S_LoginPlayer_11000(properties);
        };

        /**
         * Encodes the specified C2S_LoginPlayer_11000 message. Does not implicitly {@link newxxs.C2S_LoginPlayer_11000.verify|verify} messages.
         * @function encode
         * @memberof newxxs.C2S_LoginPlayer_11000
         * @static
         * @param {newxxs.IC2S_LoginPlayer_11000} message C2S_LoginPlayer_11000 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2S_LoginPlayer_11000.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.token != null && Object.hasOwnProperty.call(message, "token"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.token);
            return writer;
        };

        /**
         * Encodes the specified C2S_LoginPlayer_11000 message, length delimited. Does not implicitly {@link newxxs.C2S_LoginPlayer_11000.verify|verify} messages.
         * @function encodeDelimited
         * @memberof newxxs.C2S_LoginPlayer_11000
         * @static
         * @param {newxxs.IC2S_LoginPlayer_11000} message C2S_LoginPlayer_11000 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2S_LoginPlayer_11000.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2S_LoginPlayer_11000 message from the specified reader or buffer.
         * @function decode
         * @memberof newxxs.C2S_LoginPlayer_11000
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {newxxs.C2S_LoginPlayer_11000} C2S_LoginPlayer_11000
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2S_LoginPlayer_11000.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.newxxs.C2S_LoginPlayer_11000();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.token = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a C2S_LoginPlayer_11000 message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof newxxs.C2S_LoginPlayer_11000
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {newxxs.C2S_LoginPlayer_11000} C2S_LoginPlayer_11000
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2S_LoginPlayer_11000.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a C2S_LoginPlayer_11000 message.
         * @function verify
         * @memberof newxxs.C2S_LoginPlayer_11000
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        C2S_LoginPlayer_11000.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.token != null && message.hasOwnProperty("token"))
                if (!$util.isString(message.token))
                    return "token: string expected";
            return null;
        };

        /**
         * Creates a C2S_LoginPlayer_11000 message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof newxxs.C2S_LoginPlayer_11000
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {newxxs.C2S_LoginPlayer_11000} C2S_LoginPlayer_11000
         */
        C2S_LoginPlayer_11000.fromObject = function fromObject(object) {
            if (object instanceof $root.newxxs.C2S_LoginPlayer_11000)
                return object;
            var message = new $root.newxxs.C2S_LoginPlayer_11000();
            if (object.token != null)
                message.token = String(object.token);
            return message;
        };

        /**
         * Creates a plain object from a C2S_LoginPlayer_11000 message. Also converts values to other types if specified.
         * @function toObject
         * @memberof newxxs.C2S_LoginPlayer_11000
         * @static
         * @param {newxxs.C2S_LoginPlayer_11000} message C2S_LoginPlayer_11000
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        C2S_LoginPlayer_11000.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.token = "";
            if (message.token != null && message.hasOwnProperty("token"))
                object.token = message.token;
            return object;
        };

        /**
         * Converts this C2S_LoginPlayer_11000 to JSON.
         * @function toJSON
         * @memberof newxxs.C2S_LoginPlayer_11000
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        C2S_LoginPlayer_11000.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return C2S_LoginPlayer_11000;
    })();

    newxxs.S2C_LoginPlayerResult_11001 = (function() {

        /**
         * Properties of a S2C_LoginPlayerResult_11001.
         * @memberof newxxs
         * @interface IS2C_LoginPlayerResult_11001
         * @property {number|null} [error] S2C_LoginPlayerResult_11001 error
         * @property {newxxs.ICurPlayer|null} [curPlayer] S2C_LoginPlayerResult_11001 curPlayer
         * @property {newxxs.ICurScene|null} [curScene] S2C_LoginPlayerResult_11001 curScene
         */

        /**
         * Constructs a new S2C_LoginPlayerResult_11001.
         * @memberof newxxs
         * @classdesc Represents a S2C_LoginPlayerResult_11001.
         * @implements IS2C_LoginPlayerResult_11001
         * @constructor
         * @param {newxxs.IS2C_LoginPlayerResult_11001=} [properties] Properties to set
         */
        function S2C_LoginPlayerResult_11001(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * S2C_LoginPlayerResult_11001 error.
         * @member {number} error
         * @memberof newxxs.S2C_LoginPlayerResult_11001
         * @instance
         */
        S2C_LoginPlayerResult_11001.prototype.error = 0;

        /**
         * S2C_LoginPlayerResult_11001 curPlayer.
         * @member {newxxs.ICurPlayer|null|undefined} curPlayer
         * @memberof newxxs.S2C_LoginPlayerResult_11001
         * @instance
         */
        S2C_LoginPlayerResult_11001.prototype.curPlayer = null;

        /**
         * S2C_LoginPlayerResult_11001 curScene.
         * @member {newxxs.ICurScene|null|undefined} curScene
         * @memberof newxxs.S2C_LoginPlayerResult_11001
         * @instance
         */
        S2C_LoginPlayerResult_11001.prototype.curScene = null;

        /**
         * Creates a new S2C_LoginPlayerResult_11001 instance using the specified properties.
         * @function create
         * @memberof newxxs.S2C_LoginPlayerResult_11001
         * @static
         * @param {newxxs.IS2C_LoginPlayerResult_11001=} [properties] Properties to set
         * @returns {newxxs.S2C_LoginPlayerResult_11001} S2C_LoginPlayerResult_11001 instance
         */
        S2C_LoginPlayerResult_11001.create = function create(properties) {
            return new S2C_LoginPlayerResult_11001(properties);
        };

        /**
         * Encodes the specified S2C_LoginPlayerResult_11001 message. Does not implicitly {@link newxxs.S2C_LoginPlayerResult_11001.verify|verify} messages.
         * @function encode
         * @memberof newxxs.S2C_LoginPlayerResult_11001
         * @static
         * @param {newxxs.IS2C_LoginPlayerResult_11001} message S2C_LoginPlayerResult_11001 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2C_LoginPlayerResult_11001.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.error);
            if (message.curPlayer != null && Object.hasOwnProperty.call(message, "curPlayer"))
                $root.newxxs.CurPlayer.encode(message.curPlayer, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.curScene != null && Object.hasOwnProperty.call(message, "curScene"))
                $root.newxxs.CurScene.encode(message.curScene, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified S2C_LoginPlayerResult_11001 message, length delimited. Does not implicitly {@link newxxs.S2C_LoginPlayerResult_11001.verify|verify} messages.
         * @function encodeDelimited
         * @memberof newxxs.S2C_LoginPlayerResult_11001
         * @static
         * @param {newxxs.IS2C_LoginPlayerResult_11001} message S2C_LoginPlayerResult_11001 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2C_LoginPlayerResult_11001.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a S2C_LoginPlayerResult_11001 message from the specified reader or buffer.
         * @function decode
         * @memberof newxxs.S2C_LoginPlayerResult_11001
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {newxxs.S2C_LoginPlayerResult_11001} S2C_LoginPlayerResult_11001
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2C_LoginPlayerResult_11001.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.newxxs.S2C_LoginPlayerResult_11001();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.error = reader.int32();
                    break;
                case 2:
                    message.curPlayer = $root.newxxs.CurPlayer.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.curScene = $root.newxxs.CurScene.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a S2C_LoginPlayerResult_11001 message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof newxxs.S2C_LoginPlayerResult_11001
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {newxxs.S2C_LoginPlayerResult_11001} S2C_LoginPlayerResult_11001
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2C_LoginPlayerResult_11001.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a S2C_LoginPlayerResult_11001 message.
         * @function verify
         * @memberof newxxs.S2C_LoginPlayerResult_11001
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        S2C_LoginPlayerResult_11001.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.error != null && message.hasOwnProperty("error"))
                if (!$util.isInteger(message.error))
                    return "error: integer expected";
            if (message.curPlayer != null && message.hasOwnProperty("curPlayer")) {
                var error = $root.newxxs.CurPlayer.verify(message.curPlayer);
                if (error)
                    return "curPlayer." + error;
            }
            if (message.curScene != null && message.hasOwnProperty("curScene")) {
                var error = $root.newxxs.CurScene.verify(message.curScene);
                if (error)
                    return "curScene." + error;
            }
            return null;
        };

        /**
         * Creates a S2C_LoginPlayerResult_11001 message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof newxxs.S2C_LoginPlayerResult_11001
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {newxxs.S2C_LoginPlayerResult_11001} S2C_LoginPlayerResult_11001
         */
        S2C_LoginPlayerResult_11001.fromObject = function fromObject(object) {
            if (object instanceof $root.newxxs.S2C_LoginPlayerResult_11001)
                return object;
            var message = new $root.newxxs.S2C_LoginPlayerResult_11001();
            if (object.error != null)
                message.error = object.error | 0;
            if (object.curPlayer != null) {
                if (typeof object.curPlayer !== "object")
                    throw TypeError(".newxxs.S2C_LoginPlayerResult_11001.curPlayer: object expected");
                message.curPlayer = $root.newxxs.CurPlayer.fromObject(object.curPlayer);
            }
            if (object.curScene != null) {
                if (typeof object.curScene !== "object")
                    throw TypeError(".newxxs.S2C_LoginPlayerResult_11001.curScene: object expected");
                message.curScene = $root.newxxs.CurScene.fromObject(object.curScene);
            }
            return message;
        };

        /**
         * Creates a plain object from a S2C_LoginPlayerResult_11001 message. Also converts values to other types if specified.
         * @function toObject
         * @memberof newxxs.S2C_LoginPlayerResult_11001
         * @static
         * @param {newxxs.S2C_LoginPlayerResult_11001} message S2C_LoginPlayerResult_11001
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        S2C_LoginPlayerResult_11001.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.error = 0;
                object.curPlayer = null;
                object.curScene = null;
            }
            if (message.error != null && message.hasOwnProperty("error"))
                object.error = message.error;
            if (message.curPlayer != null && message.hasOwnProperty("curPlayer"))
                object.curPlayer = $root.newxxs.CurPlayer.toObject(message.curPlayer, options);
            if (message.curScene != null && message.hasOwnProperty("curScene"))
                object.curScene = $root.newxxs.CurScene.toObject(message.curScene, options);
            return object;
        };

        /**
         * Converts this S2C_LoginPlayerResult_11001 to JSON.
         * @function toJSON
         * @memberof newxxs.S2C_LoginPlayerResult_11001
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        S2C_LoginPlayerResult_11001.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return S2C_LoginPlayerResult_11001;
    })();

    newxxs.S2C_OfflineResult_11002 = (function() {

        /**
         * Properties of a S2C_OfflineResult_11002.
         * @memberof newxxs
         * @interface IS2C_OfflineResult_11002
         * @property {number|null} [error] S2C_OfflineResult_11002 error
         * @property {string|null} [ip] S2C_OfflineResult_11002 ip
         * @property {string|null} [plate] S2C_OfflineResult_11002 plate
         */

        /**
         * Constructs a new S2C_OfflineResult_11002.
         * @memberof newxxs
         * @classdesc Represents a S2C_OfflineResult_11002.
         * @implements IS2C_OfflineResult_11002
         * @constructor
         * @param {newxxs.IS2C_OfflineResult_11002=} [properties] Properties to set
         */
        function S2C_OfflineResult_11002(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * S2C_OfflineResult_11002 error.
         * @member {number} error
         * @memberof newxxs.S2C_OfflineResult_11002
         * @instance
         */
        S2C_OfflineResult_11002.prototype.error = 0;

        /**
         * S2C_OfflineResult_11002 ip.
         * @member {string} ip
         * @memberof newxxs.S2C_OfflineResult_11002
         * @instance
         */
        S2C_OfflineResult_11002.prototype.ip = "";

        /**
         * S2C_OfflineResult_11002 plate.
         * @member {string} plate
         * @memberof newxxs.S2C_OfflineResult_11002
         * @instance
         */
        S2C_OfflineResult_11002.prototype.plate = "";

        /**
         * Creates a new S2C_OfflineResult_11002 instance using the specified properties.
         * @function create
         * @memberof newxxs.S2C_OfflineResult_11002
         * @static
         * @param {newxxs.IS2C_OfflineResult_11002=} [properties] Properties to set
         * @returns {newxxs.S2C_OfflineResult_11002} S2C_OfflineResult_11002 instance
         */
        S2C_OfflineResult_11002.create = function create(properties) {
            return new S2C_OfflineResult_11002(properties);
        };

        /**
         * Encodes the specified S2C_OfflineResult_11002 message. Does not implicitly {@link newxxs.S2C_OfflineResult_11002.verify|verify} messages.
         * @function encode
         * @memberof newxxs.S2C_OfflineResult_11002
         * @static
         * @param {newxxs.IS2C_OfflineResult_11002} message S2C_OfflineResult_11002 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2C_OfflineResult_11002.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.error);
            if (message.ip != null && Object.hasOwnProperty.call(message, "ip"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.ip);
            if (message.plate != null && Object.hasOwnProperty.call(message, "plate"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.plate);
            return writer;
        };

        /**
         * Encodes the specified S2C_OfflineResult_11002 message, length delimited. Does not implicitly {@link newxxs.S2C_OfflineResult_11002.verify|verify} messages.
         * @function encodeDelimited
         * @memberof newxxs.S2C_OfflineResult_11002
         * @static
         * @param {newxxs.IS2C_OfflineResult_11002} message S2C_OfflineResult_11002 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2C_OfflineResult_11002.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a S2C_OfflineResult_11002 message from the specified reader or buffer.
         * @function decode
         * @memberof newxxs.S2C_OfflineResult_11002
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {newxxs.S2C_OfflineResult_11002} S2C_OfflineResult_11002
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2C_OfflineResult_11002.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.newxxs.S2C_OfflineResult_11002();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.error = reader.int32();
                    break;
                case 2:
                    message.ip = reader.string();
                    break;
                case 3:
                    message.plate = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a S2C_OfflineResult_11002 message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof newxxs.S2C_OfflineResult_11002
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {newxxs.S2C_OfflineResult_11002} S2C_OfflineResult_11002
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2C_OfflineResult_11002.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a S2C_OfflineResult_11002 message.
         * @function verify
         * @memberof newxxs.S2C_OfflineResult_11002
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        S2C_OfflineResult_11002.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.error != null && message.hasOwnProperty("error"))
                if (!$util.isInteger(message.error))
                    return "error: integer expected";
            if (message.ip != null && message.hasOwnProperty("ip"))
                if (!$util.isString(message.ip))
                    return "ip: string expected";
            if (message.plate != null && message.hasOwnProperty("plate"))
                if (!$util.isString(message.plate))
                    return "plate: string expected";
            return null;
        };

        /**
         * Creates a S2C_OfflineResult_11002 message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof newxxs.S2C_OfflineResult_11002
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {newxxs.S2C_OfflineResult_11002} S2C_OfflineResult_11002
         */
        S2C_OfflineResult_11002.fromObject = function fromObject(object) {
            if (object instanceof $root.newxxs.S2C_OfflineResult_11002)
                return object;
            var message = new $root.newxxs.S2C_OfflineResult_11002();
            if (object.error != null)
                message.error = object.error | 0;
            if (object.ip != null)
                message.ip = String(object.ip);
            if (object.plate != null)
                message.plate = String(object.plate);
            return message;
        };

        /**
         * Creates a plain object from a S2C_OfflineResult_11002 message. Also converts values to other types if specified.
         * @function toObject
         * @memberof newxxs.S2C_OfflineResult_11002
         * @static
         * @param {newxxs.S2C_OfflineResult_11002} message S2C_OfflineResult_11002
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        S2C_OfflineResult_11002.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.error = 0;
                object.ip = "";
                object.plate = "";
            }
            if (message.error != null && message.hasOwnProperty("error"))
                object.error = message.error;
            if (message.ip != null && message.hasOwnProperty("ip"))
                object.ip = message.ip;
            if (message.plate != null && message.hasOwnProperty("plate"))
                object.plate = message.plate;
            return object;
        };

        /**
         * Converts this S2C_OfflineResult_11002 to JSON.
         * @function toJSON
         * @memberof newxxs.S2C_OfflineResult_11002
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        S2C_OfflineResult_11002.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return S2C_OfflineResult_11002;
    })();

    newxxs.C2S_CurBet_12000 = (function() {

        /**
         * Properties of a C2S_CurBet_12000.
         * @memberof newxxs
         * @interface IC2S_CurBet_12000
         * @property {string|null} [batchno] C2S_CurBet_12000 batchno
         * @property {number|null} [round] C2S_CurBet_12000 round
         */

        /**
         * Constructs a new C2S_CurBet_12000.
         * @memberof newxxs
         * @classdesc Represents a C2S_CurBet_12000.
         * @implements IC2S_CurBet_12000
         * @constructor
         * @param {newxxs.IC2S_CurBet_12000=} [properties] Properties to set
         */
        function C2S_CurBet_12000(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * C2S_CurBet_12000 batchno.
         * @member {string} batchno
         * @memberof newxxs.C2S_CurBet_12000
         * @instance
         */
        C2S_CurBet_12000.prototype.batchno = "";

        /**
         * C2S_CurBet_12000 round.
         * @member {number} round
         * @memberof newxxs.C2S_CurBet_12000
         * @instance
         */
        C2S_CurBet_12000.prototype.round = 0;

        /**
         * Creates a new C2S_CurBet_12000 instance using the specified properties.
         * @function create
         * @memberof newxxs.C2S_CurBet_12000
         * @static
         * @param {newxxs.IC2S_CurBet_12000=} [properties] Properties to set
         * @returns {newxxs.C2S_CurBet_12000} C2S_CurBet_12000 instance
         */
        C2S_CurBet_12000.create = function create(properties) {
            return new C2S_CurBet_12000(properties);
        };

        /**
         * Encodes the specified C2S_CurBet_12000 message. Does not implicitly {@link newxxs.C2S_CurBet_12000.verify|verify} messages.
         * @function encode
         * @memberof newxxs.C2S_CurBet_12000
         * @static
         * @param {newxxs.IC2S_CurBet_12000} message C2S_CurBet_12000 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2S_CurBet_12000.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.batchno != null && Object.hasOwnProperty.call(message, "batchno"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.batchno);
            if (message.round != null && Object.hasOwnProperty.call(message, "round"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.round);
            return writer;
        };

        /**
         * Encodes the specified C2S_CurBet_12000 message, length delimited. Does not implicitly {@link newxxs.C2S_CurBet_12000.verify|verify} messages.
         * @function encodeDelimited
         * @memberof newxxs.C2S_CurBet_12000
         * @static
         * @param {newxxs.IC2S_CurBet_12000} message C2S_CurBet_12000 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2S_CurBet_12000.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2S_CurBet_12000 message from the specified reader or buffer.
         * @function decode
         * @memberof newxxs.C2S_CurBet_12000
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {newxxs.C2S_CurBet_12000} C2S_CurBet_12000
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2S_CurBet_12000.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.newxxs.C2S_CurBet_12000();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.batchno = reader.string();
                    break;
                case 2:
                    message.round = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a C2S_CurBet_12000 message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof newxxs.C2S_CurBet_12000
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {newxxs.C2S_CurBet_12000} C2S_CurBet_12000
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2S_CurBet_12000.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a C2S_CurBet_12000 message.
         * @function verify
         * @memberof newxxs.C2S_CurBet_12000
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        C2S_CurBet_12000.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.batchno != null && message.hasOwnProperty("batchno"))
                if (!$util.isString(message.batchno))
                    return "batchno: string expected";
            if (message.round != null && message.hasOwnProperty("round"))
                if (!$util.isInteger(message.round))
                    return "round: integer expected";
            return null;
        };

        /**
         * Creates a C2S_CurBet_12000 message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof newxxs.C2S_CurBet_12000
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {newxxs.C2S_CurBet_12000} C2S_CurBet_12000
         */
        C2S_CurBet_12000.fromObject = function fromObject(object) {
            if (object instanceof $root.newxxs.C2S_CurBet_12000)
                return object;
            var message = new $root.newxxs.C2S_CurBet_12000();
            if (object.batchno != null)
                message.batchno = String(object.batchno);
            if (object.round != null)
                message.round = object.round | 0;
            return message;
        };

        /**
         * Creates a plain object from a C2S_CurBet_12000 message. Also converts values to other types if specified.
         * @function toObject
         * @memberof newxxs.C2S_CurBet_12000
         * @static
         * @param {newxxs.C2S_CurBet_12000} message C2S_CurBet_12000
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        C2S_CurBet_12000.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.batchno = "";
                object.round = 0;
            }
            if (message.batchno != null && message.hasOwnProperty("batchno"))
                object.batchno = message.batchno;
            if (message.round != null && message.hasOwnProperty("round"))
                object.round = message.round;
            return object;
        };

        /**
         * Converts this C2S_CurBet_12000 to JSON.
         * @function toJSON
         * @memberof newxxs.C2S_CurBet_12000
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        C2S_CurBet_12000.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return C2S_CurBet_12000;
    })();

    newxxs.S2C_CurBetResult_12001 = (function() {

        /**
         * Properties of a S2C_CurBetResult_12001.
         * @memberof newxxs
         * @interface IS2C_CurBetResult_12001
         * @property {number|null} [error] S2C_CurBetResult_12001 error
         * @property {newxxs.ICurScene|null} [curScene] S2C_CurBetResult_12001 curScene
         */

        /**
         * Constructs a new S2C_CurBetResult_12001.
         * @memberof newxxs
         * @classdesc Represents a S2C_CurBetResult_12001.
         * @implements IS2C_CurBetResult_12001
         * @constructor
         * @param {newxxs.IS2C_CurBetResult_12001=} [properties] Properties to set
         */
        function S2C_CurBetResult_12001(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * S2C_CurBetResult_12001 error.
         * @member {number} error
         * @memberof newxxs.S2C_CurBetResult_12001
         * @instance
         */
        S2C_CurBetResult_12001.prototype.error = 0;

        /**
         * S2C_CurBetResult_12001 curScene.
         * @member {newxxs.ICurScene|null|undefined} curScene
         * @memberof newxxs.S2C_CurBetResult_12001
         * @instance
         */
        S2C_CurBetResult_12001.prototype.curScene = null;

        /**
         * Creates a new S2C_CurBetResult_12001 instance using the specified properties.
         * @function create
         * @memberof newxxs.S2C_CurBetResult_12001
         * @static
         * @param {newxxs.IS2C_CurBetResult_12001=} [properties] Properties to set
         * @returns {newxxs.S2C_CurBetResult_12001} S2C_CurBetResult_12001 instance
         */
        S2C_CurBetResult_12001.create = function create(properties) {
            return new S2C_CurBetResult_12001(properties);
        };

        /**
         * Encodes the specified S2C_CurBetResult_12001 message. Does not implicitly {@link newxxs.S2C_CurBetResult_12001.verify|verify} messages.
         * @function encode
         * @memberof newxxs.S2C_CurBetResult_12001
         * @static
         * @param {newxxs.IS2C_CurBetResult_12001} message S2C_CurBetResult_12001 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2C_CurBetResult_12001.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.error);
            if (message.curScene != null && Object.hasOwnProperty.call(message, "curScene"))
                $root.newxxs.CurScene.encode(message.curScene, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified S2C_CurBetResult_12001 message, length delimited. Does not implicitly {@link newxxs.S2C_CurBetResult_12001.verify|verify} messages.
         * @function encodeDelimited
         * @memberof newxxs.S2C_CurBetResult_12001
         * @static
         * @param {newxxs.IS2C_CurBetResult_12001} message S2C_CurBetResult_12001 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2C_CurBetResult_12001.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a S2C_CurBetResult_12001 message from the specified reader or buffer.
         * @function decode
         * @memberof newxxs.S2C_CurBetResult_12001
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {newxxs.S2C_CurBetResult_12001} S2C_CurBetResult_12001
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2C_CurBetResult_12001.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.newxxs.S2C_CurBetResult_12001();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.error = reader.int32();
                    break;
                case 2:
                    message.curScene = $root.newxxs.CurScene.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a S2C_CurBetResult_12001 message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof newxxs.S2C_CurBetResult_12001
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {newxxs.S2C_CurBetResult_12001} S2C_CurBetResult_12001
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2C_CurBetResult_12001.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a S2C_CurBetResult_12001 message.
         * @function verify
         * @memberof newxxs.S2C_CurBetResult_12001
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        S2C_CurBetResult_12001.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.error != null && message.hasOwnProperty("error"))
                if (!$util.isInteger(message.error))
                    return "error: integer expected";
            if (message.curScene != null && message.hasOwnProperty("curScene")) {
                var error = $root.newxxs.CurScene.verify(message.curScene);
                if (error)
                    return "curScene." + error;
            }
            return null;
        };

        /**
         * Creates a S2C_CurBetResult_12001 message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof newxxs.S2C_CurBetResult_12001
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {newxxs.S2C_CurBetResult_12001} S2C_CurBetResult_12001
         */
        S2C_CurBetResult_12001.fromObject = function fromObject(object) {
            if (object instanceof $root.newxxs.S2C_CurBetResult_12001)
                return object;
            var message = new $root.newxxs.S2C_CurBetResult_12001();
            if (object.error != null)
                message.error = object.error | 0;
            if (object.curScene != null) {
                if (typeof object.curScene !== "object")
                    throw TypeError(".newxxs.S2C_CurBetResult_12001.curScene: object expected");
                message.curScene = $root.newxxs.CurScene.fromObject(object.curScene);
            }
            return message;
        };

        /**
         * Creates a plain object from a S2C_CurBetResult_12001 message. Also converts values to other types if specified.
         * @function toObject
         * @memberof newxxs.S2C_CurBetResult_12001
         * @static
         * @param {newxxs.S2C_CurBetResult_12001} message S2C_CurBetResult_12001
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        S2C_CurBetResult_12001.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.error = 0;
                object.curScene = null;
            }
            if (message.error != null && message.hasOwnProperty("error"))
                object.error = message.error;
            if (message.curScene != null && message.hasOwnProperty("curScene"))
                object.curScene = $root.newxxs.CurScene.toObject(message.curScene, options);
            return object;
        };

        /**
         * Converts this S2C_CurBetResult_12001 to JSON.
         * @function toJSON
         * @memberof newxxs.S2C_CurBetResult_12001
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        S2C_CurBetResult_12001.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return S2C_CurBetResult_12001;
    })();

    newxxs.C2S_CurBuyFree_12002 = (function() {

        /**
         * Properties of a C2S_CurBuyFree_12002.
         * @memberof newxxs
         * @interface IC2S_CurBuyFree_12002
         * @property {string|null} [batchno] C2S_CurBuyFree_12002 batchno
         * @property {number|null} [round] C2S_CurBuyFree_12002 round
         */

        /**
         * Constructs a new C2S_CurBuyFree_12002.
         * @memberof newxxs
         * @classdesc Represents a C2S_CurBuyFree_12002.
         * @implements IC2S_CurBuyFree_12002
         * @constructor
         * @param {newxxs.IC2S_CurBuyFree_12002=} [properties] Properties to set
         */
        function C2S_CurBuyFree_12002(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * C2S_CurBuyFree_12002 batchno.
         * @member {string} batchno
         * @memberof newxxs.C2S_CurBuyFree_12002
         * @instance
         */
        C2S_CurBuyFree_12002.prototype.batchno = "";

        /**
         * C2S_CurBuyFree_12002 round.
         * @member {number} round
         * @memberof newxxs.C2S_CurBuyFree_12002
         * @instance
         */
        C2S_CurBuyFree_12002.prototype.round = 0;

        /**
         * Creates a new C2S_CurBuyFree_12002 instance using the specified properties.
         * @function create
         * @memberof newxxs.C2S_CurBuyFree_12002
         * @static
         * @param {newxxs.IC2S_CurBuyFree_12002=} [properties] Properties to set
         * @returns {newxxs.C2S_CurBuyFree_12002} C2S_CurBuyFree_12002 instance
         */
        C2S_CurBuyFree_12002.create = function create(properties) {
            return new C2S_CurBuyFree_12002(properties);
        };

        /**
         * Encodes the specified C2S_CurBuyFree_12002 message. Does not implicitly {@link newxxs.C2S_CurBuyFree_12002.verify|verify} messages.
         * @function encode
         * @memberof newxxs.C2S_CurBuyFree_12002
         * @static
         * @param {newxxs.IC2S_CurBuyFree_12002} message C2S_CurBuyFree_12002 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2S_CurBuyFree_12002.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.batchno != null && Object.hasOwnProperty.call(message, "batchno"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.batchno);
            if (message.round != null && Object.hasOwnProperty.call(message, "round"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.round);
            return writer;
        };

        /**
         * Encodes the specified C2S_CurBuyFree_12002 message, length delimited. Does not implicitly {@link newxxs.C2S_CurBuyFree_12002.verify|verify} messages.
         * @function encodeDelimited
         * @memberof newxxs.C2S_CurBuyFree_12002
         * @static
         * @param {newxxs.IC2S_CurBuyFree_12002} message C2S_CurBuyFree_12002 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2S_CurBuyFree_12002.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2S_CurBuyFree_12002 message from the specified reader or buffer.
         * @function decode
         * @memberof newxxs.C2S_CurBuyFree_12002
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {newxxs.C2S_CurBuyFree_12002} C2S_CurBuyFree_12002
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2S_CurBuyFree_12002.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.newxxs.C2S_CurBuyFree_12002();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.batchno = reader.string();
                    break;
                case 2:
                    message.round = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a C2S_CurBuyFree_12002 message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof newxxs.C2S_CurBuyFree_12002
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {newxxs.C2S_CurBuyFree_12002} C2S_CurBuyFree_12002
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2S_CurBuyFree_12002.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a C2S_CurBuyFree_12002 message.
         * @function verify
         * @memberof newxxs.C2S_CurBuyFree_12002
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        C2S_CurBuyFree_12002.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.batchno != null && message.hasOwnProperty("batchno"))
                if (!$util.isString(message.batchno))
                    return "batchno: string expected";
            if (message.round != null && message.hasOwnProperty("round"))
                if (!$util.isInteger(message.round))
                    return "round: integer expected";
            return null;
        };

        /**
         * Creates a C2S_CurBuyFree_12002 message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof newxxs.C2S_CurBuyFree_12002
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {newxxs.C2S_CurBuyFree_12002} C2S_CurBuyFree_12002
         */
        C2S_CurBuyFree_12002.fromObject = function fromObject(object) {
            if (object instanceof $root.newxxs.C2S_CurBuyFree_12002)
                return object;
            var message = new $root.newxxs.C2S_CurBuyFree_12002();
            if (object.batchno != null)
                message.batchno = String(object.batchno);
            if (object.round != null)
                message.round = object.round | 0;
            return message;
        };

        /**
         * Creates a plain object from a C2S_CurBuyFree_12002 message. Also converts values to other types if specified.
         * @function toObject
         * @memberof newxxs.C2S_CurBuyFree_12002
         * @static
         * @param {newxxs.C2S_CurBuyFree_12002} message C2S_CurBuyFree_12002
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        C2S_CurBuyFree_12002.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.batchno = "";
                object.round = 0;
            }
            if (message.batchno != null && message.hasOwnProperty("batchno"))
                object.batchno = message.batchno;
            if (message.round != null && message.hasOwnProperty("round"))
                object.round = message.round;
            return object;
        };

        /**
         * Converts this C2S_CurBuyFree_12002 to JSON.
         * @function toJSON
         * @memberof newxxs.C2S_CurBuyFree_12002
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        C2S_CurBuyFree_12002.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return C2S_CurBuyFree_12002;
    })();

    newxxs.S2C_CurBuyFreeResult_12003 = (function() {

        /**
         * Properties of a S2C_CurBuyFreeResult_12003.
         * @memberof newxxs
         * @interface IS2C_CurBuyFreeResult_12003
         * @property {number|null} [error] S2C_CurBuyFreeResult_12003 error
         * @property {newxxs.ICurScene|null} [curScene] S2C_CurBuyFreeResult_12003 curScene
         */

        /**
         * Constructs a new S2C_CurBuyFreeResult_12003.
         * @memberof newxxs
         * @classdesc Represents a S2C_CurBuyFreeResult_12003.
         * @implements IS2C_CurBuyFreeResult_12003
         * @constructor
         * @param {newxxs.IS2C_CurBuyFreeResult_12003=} [properties] Properties to set
         */
        function S2C_CurBuyFreeResult_12003(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * S2C_CurBuyFreeResult_12003 error.
         * @member {number} error
         * @memberof newxxs.S2C_CurBuyFreeResult_12003
         * @instance
         */
        S2C_CurBuyFreeResult_12003.prototype.error = 0;

        /**
         * S2C_CurBuyFreeResult_12003 curScene.
         * @member {newxxs.ICurScene|null|undefined} curScene
         * @memberof newxxs.S2C_CurBuyFreeResult_12003
         * @instance
         */
        S2C_CurBuyFreeResult_12003.prototype.curScene = null;

        /**
         * Creates a new S2C_CurBuyFreeResult_12003 instance using the specified properties.
         * @function create
         * @memberof newxxs.S2C_CurBuyFreeResult_12003
         * @static
         * @param {newxxs.IS2C_CurBuyFreeResult_12003=} [properties] Properties to set
         * @returns {newxxs.S2C_CurBuyFreeResult_12003} S2C_CurBuyFreeResult_12003 instance
         */
        S2C_CurBuyFreeResult_12003.create = function create(properties) {
            return new S2C_CurBuyFreeResult_12003(properties);
        };

        /**
         * Encodes the specified S2C_CurBuyFreeResult_12003 message. Does not implicitly {@link newxxs.S2C_CurBuyFreeResult_12003.verify|verify} messages.
         * @function encode
         * @memberof newxxs.S2C_CurBuyFreeResult_12003
         * @static
         * @param {newxxs.IS2C_CurBuyFreeResult_12003} message S2C_CurBuyFreeResult_12003 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2C_CurBuyFreeResult_12003.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.error);
            if (message.curScene != null && Object.hasOwnProperty.call(message, "curScene"))
                $root.newxxs.CurScene.encode(message.curScene, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified S2C_CurBuyFreeResult_12003 message, length delimited. Does not implicitly {@link newxxs.S2C_CurBuyFreeResult_12003.verify|verify} messages.
         * @function encodeDelimited
         * @memberof newxxs.S2C_CurBuyFreeResult_12003
         * @static
         * @param {newxxs.IS2C_CurBuyFreeResult_12003} message S2C_CurBuyFreeResult_12003 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2C_CurBuyFreeResult_12003.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a S2C_CurBuyFreeResult_12003 message from the specified reader or buffer.
         * @function decode
         * @memberof newxxs.S2C_CurBuyFreeResult_12003
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {newxxs.S2C_CurBuyFreeResult_12003} S2C_CurBuyFreeResult_12003
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2C_CurBuyFreeResult_12003.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.newxxs.S2C_CurBuyFreeResult_12003();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.error = reader.int32();
                    break;
                case 2:
                    message.curScene = $root.newxxs.CurScene.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a S2C_CurBuyFreeResult_12003 message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof newxxs.S2C_CurBuyFreeResult_12003
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {newxxs.S2C_CurBuyFreeResult_12003} S2C_CurBuyFreeResult_12003
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2C_CurBuyFreeResult_12003.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a S2C_CurBuyFreeResult_12003 message.
         * @function verify
         * @memberof newxxs.S2C_CurBuyFreeResult_12003
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        S2C_CurBuyFreeResult_12003.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.error != null && message.hasOwnProperty("error"))
                if (!$util.isInteger(message.error))
                    return "error: integer expected";
            if (message.curScene != null && message.hasOwnProperty("curScene")) {
                var error = $root.newxxs.CurScene.verify(message.curScene);
                if (error)
                    return "curScene." + error;
            }
            return null;
        };

        /**
         * Creates a S2C_CurBuyFreeResult_12003 message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof newxxs.S2C_CurBuyFreeResult_12003
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {newxxs.S2C_CurBuyFreeResult_12003} S2C_CurBuyFreeResult_12003
         */
        S2C_CurBuyFreeResult_12003.fromObject = function fromObject(object) {
            if (object instanceof $root.newxxs.S2C_CurBuyFreeResult_12003)
                return object;
            var message = new $root.newxxs.S2C_CurBuyFreeResult_12003();
            if (object.error != null)
                message.error = object.error | 0;
            if (object.curScene != null) {
                if (typeof object.curScene !== "object")
                    throw TypeError(".newxxs.S2C_CurBuyFreeResult_12003.curScene: object expected");
                message.curScene = $root.newxxs.CurScene.fromObject(object.curScene);
            }
            return message;
        };

        /**
         * Creates a plain object from a S2C_CurBuyFreeResult_12003 message. Also converts values to other types if specified.
         * @function toObject
         * @memberof newxxs.S2C_CurBuyFreeResult_12003
         * @static
         * @param {newxxs.S2C_CurBuyFreeResult_12003} message S2C_CurBuyFreeResult_12003
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        S2C_CurBuyFreeResult_12003.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.error = 0;
                object.curScene = null;
            }
            if (message.error != null && message.hasOwnProperty("error"))
                object.error = message.error;
            if (message.curScene != null && message.hasOwnProperty("curScene"))
                object.curScene = $root.newxxs.CurScene.toObject(message.curScene, options);
            return object;
        };

        /**
         * Converts this S2C_CurBuyFreeResult_12003 to JSON.
         * @function toJSON
         * @memberof newxxs.S2C_CurBuyFreeResult_12003
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        S2C_CurBuyFreeResult_12003.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return S2C_CurBuyFreeResult_12003;
    })();

    newxxs.C2S_CurScene_13000 = (function() {

        /**
         * Properties of a C2S_CurScene_13000.
         * @memberof newxxs
         * @interface IC2S_CurScene_13000
         */

        /**
         * Constructs a new C2S_CurScene_13000.
         * @memberof newxxs
         * @classdesc Represents a C2S_CurScene_13000.
         * @implements IC2S_CurScene_13000
         * @constructor
         * @param {newxxs.IC2S_CurScene_13000=} [properties] Properties to set
         */
        function C2S_CurScene_13000(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new C2S_CurScene_13000 instance using the specified properties.
         * @function create
         * @memberof newxxs.C2S_CurScene_13000
         * @static
         * @param {newxxs.IC2S_CurScene_13000=} [properties] Properties to set
         * @returns {newxxs.C2S_CurScene_13000} C2S_CurScene_13000 instance
         */
        C2S_CurScene_13000.create = function create(properties) {
            return new C2S_CurScene_13000(properties);
        };

        /**
         * Encodes the specified C2S_CurScene_13000 message. Does not implicitly {@link newxxs.C2S_CurScene_13000.verify|verify} messages.
         * @function encode
         * @memberof newxxs.C2S_CurScene_13000
         * @static
         * @param {newxxs.IC2S_CurScene_13000} message C2S_CurScene_13000 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2S_CurScene_13000.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified C2S_CurScene_13000 message, length delimited. Does not implicitly {@link newxxs.C2S_CurScene_13000.verify|verify} messages.
         * @function encodeDelimited
         * @memberof newxxs.C2S_CurScene_13000
         * @static
         * @param {newxxs.IC2S_CurScene_13000} message C2S_CurScene_13000 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2S_CurScene_13000.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2S_CurScene_13000 message from the specified reader or buffer.
         * @function decode
         * @memberof newxxs.C2S_CurScene_13000
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {newxxs.C2S_CurScene_13000} C2S_CurScene_13000
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2S_CurScene_13000.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.newxxs.C2S_CurScene_13000();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a C2S_CurScene_13000 message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof newxxs.C2S_CurScene_13000
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {newxxs.C2S_CurScene_13000} C2S_CurScene_13000
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2S_CurScene_13000.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a C2S_CurScene_13000 message.
         * @function verify
         * @memberof newxxs.C2S_CurScene_13000
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        C2S_CurScene_13000.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a C2S_CurScene_13000 message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof newxxs.C2S_CurScene_13000
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {newxxs.C2S_CurScene_13000} C2S_CurScene_13000
         */
        C2S_CurScene_13000.fromObject = function fromObject(object) {
            if (object instanceof $root.newxxs.C2S_CurScene_13000)
                return object;
            return new $root.newxxs.C2S_CurScene_13000();
        };

        /**
         * Creates a plain object from a C2S_CurScene_13000 message. Also converts values to other types if specified.
         * @function toObject
         * @memberof newxxs.C2S_CurScene_13000
         * @static
         * @param {newxxs.C2S_CurScene_13000} message C2S_CurScene_13000
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        C2S_CurScene_13000.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this C2S_CurScene_13000 to JSON.
         * @function toJSON
         * @memberof newxxs.C2S_CurScene_13000
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        C2S_CurScene_13000.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return C2S_CurScene_13000;
    })();

    newxxs.S2C_CurSceneResult_13001 = (function() {

        /**
         * Properties of a S2C_CurSceneResult_13001.
         * @memberof newxxs
         * @interface IS2C_CurSceneResult_13001
         * @property {number|null} [error] S2C_CurSceneResult_13001 error
         * @property {newxxs.ICurScene|null} [curScene] S2C_CurSceneResult_13001 curScene
         */

        /**
         * Constructs a new S2C_CurSceneResult_13001.
         * @memberof newxxs
         * @classdesc Represents a S2C_CurSceneResult_13001.
         * @implements IS2C_CurSceneResult_13001
         * @constructor
         * @param {newxxs.IS2C_CurSceneResult_13001=} [properties] Properties to set
         */
        function S2C_CurSceneResult_13001(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * S2C_CurSceneResult_13001 error.
         * @member {number} error
         * @memberof newxxs.S2C_CurSceneResult_13001
         * @instance
         */
        S2C_CurSceneResult_13001.prototype.error = 0;

        /**
         * S2C_CurSceneResult_13001 curScene.
         * @member {newxxs.ICurScene|null|undefined} curScene
         * @memberof newxxs.S2C_CurSceneResult_13001
         * @instance
         */
        S2C_CurSceneResult_13001.prototype.curScene = null;

        /**
         * Creates a new S2C_CurSceneResult_13001 instance using the specified properties.
         * @function create
         * @memberof newxxs.S2C_CurSceneResult_13001
         * @static
         * @param {newxxs.IS2C_CurSceneResult_13001=} [properties] Properties to set
         * @returns {newxxs.S2C_CurSceneResult_13001} S2C_CurSceneResult_13001 instance
         */
        S2C_CurSceneResult_13001.create = function create(properties) {
            return new S2C_CurSceneResult_13001(properties);
        };

        /**
         * Encodes the specified S2C_CurSceneResult_13001 message. Does not implicitly {@link newxxs.S2C_CurSceneResult_13001.verify|verify} messages.
         * @function encode
         * @memberof newxxs.S2C_CurSceneResult_13001
         * @static
         * @param {newxxs.IS2C_CurSceneResult_13001} message S2C_CurSceneResult_13001 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2C_CurSceneResult_13001.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.error);
            if (message.curScene != null && Object.hasOwnProperty.call(message, "curScene"))
                $root.newxxs.CurScene.encode(message.curScene, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified S2C_CurSceneResult_13001 message, length delimited. Does not implicitly {@link newxxs.S2C_CurSceneResult_13001.verify|verify} messages.
         * @function encodeDelimited
         * @memberof newxxs.S2C_CurSceneResult_13001
         * @static
         * @param {newxxs.IS2C_CurSceneResult_13001} message S2C_CurSceneResult_13001 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2C_CurSceneResult_13001.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a S2C_CurSceneResult_13001 message from the specified reader or buffer.
         * @function decode
         * @memberof newxxs.S2C_CurSceneResult_13001
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {newxxs.S2C_CurSceneResult_13001} S2C_CurSceneResult_13001
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2C_CurSceneResult_13001.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.newxxs.S2C_CurSceneResult_13001();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.error = reader.int32();
                    break;
                case 2:
                    message.curScene = $root.newxxs.CurScene.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a S2C_CurSceneResult_13001 message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof newxxs.S2C_CurSceneResult_13001
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {newxxs.S2C_CurSceneResult_13001} S2C_CurSceneResult_13001
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2C_CurSceneResult_13001.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a S2C_CurSceneResult_13001 message.
         * @function verify
         * @memberof newxxs.S2C_CurSceneResult_13001
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        S2C_CurSceneResult_13001.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.error != null && message.hasOwnProperty("error"))
                if (!$util.isInteger(message.error))
                    return "error: integer expected";
            if (message.curScene != null && message.hasOwnProperty("curScene")) {
                var error = $root.newxxs.CurScene.verify(message.curScene);
                if (error)
                    return "curScene." + error;
            }
            return null;
        };

        /**
         * Creates a S2C_CurSceneResult_13001 message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof newxxs.S2C_CurSceneResult_13001
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {newxxs.S2C_CurSceneResult_13001} S2C_CurSceneResult_13001
         */
        S2C_CurSceneResult_13001.fromObject = function fromObject(object) {
            if (object instanceof $root.newxxs.S2C_CurSceneResult_13001)
                return object;
            var message = new $root.newxxs.S2C_CurSceneResult_13001();
            if (object.error != null)
                message.error = object.error | 0;
            if (object.curScene != null) {
                if (typeof object.curScene !== "object")
                    throw TypeError(".newxxs.S2C_CurSceneResult_13001.curScene: object expected");
                message.curScene = $root.newxxs.CurScene.fromObject(object.curScene);
            }
            return message;
        };

        /**
         * Creates a plain object from a S2C_CurSceneResult_13001 message. Also converts values to other types if specified.
         * @function toObject
         * @memberof newxxs.S2C_CurSceneResult_13001
         * @static
         * @param {newxxs.S2C_CurSceneResult_13001} message S2C_CurSceneResult_13001
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        S2C_CurSceneResult_13001.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.error = 0;
                object.curScene = null;
            }
            if (message.error != null && message.hasOwnProperty("error"))
                object.error = message.error;
            if (message.curScene != null && message.hasOwnProperty("curScene"))
                object.curScene = $root.newxxs.CurScene.toObject(message.curScene, options);
            return object;
        };

        /**
         * Converts this S2C_CurSceneResult_13001 to JSON.
         * @function toJSON
         * @memberof newxxs.S2C_CurSceneResult_13001
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        S2C_CurSceneResult_13001.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return S2C_CurSceneResult_13001;
    })();

    newxxs.C2S_AllSet_14000 = (function() {

        /**
         * Properties of a C2S_AllSet_14000.
         * @memberof newxxs
         * @interface IC2S_AllSet_14000
         * @property {number|null} [upDownType] C2S_AllSet_14000 upDownType
         */

        /**
         * Constructs a new C2S_AllSet_14000.
         * @memberof newxxs
         * @classdesc Represents a C2S_AllSet_14000.
         * @implements IC2S_AllSet_14000
         * @constructor
         * @param {newxxs.IC2S_AllSet_14000=} [properties] Properties to set
         */
        function C2S_AllSet_14000(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * C2S_AllSet_14000 upDownType.
         * @member {number} upDownType
         * @memberof newxxs.C2S_AllSet_14000
         * @instance
         */
        C2S_AllSet_14000.prototype.upDownType = 0;

        /**
         * Creates a new C2S_AllSet_14000 instance using the specified properties.
         * @function create
         * @memberof newxxs.C2S_AllSet_14000
         * @static
         * @param {newxxs.IC2S_AllSet_14000=} [properties] Properties to set
         * @returns {newxxs.C2S_AllSet_14000} C2S_AllSet_14000 instance
         */
        C2S_AllSet_14000.create = function create(properties) {
            return new C2S_AllSet_14000(properties);
        };

        /**
         * Encodes the specified C2S_AllSet_14000 message. Does not implicitly {@link newxxs.C2S_AllSet_14000.verify|verify} messages.
         * @function encode
         * @memberof newxxs.C2S_AllSet_14000
         * @static
         * @param {newxxs.IC2S_AllSet_14000} message C2S_AllSet_14000 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2S_AllSet_14000.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.upDownType != null && Object.hasOwnProperty.call(message, "upDownType"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.upDownType);
            return writer;
        };

        /**
         * Encodes the specified C2S_AllSet_14000 message, length delimited. Does not implicitly {@link newxxs.C2S_AllSet_14000.verify|verify} messages.
         * @function encodeDelimited
         * @memberof newxxs.C2S_AllSet_14000
         * @static
         * @param {newxxs.IC2S_AllSet_14000} message C2S_AllSet_14000 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2S_AllSet_14000.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2S_AllSet_14000 message from the specified reader or buffer.
         * @function decode
         * @memberof newxxs.C2S_AllSet_14000
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {newxxs.C2S_AllSet_14000} C2S_AllSet_14000
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2S_AllSet_14000.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.newxxs.C2S_AllSet_14000();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.upDownType = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a C2S_AllSet_14000 message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof newxxs.C2S_AllSet_14000
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {newxxs.C2S_AllSet_14000} C2S_AllSet_14000
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2S_AllSet_14000.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a C2S_AllSet_14000 message.
         * @function verify
         * @memberof newxxs.C2S_AllSet_14000
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        C2S_AllSet_14000.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.upDownType != null && message.hasOwnProperty("upDownType"))
                if (!$util.isInteger(message.upDownType))
                    return "upDownType: integer expected";
            return null;
        };

        /**
         * Creates a C2S_AllSet_14000 message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof newxxs.C2S_AllSet_14000
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {newxxs.C2S_AllSet_14000} C2S_AllSet_14000
         */
        C2S_AllSet_14000.fromObject = function fromObject(object) {
            if (object instanceof $root.newxxs.C2S_AllSet_14000)
                return object;
            var message = new $root.newxxs.C2S_AllSet_14000();
            if (object.upDownType != null)
                message.upDownType = object.upDownType | 0;
            return message;
        };

        /**
         * Creates a plain object from a C2S_AllSet_14000 message. Also converts values to other types if specified.
         * @function toObject
         * @memberof newxxs.C2S_AllSet_14000
         * @static
         * @param {newxxs.C2S_AllSet_14000} message C2S_AllSet_14000
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        C2S_AllSet_14000.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.upDownType = 0;
            if (message.upDownType != null && message.hasOwnProperty("upDownType"))
                object.upDownType = message.upDownType;
            return object;
        };

        /**
         * Converts this C2S_AllSet_14000 to JSON.
         * @function toJSON
         * @memberof newxxs.C2S_AllSet_14000
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        C2S_AllSet_14000.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return C2S_AllSet_14000;
    })();

    newxxs.S2C_AllSetResult_14001 = (function() {

        /**
         * Properties of a S2C_AllSetResult_14001.
         * @memberof newxxs
         * @interface IS2C_AllSetResult_14001
         * @property {number|null} [error] S2C_AllSetResult_14001 error
         * @property {number|null} [curBetChips] S2C_AllSetResult_14001 curBetChips
         * @property {number|null} [BetType] S2C_AllSetResult_14001 BetType
         * @property {Array.<newxxs.ICurScope>|null} [scopes] S2C_AllSetResult_14001 scopes
         * @property {number|null} [buyFreeChips] S2C_AllSetResult_14001 buyFreeChips
         */

        /**
         * Constructs a new S2C_AllSetResult_14001.
         * @memberof newxxs
         * @classdesc Represents a S2C_AllSetResult_14001.
         * @implements IS2C_AllSetResult_14001
         * @constructor
         * @param {newxxs.IS2C_AllSetResult_14001=} [properties] Properties to set
         */
        function S2C_AllSetResult_14001(properties) {
            this.scopes = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * S2C_AllSetResult_14001 error.
         * @member {number} error
         * @memberof newxxs.S2C_AllSetResult_14001
         * @instance
         */
        S2C_AllSetResult_14001.prototype.error = 0;

        /**
         * S2C_AllSetResult_14001 curBetChips.
         * @member {number} curBetChips
         * @memberof newxxs.S2C_AllSetResult_14001
         * @instance
         */
        S2C_AllSetResult_14001.prototype.curBetChips = 0;

        /**
         * S2C_AllSetResult_14001 BetType.
         * @member {number} BetType
         * @memberof newxxs.S2C_AllSetResult_14001
         * @instance
         */
        S2C_AllSetResult_14001.prototype.BetType = 0;

        /**
         * S2C_AllSetResult_14001 scopes.
         * @member {Array.<newxxs.ICurScope>} scopes
         * @memberof newxxs.S2C_AllSetResult_14001
         * @instance
         */
        S2C_AllSetResult_14001.prototype.scopes = $util.emptyArray;

        /**
         * S2C_AllSetResult_14001 buyFreeChips.
         * @member {number} buyFreeChips
         * @memberof newxxs.S2C_AllSetResult_14001
         * @instance
         */
        S2C_AllSetResult_14001.prototype.buyFreeChips = 0;

        /**
         * Creates a new S2C_AllSetResult_14001 instance using the specified properties.
         * @function create
         * @memberof newxxs.S2C_AllSetResult_14001
         * @static
         * @param {newxxs.IS2C_AllSetResult_14001=} [properties] Properties to set
         * @returns {newxxs.S2C_AllSetResult_14001} S2C_AllSetResult_14001 instance
         */
        S2C_AllSetResult_14001.create = function create(properties) {
            return new S2C_AllSetResult_14001(properties);
        };

        /**
         * Encodes the specified S2C_AllSetResult_14001 message. Does not implicitly {@link newxxs.S2C_AllSetResult_14001.verify|verify} messages.
         * @function encode
         * @memberof newxxs.S2C_AllSetResult_14001
         * @static
         * @param {newxxs.IS2C_AllSetResult_14001} message S2C_AllSetResult_14001 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2C_AllSetResult_14001.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.error);
            if (message.curBetChips != null && Object.hasOwnProperty.call(message, "curBetChips"))
                writer.uint32(/* id 2, wireType 1 =*/17).double(message.curBetChips);
            if (message.BetType != null && Object.hasOwnProperty.call(message, "BetType"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.BetType);
            if (message.scopes != null && message.scopes.length)
                for (var i = 0; i < message.scopes.length; ++i)
                    $root.newxxs.CurScope.encode(message.scopes[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.buyFreeChips != null && Object.hasOwnProperty.call(message, "buyFreeChips"))
                writer.uint32(/* id 5, wireType 1 =*/41).double(message.buyFreeChips);
            return writer;
        };

        /**
         * Encodes the specified S2C_AllSetResult_14001 message, length delimited. Does not implicitly {@link newxxs.S2C_AllSetResult_14001.verify|verify} messages.
         * @function encodeDelimited
         * @memberof newxxs.S2C_AllSetResult_14001
         * @static
         * @param {newxxs.IS2C_AllSetResult_14001} message S2C_AllSetResult_14001 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2C_AllSetResult_14001.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a S2C_AllSetResult_14001 message from the specified reader or buffer.
         * @function decode
         * @memberof newxxs.S2C_AllSetResult_14001
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {newxxs.S2C_AllSetResult_14001} S2C_AllSetResult_14001
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2C_AllSetResult_14001.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.newxxs.S2C_AllSetResult_14001();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.error = reader.int32();
                    break;
                case 2:
                    message.curBetChips = reader.double();
                    break;
                case 3:
                    message.BetType = reader.int32();
                    break;
                case 4:
                    if (!(message.scopes && message.scopes.length))
                        message.scopes = [];
                    message.scopes.push($root.newxxs.CurScope.decode(reader, reader.uint32()));
                    break;
                case 5:
                    message.buyFreeChips = reader.double();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a S2C_AllSetResult_14001 message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof newxxs.S2C_AllSetResult_14001
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {newxxs.S2C_AllSetResult_14001} S2C_AllSetResult_14001
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2C_AllSetResult_14001.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a S2C_AllSetResult_14001 message.
         * @function verify
         * @memberof newxxs.S2C_AllSetResult_14001
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        S2C_AllSetResult_14001.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.error != null && message.hasOwnProperty("error"))
                if (!$util.isInteger(message.error))
                    return "error: integer expected";
            if (message.curBetChips != null && message.hasOwnProperty("curBetChips"))
                if (typeof message.curBetChips !== "number")
                    return "curBetChips: number expected";
            if (message.BetType != null && message.hasOwnProperty("BetType"))
                if (!$util.isInteger(message.BetType))
                    return "BetType: integer expected";
            if (message.scopes != null && message.hasOwnProperty("scopes")) {
                if (!Array.isArray(message.scopes))
                    return "scopes: array expected";
                for (var i = 0; i < message.scopes.length; ++i) {
                    var error = $root.newxxs.CurScope.verify(message.scopes[i]);
                    if (error)
                        return "scopes." + error;
                }
            }
            if (message.buyFreeChips != null && message.hasOwnProperty("buyFreeChips"))
                if (typeof message.buyFreeChips !== "number")
                    return "buyFreeChips: number expected";
            return null;
        };

        /**
         * Creates a S2C_AllSetResult_14001 message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof newxxs.S2C_AllSetResult_14001
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {newxxs.S2C_AllSetResult_14001} S2C_AllSetResult_14001
         */
        S2C_AllSetResult_14001.fromObject = function fromObject(object) {
            if (object instanceof $root.newxxs.S2C_AllSetResult_14001)
                return object;
            var message = new $root.newxxs.S2C_AllSetResult_14001();
            if (object.error != null)
                message.error = object.error | 0;
            if (object.curBetChips != null)
                message.curBetChips = Number(object.curBetChips);
            if (object.BetType != null)
                message.BetType = object.BetType | 0;
            if (object.scopes) {
                if (!Array.isArray(object.scopes))
                    throw TypeError(".newxxs.S2C_AllSetResult_14001.scopes: array expected");
                message.scopes = [];
                for (var i = 0; i < object.scopes.length; ++i) {
                    if (typeof object.scopes[i] !== "object")
                        throw TypeError(".newxxs.S2C_AllSetResult_14001.scopes: object expected");
                    message.scopes[i] = $root.newxxs.CurScope.fromObject(object.scopes[i]);
                }
            }
            if (object.buyFreeChips != null)
                message.buyFreeChips = Number(object.buyFreeChips);
            return message;
        };

        /**
         * Creates a plain object from a S2C_AllSetResult_14001 message. Also converts values to other types if specified.
         * @function toObject
         * @memberof newxxs.S2C_AllSetResult_14001
         * @static
         * @param {newxxs.S2C_AllSetResult_14001} message S2C_AllSetResult_14001
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        S2C_AllSetResult_14001.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.scopes = [];
            if (options.defaults) {
                object.error = 0;
                object.curBetChips = 0;
                object.BetType = 0;
                object.buyFreeChips = 0;
            }
            if (message.error != null && message.hasOwnProperty("error"))
                object.error = message.error;
            if (message.curBetChips != null && message.hasOwnProperty("curBetChips"))
                object.curBetChips = options.json && !isFinite(message.curBetChips) ? String(message.curBetChips) : message.curBetChips;
            if (message.BetType != null && message.hasOwnProperty("BetType"))
                object.BetType = message.BetType;
            if (message.scopes && message.scopes.length) {
                object.scopes = [];
                for (var j = 0; j < message.scopes.length; ++j)
                    object.scopes[j] = $root.newxxs.CurScope.toObject(message.scopes[j], options);
            }
            if (message.buyFreeChips != null && message.hasOwnProperty("buyFreeChips"))
                object.buyFreeChips = options.json && !isFinite(message.buyFreeChips) ? String(message.buyFreeChips) : message.buyFreeChips;
            return object;
        };

        /**
         * Converts this S2C_AllSetResult_14001 to JSON.
         * @function toJSON
         * @memberof newxxs.S2C_AllSetResult_14001
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        S2C_AllSetResult_14001.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return S2C_AllSetResult_14001;
    })();

    newxxs.C2S_SelectChips_14002 = (function() {

        /**
         * Properties of a C2S_SelectChips_14002.
         * @memberof newxxs
         * @interface IC2S_SelectChips_14002
         * @property {number|null} [betChip] C2S_SelectChips_14002 betChip
         */

        /**
         * Constructs a new C2S_SelectChips_14002.
         * @memberof newxxs
         * @classdesc Represents a C2S_SelectChips_14002.
         * @implements IC2S_SelectChips_14002
         * @constructor
         * @param {newxxs.IC2S_SelectChips_14002=} [properties] Properties to set
         */
        function C2S_SelectChips_14002(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * C2S_SelectChips_14002 betChip.
         * @member {number} betChip
         * @memberof newxxs.C2S_SelectChips_14002
         * @instance
         */
        C2S_SelectChips_14002.prototype.betChip = 0;

        /**
         * Creates a new C2S_SelectChips_14002 instance using the specified properties.
         * @function create
         * @memberof newxxs.C2S_SelectChips_14002
         * @static
         * @param {newxxs.IC2S_SelectChips_14002=} [properties] Properties to set
         * @returns {newxxs.C2S_SelectChips_14002} C2S_SelectChips_14002 instance
         */
        C2S_SelectChips_14002.create = function create(properties) {
            return new C2S_SelectChips_14002(properties);
        };

        /**
         * Encodes the specified C2S_SelectChips_14002 message. Does not implicitly {@link newxxs.C2S_SelectChips_14002.verify|verify} messages.
         * @function encode
         * @memberof newxxs.C2S_SelectChips_14002
         * @static
         * @param {newxxs.IC2S_SelectChips_14002} message C2S_SelectChips_14002 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2S_SelectChips_14002.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.betChip != null && Object.hasOwnProperty.call(message, "betChip"))
                writer.uint32(/* id 1, wireType 1 =*/9).double(message.betChip);
            return writer;
        };

        /**
         * Encodes the specified C2S_SelectChips_14002 message, length delimited. Does not implicitly {@link newxxs.C2S_SelectChips_14002.verify|verify} messages.
         * @function encodeDelimited
         * @memberof newxxs.C2S_SelectChips_14002
         * @static
         * @param {newxxs.IC2S_SelectChips_14002} message C2S_SelectChips_14002 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2S_SelectChips_14002.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2S_SelectChips_14002 message from the specified reader or buffer.
         * @function decode
         * @memberof newxxs.C2S_SelectChips_14002
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {newxxs.C2S_SelectChips_14002} C2S_SelectChips_14002
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2S_SelectChips_14002.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.newxxs.C2S_SelectChips_14002();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.betChip = reader.double();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a C2S_SelectChips_14002 message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof newxxs.C2S_SelectChips_14002
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {newxxs.C2S_SelectChips_14002} C2S_SelectChips_14002
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2S_SelectChips_14002.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a C2S_SelectChips_14002 message.
         * @function verify
         * @memberof newxxs.C2S_SelectChips_14002
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        C2S_SelectChips_14002.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.betChip != null && message.hasOwnProperty("betChip"))
                if (typeof message.betChip !== "number")
                    return "betChip: number expected";
            return null;
        };

        /**
         * Creates a C2S_SelectChips_14002 message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof newxxs.C2S_SelectChips_14002
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {newxxs.C2S_SelectChips_14002} C2S_SelectChips_14002
         */
        C2S_SelectChips_14002.fromObject = function fromObject(object) {
            if (object instanceof $root.newxxs.C2S_SelectChips_14002)
                return object;
            var message = new $root.newxxs.C2S_SelectChips_14002();
            if (object.betChip != null)
                message.betChip = Number(object.betChip);
            return message;
        };

        /**
         * Creates a plain object from a C2S_SelectChips_14002 message. Also converts values to other types if specified.
         * @function toObject
         * @memberof newxxs.C2S_SelectChips_14002
         * @static
         * @param {newxxs.C2S_SelectChips_14002} message C2S_SelectChips_14002
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        C2S_SelectChips_14002.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.betChip = 0;
            if (message.betChip != null && message.hasOwnProperty("betChip"))
                object.betChip = options.json && !isFinite(message.betChip) ? String(message.betChip) : message.betChip;
            return object;
        };

        /**
         * Converts this C2S_SelectChips_14002 to JSON.
         * @function toJSON
         * @memberof newxxs.C2S_SelectChips_14002
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        C2S_SelectChips_14002.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return C2S_SelectChips_14002;
    })();

    newxxs.S2C_SelectChipsResult_14003 = (function() {

        /**
         * Properties of a S2C_SelectChipsResult_14003.
         * @memberof newxxs
         * @interface IS2C_SelectChipsResult_14003
         * @property {number|null} [error] S2C_SelectChipsResult_14003 error
         * @property {number|null} [curBetChips] S2C_SelectChipsResult_14003 curBetChips
         * @property {number|null} [BetType] S2C_SelectChipsResult_14003 BetType
         * @property {Array.<newxxs.ICurScope>|null} [scopes] S2C_SelectChipsResult_14003 scopes
         * @property {number|null} [buyFreeChips] S2C_SelectChipsResult_14003 buyFreeChips
         */

        /**
         * Constructs a new S2C_SelectChipsResult_14003.
         * @memberof newxxs
         * @classdesc Represents a S2C_SelectChipsResult_14003.
         * @implements IS2C_SelectChipsResult_14003
         * @constructor
         * @param {newxxs.IS2C_SelectChipsResult_14003=} [properties] Properties to set
         */
        function S2C_SelectChipsResult_14003(properties) {
            this.scopes = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * S2C_SelectChipsResult_14003 error.
         * @member {number} error
         * @memberof newxxs.S2C_SelectChipsResult_14003
         * @instance
         */
        S2C_SelectChipsResult_14003.prototype.error = 0;

        /**
         * S2C_SelectChipsResult_14003 curBetChips.
         * @member {number} curBetChips
         * @memberof newxxs.S2C_SelectChipsResult_14003
         * @instance
         */
        S2C_SelectChipsResult_14003.prototype.curBetChips = 0;

        /**
         * S2C_SelectChipsResult_14003 BetType.
         * @member {number} BetType
         * @memberof newxxs.S2C_SelectChipsResult_14003
         * @instance
         */
        S2C_SelectChipsResult_14003.prototype.BetType = 0;

        /**
         * S2C_SelectChipsResult_14003 scopes.
         * @member {Array.<newxxs.ICurScope>} scopes
         * @memberof newxxs.S2C_SelectChipsResult_14003
         * @instance
         */
        S2C_SelectChipsResult_14003.prototype.scopes = $util.emptyArray;

        /**
         * S2C_SelectChipsResult_14003 buyFreeChips.
         * @member {number} buyFreeChips
         * @memberof newxxs.S2C_SelectChipsResult_14003
         * @instance
         */
        S2C_SelectChipsResult_14003.prototype.buyFreeChips = 0;

        /**
         * Creates a new S2C_SelectChipsResult_14003 instance using the specified properties.
         * @function create
         * @memberof newxxs.S2C_SelectChipsResult_14003
         * @static
         * @param {newxxs.IS2C_SelectChipsResult_14003=} [properties] Properties to set
         * @returns {newxxs.S2C_SelectChipsResult_14003} S2C_SelectChipsResult_14003 instance
         */
        S2C_SelectChipsResult_14003.create = function create(properties) {
            return new S2C_SelectChipsResult_14003(properties);
        };

        /**
         * Encodes the specified S2C_SelectChipsResult_14003 message. Does not implicitly {@link newxxs.S2C_SelectChipsResult_14003.verify|verify} messages.
         * @function encode
         * @memberof newxxs.S2C_SelectChipsResult_14003
         * @static
         * @param {newxxs.IS2C_SelectChipsResult_14003} message S2C_SelectChipsResult_14003 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2C_SelectChipsResult_14003.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.error);
            if (message.curBetChips != null && Object.hasOwnProperty.call(message, "curBetChips"))
                writer.uint32(/* id 2, wireType 1 =*/17).double(message.curBetChips);
            if (message.BetType != null && Object.hasOwnProperty.call(message, "BetType"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.BetType);
            if (message.scopes != null && message.scopes.length)
                for (var i = 0; i < message.scopes.length; ++i)
                    $root.newxxs.CurScope.encode(message.scopes[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.buyFreeChips != null && Object.hasOwnProperty.call(message, "buyFreeChips"))
                writer.uint32(/* id 5, wireType 1 =*/41).double(message.buyFreeChips);
            return writer;
        };

        /**
         * Encodes the specified S2C_SelectChipsResult_14003 message, length delimited. Does not implicitly {@link newxxs.S2C_SelectChipsResult_14003.verify|verify} messages.
         * @function encodeDelimited
         * @memberof newxxs.S2C_SelectChipsResult_14003
         * @static
         * @param {newxxs.IS2C_SelectChipsResult_14003} message S2C_SelectChipsResult_14003 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2C_SelectChipsResult_14003.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a S2C_SelectChipsResult_14003 message from the specified reader or buffer.
         * @function decode
         * @memberof newxxs.S2C_SelectChipsResult_14003
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {newxxs.S2C_SelectChipsResult_14003} S2C_SelectChipsResult_14003
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2C_SelectChipsResult_14003.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.newxxs.S2C_SelectChipsResult_14003();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.error = reader.int32();
                    break;
                case 2:
                    message.curBetChips = reader.double();
                    break;
                case 3:
                    message.BetType = reader.int32();
                    break;
                case 4:
                    if (!(message.scopes && message.scopes.length))
                        message.scopes = [];
                    message.scopes.push($root.newxxs.CurScope.decode(reader, reader.uint32()));
                    break;
                case 5:
                    message.buyFreeChips = reader.double();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a S2C_SelectChipsResult_14003 message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof newxxs.S2C_SelectChipsResult_14003
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {newxxs.S2C_SelectChipsResult_14003} S2C_SelectChipsResult_14003
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2C_SelectChipsResult_14003.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a S2C_SelectChipsResult_14003 message.
         * @function verify
         * @memberof newxxs.S2C_SelectChipsResult_14003
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        S2C_SelectChipsResult_14003.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.error != null && message.hasOwnProperty("error"))
                if (!$util.isInteger(message.error))
                    return "error: integer expected";
            if (message.curBetChips != null && message.hasOwnProperty("curBetChips"))
                if (typeof message.curBetChips !== "number")
                    return "curBetChips: number expected";
            if (message.BetType != null && message.hasOwnProperty("BetType"))
                if (!$util.isInteger(message.BetType))
                    return "BetType: integer expected";
            if (message.scopes != null && message.hasOwnProperty("scopes")) {
                if (!Array.isArray(message.scopes))
                    return "scopes: array expected";
                for (var i = 0; i < message.scopes.length; ++i) {
                    var error = $root.newxxs.CurScope.verify(message.scopes[i]);
                    if (error)
                        return "scopes." + error;
                }
            }
            if (message.buyFreeChips != null && message.hasOwnProperty("buyFreeChips"))
                if (typeof message.buyFreeChips !== "number")
                    return "buyFreeChips: number expected";
            return null;
        };

        /**
         * Creates a S2C_SelectChipsResult_14003 message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof newxxs.S2C_SelectChipsResult_14003
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {newxxs.S2C_SelectChipsResult_14003} S2C_SelectChipsResult_14003
         */
        S2C_SelectChipsResult_14003.fromObject = function fromObject(object) {
            if (object instanceof $root.newxxs.S2C_SelectChipsResult_14003)
                return object;
            var message = new $root.newxxs.S2C_SelectChipsResult_14003();
            if (object.error != null)
                message.error = object.error | 0;
            if (object.curBetChips != null)
                message.curBetChips = Number(object.curBetChips);
            if (object.BetType != null)
                message.BetType = object.BetType | 0;
            if (object.scopes) {
                if (!Array.isArray(object.scopes))
                    throw TypeError(".newxxs.S2C_SelectChipsResult_14003.scopes: array expected");
                message.scopes = [];
                for (var i = 0; i < object.scopes.length; ++i) {
                    if (typeof object.scopes[i] !== "object")
                        throw TypeError(".newxxs.S2C_SelectChipsResult_14003.scopes: object expected");
                    message.scopes[i] = $root.newxxs.CurScope.fromObject(object.scopes[i]);
                }
            }
            if (object.buyFreeChips != null)
                message.buyFreeChips = Number(object.buyFreeChips);
            return message;
        };

        /**
         * Creates a plain object from a S2C_SelectChipsResult_14003 message. Also converts values to other types if specified.
         * @function toObject
         * @memberof newxxs.S2C_SelectChipsResult_14003
         * @static
         * @param {newxxs.S2C_SelectChipsResult_14003} message S2C_SelectChipsResult_14003
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        S2C_SelectChipsResult_14003.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.scopes = [];
            if (options.defaults) {
                object.error = 0;
                object.curBetChips = 0;
                object.BetType = 0;
                object.buyFreeChips = 0;
            }
            if (message.error != null && message.hasOwnProperty("error"))
                object.error = message.error;
            if (message.curBetChips != null && message.hasOwnProperty("curBetChips"))
                object.curBetChips = options.json && !isFinite(message.curBetChips) ? String(message.curBetChips) : message.curBetChips;
            if (message.BetType != null && message.hasOwnProperty("BetType"))
                object.BetType = message.BetType;
            if (message.scopes && message.scopes.length) {
                object.scopes = [];
                for (var j = 0; j < message.scopes.length; ++j)
                    object.scopes[j] = $root.newxxs.CurScope.toObject(message.scopes[j], options);
            }
            if (message.buyFreeChips != null && message.hasOwnProperty("buyFreeChips"))
                object.buyFreeChips = options.json && !isFinite(message.buyFreeChips) ? String(message.buyFreeChips) : message.buyFreeChips;
            return object;
        };

        /**
         * Converts this S2C_SelectChipsResult_14003 to JSON.
         * @function toJSON
         * @memberof newxxs.S2C_SelectChipsResult_14003
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        S2C_SelectChipsResult_14003.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return S2C_SelectChipsResult_14003;
    })();

    newxxs.C2S_SetMultiple_15000 = (function() {

        /**
         * Properties of a C2S_SetMultiple_15000.
         * @memberof newxxs
         * @interface IC2S_SetMultiple_15000
         * @property {number|null} [isMultiple] C2S_SetMultiple_15000 isMultiple
         */

        /**
         * Constructs a new C2S_SetMultiple_15000.
         * @memberof newxxs
         * @classdesc Represents a C2S_SetMultiple_15000.
         * @implements IC2S_SetMultiple_15000
         * @constructor
         * @param {newxxs.IC2S_SetMultiple_15000=} [properties] Properties to set
         */
        function C2S_SetMultiple_15000(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * C2S_SetMultiple_15000 isMultiple.
         * @member {number} isMultiple
         * @memberof newxxs.C2S_SetMultiple_15000
         * @instance
         */
        C2S_SetMultiple_15000.prototype.isMultiple = 0;

        /**
         * Creates a new C2S_SetMultiple_15000 instance using the specified properties.
         * @function create
         * @memberof newxxs.C2S_SetMultiple_15000
         * @static
         * @param {newxxs.IC2S_SetMultiple_15000=} [properties] Properties to set
         * @returns {newxxs.C2S_SetMultiple_15000} C2S_SetMultiple_15000 instance
         */
        C2S_SetMultiple_15000.create = function create(properties) {
            return new C2S_SetMultiple_15000(properties);
        };

        /**
         * Encodes the specified C2S_SetMultiple_15000 message. Does not implicitly {@link newxxs.C2S_SetMultiple_15000.verify|verify} messages.
         * @function encode
         * @memberof newxxs.C2S_SetMultiple_15000
         * @static
         * @param {newxxs.IC2S_SetMultiple_15000} message C2S_SetMultiple_15000 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2S_SetMultiple_15000.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.isMultiple != null && Object.hasOwnProperty.call(message, "isMultiple"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.isMultiple);
            return writer;
        };

        /**
         * Encodes the specified C2S_SetMultiple_15000 message, length delimited. Does not implicitly {@link newxxs.C2S_SetMultiple_15000.verify|verify} messages.
         * @function encodeDelimited
         * @memberof newxxs.C2S_SetMultiple_15000
         * @static
         * @param {newxxs.IC2S_SetMultiple_15000} message C2S_SetMultiple_15000 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2S_SetMultiple_15000.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2S_SetMultiple_15000 message from the specified reader or buffer.
         * @function decode
         * @memberof newxxs.C2S_SetMultiple_15000
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {newxxs.C2S_SetMultiple_15000} C2S_SetMultiple_15000
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2S_SetMultiple_15000.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.newxxs.C2S_SetMultiple_15000();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.isMultiple = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a C2S_SetMultiple_15000 message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof newxxs.C2S_SetMultiple_15000
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {newxxs.C2S_SetMultiple_15000} C2S_SetMultiple_15000
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2S_SetMultiple_15000.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a C2S_SetMultiple_15000 message.
         * @function verify
         * @memberof newxxs.C2S_SetMultiple_15000
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        C2S_SetMultiple_15000.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.isMultiple != null && message.hasOwnProperty("isMultiple"))
                if (!$util.isInteger(message.isMultiple))
                    return "isMultiple: integer expected";
            return null;
        };

        /**
         * Creates a C2S_SetMultiple_15000 message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof newxxs.C2S_SetMultiple_15000
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {newxxs.C2S_SetMultiple_15000} C2S_SetMultiple_15000
         */
        C2S_SetMultiple_15000.fromObject = function fromObject(object) {
            if (object instanceof $root.newxxs.C2S_SetMultiple_15000)
                return object;
            var message = new $root.newxxs.C2S_SetMultiple_15000();
            if (object.isMultiple != null)
                message.isMultiple = object.isMultiple | 0;
            return message;
        };

        /**
         * Creates a plain object from a C2S_SetMultiple_15000 message. Also converts values to other types if specified.
         * @function toObject
         * @memberof newxxs.C2S_SetMultiple_15000
         * @static
         * @param {newxxs.C2S_SetMultiple_15000} message C2S_SetMultiple_15000
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        C2S_SetMultiple_15000.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.isMultiple = 0;
            if (message.isMultiple != null && message.hasOwnProperty("isMultiple"))
                object.isMultiple = message.isMultiple;
            return object;
        };

        /**
         * Converts this C2S_SetMultiple_15000 to JSON.
         * @function toJSON
         * @memberof newxxs.C2S_SetMultiple_15000
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        C2S_SetMultiple_15000.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return C2S_SetMultiple_15000;
    })();

    newxxs.S2C_SetMultipleResult_15001 = (function() {

        /**
         * Properties of a S2C_SetMultipleResult_15001.
         * @memberof newxxs
         * @interface IS2C_SetMultipleResult_15001
         * @property {number|null} [error] S2C_SetMultipleResult_15001 error
         * @property {number|null} [isMultiple] S2C_SetMultipleResult_15001 isMultiple
         * @property {number|null} [curBetChips] S2C_SetMultipleResult_15001 curBetChips
         * @property {Array.<number>|null} [betChips] S2C_SetMultipleResult_15001 betChips
         */

        /**
         * Constructs a new S2C_SetMultipleResult_15001.
         * @memberof newxxs
         * @classdesc Represents a S2C_SetMultipleResult_15001.
         * @implements IS2C_SetMultipleResult_15001
         * @constructor
         * @param {newxxs.IS2C_SetMultipleResult_15001=} [properties] Properties to set
         */
        function S2C_SetMultipleResult_15001(properties) {
            this.betChips = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * S2C_SetMultipleResult_15001 error.
         * @member {number} error
         * @memberof newxxs.S2C_SetMultipleResult_15001
         * @instance
         */
        S2C_SetMultipleResult_15001.prototype.error = 0;

        /**
         * S2C_SetMultipleResult_15001 isMultiple.
         * @member {number} isMultiple
         * @memberof newxxs.S2C_SetMultipleResult_15001
         * @instance
         */
        S2C_SetMultipleResult_15001.prototype.isMultiple = 0;

        /**
         * S2C_SetMultipleResult_15001 curBetChips.
         * @member {number} curBetChips
         * @memberof newxxs.S2C_SetMultipleResult_15001
         * @instance
         */
        S2C_SetMultipleResult_15001.prototype.curBetChips = 0;

        /**
         * S2C_SetMultipleResult_15001 betChips.
         * @member {Array.<number>} betChips
         * @memberof newxxs.S2C_SetMultipleResult_15001
         * @instance
         */
        S2C_SetMultipleResult_15001.prototype.betChips = $util.emptyArray;

        /**
         * Creates a new S2C_SetMultipleResult_15001 instance using the specified properties.
         * @function create
         * @memberof newxxs.S2C_SetMultipleResult_15001
         * @static
         * @param {newxxs.IS2C_SetMultipleResult_15001=} [properties] Properties to set
         * @returns {newxxs.S2C_SetMultipleResult_15001} S2C_SetMultipleResult_15001 instance
         */
        S2C_SetMultipleResult_15001.create = function create(properties) {
            return new S2C_SetMultipleResult_15001(properties);
        };

        /**
         * Encodes the specified S2C_SetMultipleResult_15001 message. Does not implicitly {@link newxxs.S2C_SetMultipleResult_15001.verify|verify} messages.
         * @function encode
         * @memberof newxxs.S2C_SetMultipleResult_15001
         * @static
         * @param {newxxs.IS2C_SetMultipleResult_15001} message S2C_SetMultipleResult_15001 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2C_SetMultipleResult_15001.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.error);
            if (message.isMultiple != null && Object.hasOwnProperty.call(message, "isMultiple"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.isMultiple);
            if (message.curBetChips != null && Object.hasOwnProperty.call(message, "curBetChips"))
                writer.uint32(/* id 3, wireType 1 =*/25).double(message.curBetChips);
            if (message.betChips != null && message.betChips.length) {
                writer.uint32(/* id 4, wireType 2 =*/34).fork();
                for (var i = 0; i < message.betChips.length; ++i)
                    writer.double(message.betChips[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Encodes the specified S2C_SetMultipleResult_15001 message, length delimited. Does not implicitly {@link newxxs.S2C_SetMultipleResult_15001.verify|verify} messages.
         * @function encodeDelimited
         * @memberof newxxs.S2C_SetMultipleResult_15001
         * @static
         * @param {newxxs.IS2C_SetMultipleResult_15001} message S2C_SetMultipleResult_15001 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2C_SetMultipleResult_15001.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a S2C_SetMultipleResult_15001 message from the specified reader or buffer.
         * @function decode
         * @memberof newxxs.S2C_SetMultipleResult_15001
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {newxxs.S2C_SetMultipleResult_15001} S2C_SetMultipleResult_15001
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2C_SetMultipleResult_15001.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.newxxs.S2C_SetMultipleResult_15001();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.error = reader.int32();
                    break;
                case 2:
                    message.isMultiple = reader.int32();
                    break;
                case 3:
                    message.curBetChips = reader.double();
                    break;
                case 4:
                    if (!(message.betChips && message.betChips.length))
                        message.betChips = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.betChips.push(reader.double());
                    } else
                        message.betChips.push(reader.double());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a S2C_SetMultipleResult_15001 message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof newxxs.S2C_SetMultipleResult_15001
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {newxxs.S2C_SetMultipleResult_15001} S2C_SetMultipleResult_15001
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2C_SetMultipleResult_15001.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a S2C_SetMultipleResult_15001 message.
         * @function verify
         * @memberof newxxs.S2C_SetMultipleResult_15001
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        S2C_SetMultipleResult_15001.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.error != null && message.hasOwnProperty("error"))
                if (!$util.isInteger(message.error))
                    return "error: integer expected";
            if (message.isMultiple != null && message.hasOwnProperty("isMultiple"))
                if (!$util.isInteger(message.isMultiple))
                    return "isMultiple: integer expected";
            if (message.curBetChips != null && message.hasOwnProperty("curBetChips"))
                if (typeof message.curBetChips !== "number")
                    return "curBetChips: number expected";
            if (message.betChips != null && message.hasOwnProperty("betChips")) {
                if (!Array.isArray(message.betChips))
                    return "betChips: array expected";
                for (var i = 0; i < message.betChips.length; ++i)
                    if (typeof message.betChips[i] !== "number")
                        return "betChips: number[] expected";
            }
            return null;
        };

        /**
         * Creates a S2C_SetMultipleResult_15001 message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof newxxs.S2C_SetMultipleResult_15001
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {newxxs.S2C_SetMultipleResult_15001} S2C_SetMultipleResult_15001
         */
        S2C_SetMultipleResult_15001.fromObject = function fromObject(object) {
            if (object instanceof $root.newxxs.S2C_SetMultipleResult_15001)
                return object;
            var message = new $root.newxxs.S2C_SetMultipleResult_15001();
            if (object.error != null)
                message.error = object.error | 0;
            if (object.isMultiple != null)
                message.isMultiple = object.isMultiple | 0;
            if (object.curBetChips != null)
                message.curBetChips = Number(object.curBetChips);
            if (object.betChips) {
                if (!Array.isArray(object.betChips))
                    throw TypeError(".newxxs.S2C_SetMultipleResult_15001.betChips: array expected");
                message.betChips = [];
                for (var i = 0; i < object.betChips.length; ++i)
                    message.betChips[i] = Number(object.betChips[i]);
            }
            return message;
        };

        /**
         * Creates a plain object from a S2C_SetMultipleResult_15001 message. Also converts values to other types if specified.
         * @function toObject
         * @memberof newxxs.S2C_SetMultipleResult_15001
         * @static
         * @param {newxxs.S2C_SetMultipleResult_15001} message S2C_SetMultipleResult_15001
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        S2C_SetMultipleResult_15001.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.betChips = [];
            if (options.defaults) {
                object.error = 0;
                object.isMultiple = 0;
                object.curBetChips = 0;
            }
            if (message.error != null && message.hasOwnProperty("error"))
                object.error = message.error;
            if (message.isMultiple != null && message.hasOwnProperty("isMultiple"))
                object.isMultiple = message.isMultiple;
            if (message.curBetChips != null && message.hasOwnProperty("curBetChips"))
                object.curBetChips = options.json && !isFinite(message.curBetChips) ? String(message.curBetChips) : message.curBetChips;
            if (message.betChips && message.betChips.length) {
                object.betChips = [];
                for (var j = 0; j < message.betChips.length; ++j)
                    object.betChips[j] = options.json && !isFinite(message.betChips[j]) ? String(message.betChips[j]) : message.betChips[j];
            }
            return object;
        };

        /**
         * Converts this S2C_SetMultipleResult_15001 to JSON.
         * @function toJSON
         * @memberof newxxs.S2C_SetMultipleResult_15001
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        S2C_SetMultipleResult_15001.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return S2C_SetMultipleResult_15001;
    })();

    newxxs.S2C_NoticeResult_66666 = (function() {

        /**
         * Properties of a S2C_NoticeResult_66666.
         * @memberof newxxs
         * @interface IS2C_NoticeResult_66666
         * @property {number|null} [error] S2C_NoticeResult_66666 error
         * @property {Array.<string>|null} [notice] S2C_NoticeResult_66666 notice
         */

        /**
         * Constructs a new S2C_NoticeResult_66666.
         * @memberof newxxs
         * @classdesc Represents a S2C_NoticeResult_66666.
         * @implements IS2C_NoticeResult_66666
         * @constructor
         * @param {newxxs.IS2C_NoticeResult_66666=} [properties] Properties to set
         */
        function S2C_NoticeResult_66666(properties) {
            this.notice = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * S2C_NoticeResult_66666 error.
         * @member {number} error
         * @memberof newxxs.S2C_NoticeResult_66666
         * @instance
         */
        S2C_NoticeResult_66666.prototype.error = 0;

        /**
         * S2C_NoticeResult_66666 notice.
         * @member {Array.<string>} notice
         * @memberof newxxs.S2C_NoticeResult_66666
         * @instance
         */
        S2C_NoticeResult_66666.prototype.notice = $util.emptyArray;

        /**
         * Creates a new S2C_NoticeResult_66666 instance using the specified properties.
         * @function create
         * @memberof newxxs.S2C_NoticeResult_66666
         * @static
         * @param {newxxs.IS2C_NoticeResult_66666=} [properties] Properties to set
         * @returns {newxxs.S2C_NoticeResult_66666} S2C_NoticeResult_66666 instance
         */
        S2C_NoticeResult_66666.create = function create(properties) {
            return new S2C_NoticeResult_66666(properties);
        };

        /**
         * Encodes the specified S2C_NoticeResult_66666 message. Does not implicitly {@link newxxs.S2C_NoticeResult_66666.verify|verify} messages.
         * @function encode
         * @memberof newxxs.S2C_NoticeResult_66666
         * @static
         * @param {newxxs.IS2C_NoticeResult_66666} message S2C_NoticeResult_66666 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2C_NoticeResult_66666.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.error);
            if (message.notice != null && message.notice.length)
                for (var i = 0; i < message.notice.length; ++i)
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.notice[i]);
            return writer;
        };

        /**
         * Encodes the specified S2C_NoticeResult_66666 message, length delimited. Does not implicitly {@link newxxs.S2C_NoticeResult_66666.verify|verify} messages.
         * @function encodeDelimited
         * @memberof newxxs.S2C_NoticeResult_66666
         * @static
         * @param {newxxs.IS2C_NoticeResult_66666} message S2C_NoticeResult_66666 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2C_NoticeResult_66666.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a S2C_NoticeResult_66666 message from the specified reader or buffer.
         * @function decode
         * @memberof newxxs.S2C_NoticeResult_66666
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {newxxs.S2C_NoticeResult_66666} S2C_NoticeResult_66666
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2C_NoticeResult_66666.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.newxxs.S2C_NoticeResult_66666();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.error = reader.int32();
                    break;
                case 2:
                    if (!(message.notice && message.notice.length))
                        message.notice = [];
                    message.notice.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a S2C_NoticeResult_66666 message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof newxxs.S2C_NoticeResult_66666
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {newxxs.S2C_NoticeResult_66666} S2C_NoticeResult_66666
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2C_NoticeResult_66666.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a S2C_NoticeResult_66666 message.
         * @function verify
         * @memberof newxxs.S2C_NoticeResult_66666
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        S2C_NoticeResult_66666.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.error != null && message.hasOwnProperty("error"))
                if (!$util.isInteger(message.error))
                    return "error: integer expected";
            if (message.notice != null && message.hasOwnProperty("notice")) {
                if (!Array.isArray(message.notice))
                    return "notice: array expected";
                for (var i = 0; i < message.notice.length; ++i)
                    if (!$util.isString(message.notice[i]))
                        return "notice: string[] expected";
            }
            return null;
        };

        /**
         * Creates a S2C_NoticeResult_66666 message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof newxxs.S2C_NoticeResult_66666
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {newxxs.S2C_NoticeResult_66666} S2C_NoticeResult_66666
         */
        S2C_NoticeResult_66666.fromObject = function fromObject(object) {
            if (object instanceof $root.newxxs.S2C_NoticeResult_66666)
                return object;
            var message = new $root.newxxs.S2C_NoticeResult_66666();
            if (object.error != null)
                message.error = object.error | 0;
            if (object.notice) {
                if (!Array.isArray(object.notice))
                    throw TypeError(".newxxs.S2C_NoticeResult_66666.notice: array expected");
                message.notice = [];
                for (var i = 0; i < object.notice.length; ++i)
                    message.notice[i] = String(object.notice[i]);
            }
            return message;
        };

        /**
         * Creates a plain object from a S2C_NoticeResult_66666 message. Also converts values to other types if specified.
         * @function toObject
         * @memberof newxxs.S2C_NoticeResult_66666
         * @static
         * @param {newxxs.S2C_NoticeResult_66666} message S2C_NoticeResult_66666
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        S2C_NoticeResult_66666.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.notice = [];
            if (options.defaults)
                object.error = 0;
            if (message.error != null && message.hasOwnProperty("error"))
                object.error = message.error;
            if (message.notice && message.notice.length) {
                object.notice = [];
                for (var j = 0; j < message.notice.length; ++j)
                    object.notice[j] = message.notice[j];
            }
            return object;
        };

        /**
         * Converts this S2C_NoticeResult_66666 to JSON.
         * @function toJSON
         * @memberof newxxs.S2C_NoticeResult_66666
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        S2C_NoticeResult_66666.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return S2C_NoticeResult_66666;
    })();

    newxxs.CurPlayer = (function() {

        /**
         * Properties of a CurPlayer.
         * @memberof newxxs
         * @interface ICurPlayer
         * @property {string|null} [playerId] CurPlayer playerId
         * @property {string|null} [agentId] CurPlayer agentId
         * @property {string|null} [nickName] CurPlayer nickName
         * @property {string|null} [identify] CurPlayer identify
         */

        /**
         * Constructs a new CurPlayer.
         * @memberof newxxs
         * @classdesc Represents a CurPlayer.
         * @implements ICurPlayer
         * @constructor
         * @param {newxxs.ICurPlayer=} [properties] Properties to set
         */
        function CurPlayer(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CurPlayer playerId.
         * @member {string} playerId
         * @memberof newxxs.CurPlayer
         * @instance
         */
        CurPlayer.prototype.playerId = "";

        /**
         * CurPlayer agentId.
         * @member {string} agentId
         * @memberof newxxs.CurPlayer
         * @instance
         */
        CurPlayer.prototype.agentId = "";

        /**
         * CurPlayer nickName.
         * @member {string} nickName
         * @memberof newxxs.CurPlayer
         * @instance
         */
        CurPlayer.prototype.nickName = "";

        /**
         * CurPlayer identify.
         * @member {string} identify
         * @memberof newxxs.CurPlayer
         * @instance
         */
        CurPlayer.prototype.identify = "";

        /**
         * Creates a new CurPlayer instance using the specified properties.
         * @function create
         * @memberof newxxs.CurPlayer
         * @static
         * @param {newxxs.ICurPlayer=} [properties] Properties to set
         * @returns {newxxs.CurPlayer} CurPlayer instance
         */
        CurPlayer.create = function create(properties) {
            return new CurPlayer(properties);
        };

        /**
         * Encodes the specified CurPlayer message. Does not implicitly {@link newxxs.CurPlayer.verify|verify} messages.
         * @function encode
         * @memberof newxxs.CurPlayer
         * @static
         * @param {newxxs.ICurPlayer} message CurPlayer message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CurPlayer.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.playerId);
            if (message.agentId != null && Object.hasOwnProperty.call(message, "agentId"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.agentId);
            if (message.nickName != null && Object.hasOwnProperty.call(message, "nickName"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.nickName);
            if (message.identify != null && Object.hasOwnProperty.call(message, "identify"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.identify);
            return writer;
        };

        /**
         * Encodes the specified CurPlayer message, length delimited. Does not implicitly {@link newxxs.CurPlayer.verify|verify} messages.
         * @function encodeDelimited
         * @memberof newxxs.CurPlayer
         * @static
         * @param {newxxs.ICurPlayer} message CurPlayer message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CurPlayer.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CurPlayer message from the specified reader or buffer.
         * @function decode
         * @memberof newxxs.CurPlayer
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {newxxs.CurPlayer} CurPlayer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CurPlayer.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.newxxs.CurPlayer();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.playerId = reader.string();
                    break;
                case 2:
                    message.agentId = reader.string();
                    break;
                case 3:
                    message.nickName = reader.string();
                    break;
                case 4:
                    message.identify = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CurPlayer message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof newxxs.CurPlayer
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {newxxs.CurPlayer} CurPlayer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CurPlayer.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CurPlayer message.
         * @function verify
         * @memberof newxxs.CurPlayer
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CurPlayer.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.playerId != null && message.hasOwnProperty("playerId"))
                if (!$util.isString(message.playerId))
                    return "playerId: string expected";
            if (message.agentId != null && message.hasOwnProperty("agentId"))
                if (!$util.isString(message.agentId))
                    return "agentId: string expected";
            if (message.nickName != null && message.hasOwnProperty("nickName"))
                if (!$util.isString(message.nickName))
                    return "nickName: string expected";
            if (message.identify != null && message.hasOwnProperty("identify"))
                if (!$util.isString(message.identify))
                    return "identify: string expected";
            return null;
        };

        /**
         * Creates a CurPlayer message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof newxxs.CurPlayer
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {newxxs.CurPlayer} CurPlayer
         */
        CurPlayer.fromObject = function fromObject(object) {
            if (object instanceof $root.newxxs.CurPlayer)
                return object;
            var message = new $root.newxxs.CurPlayer();
            if (object.playerId != null)
                message.playerId = String(object.playerId);
            if (object.agentId != null)
                message.agentId = String(object.agentId);
            if (object.nickName != null)
                message.nickName = String(object.nickName);
            if (object.identify != null)
                message.identify = String(object.identify);
            return message;
        };

        /**
         * Creates a plain object from a CurPlayer message. Also converts values to other types if specified.
         * @function toObject
         * @memberof newxxs.CurPlayer
         * @static
         * @param {newxxs.CurPlayer} message CurPlayer
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CurPlayer.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.playerId = "";
                object.agentId = "";
                object.nickName = "";
                object.identify = "";
            }
            if (message.playerId != null && message.hasOwnProperty("playerId"))
                object.playerId = message.playerId;
            if (message.agentId != null && message.hasOwnProperty("agentId"))
                object.agentId = message.agentId;
            if (message.nickName != null && message.hasOwnProperty("nickName"))
                object.nickName = message.nickName;
            if (message.identify != null && message.hasOwnProperty("identify"))
                object.identify = message.identify;
            return object;
        };

        /**
         * Converts this CurPlayer to JSON.
         * @function toJSON
         * @memberof newxxs.CurPlayer
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CurPlayer.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CurPlayer;
    })();

    newxxs.CurScene = (function() {

        /**
         * Properties of a CurScene.
         * @memberof newxxs
         * @interface ICurScene
         * @property {number|null} [surChips] CurScene surChips
         * @property {number|null} [curChips] CurScene curChips
         * @property {number|null} [winChips] CurScene winChips
         * @property {number|null} [minBet] CurScene minBet
         * @property {number|null} [maxBet] CurScene maxBet
         * @property {number|null} [curBetChips] CurScene curBetChips
         * @property {number|null} [betType] CurScene betType
         * @property {number|null} [buyFree] CurScene buyFree
         * @property {number|null} [buyFreeChips] CurScene buyFreeChips
         * @property {string|null} [batchno] CurScene batchno
         * @property {number|null} [round] CurScene round
         * @property {number|null} [run] CurScene run
         * @property {number|null} [scene] CurScene scene
         * @property {number|null} [freeCount] CurScene freeCount
         * @property {string|null} [panel] CurScene panel
         * @property {number|null} [allMultiple] CurScene allMultiple
         * @property {number|null} [curMultiple] CurScene curMultiple
         * @property {Array.<newxxs.ICurMultipleIcon>|null} [curMultiples] CurScene curMultiples
         * @property {Array.<newxxs.ICurAwardIcon>|null} [curicons] CurScene curicons
         * @property {Array.<newxxs.ICurAwardIcon>|null} [roundicons] CurScene roundicons
         * @property {newxxs.ICurAwardIcon|null} [free] CurScene free
         * @property {Array.<newxxs.ICurScope>|null} [scopes] CurScene scopes
         * @property {Array.<number>|null} [multiples] CurScene multiples
         * @property {number|null} [bigIcon] CurScene bigIcon
         * @property {number|null} [comboCount] CurScene comboCount
         * @property {number|null} [freeAginCount] CurScene freeAginCount
         * @property {number|null} [freeAginNum] CurScene freeAginNum
         * @property {number|null} [freeAginChips] CurScene freeAginChips
         * @property {string|null} [scroll] CurScene scroll
         * @property {string|null} [suite] CurScene suite
         * @property {Array.<number>|null} [betChips] CurScene betChips
         * @property {number|null} [isMultiple] CurScene isMultiple
         * @property {number|null} [allCount] CurScene allCount
         */

        /**
         * Constructs a new CurScene.
         * @memberof newxxs
         * @classdesc Represents a CurScene.
         * @implements ICurScene
         * @constructor
         * @param {newxxs.ICurScene=} [properties] Properties to set
         */
        function CurScene(properties) {
            this.curMultiples = [];
            this.curicons = [];
            this.roundicons = [];
            this.scopes = [];
            this.multiples = [];
            this.betChips = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CurScene surChips.
         * @member {number} surChips
         * @memberof newxxs.CurScene
         * @instance
         */
        CurScene.prototype.surChips = 0;

        /**
         * CurScene curChips.
         * @member {number} curChips
         * @memberof newxxs.CurScene
         * @instance
         */
        CurScene.prototype.curChips = 0;

        /**
         * CurScene winChips.
         * @member {number} winChips
         * @memberof newxxs.CurScene
         * @instance
         */
        CurScene.prototype.winChips = 0;

        /**
         * CurScene minBet.
         * @member {number} minBet
         * @memberof newxxs.CurScene
         * @instance
         */
        CurScene.prototype.minBet = 0;

        /**
         * CurScene maxBet.
         * @member {number} maxBet
         * @memberof newxxs.CurScene
         * @instance
         */
        CurScene.prototype.maxBet = 0;

        /**
         * CurScene curBetChips.
         * @member {number} curBetChips
         * @memberof newxxs.CurScene
         * @instance
         */
        CurScene.prototype.curBetChips = 0;

        /**
         * CurScene betType.
         * @member {number} betType
         * @memberof newxxs.CurScene
         * @instance
         */
        CurScene.prototype.betType = 0;

        /**
         * CurScene buyFree.
         * @member {number} buyFree
         * @memberof newxxs.CurScene
         * @instance
         */
        CurScene.prototype.buyFree = 0;

        /**
         * CurScene buyFreeChips.
         * @member {number} buyFreeChips
         * @memberof newxxs.CurScene
         * @instance
         */
        CurScene.prototype.buyFreeChips = 0;

        /**
         * CurScene batchno.
         * @member {string} batchno
         * @memberof newxxs.CurScene
         * @instance
         */
        CurScene.prototype.batchno = "";

        /**
         * CurScene round.
         * @member {number} round
         * @memberof newxxs.CurScene
         * @instance
         */
        CurScene.prototype.round = 0;

        /**
         * CurScene run.
         * @member {number} run
         * @memberof newxxs.CurScene
         * @instance
         */
        CurScene.prototype.run = 0;

        /**
         * CurScene scene.
         * @member {number} scene
         * @memberof newxxs.CurScene
         * @instance
         */
        CurScene.prototype.scene = 0;

        /**
         * CurScene freeCount.
         * @member {number} freeCount
         * @memberof newxxs.CurScene
         * @instance
         */
        CurScene.prototype.freeCount = 0;

        /**
         * CurScene panel.
         * @member {string} panel
         * @memberof newxxs.CurScene
         * @instance
         */
        CurScene.prototype.panel = "";

        /**
         * CurScene allMultiple.
         * @member {number} allMultiple
         * @memberof newxxs.CurScene
         * @instance
         */
        CurScene.prototype.allMultiple = 0;

        /**
         * CurScene curMultiple.
         * @member {number} curMultiple
         * @memberof newxxs.CurScene
         * @instance
         */
        CurScene.prototype.curMultiple = 0;

        /**
         * CurScene curMultiples.
         * @member {Array.<newxxs.ICurMultipleIcon>} curMultiples
         * @memberof newxxs.CurScene
         * @instance
         */
        CurScene.prototype.curMultiples = $util.emptyArray;

        /**
         * CurScene curicons.
         * @member {Array.<newxxs.ICurAwardIcon>} curicons
         * @memberof newxxs.CurScene
         * @instance
         */
        CurScene.prototype.curicons = $util.emptyArray;

        /**
         * CurScene roundicons.
         * @member {Array.<newxxs.ICurAwardIcon>} roundicons
         * @memberof newxxs.CurScene
         * @instance
         */
        CurScene.prototype.roundicons = $util.emptyArray;

        /**
         * CurScene free.
         * @member {newxxs.ICurAwardIcon|null|undefined} free
         * @memberof newxxs.CurScene
         * @instance
         */
        CurScene.prototype.free = null;

        /**
         * CurScene scopes.
         * @member {Array.<newxxs.ICurScope>} scopes
         * @memberof newxxs.CurScene
         * @instance
         */
        CurScene.prototype.scopes = $util.emptyArray;

        /**
         * CurScene multiples.
         * @member {Array.<number>} multiples
         * @memberof newxxs.CurScene
         * @instance
         */
        CurScene.prototype.multiples = $util.emptyArray;

        /**
         * CurScene bigIcon.
         * @member {number} bigIcon
         * @memberof newxxs.CurScene
         * @instance
         */
        CurScene.prototype.bigIcon = 0;

        /**
         * CurScene comboCount.
         * @member {number} comboCount
         * @memberof newxxs.CurScene
         * @instance
         */
        CurScene.prototype.comboCount = 0;

        /**
         * CurScene freeAginCount.
         * @member {number} freeAginCount
         * @memberof newxxs.CurScene
         * @instance
         */
        CurScene.prototype.freeAginCount = 0;

        /**
         * CurScene freeAginNum.
         * @member {number} freeAginNum
         * @memberof newxxs.CurScene
         * @instance
         */
        CurScene.prototype.freeAginNum = 0;

        /**
         * CurScene freeAginChips.
         * @member {number} freeAginChips
         * @memberof newxxs.CurScene
         * @instance
         */
        CurScene.prototype.freeAginChips = 0;

        /**
         * CurScene scroll.
         * @member {string} scroll
         * @memberof newxxs.CurScene
         * @instance
         */
        CurScene.prototype.scroll = "";

        /**
         * CurScene suite.
         * @member {string} suite
         * @memberof newxxs.CurScene
         * @instance
         */
        CurScene.prototype.suite = "";

        /**
         * CurScene betChips.
         * @member {Array.<number>} betChips
         * @memberof newxxs.CurScene
         * @instance
         */
        CurScene.prototype.betChips = $util.emptyArray;

        /**
         * CurScene isMultiple.
         * @member {number} isMultiple
         * @memberof newxxs.CurScene
         * @instance
         */
        CurScene.prototype.isMultiple = 0;

        /**
         * CurScene allCount.
         * @member {number} allCount
         * @memberof newxxs.CurScene
         * @instance
         */
        CurScene.prototype.allCount = 0;

        /**
         * Creates a new CurScene instance using the specified properties.
         * @function create
         * @memberof newxxs.CurScene
         * @static
         * @param {newxxs.ICurScene=} [properties] Properties to set
         * @returns {newxxs.CurScene} CurScene instance
         */
        CurScene.create = function create(properties) {
            return new CurScene(properties);
        };

        /**
         * Encodes the specified CurScene message. Does not implicitly {@link newxxs.CurScene.verify|verify} messages.
         * @function encode
         * @memberof newxxs.CurScene
         * @static
         * @param {newxxs.ICurScene} message CurScene message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CurScene.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.surChips != null && Object.hasOwnProperty.call(message, "surChips"))
                writer.uint32(/* id 1, wireType 1 =*/9).double(message.surChips);
            if (message.curChips != null && Object.hasOwnProperty.call(message, "curChips"))
                writer.uint32(/* id 2, wireType 1 =*/17).double(message.curChips);
            if (message.winChips != null && Object.hasOwnProperty.call(message, "winChips"))
                writer.uint32(/* id 3, wireType 1 =*/25).double(message.winChips);
            if (message.minBet != null && Object.hasOwnProperty.call(message, "minBet"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.minBet);
            if (message.maxBet != null && Object.hasOwnProperty.call(message, "maxBet"))
                writer.uint32(/* id 5, wireType 1 =*/41).double(message.maxBet);
            if (message.curBetChips != null && Object.hasOwnProperty.call(message, "curBetChips"))
                writer.uint32(/* id 6, wireType 1 =*/49).double(message.curBetChips);
            if (message.betType != null && Object.hasOwnProperty.call(message, "betType"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.betType);
            if (message.buyFree != null && Object.hasOwnProperty.call(message, "buyFree"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.buyFree);
            if (message.buyFreeChips != null && Object.hasOwnProperty.call(message, "buyFreeChips"))
                writer.uint32(/* id 9, wireType 1 =*/73).double(message.buyFreeChips);
            if (message.batchno != null && Object.hasOwnProperty.call(message, "batchno"))
                writer.uint32(/* id 10, wireType 2 =*/82).string(message.batchno);
            if (message.round != null && Object.hasOwnProperty.call(message, "round"))
                writer.uint32(/* id 11, wireType 0 =*/88).int32(message.round);
            if (message.run != null && Object.hasOwnProperty.call(message, "run"))
                writer.uint32(/* id 12, wireType 0 =*/96).int32(message.run);
            if (message.scene != null && Object.hasOwnProperty.call(message, "scene"))
                writer.uint32(/* id 13, wireType 0 =*/104).int32(message.scene);
            if (message.freeCount != null && Object.hasOwnProperty.call(message, "freeCount"))
                writer.uint32(/* id 14, wireType 0 =*/112).int32(message.freeCount);
            if (message.panel != null && Object.hasOwnProperty.call(message, "panel"))
                writer.uint32(/* id 15, wireType 2 =*/122).string(message.panel);
            if (message.allMultiple != null && Object.hasOwnProperty.call(message, "allMultiple"))
                writer.uint32(/* id 16, wireType 1 =*/129).double(message.allMultiple);
            if (message.curMultiple != null && Object.hasOwnProperty.call(message, "curMultiple"))
                writer.uint32(/* id 17, wireType 1 =*/137).double(message.curMultiple);
            if (message.curMultiples != null && message.curMultiples.length)
                for (var i = 0; i < message.curMultiples.length; ++i)
                    $root.newxxs.CurMultipleIcon.encode(message.curMultiples[i], writer.uint32(/* id 18, wireType 2 =*/146).fork()).ldelim();
            if (message.curicons != null && message.curicons.length)
                for (var i = 0; i < message.curicons.length; ++i)
                    $root.newxxs.CurAwardIcon.encode(message.curicons[i], writer.uint32(/* id 19, wireType 2 =*/154).fork()).ldelim();
            if (message.roundicons != null && message.roundicons.length)
                for (var i = 0; i < message.roundicons.length; ++i)
                    $root.newxxs.CurAwardIcon.encode(message.roundicons[i], writer.uint32(/* id 20, wireType 2 =*/162).fork()).ldelim();
            if (message.free != null && Object.hasOwnProperty.call(message, "free"))
                $root.newxxs.CurAwardIcon.encode(message.free, writer.uint32(/* id 21, wireType 2 =*/170).fork()).ldelim();
            if (message.scopes != null && message.scopes.length)
                for (var i = 0; i < message.scopes.length; ++i)
                    $root.newxxs.CurScope.encode(message.scopes[i], writer.uint32(/* id 22, wireType 2 =*/178).fork()).ldelim();
            if (message.multiples != null && message.multiples.length) {
                writer.uint32(/* id 23, wireType 2 =*/186).fork();
                for (var i = 0; i < message.multiples.length; ++i)
                    writer.double(message.multiples[i]);
                writer.ldelim();
            }
            if (message.bigIcon != null && Object.hasOwnProperty.call(message, "bigIcon"))
                writer.uint32(/* id 24, wireType 0 =*/192).int32(message.bigIcon);
            if (message.comboCount != null && Object.hasOwnProperty.call(message, "comboCount"))
                writer.uint32(/* id 25, wireType 0 =*/200).int32(message.comboCount);
            if (message.freeAginCount != null && Object.hasOwnProperty.call(message, "freeAginCount"))
                writer.uint32(/* id 26, wireType 0 =*/208).int32(message.freeAginCount);
            if (message.freeAginNum != null && Object.hasOwnProperty.call(message, "freeAginNum"))
                writer.uint32(/* id 27, wireType 0 =*/216).int32(message.freeAginNum);
            if (message.freeAginChips != null && Object.hasOwnProperty.call(message, "freeAginChips"))
                writer.uint32(/* id 28, wireType 1 =*/225).double(message.freeAginChips);
            if (message.scroll != null && Object.hasOwnProperty.call(message, "scroll"))
                writer.uint32(/* id 29, wireType 2 =*/234).string(message.scroll);
            if (message.suite != null && Object.hasOwnProperty.call(message, "suite"))
                writer.uint32(/* id 30, wireType 2 =*/242).string(message.suite);
            if (message.betChips != null && message.betChips.length) {
                writer.uint32(/* id 31, wireType 2 =*/250).fork();
                for (var i = 0; i < message.betChips.length; ++i)
                    writer.double(message.betChips[i]);
                writer.ldelim();
            }
            if (message.isMultiple != null && Object.hasOwnProperty.call(message, "isMultiple"))
                writer.uint32(/* id 40, wireType 0 =*/320).int32(message.isMultiple);
            if (message.allCount != null && Object.hasOwnProperty.call(message, "allCount"))
                writer.uint32(/* id 41, wireType 0 =*/328).int32(message.allCount);
            return writer;
        };

        /**
         * Encodes the specified CurScene message, length delimited. Does not implicitly {@link newxxs.CurScene.verify|verify} messages.
         * @function encodeDelimited
         * @memberof newxxs.CurScene
         * @static
         * @param {newxxs.ICurScene} message CurScene message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CurScene.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CurScene message from the specified reader or buffer.
         * @function decode
         * @memberof newxxs.CurScene
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {newxxs.CurScene} CurScene
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CurScene.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.newxxs.CurScene();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.surChips = reader.double();
                    break;
                case 2:
                    message.curChips = reader.double();
                    break;
                case 3:
                    message.winChips = reader.double();
                    break;
                case 4:
                    message.minBet = reader.double();
                    break;
                case 5:
                    message.maxBet = reader.double();
                    break;
                case 6:
                    message.curBetChips = reader.double();
                    break;
                case 7:
                    message.betType = reader.int32();
                    break;
                case 8:
                    message.buyFree = reader.int32();
                    break;
                case 9:
                    message.buyFreeChips = reader.double();
                    break;
                case 10:
                    message.batchno = reader.string();
                    break;
                case 11:
                    message.round = reader.int32();
                    break;
                case 12:
                    message.run = reader.int32();
                    break;
                case 13:
                    message.scene = reader.int32();
                    break;
                case 14:
                    message.freeCount = reader.int32();
                    break;
                case 15:
                    message.panel = reader.string();
                    break;
                case 16:
                    message.allMultiple = reader.double();
                    break;
                case 17:
                    message.curMultiple = reader.double();
                    break;
                case 18:
                    if (!(message.curMultiples && message.curMultiples.length))
                        message.curMultiples = [];
                    message.curMultiples.push($root.newxxs.CurMultipleIcon.decode(reader, reader.uint32()));
                    break;
                case 19:
                    if (!(message.curicons && message.curicons.length))
                        message.curicons = [];
                    message.curicons.push($root.newxxs.CurAwardIcon.decode(reader, reader.uint32()));
                    break;
                case 20:
                    if (!(message.roundicons && message.roundicons.length))
                        message.roundicons = [];
                    message.roundicons.push($root.newxxs.CurAwardIcon.decode(reader, reader.uint32()));
                    break;
                case 21:
                    message.free = $root.newxxs.CurAwardIcon.decode(reader, reader.uint32());
                    break;
                case 22:
                    if (!(message.scopes && message.scopes.length))
                        message.scopes = [];
                    message.scopes.push($root.newxxs.CurScope.decode(reader, reader.uint32()));
                    break;
                case 23:
                    if (!(message.multiples && message.multiples.length))
                        message.multiples = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.multiples.push(reader.double());
                    } else
                        message.multiples.push(reader.double());
                    break;
                case 24:
                    message.bigIcon = reader.int32();
                    break;
                case 25:
                    message.comboCount = reader.int32();
                    break;
                case 26:
                    message.freeAginCount = reader.int32();
                    break;
                case 27:
                    message.freeAginNum = reader.int32();
                    break;
                case 28:
                    message.freeAginChips = reader.double();
                    break;
                case 29:
                    message.scroll = reader.string();
                    break;
                case 30:
                    message.suite = reader.string();
                    break;
                case 31:
                    if (!(message.betChips && message.betChips.length))
                        message.betChips = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.betChips.push(reader.double());
                    } else
                        message.betChips.push(reader.double());
                    break;
                case 40:
                    message.isMultiple = reader.int32();
                    break;
                case 41:
                    message.allCount = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CurScene message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof newxxs.CurScene
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {newxxs.CurScene} CurScene
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CurScene.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CurScene message.
         * @function verify
         * @memberof newxxs.CurScene
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CurScene.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.surChips != null && message.hasOwnProperty("surChips"))
                if (typeof message.surChips !== "number")
                    return "surChips: number expected";
            if (message.curChips != null && message.hasOwnProperty("curChips"))
                if (typeof message.curChips !== "number")
                    return "curChips: number expected";
            if (message.winChips != null && message.hasOwnProperty("winChips"))
                if (typeof message.winChips !== "number")
                    return "winChips: number expected";
            if (message.minBet != null && message.hasOwnProperty("minBet"))
                if (typeof message.minBet !== "number")
                    return "minBet: number expected";
            if (message.maxBet != null && message.hasOwnProperty("maxBet"))
                if (typeof message.maxBet !== "number")
                    return "maxBet: number expected";
            if (message.curBetChips != null && message.hasOwnProperty("curBetChips"))
                if (typeof message.curBetChips !== "number")
                    return "curBetChips: number expected";
            if (message.betType != null && message.hasOwnProperty("betType"))
                if (!$util.isInteger(message.betType))
                    return "betType: integer expected";
            if (message.buyFree != null && message.hasOwnProperty("buyFree"))
                if (!$util.isInteger(message.buyFree))
                    return "buyFree: integer expected";
            if (message.buyFreeChips != null && message.hasOwnProperty("buyFreeChips"))
                if (typeof message.buyFreeChips !== "number")
                    return "buyFreeChips: number expected";
            if (message.batchno != null && message.hasOwnProperty("batchno"))
                if (!$util.isString(message.batchno))
                    return "batchno: string expected";
            if (message.round != null && message.hasOwnProperty("round"))
                if (!$util.isInteger(message.round))
                    return "round: integer expected";
            if (message.run != null && message.hasOwnProperty("run"))
                if (!$util.isInteger(message.run))
                    return "run: integer expected";
            if (message.scene != null && message.hasOwnProperty("scene"))
                if (!$util.isInteger(message.scene))
                    return "scene: integer expected";
            if (message.freeCount != null && message.hasOwnProperty("freeCount"))
                if (!$util.isInteger(message.freeCount))
                    return "freeCount: integer expected";
            if (message.panel != null && message.hasOwnProperty("panel"))
                if (!$util.isString(message.panel))
                    return "panel: string expected";
            if (message.allMultiple != null && message.hasOwnProperty("allMultiple"))
                if (typeof message.allMultiple !== "number")
                    return "allMultiple: number expected";
            if (message.curMultiple != null && message.hasOwnProperty("curMultiple"))
                if (typeof message.curMultiple !== "number")
                    return "curMultiple: number expected";
            if (message.curMultiples != null && message.hasOwnProperty("curMultiples")) {
                if (!Array.isArray(message.curMultiples))
                    return "curMultiples: array expected";
                for (var i = 0; i < message.curMultiples.length; ++i) {
                    var error = $root.newxxs.CurMultipleIcon.verify(message.curMultiples[i]);
                    if (error)
                        return "curMultiples." + error;
                }
            }
            if (message.curicons != null && message.hasOwnProperty("curicons")) {
                if (!Array.isArray(message.curicons))
                    return "curicons: array expected";
                for (var i = 0; i < message.curicons.length; ++i) {
                    var error = $root.newxxs.CurAwardIcon.verify(message.curicons[i]);
                    if (error)
                        return "curicons." + error;
                }
            }
            if (message.roundicons != null && message.hasOwnProperty("roundicons")) {
                if (!Array.isArray(message.roundicons))
                    return "roundicons: array expected";
                for (var i = 0; i < message.roundicons.length; ++i) {
                    var error = $root.newxxs.CurAwardIcon.verify(message.roundicons[i]);
                    if (error)
                        return "roundicons." + error;
                }
            }
            if (message.free != null && message.hasOwnProperty("free")) {
                var error = $root.newxxs.CurAwardIcon.verify(message.free);
                if (error)
                    return "free." + error;
            }
            if (message.scopes != null && message.hasOwnProperty("scopes")) {
                if (!Array.isArray(message.scopes))
                    return "scopes: array expected";
                for (var i = 0; i < message.scopes.length; ++i) {
                    var error = $root.newxxs.CurScope.verify(message.scopes[i]);
                    if (error)
                        return "scopes." + error;
                }
            }
            if (message.multiples != null && message.hasOwnProperty("multiples")) {
                if (!Array.isArray(message.multiples))
                    return "multiples: array expected";
                for (var i = 0; i < message.multiples.length; ++i)
                    if (typeof message.multiples[i] !== "number")
                        return "multiples: number[] expected";
            }
            if (message.bigIcon != null && message.hasOwnProperty("bigIcon"))
                if (!$util.isInteger(message.bigIcon))
                    return "bigIcon: integer expected";
            if (message.comboCount != null && message.hasOwnProperty("comboCount"))
                if (!$util.isInteger(message.comboCount))
                    return "comboCount: integer expected";
            if (message.freeAginCount != null && message.hasOwnProperty("freeAginCount"))
                if (!$util.isInteger(message.freeAginCount))
                    return "freeAginCount: integer expected";
            if (message.freeAginNum != null && message.hasOwnProperty("freeAginNum"))
                if (!$util.isInteger(message.freeAginNum))
                    return "freeAginNum: integer expected";
            if (message.freeAginChips != null && message.hasOwnProperty("freeAginChips"))
                if (typeof message.freeAginChips !== "number")
                    return "freeAginChips: number expected";
            if (message.scroll != null && message.hasOwnProperty("scroll"))
                if (!$util.isString(message.scroll))
                    return "scroll: string expected";
            if (message.suite != null && message.hasOwnProperty("suite"))
                if (!$util.isString(message.suite))
                    return "suite: string expected";
            if (message.betChips != null && message.hasOwnProperty("betChips")) {
                if (!Array.isArray(message.betChips))
                    return "betChips: array expected";
                for (var i = 0; i < message.betChips.length; ++i)
                    if (typeof message.betChips[i] !== "number")
                        return "betChips: number[] expected";
            }
            if (message.isMultiple != null && message.hasOwnProperty("isMultiple"))
                if (!$util.isInteger(message.isMultiple))
                    return "isMultiple: integer expected";
            if (message.allCount != null && message.hasOwnProperty("allCount"))
                if (!$util.isInteger(message.allCount))
                    return "allCount: integer expected";
            return null;
        };

        /**
         * Creates a CurScene message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof newxxs.CurScene
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {newxxs.CurScene} CurScene
         */
        CurScene.fromObject = function fromObject(object) {
            if (object instanceof $root.newxxs.CurScene)
                return object;
            var message = new $root.newxxs.CurScene();
            if (object.surChips != null)
                message.surChips = Number(object.surChips);
            if (object.curChips != null)
                message.curChips = Number(object.curChips);
            if (object.winChips != null)
                message.winChips = Number(object.winChips);
            if (object.minBet != null)
                message.minBet = Number(object.minBet);
            if (object.maxBet != null)
                message.maxBet = Number(object.maxBet);
            if (object.curBetChips != null)
                message.curBetChips = Number(object.curBetChips);
            if (object.betType != null)
                message.betType = object.betType | 0;
            if (object.buyFree != null)
                message.buyFree = object.buyFree | 0;
            if (object.buyFreeChips != null)
                message.buyFreeChips = Number(object.buyFreeChips);
            if (object.batchno != null)
                message.batchno = String(object.batchno);
            if (object.round != null)
                message.round = object.round | 0;
            if (object.run != null)
                message.run = object.run | 0;
            if (object.scene != null)
                message.scene = object.scene | 0;
            if (object.freeCount != null)
                message.freeCount = object.freeCount | 0;
            if (object.panel != null)
                message.panel = String(object.panel);
            if (object.allMultiple != null)
                message.allMultiple = Number(object.allMultiple);
            if (object.curMultiple != null)
                message.curMultiple = Number(object.curMultiple);
            if (object.curMultiples) {
                if (!Array.isArray(object.curMultiples))
                    throw TypeError(".newxxs.CurScene.curMultiples: array expected");
                message.curMultiples = [];
                for (var i = 0; i < object.curMultiples.length; ++i) {
                    if (typeof object.curMultiples[i] !== "object")
                        throw TypeError(".newxxs.CurScene.curMultiples: object expected");
                    message.curMultiples[i] = $root.newxxs.CurMultipleIcon.fromObject(object.curMultiples[i]);
                }
            }
            if (object.curicons) {
                if (!Array.isArray(object.curicons))
                    throw TypeError(".newxxs.CurScene.curicons: array expected");
                message.curicons = [];
                for (var i = 0; i < object.curicons.length; ++i) {
                    if (typeof object.curicons[i] !== "object")
                        throw TypeError(".newxxs.CurScene.curicons: object expected");
                    message.curicons[i] = $root.newxxs.CurAwardIcon.fromObject(object.curicons[i]);
                }
            }
            if (object.roundicons) {
                if (!Array.isArray(object.roundicons))
                    throw TypeError(".newxxs.CurScene.roundicons: array expected");
                message.roundicons = [];
                for (var i = 0; i < object.roundicons.length; ++i) {
                    if (typeof object.roundicons[i] !== "object")
                        throw TypeError(".newxxs.CurScene.roundicons: object expected");
                    message.roundicons[i] = $root.newxxs.CurAwardIcon.fromObject(object.roundicons[i]);
                }
            }
            if (object.free != null) {
                if (typeof object.free !== "object")
                    throw TypeError(".newxxs.CurScene.free: object expected");
                message.free = $root.newxxs.CurAwardIcon.fromObject(object.free);
            }
            if (object.scopes) {
                if (!Array.isArray(object.scopes))
                    throw TypeError(".newxxs.CurScene.scopes: array expected");
                message.scopes = [];
                for (var i = 0; i < object.scopes.length; ++i) {
                    if (typeof object.scopes[i] !== "object")
                        throw TypeError(".newxxs.CurScene.scopes: object expected");
                    message.scopes[i] = $root.newxxs.CurScope.fromObject(object.scopes[i]);
                }
            }
            if (object.multiples) {
                if (!Array.isArray(object.multiples))
                    throw TypeError(".newxxs.CurScene.multiples: array expected");
                message.multiples = [];
                for (var i = 0; i < object.multiples.length; ++i)
                    message.multiples[i] = Number(object.multiples[i]);
            }
            if (object.bigIcon != null)
                message.bigIcon = object.bigIcon | 0;
            if (object.comboCount != null)
                message.comboCount = object.comboCount | 0;
            if (object.freeAginCount != null)
                message.freeAginCount = object.freeAginCount | 0;
            if (object.freeAginNum != null)
                message.freeAginNum = object.freeAginNum | 0;
            if (object.freeAginChips != null)
                message.freeAginChips = Number(object.freeAginChips);
            if (object.scroll != null)
                message.scroll = String(object.scroll);
            if (object.suite != null)
                message.suite = String(object.suite);
            if (object.betChips) {
                if (!Array.isArray(object.betChips))
                    throw TypeError(".newxxs.CurScene.betChips: array expected");
                message.betChips = [];
                for (var i = 0; i < object.betChips.length; ++i)
                    message.betChips[i] = Number(object.betChips[i]);
            }
            if (object.isMultiple != null)
                message.isMultiple = object.isMultiple | 0;
            if (object.allCount != null)
                message.allCount = object.allCount | 0;
            return message;
        };

        /**
         * Creates a plain object from a CurScene message. Also converts values to other types if specified.
         * @function toObject
         * @memberof newxxs.CurScene
         * @static
         * @param {newxxs.CurScene} message CurScene
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CurScene.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults) {
                object.curMultiples = [];
                object.curicons = [];
                object.roundicons = [];
                object.scopes = [];
                object.multiples = [];
                object.betChips = [];
            }
            if (options.defaults) {
                object.surChips = 0;
                object.curChips = 0;
                object.winChips = 0;
                object.minBet = 0;
                object.maxBet = 0;
                object.curBetChips = 0;
                object.betType = 0;
                object.buyFree = 0;
                object.buyFreeChips = 0;
                object.batchno = "";
                object.round = 0;
                object.run = 0;
                object.scene = 0;
                object.freeCount = 0;
                object.panel = "";
                object.allMultiple = 0;
                object.curMultiple = 0;
                object.free = null;
                object.bigIcon = 0;
                object.comboCount = 0;
                object.freeAginCount = 0;
                object.freeAginNum = 0;
                object.freeAginChips = 0;
                object.scroll = "";
                object.suite = "";
                object.isMultiple = 0;
                object.allCount = 0;
            }
            if (message.surChips != null && message.hasOwnProperty("surChips"))
                object.surChips = options.json && !isFinite(message.surChips) ? String(message.surChips) : message.surChips;
            if (message.curChips != null && message.hasOwnProperty("curChips"))
                object.curChips = options.json && !isFinite(message.curChips) ? String(message.curChips) : message.curChips;
            if (message.winChips != null && message.hasOwnProperty("winChips"))
                object.winChips = options.json && !isFinite(message.winChips) ? String(message.winChips) : message.winChips;
            if (message.minBet != null && message.hasOwnProperty("minBet"))
                object.minBet = options.json && !isFinite(message.minBet) ? String(message.minBet) : message.minBet;
            if (message.maxBet != null && message.hasOwnProperty("maxBet"))
                object.maxBet = options.json && !isFinite(message.maxBet) ? String(message.maxBet) : message.maxBet;
            if (message.curBetChips != null && message.hasOwnProperty("curBetChips"))
                object.curBetChips = options.json && !isFinite(message.curBetChips) ? String(message.curBetChips) : message.curBetChips;
            if (message.betType != null && message.hasOwnProperty("betType"))
                object.betType = message.betType;
            if (message.buyFree != null && message.hasOwnProperty("buyFree"))
                object.buyFree = message.buyFree;
            if (message.buyFreeChips != null && message.hasOwnProperty("buyFreeChips"))
                object.buyFreeChips = options.json && !isFinite(message.buyFreeChips) ? String(message.buyFreeChips) : message.buyFreeChips;
            if (message.batchno != null && message.hasOwnProperty("batchno"))
                object.batchno = message.batchno;
            if (message.round != null && message.hasOwnProperty("round"))
                object.round = message.round;
            if (message.run != null && message.hasOwnProperty("run"))
                object.run = message.run;
            if (message.scene != null && message.hasOwnProperty("scene"))
                object.scene = message.scene;
            if (message.freeCount != null && message.hasOwnProperty("freeCount"))
                object.freeCount = message.freeCount;
            if (message.panel != null && message.hasOwnProperty("panel"))
                object.panel = message.panel;
            if (message.allMultiple != null && message.hasOwnProperty("allMultiple"))
                object.allMultiple = options.json && !isFinite(message.allMultiple) ? String(message.allMultiple) : message.allMultiple;
            if (message.curMultiple != null && message.hasOwnProperty("curMultiple"))
                object.curMultiple = options.json && !isFinite(message.curMultiple) ? String(message.curMultiple) : message.curMultiple;
            if (message.curMultiples && message.curMultiples.length) {
                object.curMultiples = [];
                for (var j = 0; j < message.curMultiples.length; ++j)
                    object.curMultiples[j] = $root.newxxs.CurMultipleIcon.toObject(message.curMultiples[j], options);
            }
            if (message.curicons && message.curicons.length) {
                object.curicons = [];
                for (var j = 0; j < message.curicons.length; ++j)
                    object.curicons[j] = $root.newxxs.CurAwardIcon.toObject(message.curicons[j], options);
            }
            if (message.roundicons && message.roundicons.length) {
                object.roundicons = [];
                for (var j = 0; j < message.roundicons.length; ++j)
                    object.roundicons[j] = $root.newxxs.CurAwardIcon.toObject(message.roundicons[j], options);
            }
            if (message.free != null && message.hasOwnProperty("free"))
                object.free = $root.newxxs.CurAwardIcon.toObject(message.free, options);
            if (message.scopes && message.scopes.length) {
                object.scopes = [];
                for (var j = 0; j < message.scopes.length; ++j)
                    object.scopes[j] = $root.newxxs.CurScope.toObject(message.scopes[j], options);
            }
            if (message.multiples && message.multiples.length) {
                object.multiples = [];
                for (var j = 0; j < message.multiples.length; ++j)
                    object.multiples[j] = options.json && !isFinite(message.multiples[j]) ? String(message.multiples[j]) : message.multiples[j];
            }
            if (message.bigIcon != null && message.hasOwnProperty("bigIcon"))
                object.bigIcon = message.bigIcon;
            if (message.comboCount != null && message.hasOwnProperty("comboCount"))
                object.comboCount = message.comboCount;
            if (message.freeAginCount != null && message.hasOwnProperty("freeAginCount"))
                object.freeAginCount = message.freeAginCount;
            if (message.freeAginNum != null && message.hasOwnProperty("freeAginNum"))
                object.freeAginNum = message.freeAginNum;
            if (message.freeAginChips != null && message.hasOwnProperty("freeAginChips"))
                object.freeAginChips = options.json && !isFinite(message.freeAginChips) ? String(message.freeAginChips) : message.freeAginChips;
            if (message.scroll != null && message.hasOwnProperty("scroll"))
                object.scroll = message.scroll;
            if (message.suite != null && message.hasOwnProperty("suite"))
                object.suite = message.suite;
            if (message.betChips && message.betChips.length) {
                object.betChips = [];
                for (var j = 0; j < message.betChips.length; ++j)
                    object.betChips[j] = options.json && !isFinite(message.betChips[j]) ? String(message.betChips[j]) : message.betChips[j];
            }
            if (message.isMultiple != null && message.hasOwnProperty("isMultiple"))
                object.isMultiple = message.isMultiple;
            if (message.allCount != null && message.hasOwnProperty("allCount"))
                object.allCount = message.allCount;
            return object;
        };

        /**
         * Converts this CurScene to JSON.
         * @function toJSON
         * @memberof newxxs.CurScene
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CurScene.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CurScene;
    })();

    newxxs.CurAwardIcon = (function() {

        /**
         * Properties of a CurAwardIcon.
         * @memberof newxxs
         * @interface ICurAwardIcon
         * @property {number|null} [betArea] CurAwardIcon betArea
         * @property {string|null} [index] CurAwardIcon index
         * @property {number|null} [count] CurAwardIcon count
         * @property {number|null} [chips] CurAwardIcon chips
         * @property {number|null} [odd] CurAwardIcon odd
         */

        /**
         * Constructs a new CurAwardIcon.
         * @memberof newxxs
         * @classdesc Represents a CurAwardIcon.
         * @implements ICurAwardIcon
         * @constructor
         * @param {newxxs.ICurAwardIcon=} [properties] Properties to set
         */
        function CurAwardIcon(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CurAwardIcon betArea.
         * @member {number} betArea
         * @memberof newxxs.CurAwardIcon
         * @instance
         */
        CurAwardIcon.prototype.betArea = 0;

        /**
         * CurAwardIcon index.
         * @member {string} index
         * @memberof newxxs.CurAwardIcon
         * @instance
         */
        CurAwardIcon.prototype.index = "";

        /**
         * CurAwardIcon count.
         * @member {number} count
         * @memberof newxxs.CurAwardIcon
         * @instance
         */
        CurAwardIcon.prototype.count = 0;

        /**
         * CurAwardIcon chips.
         * @member {number} chips
         * @memberof newxxs.CurAwardIcon
         * @instance
         */
        CurAwardIcon.prototype.chips = 0;

        /**
         * CurAwardIcon odd.
         * @member {number} odd
         * @memberof newxxs.CurAwardIcon
         * @instance
         */
        CurAwardIcon.prototype.odd = 0;

        /**
         * Creates a new CurAwardIcon instance using the specified properties.
         * @function create
         * @memberof newxxs.CurAwardIcon
         * @static
         * @param {newxxs.ICurAwardIcon=} [properties] Properties to set
         * @returns {newxxs.CurAwardIcon} CurAwardIcon instance
         */
        CurAwardIcon.create = function create(properties) {
            return new CurAwardIcon(properties);
        };

        /**
         * Encodes the specified CurAwardIcon message. Does not implicitly {@link newxxs.CurAwardIcon.verify|verify} messages.
         * @function encode
         * @memberof newxxs.CurAwardIcon
         * @static
         * @param {newxxs.ICurAwardIcon} message CurAwardIcon message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CurAwardIcon.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.betArea != null && Object.hasOwnProperty.call(message, "betArea"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.betArea);
            if (message.index != null && Object.hasOwnProperty.call(message, "index"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.index);
            if (message.count != null && Object.hasOwnProperty.call(message, "count"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.count);
            if (message.chips != null && Object.hasOwnProperty.call(message, "chips"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.chips);
            if (message.odd != null && Object.hasOwnProperty.call(message, "odd"))
                writer.uint32(/* id 5, wireType 1 =*/41).double(message.odd);
            return writer;
        };

        /**
         * Encodes the specified CurAwardIcon message, length delimited. Does not implicitly {@link newxxs.CurAwardIcon.verify|verify} messages.
         * @function encodeDelimited
         * @memberof newxxs.CurAwardIcon
         * @static
         * @param {newxxs.ICurAwardIcon} message CurAwardIcon message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CurAwardIcon.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CurAwardIcon message from the specified reader or buffer.
         * @function decode
         * @memberof newxxs.CurAwardIcon
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {newxxs.CurAwardIcon} CurAwardIcon
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CurAwardIcon.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.newxxs.CurAwardIcon();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.betArea = reader.int32();
                    break;
                case 2:
                    message.index = reader.string();
                    break;
                case 3:
                    message.count = reader.int32();
                    break;
                case 4:
                    message.chips = reader.double();
                    break;
                case 5:
                    message.odd = reader.double();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CurAwardIcon message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof newxxs.CurAwardIcon
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {newxxs.CurAwardIcon} CurAwardIcon
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CurAwardIcon.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CurAwardIcon message.
         * @function verify
         * @memberof newxxs.CurAwardIcon
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CurAwardIcon.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.betArea != null && message.hasOwnProperty("betArea"))
                if (!$util.isInteger(message.betArea))
                    return "betArea: integer expected";
            if (message.index != null && message.hasOwnProperty("index"))
                if (!$util.isString(message.index))
                    return "index: string expected";
            if (message.count != null && message.hasOwnProperty("count"))
                if (!$util.isInteger(message.count))
                    return "count: integer expected";
            if (message.chips != null && message.hasOwnProperty("chips"))
                if (typeof message.chips !== "number")
                    return "chips: number expected";
            if (message.odd != null && message.hasOwnProperty("odd"))
                if (typeof message.odd !== "number")
                    return "odd: number expected";
            return null;
        };

        /**
         * Creates a CurAwardIcon message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof newxxs.CurAwardIcon
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {newxxs.CurAwardIcon} CurAwardIcon
         */
        CurAwardIcon.fromObject = function fromObject(object) {
            if (object instanceof $root.newxxs.CurAwardIcon)
                return object;
            var message = new $root.newxxs.CurAwardIcon();
            if (object.betArea != null)
                message.betArea = object.betArea | 0;
            if (object.index != null)
                message.index = String(object.index);
            if (object.count != null)
                message.count = object.count | 0;
            if (object.chips != null)
                message.chips = Number(object.chips);
            if (object.odd != null)
                message.odd = Number(object.odd);
            return message;
        };

        /**
         * Creates a plain object from a CurAwardIcon message. Also converts values to other types if specified.
         * @function toObject
         * @memberof newxxs.CurAwardIcon
         * @static
         * @param {newxxs.CurAwardIcon} message CurAwardIcon
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CurAwardIcon.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.betArea = 0;
                object.index = "";
                object.count = 0;
                object.chips = 0;
                object.odd = 0;
            }
            if (message.betArea != null && message.hasOwnProperty("betArea"))
                object.betArea = message.betArea;
            if (message.index != null && message.hasOwnProperty("index"))
                object.index = message.index;
            if (message.count != null && message.hasOwnProperty("count"))
                object.count = message.count;
            if (message.chips != null && message.hasOwnProperty("chips"))
                object.chips = options.json && !isFinite(message.chips) ? String(message.chips) : message.chips;
            if (message.odd != null && message.hasOwnProperty("odd"))
                object.odd = options.json && !isFinite(message.odd) ? String(message.odd) : message.odd;
            return object;
        };

        /**
         * Converts this CurAwardIcon to JSON.
         * @function toJSON
         * @memberof newxxs.CurAwardIcon
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CurAwardIcon.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CurAwardIcon;
    })();

    newxxs.CurMultipleIcon = (function() {

        /**
         * Properties of a CurMultipleIcon.
         * @memberof newxxs
         * @interface ICurMultipleIcon
         * @property {number|null} [multiple] CurMultipleIcon multiple
         * @property {string|null} [index] CurMultipleIcon index
         * @property {number|null} [count] CurMultipleIcon count
         * @property {number|null} [newIcon] CurMultipleIcon newIcon
         */

        /**
         * Constructs a new CurMultipleIcon.
         * @memberof newxxs
         * @classdesc Represents a CurMultipleIcon.
         * @implements ICurMultipleIcon
         * @constructor
         * @param {newxxs.ICurMultipleIcon=} [properties] Properties to set
         */
        function CurMultipleIcon(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CurMultipleIcon multiple.
         * @member {number} multiple
         * @memberof newxxs.CurMultipleIcon
         * @instance
         */
        CurMultipleIcon.prototype.multiple = 0;

        /**
         * CurMultipleIcon index.
         * @member {string} index
         * @memberof newxxs.CurMultipleIcon
         * @instance
         */
        CurMultipleIcon.prototype.index = "";

        /**
         * CurMultipleIcon count.
         * @member {number} count
         * @memberof newxxs.CurMultipleIcon
         * @instance
         */
        CurMultipleIcon.prototype.count = 0;

        /**
         * CurMultipleIcon newIcon.
         * @member {number} newIcon
         * @memberof newxxs.CurMultipleIcon
         * @instance
         */
        CurMultipleIcon.prototype.newIcon = 0;

        /**
         * Creates a new CurMultipleIcon instance using the specified properties.
         * @function create
         * @memberof newxxs.CurMultipleIcon
         * @static
         * @param {newxxs.ICurMultipleIcon=} [properties] Properties to set
         * @returns {newxxs.CurMultipleIcon} CurMultipleIcon instance
         */
        CurMultipleIcon.create = function create(properties) {
            return new CurMultipleIcon(properties);
        };

        /**
         * Encodes the specified CurMultipleIcon message. Does not implicitly {@link newxxs.CurMultipleIcon.verify|verify} messages.
         * @function encode
         * @memberof newxxs.CurMultipleIcon
         * @static
         * @param {newxxs.ICurMultipleIcon} message CurMultipleIcon message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CurMultipleIcon.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.multiple != null && Object.hasOwnProperty.call(message, "multiple"))
                writer.uint32(/* id 1, wireType 1 =*/9).double(message.multiple);
            if (message.index != null && Object.hasOwnProperty.call(message, "index"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.index);
            if (message.count != null && Object.hasOwnProperty.call(message, "count"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.count);
            if (message.newIcon != null && Object.hasOwnProperty.call(message, "newIcon"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.newIcon);
            return writer;
        };

        /**
         * Encodes the specified CurMultipleIcon message, length delimited. Does not implicitly {@link newxxs.CurMultipleIcon.verify|verify} messages.
         * @function encodeDelimited
         * @memberof newxxs.CurMultipleIcon
         * @static
         * @param {newxxs.ICurMultipleIcon} message CurMultipleIcon message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CurMultipleIcon.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CurMultipleIcon message from the specified reader or buffer.
         * @function decode
         * @memberof newxxs.CurMultipleIcon
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {newxxs.CurMultipleIcon} CurMultipleIcon
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CurMultipleIcon.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.newxxs.CurMultipleIcon();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.multiple = reader.double();
                    break;
                case 2:
                    message.index = reader.string();
                    break;
                case 3:
                    message.count = reader.int32();
                    break;
                case 4:
                    message.newIcon = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CurMultipleIcon message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof newxxs.CurMultipleIcon
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {newxxs.CurMultipleIcon} CurMultipleIcon
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CurMultipleIcon.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CurMultipleIcon message.
         * @function verify
         * @memberof newxxs.CurMultipleIcon
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CurMultipleIcon.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.multiple != null && message.hasOwnProperty("multiple"))
                if (typeof message.multiple !== "number")
                    return "multiple: number expected";
            if (message.index != null && message.hasOwnProperty("index"))
                if (!$util.isString(message.index))
                    return "index: string expected";
            if (message.count != null && message.hasOwnProperty("count"))
                if (!$util.isInteger(message.count))
                    return "count: integer expected";
            if (message.newIcon != null && message.hasOwnProperty("newIcon"))
                if (!$util.isInteger(message.newIcon))
                    return "newIcon: integer expected";
            return null;
        };

        /**
         * Creates a CurMultipleIcon message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof newxxs.CurMultipleIcon
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {newxxs.CurMultipleIcon} CurMultipleIcon
         */
        CurMultipleIcon.fromObject = function fromObject(object) {
            if (object instanceof $root.newxxs.CurMultipleIcon)
                return object;
            var message = new $root.newxxs.CurMultipleIcon();
            if (object.multiple != null)
                message.multiple = Number(object.multiple);
            if (object.index != null)
                message.index = String(object.index);
            if (object.count != null)
                message.count = object.count | 0;
            if (object.newIcon != null)
                message.newIcon = object.newIcon | 0;
            return message;
        };

        /**
         * Creates a plain object from a CurMultipleIcon message. Also converts values to other types if specified.
         * @function toObject
         * @memberof newxxs.CurMultipleIcon
         * @static
         * @param {newxxs.CurMultipleIcon} message CurMultipleIcon
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CurMultipleIcon.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.multiple = 0;
                object.index = "";
                object.count = 0;
                object.newIcon = 0;
            }
            if (message.multiple != null && message.hasOwnProperty("multiple"))
                object.multiple = options.json && !isFinite(message.multiple) ? String(message.multiple) : message.multiple;
            if (message.index != null && message.hasOwnProperty("index"))
                object.index = message.index;
            if (message.count != null && message.hasOwnProperty("count"))
                object.count = message.count;
            if (message.newIcon != null && message.hasOwnProperty("newIcon"))
                object.newIcon = message.newIcon;
            return object;
        };

        /**
         * Converts this CurMultipleIcon to JSON.
         * @function toJSON
         * @memberof newxxs.CurMultipleIcon
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CurMultipleIcon.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CurMultipleIcon;
    })();

    newxxs.CurScope = (function() {

        /**
         * Properties of a CurScope.
         * @memberof newxxs
         * @interface ICurScope
         * @property {number|null} [betArea] CurScope betArea
         * @property {number|null} [chips] CurScope chips
         * @property {number|null} [minCount] CurScope minCount
         * @property {number|null} [maxCount] CurScope maxCount
         */

        /**
         * Constructs a new CurScope.
         * @memberof newxxs
         * @classdesc Represents a CurScope.
         * @implements ICurScope
         * @constructor
         * @param {newxxs.ICurScope=} [properties] Properties to set
         */
        function CurScope(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CurScope betArea.
         * @member {number} betArea
         * @memberof newxxs.CurScope
         * @instance
         */
        CurScope.prototype.betArea = 0;

        /**
         * CurScope chips.
         * @member {number} chips
         * @memberof newxxs.CurScope
         * @instance
         */
        CurScope.prototype.chips = 0;

        /**
         * CurScope minCount.
         * @member {number} minCount
         * @memberof newxxs.CurScope
         * @instance
         */
        CurScope.prototype.minCount = 0;

        /**
         * CurScope maxCount.
         * @member {number} maxCount
         * @memberof newxxs.CurScope
         * @instance
         */
        CurScope.prototype.maxCount = 0;

        /**
         * Creates a new CurScope instance using the specified properties.
         * @function create
         * @memberof newxxs.CurScope
         * @static
         * @param {newxxs.ICurScope=} [properties] Properties to set
         * @returns {newxxs.CurScope} CurScope instance
         */
        CurScope.create = function create(properties) {
            return new CurScope(properties);
        };

        /**
         * Encodes the specified CurScope message. Does not implicitly {@link newxxs.CurScope.verify|verify} messages.
         * @function encode
         * @memberof newxxs.CurScope
         * @static
         * @param {newxxs.ICurScope} message CurScope message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CurScope.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.betArea != null && Object.hasOwnProperty.call(message, "betArea"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.betArea);
            if (message.chips != null && Object.hasOwnProperty.call(message, "chips"))
                writer.uint32(/* id 2, wireType 1 =*/17).double(message.chips);
            if (message.minCount != null && Object.hasOwnProperty.call(message, "minCount"))
                writer.uint32(/* id 3, wireType 1 =*/25).double(message.minCount);
            if (message.maxCount != null && Object.hasOwnProperty.call(message, "maxCount"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.maxCount);
            return writer;
        };

        /**
         * Encodes the specified CurScope message, length delimited. Does not implicitly {@link newxxs.CurScope.verify|verify} messages.
         * @function encodeDelimited
         * @memberof newxxs.CurScope
         * @static
         * @param {newxxs.ICurScope} message CurScope message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CurScope.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CurScope message from the specified reader or buffer.
         * @function decode
         * @memberof newxxs.CurScope
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {newxxs.CurScope} CurScope
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CurScope.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.newxxs.CurScope();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.betArea = reader.int32();
                    break;
                case 2:
                    message.chips = reader.double();
                    break;
                case 3:
                    message.minCount = reader.double();
                    break;
                case 4:
                    message.maxCount = reader.double();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a CurScope message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof newxxs.CurScope
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {newxxs.CurScope} CurScope
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CurScope.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CurScope message.
         * @function verify
         * @memberof newxxs.CurScope
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CurScope.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.betArea != null && message.hasOwnProperty("betArea"))
                if (!$util.isInteger(message.betArea))
                    return "betArea: integer expected";
            if (message.chips != null && message.hasOwnProperty("chips"))
                if (typeof message.chips !== "number")
                    return "chips: number expected";
            if (message.minCount != null && message.hasOwnProperty("minCount"))
                if (typeof message.minCount !== "number")
                    return "minCount: number expected";
            if (message.maxCount != null && message.hasOwnProperty("maxCount"))
                if (typeof message.maxCount !== "number")
                    return "maxCount: number expected";
            return null;
        };

        /**
         * Creates a CurScope message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof newxxs.CurScope
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {newxxs.CurScope} CurScope
         */
        CurScope.fromObject = function fromObject(object) {
            if (object instanceof $root.newxxs.CurScope)
                return object;
            var message = new $root.newxxs.CurScope();
            if (object.betArea != null)
                message.betArea = object.betArea | 0;
            if (object.chips != null)
                message.chips = Number(object.chips);
            if (object.minCount != null)
                message.minCount = Number(object.minCount);
            if (object.maxCount != null)
                message.maxCount = Number(object.maxCount);
            return message;
        };

        /**
         * Creates a plain object from a CurScope message. Also converts values to other types if specified.
         * @function toObject
         * @memberof newxxs.CurScope
         * @static
         * @param {newxxs.CurScope} message CurScope
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CurScope.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.betArea = 0;
                object.chips = 0;
                object.minCount = 0;
                object.maxCount = 0;
            }
            if (message.betArea != null && message.hasOwnProperty("betArea"))
                object.betArea = message.betArea;
            if (message.chips != null && message.hasOwnProperty("chips"))
                object.chips = options.json && !isFinite(message.chips) ? String(message.chips) : message.chips;
            if (message.minCount != null && message.hasOwnProperty("minCount"))
                object.minCount = options.json && !isFinite(message.minCount) ? String(message.minCount) : message.minCount;
            if (message.maxCount != null && message.hasOwnProperty("maxCount"))
                object.maxCount = options.json && !isFinite(message.maxCount) ? String(message.maxCount) : message.maxCount;
            return object;
        };

        /**
         * Converts this CurScope to JSON.
         * @function toJSON
         * @memberof newxxs.CurScope
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CurScope.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CurScope;
    })();

    return newxxs;
})();

// module.exports = $root;
const proto = $root;
module.exports = proto;