import util from "util";
import persistents from "../gachon/persistent";
import { encodeMe, convertUTF8 } from "../utils";

export class loginOptions {
    public static encoding: string = null;
    public static url: string = util.format("http://"+persistents.gachonUniv.apply+"/servlets/core/login?attribute=login");
    public static headers = {
        'User-Agent': "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko",
        'content-type': 'application/x-www-form-urlencoded'
    };
    public static body = "id="+encodeMe(persistents.credentials.id)+"&password="+encodeMe(persistents.credentials.password)
}

export function loginHandler(err, res, body) {
    if (err) {
        console.error(err);
    }
    if (res) {
        var responseBody = convertUTF8(body);
        console.log(responseBody);

        if (responseBody.includes('포탈 사용자 정보가 존재하지 않습니다!')) {
            console.error("LOGIN FAILED!");
            process.exit(1);
        }
    }
}