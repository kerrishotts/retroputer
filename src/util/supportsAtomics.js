const ALLOW_ATOMICS = false;
export default ALLOW_ATOMICS && (typeof Atomics !== "undefined");