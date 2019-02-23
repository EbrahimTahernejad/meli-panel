class APIErrorDesc {
    message: string;
}
export const APIError: {[code: string]: APIErrorDesc} = {
    "BAD_REQUEST": {
        message: "خطایی در درخواست رخ داد"
    },
    "WRONG_USERNAME_OR_PASS": {
        message: "نام کاربری و/یا رمز عبور وجود دارد"
    },
    "USER_ALREADY_EXISTS": {
        message: "نام کاربری انتخاب شده وجود دارد"
    }
}