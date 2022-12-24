import { keyPressed } from "../System";

export function type(str) {
    Array.from(str).forEach((ch) => {
        const c = ch.charCodeAt(0);
        switch (c) {
            case 8220:
            case 8221: 
                keyPressed(34);
                break;
            case 10:
                keyPressed(13);
                break;
            default:
                keyPressed(c);
        }
    });
}

export async function paste() {
    const str = await navigator.clipboard.readText();
    type(str);
}