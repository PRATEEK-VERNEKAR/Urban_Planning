import Cookies from "js-cookie";

export const USER_TOKEN = Cookies.get('userToken') ? Cookies.get('userToken') : null