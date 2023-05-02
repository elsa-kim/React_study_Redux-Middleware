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
  - next : 함수 형태로, store.dispatch와 비슷한 역할 하지만 큰 차이점 있음; next(action) 호출 시 그 다음 처리해야 할 미들웨어에게 액션을 넘겨주고, 만약 그 다음 미들웨어가 없다면 리듀서에게 액션 넘겨줌 / 미들웨어 내부에서 store.dispatch 사용하면 첫번째 미들웨어부터 다시 처리, 미들웨어에서 next 사용하지 않으면 액션이 리듀서에 전달되지 않음
