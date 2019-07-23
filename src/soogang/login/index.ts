import persistent from "../../gachon/persistent";

interface LoginRequest {
    id: string,
    pwd: string,
}

enum Language {
    KOREAN = "ko",
    ENGLISH = "en",
}

enum RegistrationStyle {
    PRE_REGISTRATION = "B",
    REAL_REGISTRATION = "S"
}

function urlGenerator(schedule_cd: RegistrationStyle) {
    return "https://"+persistent.gachonUniv.apply+"/login?attribute=loginChk&schedule_cd="+schedule_cd
}

function login() {

}
