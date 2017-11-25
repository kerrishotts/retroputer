import globalContext from "./globalContext.js";

const ALLOW_WORKERS = true;

export default ALLOW_WORKERS && globalContext.Worker;