import axios from "axios";

export function getDestacada() {
  return async function (dispatch) {
    var json = await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=6f26fd536dd6192ec8a57e94141f8b20",
      {}
    );
    return dispatch({
      type: "GET_DESTACADA",
      payload: json.data,
    });
  };
}

export function getPopulares() {
  return async function (dispatch) {
    var json = await axios.get(
      "https://api.themoviedb.org/3/movie/popular?api_key=6f26fd536dd6192ec8a57e94141f8b20",
      {}
    );
    return dispatch({
      type: "GET_POPULARES",
      payload: json.data,
    });
  };
}

export function openModal(payload) {
  return {
    type: "OPEN_MODAL",
    payload,
  };
}
