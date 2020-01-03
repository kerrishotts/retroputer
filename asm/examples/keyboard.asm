.segment code 0x02000 {
top:
    call [GET_CHAR]
    call [PUT_CHAR]
    br top
}