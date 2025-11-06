import * as $protobuf from "../../libs/protobuf.min";

export namespace newxxs {
    /** enIconType_Moro enum. */
    enum enIconType_Moro {
        NoneIcon = 0,
        ePokerA = 1,
        ePokerB = 2,
        ePokerC = 3,
        ePokerD = 4,
        ePokerE = 5,
        eObjectA = 6,
        eObjectB = 7,
        eObjectC = 8,
        eObjectD = 9,
        eMultipleA = 10,
        eScatter = 14,
    }

    /** enSceneType_Moro enum. */
    enum enSceneType_Moro {
        NoneScene = 0,
        Normal1 = 1,
        Free1 = 2,
    }

    /** enFreeType_Moro enum. */
    enum enFreeType_Moro {
        NoneFree = 0,
        Normal2 = 1,
        Free2 = 2,
        BuyFree1 = 3,
    }

    /** enRunType_Moro enum. */
    enum enRunType_Moro {
        NoneRun = 0,
        Normal3 = 1,
        Free3 = 2,
        BuyFree2 = 3,
    }

    /** enSignalType_Moro enum. */
    enum enSignalType_Moro {
        NoneSignal = 0,
        BeatTime_10000 = 10000,
        BeatTimeResult_10001 = 10001,
        LoginPlayer_11000 = 11000,
        LoginPlayerResult_11001 = 11001,
        OfflineResult_11002 = 11002,
        CurBet_12000 = 12000,
        CurBetResult_12001 = 12001,
        CurBuyFree_12002 = 12002,
        CurBuyFreeResult_12003 = 12003,
        CurFree_12004 = 12004,
        CurFreeResult_12005 = 12005,
        CurCombo7_12018 = 12018,
        CurCombo7Result_12019 = 12019,
        CurScene_13000 = 13000,
        CurSceneResult_13001 = 13001,
        AllSet_14000 = 14000,
        AllSetResult_14001 = 14001,
        SelectChips_14002 = 14002,
        SelectChipsResult_14003 = 14003,
        SetMultiple_15000 = 15000,
        SetMultipleResult_15001 = 15001,
        NoticeResult_66666 = 66666,
    }

    /** enErrType_Moro enum. */
    enum enErrType_Moro {
        NoneErr = 0,
        Successful_20000 = 20000,
        ChipsLack_10000 = 10000,
        ChipsOut_10001 = 10001,
        GameClosed_11000 = 11000,
        GameNotExist_11001 = 11001,
        BetError_12000 = 12000,
        BuyFreeError_12001 = 12001,
        SceneError_13000 = 13000,
        BatchnoError_13001 = 13001,
        TokenInvalid_14000 = 14000,
        BeawayOffline_15000 = 15000,
        PalyerNotExist_16000 = 16000,
        PalyerBlack_16001 = 16001,
    }

    /** enUpDownType_Moro enum. */
    enum enUpDownType_Moro {
        NoneUpDown = 0,
        Up = 1,
        Down = 2,
    }

    /** enBetType_Moro enum. */
    enum enBetType_Moro {
        NoneBet = 0,
        Min = 1,
        Max = 2,
    }

    /** </summary> */
    enum enBigType_Moro {
        None = 0,
        Normal = 1,
        Small = 2,
        Big = 3,
        Super = 4,
    }

    /** </summary> */
    enum enIsMultiple_Moro {
        NoneIsMul = 0,
        Open = 1,
        Close = 2,
    }

    /** Properties of a C2S_BeatTime_10000. */
    interface IC2S_BeatTime_10000 {
        /** C2S_BeatTime_10000 identify */
        identify?: string | null;
    }

    /** Represents a C2S_BeatTime_10000. */
    class C2S_BeatTime_10000 implements IC2S_BeatTime_10000 {
        /**
         * Constructs a new C2S_BeatTime_10000.
         * @param [properties] Properties to set
         */
        constructor(properties?: newxxs.IC2S_BeatTime_10000);

        /** C2S_BeatTime_10000 identify. */
        public identify: string;

        /**
         * Creates a new C2S_BeatTime_10000 instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2S_BeatTime_10000 instance
         */
        public static create(properties?: newxxs.IC2S_BeatTime_10000): newxxs.C2S_BeatTime_10000;

        /**
         * Encodes the specified C2S_BeatTime_10000 message. Does not implicitly {@link newxxs.C2S_BeatTime_10000.verify|verify} messages.
         * @param message C2S_BeatTime_10000 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: newxxs.IC2S_BeatTime_10000, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified C2S_BeatTime_10000 message, length delimited. Does not implicitly {@link newxxs.C2S_BeatTime_10000.verify|verify} messages.
         * @param message C2S_BeatTime_10000 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: newxxs.IC2S_BeatTime_10000, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2S_BeatTime_10000 message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2S_BeatTime_10000
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): newxxs.C2S_BeatTime_10000;

        /**
         * Decodes a C2S_BeatTime_10000 message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2S_BeatTime_10000
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): newxxs.C2S_BeatTime_10000;

        /**
         * Verifies a C2S_BeatTime_10000 message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a C2S_BeatTime_10000 message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2S_BeatTime_10000
         */
        public static fromObject(object: { [k: string]: any }): newxxs.C2S_BeatTime_10000;

        /**
         * Creates a plain object from a C2S_BeatTime_10000 message. Also converts values to other types if specified.
         * @param message C2S_BeatTime_10000
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: newxxs.C2S_BeatTime_10000, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2S_BeatTime_10000 to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2S_BeatTimeResult_10001. */
    interface IC2S_BeatTimeResult_10001 {
        /** C2S_BeatTimeResult_10001 error */
        error?: number | null;

        /** C2S_BeatTimeResult_10001 identify */
        identify?: string | null;
    }

    /** Represents a C2S_BeatTimeResult_10001. */
    class C2S_BeatTimeResult_10001 implements IC2S_BeatTimeResult_10001 {
        /**
         * Constructs a new C2S_BeatTimeResult_10001.
         * @param [properties] Properties to set
         */
        constructor(properties?: newxxs.IC2S_BeatTimeResult_10001);

        /** C2S_BeatTimeResult_10001 error. */
        public error: number;

        /** C2S_BeatTimeResult_10001 identify. */
        public identify: string;

        /**
         * Creates a new C2S_BeatTimeResult_10001 instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2S_BeatTimeResult_10001 instance
         */
        public static create(properties?: newxxs.IC2S_BeatTimeResult_10001): newxxs.C2S_BeatTimeResult_10001;

        /**
         * Encodes the specified C2S_BeatTimeResult_10001 message. Does not implicitly {@link newxxs.C2S_BeatTimeResult_10001.verify|verify} messages.
         * @param message C2S_BeatTimeResult_10001 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: newxxs.IC2S_BeatTimeResult_10001, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified C2S_BeatTimeResult_10001 message, length delimited. Does not implicitly {@link newxxs.C2S_BeatTimeResult_10001.verify|verify} messages.
         * @param message C2S_BeatTimeResult_10001 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: newxxs.IC2S_BeatTimeResult_10001, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2S_BeatTimeResult_10001 message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2S_BeatTimeResult_10001
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): newxxs.C2S_BeatTimeResult_10001;

        /**
         * Decodes a C2S_BeatTimeResult_10001 message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2S_BeatTimeResult_10001
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): newxxs.C2S_BeatTimeResult_10001;

        /**
         * Verifies a C2S_BeatTimeResult_10001 message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a C2S_BeatTimeResult_10001 message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2S_BeatTimeResult_10001
         */
        public static fromObject(object: { [k: string]: any }): newxxs.C2S_BeatTimeResult_10001;

        /**
         * Creates a plain object from a C2S_BeatTimeResult_10001 message. Also converts values to other types if specified.
         * @param message C2S_BeatTimeResult_10001
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: newxxs.C2S_BeatTimeResult_10001, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2S_BeatTimeResult_10001 to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2S_LoginPlayer_11000. */
    interface IC2S_LoginPlayer_11000 {
        /** C2S_LoginPlayer_11000 token */
        token?: string | null;
    }

    /** Represents a C2S_LoginPlayer_11000. */
    class C2S_LoginPlayer_11000 implements IC2S_LoginPlayer_11000 {
        /**
         * Constructs a new C2S_LoginPlayer_11000.
         * @param [properties] Properties to set
         */
        constructor(properties?: newxxs.IC2S_LoginPlayer_11000);

        /** C2S_LoginPlayer_11000 token. */
        public token: string;

        /**
         * Creates a new C2S_LoginPlayer_11000 instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2S_LoginPlayer_11000 instance
         */
        public static create(properties?: newxxs.IC2S_LoginPlayer_11000): newxxs.C2S_LoginPlayer_11000;

        /**
         * Encodes the specified C2S_LoginPlayer_11000 message. Does not implicitly {@link newxxs.C2S_LoginPlayer_11000.verify|verify} messages.
         * @param message C2S_LoginPlayer_11000 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: newxxs.IC2S_LoginPlayer_11000, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified C2S_LoginPlayer_11000 message, length delimited. Does not implicitly {@link newxxs.C2S_LoginPlayer_11000.verify|verify} messages.
         * @param message C2S_LoginPlayer_11000 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: newxxs.IC2S_LoginPlayer_11000, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2S_LoginPlayer_11000 message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2S_LoginPlayer_11000
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): newxxs.C2S_LoginPlayer_11000;

        /**
         * Decodes a C2S_LoginPlayer_11000 message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2S_LoginPlayer_11000
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): newxxs.C2S_LoginPlayer_11000;

        /**
         * Verifies a C2S_LoginPlayer_11000 message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a C2S_LoginPlayer_11000 message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2S_LoginPlayer_11000
         */
        public static fromObject(object: { [k: string]: any }): newxxs.C2S_LoginPlayer_11000;

        /**
         * Creates a plain object from a C2S_LoginPlayer_11000 message. Also converts values to other types if specified.
         * @param message C2S_LoginPlayer_11000
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: newxxs.C2S_LoginPlayer_11000, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2S_LoginPlayer_11000 to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a S2C_LoginPlayerResult_11001. */
    interface IS2C_LoginPlayerResult_11001 {
        /** S2C_LoginPlayerResult_11001 error */
        error?: number | null;

        /** S2C_LoginPlayerResult_11001 curPlayer */
        curPlayer?: newxxs.ICurPlayer | null;

        /** S2C_LoginPlayerResult_11001 curScene */
        curScene?: newxxs.ICurScene | null;
    }

    /** Represents a S2C_LoginPlayerResult_11001. */
    class S2C_LoginPlayerResult_11001 implements IS2C_LoginPlayerResult_11001 {
        /**
         * Constructs a new S2C_LoginPlayerResult_11001.
         * @param [properties] Properties to set
         */
        constructor(properties?: newxxs.IS2C_LoginPlayerResult_11001);

        /** S2C_LoginPlayerResult_11001 error. */
        public error: number;

        /** S2C_LoginPlayerResult_11001 curPlayer. */
        public curPlayer?: newxxs.ICurPlayer | null;

        /** S2C_LoginPlayerResult_11001 curScene. */
        public curScene?: newxxs.ICurScene | null;

        /**
         * Creates a new S2C_LoginPlayerResult_11001 instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2C_LoginPlayerResult_11001 instance
         */
        public static create(properties?: newxxs.IS2C_LoginPlayerResult_11001): newxxs.S2C_LoginPlayerResult_11001;

        /**
         * Encodes the specified S2C_LoginPlayerResult_11001 message. Does not implicitly {@link newxxs.S2C_LoginPlayerResult_11001.verify|verify} messages.
         * @param message S2C_LoginPlayerResult_11001 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: newxxs.IS2C_LoginPlayerResult_11001, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified S2C_LoginPlayerResult_11001 message, length delimited. Does not implicitly {@link newxxs.S2C_LoginPlayerResult_11001.verify|verify} messages.
         * @param message S2C_LoginPlayerResult_11001 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: newxxs.IS2C_LoginPlayerResult_11001, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2C_LoginPlayerResult_11001 message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns S2C_LoginPlayerResult_11001
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): newxxs.S2C_LoginPlayerResult_11001;

        /**
         * Decodes a S2C_LoginPlayerResult_11001 message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns S2C_LoginPlayerResult_11001
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): newxxs.S2C_LoginPlayerResult_11001;

        /**
         * Verifies a S2C_LoginPlayerResult_11001 message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a S2C_LoginPlayerResult_11001 message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns S2C_LoginPlayerResult_11001
         */
        public static fromObject(object: { [k: string]: any }): newxxs.S2C_LoginPlayerResult_11001;

        /**
         * Creates a plain object from a S2C_LoginPlayerResult_11001 message. Also converts values to other types if specified.
         * @param message S2C_LoginPlayerResult_11001
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: newxxs.S2C_LoginPlayerResult_11001, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this S2C_LoginPlayerResult_11001 to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a S2C_OfflineResult_11002. */
    interface IS2C_OfflineResult_11002 {
        /** S2C_OfflineResult_11002 error */
        error?: number | null;

        /** S2C_OfflineResult_11002 ip */
        ip?: string | null;

        /** S2C_OfflineResult_11002 plate */
        plate?: string | null;
    }

    /** Represents a S2C_OfflineResult_11002. */
    class S2C_OfflineResult_11002 implements IS2C_OfflineResult_11002 {
        /**
         * Constructs a new S2C_OfflineResult_11002.
         * @param [properties] Properties to set
         */
        constructor(properties?: newxxs.IS2C_OfflineResult_11002);

        /** S2C_OfflineResult_11002 error. */
        public error: number;

        /** S2C_OfflineResult_11002 ip. */
        public ip: string;

        /** S2C_OfflineResult_11002 plate. */
        public plate: string;

        /**
         * Creates a new S2C_OfflineResult_11002 instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2C_OfflineResult_11002 instance
         */
        public static create(properties?: newxxs.IS2C_OfflineResult_11002): newxxs.S2C_OfflineResult_11002;

        /**
         * Encodes the specified S2C_OfflineResult_11002 message. Does not implicitly {@link newxxs.S2C_OfflineResult_11002.verify|verify} messages.
         * @param message S2C_OfflineResult_11002 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: newxxs.IS2C_OfflineResult_11002, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified S2C_OfflineResult_11002 message, length delimited. Does not implicitly {@link newxxs.S2C_OfflineResult_11002.verify|verify} messages.
         * @param message S2C_OfflineResult_11002 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: newxxs.IS2C_OfflineResult_11002, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2C_OfflineResult_11002 message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns S2C_OfflineResult_11002
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): newxxs.S2C_OfflineResult_11002;

        /**
         * Decodes a S2C_OfflineResult_11002 message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns S2C_OfflineResult_11002
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): newxxs.S2C_OfflineResult_11002;

        /**
         * Verifies a S2C_OfflineResult_11002 message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a S2C_OfflineResult_11002 message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns S2C_OfflineResult_11002
         */
        public static fromObject(object: { [k: string]: any }): newxxs.S2C_OfflineResult_11002;

        /**
         * Creates a plain object from a S2C_OfflineResult_11002 message. Also converts values to other types if specified.
         * @param message S2C_OfflineResult_11002
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: newxxs.S2C_OfflineResult_11002, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this S2C_OfflineResult_11002 to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2S_CurBet_12000. */
    interface IC2S_CurBet_12000 {
        /** C2S_CurBet_12000 batchno */
        batchno?: string | null;

        /** C2S_CurBet_12000 round */
        round?: number | null;
    }

    /** Represents a C2S_CurBet_12000. */
    class C2S_CurBet_12000 implements IC2S_CurBet_12000 {
        /**
         * Constructs a new C2S_CurBet_12000.
         * @param [properties] Properties to set
         */
        constructor(properties?: newxxs.IC2S_CurBet_12000);

        /** C2S_CurBet_12000 batchno. */
        public batchno: string;

        /** C2S_CurBet_12000 round. */
        public round: number;

        /**
         * Creates a new C2S_CurBet_12000 instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2S_CurBet_12000 instance
         */
        public static create(properties?: newxxs.IC2S_CurBet_12000): newxxs.C2S_CurBet_12000;

        /**
         * Encodes the specified C2S_CurBet_12000 message. Does not implicitly {@link newxxs.C2S_CurBet_12000.verify|verify} messages.
         * @param message C2S_CurBet_12000 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: newxxs.IC2S_CurBet_12000, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified C2S_CurBet_12000 message, length delimited. Does not implicitly {@link newxxs.C2S_CurBet_12000.verify|verify} messages.
         * @param message C2S_CurBet_12000 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: newxxs.IC2S_CurBet_12000, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2S_CurBet_12000 message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2S_CurBet_12000
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): newxxs.C2S_CurBet_12000;

        /**
         * Decodes a C2S_CurBet_12000 message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2S_CurBet_12000
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): newxxs.C2S_CurBet_12000;

        /**
         * Verifies a C2S_CurBet_12000 message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a C2S_CurBet_12000 message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2S_CurBet_12000
         */
        public static fromObject(object: { [k: string]: any }): newxxs.C2S_CurBet_12000;

        /**
         * Creates a plain object from a C2S_CurBet_12000 message. Also converts values to other types if specified.
         * @param message C2S_CurBet_12000
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: newxxs.C2S_CurBet_12000, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2S_CurBet_12000 to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a S2C_CurBetResult_12001. */
    interface IS2C_CurBetResult_12001 {
        /** S2C_CurBetResult_12001 error */
        error?: number | null;

        /** S2C_CurBetResult_12001 curScene */
        curScene?: newxxs.ICurScene | null;
    }

    /** Represents a S2C_CurBetResult_12001. */
    class S2C_CurBetResult_12001 implements IS2C_CurBetResult_12001 {
        /**
         * Constructs a new S2C_CurBetResult_12001.
         * @param [properties] Properties to set
         */
        constructor(properties?: newxxs.IS2C_CurBetResult_12001);

        /** S2C_CurBetResult_12001 error. */
        public error: number;

        /** S2C_CurBetResult_12001 curScene. */
        public curScene?: newxxs.ICurScene | null;

        /**
         * Creates a new S2C_CurBetResult_12001 instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2C_CurBetResult_12001 instance
         */
        public static create(properties?: newxxs.IS2C_CurBetResult_12001): newxxs.S2C_CurBetResult_12001;

        /**
         * Encodes the specified S2C_CurBetResult_12001 message. Does not implicitly {@link newxxs.S2C_CurBetResult_12001.verify|verify} messages.
         * @param message S2C_CurBetResult_12001 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: newxxs.IS2C_CurBetResult_12001, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified S2C_CurBetResult_12001 message, length delimited. Does not implicitly {@link newxxs.S2C_CurBetResult_12001.verify|verify} messages.
         * @param message S2C_CurBetResult_12001 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: newxxs.IS2C_CurBetResult_12001, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2C_CurBetResult_12001 message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns S2C_CurBetResult_12001
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): newxxs.S2C_CurBetResult_12001;

        /**
         * Decodes a S2C_CurBetResult_12001 message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns S2C_CurBetResult_12001
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): newxxs.S2C_CurBetResult_12001;

        /**
         * Verifies a S2C_CurBetResult_12001 message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a S2C_CurBetResult_12001 message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns S2C_CurBetResult_12001
         */
        public static fromObject(object: { [k: string]: any }): newxxs.S2C_CurBetResult_12001;

        /**
         * Creates a plain object from a S2C_CurBetResult_12001 message. Also converts values to other types if specified.
         * @param message S2C_CurBetResult_12001
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: newxxs.S2C_CurBetResult_12001, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this S2C_CurBetResult_12001 to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2S_CurBuyFree_12002. */
    interface IC2S_CurBuyFree_12002 {
        /** C2S_CurBuyFree_12002 batchno */
        batchno?: string | null;

        /** C2S_CurBuyFree_12002 round */
        round?: number | null;
    }

    /** Represents a C2S_CurBuyFree_12002. */
    class C2S_CurBuyFree_12002 implements IC2S_CurBuyFree_12002 {
        /**
         * Constructs a new C2S_CurBuyFree_12002.
         * @param [properties] Properties to set
         */
        constructor(properties?: newxxs.IC2S_CurBuyFree_12002);

        /** C2S_CurBuyFree_12002 batchno. */
        public batchno: string;

        /** C2S_CurBuyFree_12002 round. */
        public round: number;

        /**
         * Creates a new C2S_CurBuyFree_12002 instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2S_CurBuyFree_12002 instance
         */
        public static create(properties?: newxxs.IC2S_CurBuyFree_12002): newxxs.C2S_CurBuyFree_12002;

        /**
         * Encodes the specified C2S_CurBuyFree_12002 message. Does not implicitly {@link newxxs.C2S_CurBuyFree_12002.verify|verify} messages.
         * @param message C2S_CurBuyFree_12002 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: newxxs.IC2S_CurBuyFree_12002, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified C2S_CurBuyFree_12002 message, length delimited. Does not implicitly {@link newxxs.C2S_CurBuyFree_12002.verify|verify} messages.
         * @param message C2S_CurBuyFree_12002 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: newxxs.IC2S_CurBuyFree_12002, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2S_CurBuyFree_12002 message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2S_CurBuyFree_12002
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): newxxs.C2S_CurBuyFree_12002;

        /**
         * Decodes a C2S_CurBuyFree_12002 message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2S_CurBuyFree_12002
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): newxxs.C2S_CurBuyFree_12002;

        /**
         * Verifies a C2S_CurBuyFree_12002 message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a C2S_CurBuyFree_12002 message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2S_CurBuyFree_12002
         */
        public static fromObject(object: { [k: string]: any }): newxxs.C2S_CurBuyFree_12002;

        /**
         * Creates a plain object from a C2S_CurBuyFree_12002 message. Also converts values to other types if specified.
         * @param message C2S_CurBuyFree_12002
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: newxxs.C2S_CurBuyFree_12002, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2S_CurBuyFree_12002 to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a S2C_CurBuyFreeResult_12003. */
    interface IS2C_CurBuyFreeResult_12003 {
        /** S2C_CurBuyFreeResult_12003 error */
        error?: number | null;

        /** S2C_CurBuyFreeResult_12003 curScene */
        curScene?: newxxs.ICurScene | null;
    }

    /** Represents a S2C_CurBuyFreeResult_12003. */
    class S2C_CurBuyFreeResult_12003 implements IS2C_CurBuyFreeResult_12003 {
        /**
         * Constructs a new S2C_CurBuyFreeResult_12003.
         * @param [properties] Properties to set
         */
        constructor(properties?: newxxs.IS2C_CurBuyFreeResult_12003);

        /** S2C_CurBuyFreeResult_12003 error. */
        public error: number;

        /** S2C_CurBuyFreeResult_12003 curScene. */
        public curScene?: newxxs.ICurScene | null;

        /**
         * Creates a new S2C_CurBuyFreeResult_12003 instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2C_CurBuyFreeResult_12003 instance
         */
        public static create(properties?: newxxs.IS2C_CurBuyFreeResult_12003): newxxs.S2C_CurBuyFreeResult_12003;

        /**
         * Encodes the specified S2C_CurBuyFreeResult_12003 message. Does not implicitly {@link newxxs.S2C_CurBuyFreeResult_12003.verify|verify} messages.
         * @param message S2C_CurBuyFreeResult_12003 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: newxxs.IS2C_CurBuyFreeResult_12003, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified S2C_CurBuyFreeResult_12003 message, length delimited. Does not implicitly {@link newxxs.S2C_CurBuyFreeResult_12003.verify|verify} messages.
         * @param message S2C_CurBuyFreeResult_12003 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: newxxs.IS2C_CurBuyFreeResult_12003, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2C_CurBuyFreeResult_12003 message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns S2C_CurBuyFreeResult_12003
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): newxxs.S2C_CurBuyFreeResult_12003;

        /**
         * Decodes a S2C_CurBuyFreeResult_12003 message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns S2C_CurBuyFreeResult_12003
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): newxxs.S2C_CurBuyFreeResult_12003;

        /**
         * Verifies a S2C_CurBuyFreeResult_12003 message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a S2C_CurBuyFreeResult_12003 message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns S2C_CurBuyFreeResult_12003
         */
        public static fromObject(object: { [k: string]: any }): newxxs.S2C_CurBuyFreeResult_12003;

        /**
         * Creates a plain object from a S2C_CurBuyFreeResult_12003 message. Also converts values to other types if specified.
         * @param message S2C_CurBuyFreeResult_12003
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: newxxs.S2C_CurBuyFreeResult_12003, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this S2C_CurBuyFreeResult_12003 to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2S_CurScene_13000. */
    interface IC2S_CurScene_13000 {}

    /** Represents a C2S_CurScene_13000. */
    class C2S_CurScene_13000 implements IC2S_CurScene_13000 {
        /**
         * Constructs a new C2S_CurScene_13000.
         * @param [properties] Properties to set
         */
        constructor(properties?: newxxs.IC2S_CurScene_13000);

        /**
         * Creates a new C2S_CurScene_13000 instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2S_CurScene_13000 instance
         */
        public static create(properties?: newxxs.IC2S_CurScene_13000): newxxs.C2S_CurScene_13000;

        /**
         * Encodes the specified C2S_CurScene_13000 message. Does not implicitly {@link newxxs.C2S_CurScene_13000.verify|verify} messages.
         * @param message C2S_CurScene_13000 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: newxxs.IC2S_CurScene_13000, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified C2S_CurScene_13000 message, length delimited. Does not implicitly {@link newxxs.C2S_CurScene_13000.verify|verify} messages.
         * @param message C2S_CurScene_13000 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: newxxs.IC2S_CurScene_13000, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2S_CurScene_13000 message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2S_CurScene_13000
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): newxxs.C2S_CurScene_13000;

        /**
         * Decodes a C2S_CurScene_13000 message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2S_CurScene_13000
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): newxxs.C2S_CurScene_13000;

        /**
         * Verifies a C2S_CurScene_13000 message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a C2S_CurScene_13000 message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2S_CurScene_13000
         */
        public static fromObject(object: { [k: string]: any }): newxxs.C2S_CurScene_13000;

        /**
         * Creates a plain object from a C2S_CurScene_13000 message. Also converts values to other types if specified.
         * @param message C2S_CurScene_13000
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: newxxs.C2S_CurScene_13000, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2S_CurScene_13000 to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a S2C_CurSceneResult_13001. */
    interface IS2C_CurSceneResult_13001 {
        /** S2C_CurSceneResult_13001 error */
        error?: number | null;

        /** S2C_CurSceneResult_13001 curScene */
        curScene?: newxxs.ICurScene | null;
    }

    /** Represents a S2C_CurSceneResult_13001. */
    class S2C_CurSceneResult_13001 implements IS2C_CurSceneResult_13001 {
        /**
         * Constructs a new S2C_CurSceneResult_13001.
         * @param [properties] Properties to set
         */
        constructor(properties?: newxxs.IS2C_CurSceneResult_13001);

        /** S2C_CurSceneResult_13001 error. */
        public error: number;

        /** S2C_CurSceneResult_13001 curScene. */
        public curScene?: newxxs.ICurScene | null;

        /**
         * Creates a new S2C_CurSceneResult_13001 instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2C_CurSceneResult_13001 instance
         */
        public static create(properties?: newxxs.IS2C_CurSceneResult_13001): newxxs.S2C_CurSceneResult_13001;

        /**
         * Encodes the specified S2C_CurSceneResult_13001 message. Does not implicitly {@link newxxs.S2C_CurSceneResult_13001.verify|verify} messages.
         * @param message S2C_CurSceneResult_13001 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: newxxs.IS2C_CurSceneResult_13001, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified S2C_CurSceneResult_13001 message, length delimited. Does not implicitly {@link newxxs.S2C_CurSceneResult_13001.verify|verify} messages.
         * @param message S2C_CurSceneResult_13001 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: newxxs.IS2C_CurSceneResult_13001, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2C_CurSceneResult_13001 message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns S2C_CurSceneResult_13001
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): newxxs.S2C_CurSceneResult_13001;

        /**
         * Decodes a S2C_CurSceneResult_13001 message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns S2C_CurSceneResult_13001
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): newxxs.S2C_CurSceneResult_13001;

        /**
         * Verifies a S2C_CurSceneResult_13001 message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a S2C_CurSceneResult_13001 message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns S2C_CurSceneResult_13001
         */
        public static fromObject(object: { [k: string]: any }): newxxs.S2C_CurSceneResult_13001;

        /**
         * Creates a plain object from a S2C_CurSceneResult_13001 message. Also converts values to other types if specified.
         * @param message S2C_CurSceneResult_13001
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: newxxs.S2C_CurSceneResult_13001, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this S2C_CurSceneResult_13001 to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2S_AllSet_14000. */
    interface IC2S_AllSet_14000 {
        /** C2S_AllSet_14000 upDownType */
        upDownType?: number | null;
    }

    /** Represents a C2S_AllSet_14000. */
    class C2S_AllSet_14000 implements IC2S_AllSet_14000 {
        /**
         * Constructs a new C2S_AllSet_14000.
         * @param [properties] Properties to set
         */
        constructor(properties?: newxxs.IC2S_AllSet_14000);

        /** C2S_AllSet_14000 upDownType. */
        public upDownType: number;

        /**
         * Creates a new C2S_AllSet_14000 instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2S_AllSet_14000 instance
         */
        public static create(properties?: newxxs.IC2S_AllSet_14000): newxxs.C2S_AllSet_14000;

        /**
         * Encodes the specified C2S_AllSet_14000 message. Does not implicitly {@link newxxs.C2S_AllSet_14000.verify|verify} messages.
         * @param message C2S_AllSet_14000 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: newxxs.IC2S_AllSet_14000, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified C2S_AllSet_14000 message, length delimited. Does not implicitly {@link newxxs.C2S_AllSet_14000.verify|verify} messages.
         * @param message C2S_AllSet_14000 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: newxxs.IC2S_AllSet_14000, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2S_AllSet_14000 message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2S_AllSet_14000
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): newxxs.C2S_AllSet_14000;

        /**
         * Decodes a C2S_AllSet_14000 message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2S_AllSet_14000
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): newxxs.C2S_AllSet_14000;

        /**
         * Verifies a C2S_AllSet_14000 message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a C2S_AllSet_14000 message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2S_AllSet_14000
         */
        public static fromObject(object: { [k: string]: any }): newxxs.C2S_AllSet_14000;

        /**
         * Creates a plain object from a C2S_AllSet_14000 message. Also converts values to other types if specified.
         * @param message C2S_AllSet_14000
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: newxxs.C2S_AllSet_14000, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2S_AllSet_14000 to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a S2C_AllSetResult_14001. */
    interface IS2C_AllSetResult_14001 {
        /** S2C_AllSetResult_14001 error */
        error?: number | null;

        /** S2C_AllSetResult_14001 curBetChips */
        curBetChips?: number | null;

        /** S2C_AllSetResult_14001 BetType */
        BetType?: number | null;

        /** S2C_AllSetResult_14001 scopes */
        scopes?: newxxs.ICurScope[] | null;

        /** S2C_AllSetResult_14001 buyFreeChips */
        buyFreeChips?: number | null;
    }

    /** Represents a S2C_AllSetResult_14001. */
    class S2C_AllSetResult_14001 implements IS2C_AllSetResult_14001 {
        /**
         * Constructs a new S2C_AllSetResult_14001.
         * @param [properties] Properties to set
         */
        constructor(properties?: newxxs.IS2C_AllSetResult_14001);

        /** S2C_AllSetResult_14001 error. */
        public error: number;

        /** S2C_AllSetResult_14001 curBetChips. */
        public curBetChips: number;

        /** S2C_AllSetResult_14001 BetType. */
        public BetType: number;

        /** S2C_AllSetResult_14001 scopes. */
        public scopes: newxxs.ICurScope[];

        /** S2C_AllSetResult_14001 buyFreeChips. */
        public buyFreeChips: number;

        /**
         * Creates a new S2C_AllSetResult_14001 instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2C_AllSetResult_14001 instance
         */
        public static create(properties?: newxxs.IS2C_AllSetResult_14001): newxxs.S2C_AllSetResult_14001;

        /**
         * Encodes the specified S2C_AllSetResult_14001 message. Does not implicitly {@link newxxs.S2C_AllSetResult_14001.verify|verify} messages.
         * @param message S2C_AllSetResult_14001 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: newxxs.IS2C_AllSetResult_14001, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified S2C_AllSetResult_14001 message, length delimited. Does not implicitly {@link newxxs.S2C_AllSetResult_14001.verify|verify} messages.
         * @param message S2C_AllSetResult_14001 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: newxxs.IS2C_AllSetResult_14001, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2C_AllSetResult_14001 message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns S2C_AllSetResult_14001
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): newxxs.S2C_AllSetResult_14001;

        /**
         * Decodes a S2C_AllSetResult_14001 message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns S2C_AllSetResult_14001
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): newxxs.S2C_AllSetResult_14001;

        /**
         * Verifies a S2C_AllSetResult_14001 message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a S2C_AllSetResult_14001 message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns S2C_AllSetResult_14001
         */
        public static fromObject(object: { [k: string]: any }): newxxs.S2C_AllSetResult_14001;

        /**
         * Creates a plain object from a S2C_AllSetResult_14001 message. Also converts values to other types if specified.
         * @param message S2C_AllSetResult_14001
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: newxxs.S2C_AllSetResult_14001, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this S2C_AllSetResult_14001 to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2S_SelectChips_14002. */
    interface IC2S_SelectChips_14002 {
        /** C2S_SelectChips_14002 betChip */
        betChip?: number | null;
    }

    /** Represents a C2S_SelectChips_14002. */
    class C2S_SelectChips_14002 implements IC2S_SelectChips_14002 {
        /**
         * Constructs a new C2S_SelectChips_14002.
         * @param [properties] Properties to set
         */
        constructor(properties?: newxxs.IC2S_SelectChips_14002);

        /** C2S_SelectChips_14002 betChip. */
        public betChip: number;

        /**
         * Creates a new C2S_SelectChips_14002 instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2S_SelectChips_14002 instance
         */
        public static create(properties?: newxxs.IC2S_SelectChips_14002): newxxs.C2S_SelectChips_14002;

        /**
         * Encodes the specified C2S_SelectChips_14002 message. Does not implicitly {@link newxxs.C2S_SelectChips_14002.verify|verify} messages.
         * @param message C2S_SelectChips_14002 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: newxxs.IC2S_SelectChips_14002, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified C2S_SelectChips_14002 message, length delimited. Does not implicitly {@link newxxs.C2S_SelectChips_14002.verify|verify} messages.
         * @param message C2S_SelectChips_14002 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: newxxs.IC2S_SelectChips_14002, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2S_SelectChips_14002 message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2S_SelectChips_14002
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): newxxs.C2S_SelectChips_14002;

        /**
         * Decodes a C2S_SelectChips_14002 message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2S_SelectChips_14002
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): newxxs.C2S_SelectChips_14002;

        /**
         * Verifies a C2S_SelectChips_14002 message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a C2S_SelectChips_14002 message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2S_SelectChips_14002
         */
        public static fromObject(object: { [k: string]: any }): newxxs.C2S_SelectChips_14002;

        /**
         * Creates a plain object from a C2S_SelectChips_14002 message. Also converts values to other types if specified.
         * @param message C2S_SelectChips_14002
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: newxxs.C2S_SelectChips_14002, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2S_SelectChips_14002 to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a S2C_SelectChipsResult_14003. */
    interface IS2C_SelectChipsResult_14003 {
        /** S2C_SelectChipsResult_14003 error */
        error?: number | null;

        /** S2C_SelectChipsResult_14003 curBetChips */
        curBetChips?: number | null;

        /** S2C_SelectChipsResult_14003 BetType */
        BetType?: number | null;

        /** S2C_SelectChipsResult_14003 scopes */
        scopes?: newxxs.ICurScope[] | null;

        /** S2C_SelectChipsResult_14003 buyFreeChips */
        buyFreeChips?: number | null;
    }

    /** Represents a S2C_SelectChipsResult_14003. */
    class S2C_SelectChipsResult_14003 implements IS2C_SelectChipsResult_14003 {
        /**
         * Constructs a new S2C_SelectChipsResult_14003.
         * @param [properties] Properties to set
         */
        constructor(properties?: newxxs.IS2C_SelectChipsResult_14003);

        /** S2C_SelectChipsResult_14003 error. */
        public error: number;

        /** S2C_SelectChipsResult_14003 curBetChips. */
        public curBetChips: number;

        /** S2C_SelectChipsResult_14003 BetType. */
        public BetType: number;

        /** S2C_SelectChipsResult_14003 scopes. */
        public scopes: newxxs.ICurScope[];

        /** S2C_SelectChipsResult_14003 buyFreeChips. */
        public buyFreeChips: number;

        /**
         * Creates a new S2C_SelectChipsResult_14003 instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2C_SelectChipsResult_14003 instance
         */
        public static create(properties?: newxxs.IS2C_SelectChipsResult_14003): newxxs.S2C_SelectChipsResult_14003;

        /**
         * Encodes the specified S2C_SelectChipsResult_14003 message. Does not implicitly {@link newxxs.S2C_SelectChipsResult_14003.verify|verify} messages.
         * @param message S2C_SelectChipsResult_14003 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: newxxs.IS2C_SelectChipsResult_14003, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified S2C_SelectChipsResult_14003 message, length delimited. Does not implicitly {@link newxxs.S2C_SelectChipsResult_14003.verify|verify} messages.
         * @param message S2C_SelectChipsResult_14003 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: newxxs.IS2C_SelectChipsResult_14003, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2C_SelectChipsResult_14003 message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns S2C_SelectChipsResult_14003
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): newxxs.S2C_SelectChipsResult_14003;

        /**
         * Decodes a S2C_SelectChipsResult_14003 message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns S2C_SelectChipsResult_14003
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): newxxs.S2C_SelectChipsResult_14003;

        /**
         * Verifies a S2C_SelectChipsResult_14003 message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a S2C_SelectChipsResult_14003 message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns S2C_SelectChipsResult_14003
         */
        public static fromObject(object: { [k: string]: any }): newxxs.S2C_SelectChipsResult_14003;

        /**
         * Creates a plain object from a S2C_SelectChipsResult_14003 message. Also converts values to other types if specified.
         * @param message S2C_SelectChipsResult_14003
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: newxxs.S2C_SelectChipsResult_14003, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this S2C_SelectChipsResult_14003 to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2S_SetMultiple_15000. */
    interface IC2S_SetMultiple_15000 {
        /** C2S_SetMultiple_15000 isMultiple */
        isMultiple?: number | null;
    }

    /** Represents a C2S_SetMultiple_15000. */
    class C2S_SetMultiple_15000 implements IC2S_SetMultiple_15000 {
        /**
         * Constructs a new C2S_SetMultiple_15000.
         * @param [properties] Properties to set
         */
        constructor(properties?: newxxs.IC2S_SetMultiple_15000);

        /** C2S_SetMultiple_15000 isMultiple. */
        public isMultiple: number;

        /**
         * Creates a new C2S_SetMultiple_15000 instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2S_SetMultiple_15000 instance
         */
        public static create(properties?: newxxs.IC2S_SetMultiple_15000): newxxs.C2S_SetMultiple_15000;

        /**
         * Encodes the specified C2S_SetMultiple_15000 message. Does not implicitly {@link newxxs.C2S_SetMultiple_15000.verify|verify} messages.
         * @param message C2S_SetMultiple_15000 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: newxxs.IC2S_SetMultiple_15000, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified C2S_SetMultiple_15000 message, length delimited. Does not implicitly {@link newxxs.C2S_SetMultiple_15000.verify|verify} messages.
         * @param message C2S_SetMultiple_15000 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: newxxs.IC2S_SetMultiple_15000, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2S_SetMultiple_15000 message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2S_SetMultiple_15000
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): newxxs.C2S_SetMultiple_15000;

        /**
         * Decodes a C2S_SetMultiple_15000 message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2S_SetMultiple_15000
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): newxxs.C2S_SetMultiple_15000;

        /**
         * Verifies a C2S_SetMultiple_15000 message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a C2S_SetMultiple_15000 message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2S_SetMultiple_15000
         */
        public static fromObject(object: { [k: string]: any }): newxxs.C2S_SetMultiple_15000;

        /**
         * Creates a plain object from a C2S_SetMultiple_15000 message. Also converts values to other types if specified.
         * @param message C2S_SetMultiple_15000
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: newxxs.C2S_SetMultiple_15000, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2S_SetMultiple_15000 to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a S2C_SetMultipleResult_15001. */
    interface IS2C_SetMultipleResult_15001 {
        /** S2C_SetMultipleResult_15001 error */
        error?: number | null;

        /** S2C_SetMultipleResult_15001 isMultiple */
        isMultiple?: number | null;

        /** S2C_SetMultipleResult_15001 curBetChips */
        curBetChips?: number | null;

        /** S2C_SetMultipleResult_15001 betChips */
        betChips?: number[] | null;
    }

    /** Represents a S2C_SetMultipleResult_15001. */
    class S2C_SetMultipleResult_15001 implements IS2C_SetMultipleResult_15001 {
        /**
         * Constructs a new S2C_SetMultipleResult_15001.
         * @param [properties] Properties to set
         */
        constructor(properties?: newxxs.IS2C_SetMultipleResult_15001);

        /** S2C_SetMultipleResult_15001 error. */
        public error: number;

        /** S2C_SetMultipleResult_15001 isMultiple. */
        public isMultiple: number;

        /** S2C_SetMultipleResult_15001 curBetChips. */
        public curBetChips: number;

        /** S2C_SetMultipleResult_15001 betChips. */
        public betChips: number[];

        /**
         * Creates a new S2C_SetMultipleResult_15001 instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2C_SetMultipleResult_15001 instance
         */
        public static create(properties?: newxxs.IS2C_SetMultipleResult_15001): newxxs.S2C_SetMultipleResult_15001;

        /**
         * Encodes the specified S2C_SetMultipleResult_15001 message. Does not implicitly {@link newxxs.S2C_SetMultipleResult_15001.verify|verify} messages.
         * @param message S2C_SetMultipleResult_15001 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: newxxs.IS2C_SetMultipleResult_15001, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified S2C_SetMultipleResult_15001 message, length delimited. Does not implicitly {@link newxxs.S2C_SetMultipleResult_15001.verify|verify} messages.
         * @param message S2C_SetMultipleResult_15001 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: newxxs.IS2C_SetMultipleResult_15001, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2C_SetMultipleResult_15001 message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns S2C_SetMultipleResult_15001
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): newxxs.S2C_SetMultipleResult_15001;

        /**
         * Decodes a S2C_SetMultipleResult_15001 message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns S2C_SetMultipleResult_15001
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): newxxs.S2C_SetMultipleResult_15001;

        /**
         * Verifies a S2C_SetMultipleResult_15001 message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a S2C_SetMultipleResult_15001 message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns S2C_SetMultipleResult_15001
         */
        public static fromObject(object: { [k: string]: any }): newxxs.S2C_SetMultipleResult_15001;

        /**
         * Creates a plain object from a S2C_SetMultipleResult_15001 message. Also converts values to other types if specified.
         * @param message S2C_SetMultipleResult_15001
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: newxxs.S2C_SetMultipleResult_15001, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this S2C_SetMultipleResult_15001 to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a S2C_NoticeResult_66666. */
    interface IS2C_NoticeResult_66666 {
        /** S2C_NoticeResult_66666 error */
        error?: number | null;

        /** S2C_NoticeResult_66666 notice */
        notice?: string[] | null;
    }

    /** Represents a S2C_NoticeResult_66666. */
    class S2C_NoticeResult_66666 implements IS2C_NoticeResult_66666 {
        /**
         * Constructs a new S2C_NoticeResult_66666.
         * @param [properties] Properties to set
         */
        constructor(properties?: newxxs.IS2C_NoticeResult_66666);

        /** S2C_NoticeResult_66666 error. */
        public error: number;

        /** S2C_NoticeResult_66666 notice. */
        public notice: string[];

        /**
         * Creates a new S2C_NoticeResult_66666 instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2C_NoticeResult_66666 instance
         */
        public static create(properties?: newxxs.IS2C_NoticeResult_66666): newxxs.S2C_NoticeResult_66666;

        /**
         * Encodes the specified S2C_NoticeResult_66666 message. Does not implicitly {@link newxxs.S2C_NoticeResult_66666.verify|verify} messages.
         * @param message S2C_NoticeResult_66666 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: newxxs.IS2C_NoticeResult_66666, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified S2C_NoticeResult_66666 message, length delimited. Does not implicitly {@link newxxs.S2C_NoticeResult_66666.verify|verify} messages.
         * @param message S2C_NoticeResult_66666 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: newxxs.IS2C_NoticeResult_66666, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2C_NoticeResult_66666 message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns S2C_NoticeResult_66666
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): newxxs.S2C_NoticeResult_66666;

        /**
         * Decodes a S2C_NoticeResult_66666 message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns S2C_NoticeResult_66666
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): newxxs.S2C_NoticeResult_66666;

        /**
         * Verifies a S2C_NoticeResult_66666 message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a S2C_NoticeResult_66666 message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns S2C_NoticeResult_66666
         */
        public static fromObject(object: { [k: string]: any }): newxxs.S2C_NoticeResult_66666;

        /**
         * Creates a plain object from a S2C_NoticeResult_66666 message. Also converts values to other types if specified.
         * @param message S2C_NoticeResult_66666
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: newxxs.S2C_NoticeResult_66666, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this S2C_NoticeResult_66666 to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CurPlayer. */
    interface ICurPlayer {
        /** CurPlayer playerId */
        playerId?: string | null;

        /** CurPlayer agentId */
        agentId?: string | null;

        /** CurPlayer nickName */
        nickName?: string | null;

        /** CurPlayer identify */
        identify?: string | null;
    }

    /** Represents a CurPlayer. */
    class CurPlayer implements ICurPlayer {
        /**
         * Constructs a new CurPlayer.
         * @param [properties] Properties to set
         */
        constructor(properties?: newxxs.ICurPlayer);

        /** CurPlayer playerId. */
        public playerId: string;

        /** CurPlayer agentId. */
        public agentId: string;

        /** CurPlayer nickName. */
        public nickName: string;

        /** CurPlayer identify. */
        public identify: string;

        /**
         * Creates a new CurPlayer instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CurPlayer instance
         */
        public static create(properties?: newxxs.ICurPlayer): newxxs.CurPlayer;

        /**
         * Encodes the specified CurPlayer message. Does not implicitly {@link newxxs.CurPlayer.verify|verify} messages.
         * @param message CurPlayer message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: newxxs.ICurPlayer, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CurPlayer message, length delimited. Does not implicitly {@link newxxs.CurPlayer.verify|verify} messages.
         * @param message CurPlayer message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: newxxs.ICurPlayer, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CurPlayer message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CurPlayer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): newxxs.CurPlayer;

        /**
         * Decodes a CurPlayer message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CurPlayer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): newxxs.CurPlayer;

        /**
         * Verifies a CurPlayer message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a CurPlayer message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CurPlayer
         */
        public static fromObject(object: { [k: string]: any }): newxxs.CurPlayer;

        /**
         * Creates a plain object from a CurPlayer message. Also converts values to other types if specified.
         * @param message CurPlayer
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: newxxs.CurPlayer, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CurPlayer to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CurScene. */
    interface ICurScene {
        /** CurScene surChips */
        surChips?: number | null;

        /** CurScene curChips */
        curChips?: number | null;

        /** CurScene winChips */
        winChips?: number | null;

        /** CurScene minBet */
        minBet?: number | null;

        /** CurScene maxBet */
        maxBet?: number | null;

        /** CurScene curBetChips */
        curBetChips?: number | null;

        /** CurScene betType */
        betType?: number | null;

        /** CurScene buyFree */
        buyFree?: number | null;

        /** CurScene buyFreeChips */
        buyFreeChips?: number | null;

        /** CurScene batchno */
        batchno?: string | null;

        /** CurScene round */
        round?: number | null;

        /** CurScene run */
        run?: number | null;

        /** CurScene scene */
        scene?: number | null;

        /** CurScene freeCount */
        freeCount?: number | null;

        /** CurScene panel */
        panel?: string | null;

        /** CurScene allMultiple */
        allMultiple?: number | null;

        /** CurScene curMultiple */
        curMultiple?: number | null;

        /** CurScene curMultiples */
        curMultiples?: newxxs.ICurMultipleIcon[] | null;

        /** CurScene curicons */
        curicons?: newxxs.ICurAwardIcon[] | null;

        /** CurScene roundicons */
        roundicons?: newxxs.ICurAwardIcon[] | null;

        /** CurScene free */
        free?: newxxs.ICurAwardIcon | null;

        /** CurScene scopes */
        scopes?: newxxs.ICurScope[] | null;

        /** CurScene multiples */
        multiples?: number[] | null;

        /** CurScene bigIcon */
        bigIcon?: number | null;

        /** CurScene comboCount */
        comboCount?: number | null;

        /** CurScene freeAginCount */
        freeAginCount?: number | null;

        /** CurScene freeAginNum */
        freeAginNum?: number | null;

        /** CurScene freeAginChips */
        freeAginChips?: number | null;

        /** CurScene scroll */
        scroll?: string | null;

        /** CurScene suite */
        suite?: string | null;

        /** CurScene betChips */
        betChips?: number[] | null;

        /** CurScene isMultiple */
        isMultiple?: number | null;

        /** CurScene allCount */
        allCount?: number | null;
    }

    /** Represents a CurScene. */
    class CurScene implements ICurScene {
        /**
         * Constructs a new CurScene.
         * @param [properties] Properties to set
         */
        constructor(properties?: newxxs.ICurScene);

        /** CurScene surChips. */
        public surChips: number;

        /** CurScene curChips. */
        public curChips: number;

        /** CurScene winChips. */
        public winChips: number;

        /** CurScene minBet. */
        public minBet: number;

        /** CurScene maxBet. */
        public maxBet: number;

        /** CurScene curBetChips. */
        public curBetChips: number;

        /** CurScene betType. */
        public betType: number;

        /** CurScene buyFree. */
        public buyFree: number;

        /** CurScene buyFreeChips. */
        public buyFreeChips: number;

        /** CurScene batchno. */
        public batchno: string;

        /** CurScene round. */
        public round: number;

        /** CurScene run. */
        public run: number;

        /** CurScene scene. */
        public scene: number;

        /** CurScene freeCount. */
        public freeCount: number;

        /** CurScene panel. */
        public panel: string;

        /** CurScene allMultiple. */
        public allMultiple: number;

        /** CurScene curMultiple. */
        public curMultiple: number;

        /** CurScene curMultiples. */
        public curMultiples: newxxs.ICurMultipleIcon[];

        /** CurScene curicons. */
        public curicons: newxxs.ICurAwardIcon[];

        /** CurScene roundicons. */
        public roundicons: newxxs.ICurAwardIcon[];

        /** CurScene free. */
        public free?: newxxs.ICurAwardIcon | null;

        /** CurScene scopes. */
        public scopes: newxxs.ICurScope[];

        /** CurScene multiples. */
        public multiples: number[];

        /** CurScene bigIcon. */
        public bigIcon: number;

        /** CurScene comboCount. */
        public comboCount: number;

        /** CurScene freeAginCount. */
        public freeAginCount: number;

        /** CurScene freeAginNum. */
        public freeAginNum: number;

        /** CurScene freeAginChips. */
        public freeAginChips: number;

        /** CurScene scroll. */
        public scroll: string;

        /** CurScene suite. */
        public suite: string;

        /** CurScene betChips. */
        public betChips: number[];

        /** CurScene isMultiple. */
        public isMultiple: number;

        /** CurScene allCount. */
        public allCount: number;

        /**
         * Creates a new CurScene instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CurScene instance
         */
        public static create(properties?: newxxs.ICurScene): newxxs.CurScene;

        /**
         * Encodes the specified CurScene message. Does not implicitly {@link newxxs.CurScene.verify|verify} messages.
         * @param message CurScene message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: newxxs.ICurScene, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CurScene message, length delimited. Does not implicitly {@link newxxs.CurScene.verify|verify} messages.
         * @param message CurScene message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: newxxs.ICurScene, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CurScene message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CurScene
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): newxxs.CurScene;

        /**
         * Decodes a CurScene message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CurScene
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): newxxs.CurScene;

        /**
         * Verifies a CurScene message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a CurScene message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CurScene
         */
        public static fromObject(object: { [k: string]: any }): newxxs.CurScene;

        /**
         * Creates a plain object from a CurScene message. Also converts values to other types if specified.
         * @param message CurScene
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: newxxs.CurScene, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CurScene to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CurAwardIcon. */
    interface ICurAwardIcon {
        /** CurAwardIcon betArea */
        betArea?: number | null;

        /** CurAwardIcon index */
        index?: string | null;

        /** CurAwardIcon count */
        count?: number | null;

        /** CurAwardIcon chips */
        chips?: number | null;

        /** CurAwardIcon odd */
        odd?: number | null;
    }

    /** Represents a CurAwardIcon. */
    class CurAwardIcon implements ICurAwardIcon {
        /**
         * Constructs a new CurAwardIcon.
         * @param [properties] Properties to set
         */
        constructor(properties?: newxxs.ICurAwardIcon);

        /** CurAwardIcon betArea. */
        public betArea: number;

        /** CurAwardIcon index. */
        public index: string;

        /** CurAwardIcon count. */
        public count: number;

        /** CurAwardIcon chips. */
        public chips: number;

        /** CurAwardIcon odd. */
        public odd: number;

        /**
         * Creates a new CurAwardIcon instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CurAwardIcon instance
         */
        public static create(properties?: newxxs.ICurAwardIcon): newxxs.CurAwardIcon;

        /**
         * Encodes the specified CurAwardIcon message. Does not implicitly {@link newxxs.CurAwardIcon.verify|verify} messages.
         * @param message CurAwardIcon message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: newxxs.ICurAwardIcon, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CurAwardIcon message, length delimited. Does not implicitly {@link newxxs.CurAwardIcon.verify|verify} messages.
         * @param message CurAwardIcon message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: newxxs.ICurAwardIcon, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CurAwardIcon message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CurAwardIcon
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): newxxs.CurAwardIcon;

        /**
         * Decodes a CurAwardIcon message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CurAwardIcon
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): newxxs.CurAwardIcon;

        /**
         * Verifies a CurAwardIcon message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a CurAwardIcon message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CurAwardIcon
         */
        public static fromObject(object: { [k: string]: any }): newxxs.CurAwardIcon;

        /**
         * Creates a plain object from a CurAwardIcon message. Also converts values to other types if specified.
         * @param message CurAwardIcon
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: newxxs.CurAwardIcon, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CurAwardIcon to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CurMultipleIcon. */
    interface ICurMultipleIcon {
        /** CurMultipleIcon multiple */
        multiple?: number | null;

        /** CurMultipleIcon index */
        index?: string | null;

        /** CurMultipleIcon count */
        count?: number | null;

        /** CurMultipleIcon newIcon */
        newIcon?: number | null;
    }

    /** Represents a CurMultipleIcon. */
    class CurMultipleIcon implements ICurMultipleIcon {
        /**
         * Constructs a new CurMultipleIcon.
         * @param [properties] Properties to set
         */
        constructor(properties?: newxxs.ICurMultipleIcon);

        /** CurMultipleIcon multiple. */
        public multiple: number;

        /** CurMultipleIcon index. */
        public index: string;

        /** CurMultipleIcon count. */
        public count: number;

        /** CurMultipleIcon newIcon. */
        public newIcon: number;

        /**
         * Creates a new CurMultipleIcon instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CurMultipleIcon instance
         */
        public static create(properties?: newxxs.ICurMultipleIcon): newxxs.CurMultipleIcon;

        /**
         * Encodes the specified CurMultipleIcon message. Does not implicitly {@link newxxs.CurMultipleIcon.verify|verify} messages.
         * @param message CurMultipleIcon message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: newxxs.ICurMultipleIcon, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CurMultipleIcon message, length delimited. Does not implicitly {@link newxxs.CurMultipleIcon.verify|verify} messages.
         * @param message CurMultipleIcon message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: newxxs.ICurMultipleIcon, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CurMultipleIcon message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CurMultipleIcon
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): newxxs.CurMultipleIcon;

        /**
         * Decodes a CurMultipleIcon message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CurMultipleIcon
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): newxxs.CurMultipleIcon;

        /**
         * Verifies a CurMultipleIcon message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a CurMultipleIcon message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CurMultipleIcon
         */
        public static fromObject(object: { [k: string]: any }): newxxs.CurMultipleIcon;

        /**
         * Creates a plain object from a CurMultipleIcon message. Also converts values to other types if specified.
         * @param message CurMultipleIcon
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: newxxs.CurMultipleIcon, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CurMultipleIcon to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CurScope. */
    interface ICurScope {
        /** CurScope betArea */
        betArea?: number | null;

        /** CurScope chips */
        chips?: number | null;

        /** CurScope minCount */
        minCount?: number | null;

        /** CurScope maxCount */
        maxCount?: number | null;
    }

    /** Represents a CurScope. */
    class CurScope implements ICurScope {
        /**
         * Constructs a new CurScope.
         * @param [properties] Properties to set
         */
        constructor(properties?: newxxs.ICurScope);

        /** CurScope betArea. */
        public betArea: number;

        /** CurScope chips. */
        public chips: number;

        /** CurScope minCount. */
        public minCount: number;

        /** CurScope maxCount. */
        public maxCount: number;

        /**
         * Creates a new CurScope instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CurScope instance
         */
        public static create(properties?: newxxs.ICurScope): newxxs.CurScope;

        /**
         * Encodes the specified CurScope message. Does not implicitly {@link newxxs.CurScope.verify|verify} messages.
         * @param message CurScope message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: newxxs.ICurScope, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CurScope message, length delimited. Does not implicitly {@link newxxs.CurScope.verify|verify} messages.
         * @param message CurScope message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: newxxs.ICurScope, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CurScope message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CurScope
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: $protobuf.Reader | Uint8Array, length?: number): newxxs.CurScope;

        /**
         * Decodes a CurScope message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CurScope
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: $protobuf.Reader | Uint8Array): newxxs.CurScope;

        /**
         * Verifies a CurScope message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string | null;

        /**
         * Creates a CurScope message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CurScope
         */
        public static fromObject(object: { [k: string]: any }): newxxs.CurScope;

        /**
         * Creates a plain object from a CurScope message. Also converts values to other types if specified.
         * @param message CurScope
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: newxxs.CurScope, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CurScope to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
