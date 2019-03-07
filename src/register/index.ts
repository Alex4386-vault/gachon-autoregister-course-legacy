import util from "util";
import req from "request";
import persistents from "../gachon/persistent";
import { convertUTF8 } from "../utils";
import { CookieString } from "../login";
import queryString from 'querystring';

export function register(id) {
    const formData = queryString.stringify({
        subject_cd: id,
        save_gbn: "N",
        je_gbn: "N",
        fake: new Date().toString()
    });
    
    const options = {
        encoding: null,
        url: util.format("http://"+persistents.gachonUniv.apply+"/servlets/stud/sugang?attribute=sugang_save"),
        headers: {
            /*
             * To fake serverName identification, we don't need it since they don't do it.
             */
            //host: 'crong.cloud',
            /*
             * Mock up as Internet Explorer
             */
            'User-Agent':"Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko",
            'Cookie': CookieString,
            'Content-Length': formData.length,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData
    };

    req.post(options, (error, response, body) => 
    {
        if (response) {
            if (response.statusCode !== 200) {
                console.error("Server Side Error");
            }
        }
        const bodyString = convertUTF8(body);
        //console.log(bodyString);
        if (bodyString.includes('<body onLoad="logOut()">')) {
            console.error("EPIC FAIL ON REGISTERING "+id);
            
        } else if (bodyString.includes('alert("수강신청 정원 및 대기신청 정원이 초과하여 수강신청을 하실 수 없습니다!')) {
            console.error("Already Overflowed! "+id);

        } else if (bodyString.includes('alert("[신청중복] 이미 수강신청하신 과목입니다!");')) {
            console.error("Already Registered! "+id);

        } else {
            console.log("register success???"+id);

        }
    });
}
