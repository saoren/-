/*
 * @Author: L.柠
 * @Date: 2022-03-12 15:33:08
 */
declare namespace API1 {
    type UserInfo = {

    }


    type LoginParams = {
        username?: string,
        password?: string,
        type?: string
    }

    type LoginResult = {
        errCode?: number,
        message?: string,
        data?: any,
        type?: string
    }
}