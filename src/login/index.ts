import util from "util";
import persistents from "../gachon/persistent";
import { encodeMe, convertUTF8 } from "../utils";
import { Z_STREAM_END } from "zlib";
import { register } from "../";

export let CookieString = "";
export let CookieVal = "";

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
        //console.log(responseBody);

        if (responseBody.includes('포탈 사용자 정보가 존재하지 않습니다!')) {
            console.error("LOGIN FAILED!");
            process.exit(1);
        } else if (responseBody.includes('수강신청 기간이 아닙니다')) {
            console.error("NOT YET!");
            const regex = /(현재 서버시간) : (([0-9]{4})-([0-9]{2})-([0-9]{2}) ([0-9]{2}):([0-9]{2}):([0-9]{2}))/;
            const response = regex.exec(responseBody);
            var serverTime = new Date(response[2]);
            var timeDiff = new Date().getTime() - serverTime.getTime();
            console.log("Time Diff: "+timeDiff+'ms');
            // ----
            CookieString = res.headers['set-cookie'][0];
            console.log(CookieString);
            const cookieRegex = /^JSESSIONID=(.*?);/;
            const parsedCookie = cookieRegex.exec(CookieString);
            console.log(parsedCookie[1]);
            CookieVal = parsedCookie[1];
            register(11366003);
        } else {
            console.log("SUCCESS?");
            // ----
            CookieString = res.headers['set-cookie'][0];
            console.log(CookieString);
            const cookieRegex = /^JSESSIONID=(.*?);/;
            const parsedCookie = cookieRegex.exec(CookieString);
            console.log(parsedCookie[1]);
            CookieVal = parsedCookie[1];
            // ----
            register(11366003);
        }
    }
}