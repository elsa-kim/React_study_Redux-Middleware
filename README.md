# 미들웨어

리덕스 미들웨어 : 액션을 디스패치했을 때 리듀서에서 이를 처리하기에 앞서 사전에 지정된 작업들을 실행함, 함수를 반환하는 함수를 반환하는 함수

- 기본 구조 :

```
const loggerMiddleware = (store) => (next) => (action) => {
  // 미들웨어 기본 구조
};

export default loggerMiddleware;

or

const loggerMiddleware = function loggerMiddleware(store) {
return function(next) {
  return function(action) {
    // 미들웨어 기본 구조
  };
};
};

export default loggerMiddleware;
```

- 파라미터로 받아오는 값
  - store : 리덕스 스토어 인스턴스를 가리킴
  - action : 디스패치 된 액션을 가리킴
  - next : 함수 형태로, store.dispatch와 비슷한 역할 하지만 큰 차이점 있음
    - next(action) 호출 시 그 다음 처리해야 할 미들웨어에게 액션을 넘겨주고, 만약 그 다음 미들웨어가 없다면 리듀서에게 액션 넘겨줌
    - 미들웨어 내부에서 store.dispatch 사용하면 첫번째 미들웨어부터 다시 처리, 미들웨어에서 next 사용하지 않으면 액션이 리듀서에 전달되지 않음

## redux-logger 사용하기

오픈 소스 커뮤니티에 올라와 있는 라이브러리로 브라우저 콘솔에 나타나는 형식 깔끔

## 비동기 작업 처리하는 미들웨어 사용

### redux-thunk

비동기 작업 처리 시 가장 많이 사용하는 미들웨어, 객체가 아닌 함수 형태의 액션을 디스패치 할 수 있게 해줌

- Thunk : 특정 작업을 나중에 할 수 있도록 미루기 위해 함수 형태로 감싼 것
- redux-thunk 라이브러리 사용하면 thunk 함수 만들어 디스패치할 수 있음
- 리덕스 미들웨어가 함수 전달받아 store의 dispatch와 getState를 파라미터로 넣어 호출해줌

#### 연습용 api

- 포스트 읽기 (id는 1~100 숫자) : GET https://jsonplaceholder.typicode.com/posts/:id
- 모든 사용자 정보 불러오기 : GET https://jsonplaceholder.typicode.com/users
- api 통해 전달받은 데이터 형식

  - post

  ```
  {
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  }
  ```

  - users

  ```
  [
  {
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
   },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
   }
  },
  (...)
  ]
  ```

#### 리팩토링

API 요청시마다 thunk 함수 작성하는 것과 로딩 상태를 리듀서에서 관리하는 작업은 코드를 길어지게 만드므로 반복되는 로직을 따로 분리해 코드 양 줄임
ex)lib/createRequestThunk.js

### redux-saga

두번째로 많이 사용되는 비동기 작업 관련 미들웨어 라이브러리, 특정 액션이 디스패치 되었을 때 정해진 로직에 따라 다른 액션을 디스패치시키는 규칙 작성해 비동기 작업 처리
