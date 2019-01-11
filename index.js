var req = require('request');
const util = require('util');
const queryString = require('querystring');
const persistents = require('./gachon/persistent');
const iconv = require('iconv-lite');

const gachonUniv = persistents.gachonUniv;
const credentials = persistents.credentials;

var encodeMe = (a) => encodeURIComponent(a);

const convertUTF8 = (euckr) => iconv.decode(euckr, "euckr");

var options = {
    url: util.format("http://"+gachonUniv.apply),
    headers: {
        //host: 'crong.cloud',
        'User-Agent':"Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko"
    }
}

function login() {
    let loginoptions = {
        encoding: null,
        url: util.format("http://"+gachonUniv.apply+"/servlets/core/login?attribute=login"),
        headers: {
            'User-Agent': "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko",
            'content-type': 'application/x-www-form-urlencoded'
        },
        body: "id="+encodeMe(credentials.id)+"&password="+encodeMe(credentials.password)
    };
    req.post(loginoptions, (error, response, body) => {
        if (error) {
            console.error(error);
        }
        if (response) {
            var responseBody = convertUTF8(body);
            console.log(responseBody);

            if (responseBody.includes('포탈 사용자 정보가 존재하지 않습니다!')) {
                console.error("LOGIN FAILED!");
                process.exit(1);
            }
        }
    })
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