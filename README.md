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

- redux-saga 유용한 경우
  - 기존 요청을 취소 처리해야 할 때(불필요한 중복 요청 방지)
  - 특정 액션이 발생했을 때 다른 액션 발생시키거나, API 요청 등 리덕스와 관계없는 코드 실행할 때
  - 웹소켓 사용할 때
  - API 요청 실패 시 재요청해야 할 때
- 제너레이터(generator) 함수 문법 사용

#### 제너레이터 함수 문법

- 함수 작성 시 함수를 특정 구간에 멈춰놓을 수 있고, 원할 때 다시 돌아가게 할 수 있는 것이 핵심기능
- 하나 이하의 값만을 반환하는 일반함수와 달리 제너레이터를 시용하면 여러개의 값을 필요에 따라 하나씩 반환(yield) 가능
- 제너레이터 함수 만들때 function\* 키워드 사용
- 제너레이터 함수 호출했을 때 코드가 실행되지 않고, 대신 실행을 처리하는 제너레이터 객체 반환됨
- 제너레이터 처음 만들어지면 함수 흐름 멈춰있는 상태, next() 호출되면 다름 yield 있는 곳까지 호출하고 다시 함수 멈춤
  - next()는 제너레이터 주요 메서드로, 항상 value, done 프로퍼티 가진 객체 반환
    - value : 산출값(없을 경우 undefined)
    - done : 함수 코드 끝났으면 true, 아니라면 false
  - next() 호출 시 가장 가까운 yield <value> 문 만날때까지 실행 지속
  - next 함수에 파라미터 넣으면 제너레이터 함수에서 yield 사용해 해당 값 조회 가능

#### redux-saga가 제공하는 유용한 기능들

- select : 사가 내부에서 현재 상태 참조해야 할 때 사용
- throttle 함수 : takeEvery 대신 사용하면 사가가 n초에 단 한번만 호출되도록 설정(실행 주기 제한)
