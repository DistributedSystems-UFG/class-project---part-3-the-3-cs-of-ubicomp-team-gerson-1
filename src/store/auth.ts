import { atomWithStorage } from "jotai/utils";

const authAtom = atomWithStorage("token", undefined);

export default authAtom;
