import { Info, Members } from "./interfaces/club/Club";
declare const _default: {
    info: (id: number) => Promise<Info | undefined>;
    members: (id: number, page?: number) => Promise<Members | undefined>;
};
export default _default;
