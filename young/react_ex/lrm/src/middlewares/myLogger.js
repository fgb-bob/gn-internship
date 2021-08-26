const myLogger = store => next => action => {
    console.log(action); // 먼저 액션을 출력합니다.
    const result = next(action); // 다음 미들웨어 (또는 리듀서) 에게 액션을 전달합니다.
    
    //업데이트 이후의 상태를 조회합니다.
    console.log('\t', store.getState());
    
    return result; // 여기서 반환하는 값은 dispatch(action)의 결과물이 됩니다. 기본: undefined
  };
  
  export default myLogger;


// // 액션 값을 객체가 아닌 함수로 받아오게 만들수도있습니다...
// const thunk = store => next => action =>
//   typeof action === 'function'
//   ? action(store.dispatch, store.getState) : next(action)

//   const myThunk = () => (dispatch, getState) => {
//       dispatch({type : 'HELLO'});
//       dispatch({type : 'BYE'});
//   }

// 나중엔 dispatch할 떄 다음과 같이 할 수도 있... 게된다.....
//   dispatch(myThunk());

