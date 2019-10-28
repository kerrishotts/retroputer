.segment code 0x02000 {
    .const PUT_CHAR 0x0FE0C

top:

wait-for-key:
    do {
        in dl, 0x30
        cmp dl, 0
    } while z

    call [PUT_CHAR]

    br top
}