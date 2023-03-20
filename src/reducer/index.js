const initialState = {
  destacada: [],
  populares: [],
  modal: false,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_DESTACADA":
      return {
        ...state,
        destacada: action.payload,
      };

    case "GET_POPULARES":
      return {
        ...state,
        populares: action.payload,
      };
    case "OPEN_MODAL":
      return {
        ...state,
        modal: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
