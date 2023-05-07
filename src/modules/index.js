import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import counter, { counterSaga } from "./counter";
import loading from "./loading";
import sample, { sampleSaga } from "./sample";

const rootReducer = combineReducers({
  counter,
  sample,
  loading,
});

export function* rootSaga() {
  // all 함수는 여러 사가 합쳐주는 역할
  yield all([counterSaga(), sampleSaga()]);
}

export default rootReducer;
