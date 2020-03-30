package com.ncs.common.constants;

/**
 * @author: SonNH - SAVIS
 * @created: 9/12/19
 * @Time: 15:23
 * @modified 9/12/19
 **/
public class Constants {
//    public static Token TOKEN = new Token();

    public static final int SUCCESS_CODE = 200;
    public static final int ERR_CODE_BAD_REQUEST = 400;
    public static final int ERR_CODE_UNAUTHORIZED = 401;
    public static final int ERR_CODE_FORBIDDEN = 403;
    public static final int ERR_CODE_NOT_FOUND = 404;
    public static final int ERR_CODE_METHOD_NOT_ALLOW = 405;
    public static final int CAUTION_CODE_FIELD_EXISTED = 2;
    public static final int SUCCESS_CODE_FIELD_UNEXIST = 1;
    public static final int ERR_CODE_FIELD = 0;


    public static final String MSG_TEMP = "Đã xảy ra lỗi: ";
    public static final String MSG_CAUTION = "Chú ý: ";
    public static final String SUCCESS_MSG = "Thành công";
    public static final String SUCCESS_SIGN_UP_MSG = "Đăng ký tài khoản thành công!";
    public static final String ERR_MSG_BAD_REQUEST = "Lỗi khi yêu cầu tài nguyên";
    public static final String ERR_MSG_FORBIDDEN = "Không có quyền yêu cầu tài nguyên";
    public static final String ERR_MSG_NOT_FOUND = "Không tìm thấy tài nguyên yêu cầu";
    public static final String ERR_MSG_METHOD_NOT_ALLOW = "Không hỗ trợ phương thức yêu cầu";
    public static final String ERR_MSG_UNAUTHORIZED = "Tài khoản mật khẩu không chính xác";
    public static final String ERR_MSG_USERNAME_ALREADY_TAKEN= "Tên người dùng đã được sử dụng";
    public static final String ERR_MSG_EMAIL_ALREADY_TAKEN= "Tên người dùng đã được sử dụng";
    public static final String ERR_MSG_USER_ROLE_NOT_FOUND= "Không tìm thấy vai trò người dùng";


    public static final String REFERENCE_IP = "http://localhost:8081/";

}
