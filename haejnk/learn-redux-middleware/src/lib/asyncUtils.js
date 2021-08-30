import { call, put } from 'redux-saga/effects';

// 프로미스를 기다렸다가 결과를 디스패치하는 사가
export const createPromiseSaga = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return function* saga(action) {
    try {
      // 재사용성을 위하여 promiseCreator의 파라미터엔 action.payload 값을 넣도록 설정
      const payload = yield call(promiseCreator, action.payload);
      yield put({ type: SUCCESS, payload });
    } catch (e) {
      yield put({ type: ERROR, error: true, payload: e });
    }
  };
};

// 특정 id 의 데이터를 조회하는 용도로 사용하는 사가
// API 를 호출할 때 파라미터는 action.payload 를 넣고,
// id 값을 action.meta 로 설정
export const createPromiseSagaById = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return function* saga(action) {
    const id = action.meta;
    try {
      const payload = yield call(promiseCreator, action.payload);
      yield put({ type: SUCCESS, payload, meta: id });
    } catch(e) {
      yield put({ type: ERROR, error: e, meta: id });
    }
  };
};

// 리듀서에서 사용할 수 있는 여러 유틸 함수
export const reducerUtils = {
  // 초기 상태. 초기 data 값은 기본적으로 null 이지만
  // 바꿀 수 있다.
  initial: (initialData = null) => ({
    loading: false,
    data: initialData,
    error: null
  }),
  // 로딩중 상태. prevState 의 경우엔 기본값은 null 이지만
  // 따로 값을 지정하면 null 로 바꾸지 않고 다른 값 유지 가능
  loading: (prevState = null) => ({
    loading: true,
    data: prevState,
    error: null
  }),
  // 성공 상태!
  success: payload => ({
    loading: false,
    data: payload,
    error: null
  }),
  // 실패 상태
  error: error => ({
    loading: false,
    data: null,
    error: error
  })
};

// 비동기 관련 액션들을 처리하는 리듀서를 만들어줍니다.
// type 은 액션의 타입, key 는 상태의 key (예: posts, post )
export const handleAsyncActions = (type, key, keepData = false)=> {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return (state, action) => {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: reducerUtils.loading(keepData ? state[key].data : null)
        };
      case SUCCESS:
        return {
          ...state,
          [key]: reducerUtils.success(action.payload)
        };
      case ERROR:
        return {
          ...state,
          [key]: reducerUtils.error(action.payload)
        };
      default:
        return state;
    }
  };
};

// id별로 처리하는 유틸함수
export const handleAsyncActionsById = (type, key, keepData = false) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return (state, action) => {
    const id = action.meta;
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: reducerUtils.loading(
              // state[key][id]가 만들어져있지 않을 수도 있으니까 유효성을 먼저 검사 후 data 조회
              keepData ? state[key][id] && state[key][id].data : null
            )
          }
        };
      case SUCCESS:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: reducerUtils.success(action.payload)
          }
        };
      case ERROR:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: reducerUtils.error(action.payload)
          }
        };
      default:
        return state;
    }
  };
};