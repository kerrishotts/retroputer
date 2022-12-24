import lzbase62 from "lzbase62";
export const isCart = window.location.search.includes("cart");
export const isEdit = window.location.search.includes("edit");

export function generateLink(code, which = "cart") {
    const compressed = lzbase62.compress(code);
    return `${window.location.protocol}//${window.location.host}${window.location.pathname}?${which}=${compressed}`;
}

export function getCode() {
    return lzbase62.decompress(window.location.search.substring(6));
}

export function hasCode() {
    return (isCart || isEdit) && window.location.search.substring(6) !== "";
}