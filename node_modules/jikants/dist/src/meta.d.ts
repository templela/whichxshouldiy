import { Periods, Status, Types } from "./interfaces/meta/Meta";
declare const _default: {
    requests: (type?: Types, period?: Periods, offset?: number) => Promise<any>;
    status: () => Promise<Status | undefined>;
};
export default _default;
