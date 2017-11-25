let globalContext = null;

if (typeof self !== "undefined") {
    globalContext = self;
}

if (typeof window !== "undefined") {
    globalContext = window;
}

if (typeof global !== "undefined") {
    globalContext = global;
}

export default globalContext;