# gachon-autoregister-course
가천대학교 자동 수강신청 프로그램 on Node.JS

## 안이 왜 이딴걸 왜 만들었어요
수강신청 올클 실패해서요. 불만있습니까? 으쯔라고요!

## 아 알겠는데 이거 원리가 뭔데?
일단 가천대학교의 수강신청시스템은 **JSP** *(Java Script Page)* 를 씁니다. (의미는 없긴 한데 으쯔라고요)  
그리고 수강신청신청시스템은 form 전송을 통해 수강신청을 진행합니다. 그럼 뭘 할지 알겠나요?  
  
**아니 모르겠는데 어쩌라고**  
form request 도 결론적으로는 http 리퀘입니다.  
그리고 JSP 라고 했으니 세션 정보가 cookie의 JSESSIONID 에 저장되게 되죠.  
  
그렇다면, 로그인 리퀘를 보내 세션아이디를 발급받고, 발급받은 다음에 쿠키를 탑재해서 form 리퀘를 두두두두 보내도록 자동화하면 수강신청을 올클 할 수 있겠죠?  
  
*이해를 포기한다*  
  
### 컴덕: 알겠는데 그 리퀘를 어디다가 보낼꺼야? 주소는 찾았어?
찾았으니까 이 짓거리를 하고 있겠죠?  
   
일단 가천대학교의 수강신청 시스템은 요렇게 생겨먹었습니다. (언제 만들었는지도 모르겠음, 경원대 때꺼 재탕한건가)  
  
![1](https://user-images.githubusercontent.com/27724108/53931728-be855200-40d9-11e9-80ab-b189d25c291e.jpg)  
  
우리가 관심 있는 부분은 수강신청을 해주는 로직이니까, 수강신청쪽 로직을 찾아보죠.    
![image](https://user-images.githubusercontent.com/27724108/53931776-fab8b280-40d9-11e9-828a-2a6ce8bb10b0.png)

함수 `save_it2` 를 호출하네요. 그러면 `save_it2` 를 찾아봅시다.  
![image](https://user-images.githubusercontent.com/27724108/53931820-2fc50500-40da-11e9-8ab1-424c13405b85.png)
![image](https://user-images.githubusercontent.com/27724108/53931843-51be8780-40da-11e9-9611-397640fde86a.png)
  
찾았- 습니다.-  
신청 구조를 더 자세히 보도록 하죠.  
  
![image](https://user-images.githubusercontent.com/27724108/53931946-a82bc600-40da-11e9-9e69-7e8d2e8539aa.png)
보내는 정보는 다음과 같았습니다.
  
```
POST Request

url: http://203.249.127.98:9090/servlets/stud/sugang?attribute=sugang_save
application/x-form-urlencoded

fake = new Date()
subject_cd = 학수번호
save_gbn = "N"
je_gbn = "N"
```
  
그래서 API GET!!

## 라이선스
[HRPL](https://github.com/Alex4386/HRPL), 불만입니까 휴먼? MIT License 인데 좀 자율성을 보완한 거예요.