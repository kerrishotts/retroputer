export function type({keyboard, str}={}) {
    Array.from(str).forEach((ch) => {
        const c = ch.charCodeAt(0);
        switch (c) {
            case 8220:
            case 8221: 
                keyboard.keyPressed(34);
                break;
            case 10:
                keyboard.keyPressed(13);
                break;
            default:
                keyboard.keyPressed(c);
        }
    });
}

export async function paste({keyboard}={}) {
    const str = await navigator.clipboard.readText();
    type({keyboard, str});
}