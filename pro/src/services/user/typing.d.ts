/*
 * @Author: L.柠
 * @Date: 2022-03-13 15:37:39
 */
declare namespace User {

    type Result = {
        errCode?: number,
        message?: string,
        data?: any,
    }

    type userban = {
        username?: string
    }

    type user = {
        username?: string,
        authority?: string
    }
}
