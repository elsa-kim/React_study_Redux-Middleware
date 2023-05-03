import { combineReducers } from "redux";
import counter from "./counter";
import loading from "./loading";
import sample from "./sample";

const rootReducer = combineReducers({
  counter,
  sample,
  loading,
});

export default rootReducer;
