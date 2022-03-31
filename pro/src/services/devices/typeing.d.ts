/*
 * @Author: L.柠
 * @Date: 2022-03-29 11:36:13
 */
declare namespace Devices {
    type Result = {
        errCode?: number,
        message?: string,
        data?: any,
    }
    type Group = {
        id?: number,
        name?: string,
        beizhu?: string,
        belong?: string,
        status?: number,
        create_time?: string,
        update_time?: string,
    }
}