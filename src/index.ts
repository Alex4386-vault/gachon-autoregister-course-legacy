import req from "request";
import util from 'util';
import persistents from './gachon/persistent';
import { encodeMe, convertUTF8 } from './utils';
import { loginOptions, loginHandler } from './login';

const gachonUniv = persistents.gachonUniv;
const credentials = persistents.credentials;

let JSESSIONID = "";

const options = {
    url: util.format("http://"+gachonUniv.apply),
    headers: {
        /*
         * To fake serverName identification, we don't need it since they don't do it.
         */
        //host: 'crong.cloud',
        /*
         * Mock up as Internet Explorer
         */
        'User-Agent':"Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko"
    }
}

function login() {
    req.post(loginOptions, loginHandler)
}

function send() {
    req.get(options, (error, response, body) => 
    {
        if (response) {
            if (response.statusCode !== 200) {
                console.error("Server Side Error");
            } else {
                console.log(response);
            }
        }
        console.log(body);
    });
}

login();
//send();