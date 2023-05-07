import { createAction, handleActions } from "redux-actions";
import { delay, put, takeEvery, takeLatest, select } from "redux-saga/effects";

const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";
const INCREASE_ASYNC = "counter/INCREASE_ASYNC";
const DECREASE_ASYNC = "counter/DECREASE_ASYNC";

export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);
// 마우스 클릭 이벤트가 payload 안에 들어가지 않도록 ()=>undefined룰 두번째 파라미터로 넣어줌
export const increaseAsync = createAction(INCREASE_ASYNC, () => undefined);
export const decreaseAsync = createAction(DECREASE_ASYNC, () => undefined);

function* increaseSaga() {
  yield delay(1000); // 1초 대기
  yield put(increase()); // 특정 액션 디스패치
  const number = yield select((state) => state.counter); // state는 스토어 상태 의미
  console.log(`현재 값은 ${number}입니다`);
}
function* decreaseSaga() {
  yield delay(1000); // 1초 대기
  yield put(decrease()); // 특정 액션 디스패치
}

export function* counterSaga() {
  // takeEvery는 들어오는 모든 액션에 대해 특정 작업 처리해줌
  yield takeEvery(INCREASE_ASYNC, increaseSaga);
  // takeLatest는 기존 진행중이던 작업 있다면 취소처리하고 가장 마지막으로 실행된 작업만 수행
  yield takeLatest(DECREASE_ASYNC, decreaseSaga);
}

// 1초 뒤에 increase 또는 decrease 함수를 디스패치 함
// export const increaseAsync = () => (dispatch) => {
//   setTimeout(() => {
//     dispatch(increase());
//   }, 1000);
// };
// export const decreaseAsync = () => (dispatch) => {
//   setTimeout(() => {
//     dispatch(decrease());
//   }, 1000);
// };

const initialState = 0;

const counter = handleActions(
  {
    [INCREASE]: (state) => state + 1,
    [DECREASE]: (state) => state - 1,
  },
  initialState
);

export default counter;
