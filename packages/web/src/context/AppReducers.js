import {
  CLEAN_ERROR,
  CREATE_CHATS_ERROR,
  CREATE_CHATS_PENDING,
  CREATE_CHATS_SUCCESS,
  CREATE_NEWS_ERROR,
  CREATE_NEWS_PENDING,
  CREATE_NEWS_SUCCESS,
  DELETE_NEWS,
  DELETE_NEWS_ERROR,
  DELETE_NEWS_PENDING,
  FETCH_CHATS_ERROR,
  FETCH_CHATS_PENDING,
  FETCH_CHATS_SUCCESS,
  FETCH_NEWS_ERROR,
  FETCH_NEWS_PENDING,
  FETCH_NEWS_SUCCESS,
  LOGIN_USER,
  LOGIN_USER_ERROR,
  LOGIN_USER_PENDING,
  LOGOUT_USER,
  REGISTER_USER,
  REGISTER_USER_ERROR,
  REGISTER_USER_PENDING,
  UPDATE_CHATS_SUCCESS,
  UPDATE_NEWS_ERROR,
  UPDATE_NEWS_PENDING,
  UPDATE_NEWS_SUCCESS,
  SET_ERROR,
} from "./actionTypes";

const globalReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_USER:
    case LOGOUT_USER:
    case CLEAN_ERROR:
      return { ...state, ...action.payload, pending: false };
    case FETCH_CHATS_SUCCESS:
      return { ...state, chats: action.payload, chatsPending: false };
    case FETCH_CHATS_PENDING:
    case CREATE_CHATS_PENDING:
      return { ...state, chatsPending: true };
    case REGISTER_USER_PENDING:
    case UPDATE_NEWS_PENDING:
    case CREATE_NEWS_PENDING:
    case DELETE_NEWS_PENDING:
    case FETCH_NEWS_PENDING:
    case LOGIN_USER_PENDING:
      return { ...state, pending: true };
    case FETCH_CHATS_ERROR:
    case CREATE_NEWS_ERROR:
      return { ...state, chatsPending: false, error: action.payload };
    case SET_ERROR:
    case REGISTER_USER:
    case UPDATE_NEWS_ERROR:
    case REGISTER_USER_ERROR:
    case CREATE_CHATS_ERROR:
    case DELETE_NEWS_ERROR:
    case FETCH_NEWS_ERROR:
    case LOGIN_USER_ERROR:
      return { ...state, pending: false, error: action.payload };
    case CREATE_NEWS_SUCCESS:
      return {
        ...state,
        news: [action.payload, ...state.news],
        chatsPending: false,
      };
    case UPDATE_CHATS_SUCCESS:
    case CREATE_CHATS_SUCCESS:
      return {
        ...state,
        chats: [...state.chats, action.payload],
        chatsPending: false,
      };
    case FETCH_NEWS_SUCCESS:
      return { ...state, news: action.payload, pending: false };
    case UPDATE_NEWS_SUCCESS:
      return {
        ...state,
        pending: false,
        news: [
          ...state.news.filter((n) => n._id !== action.payload._id),
          action.payload,
        ],
      };

    case DELETE_NEWS:
      return {
        ...state,
        pending: false,
        news: state.news.filter((news) => news._id !== action.payload),
      };
    default:
      return state;
  }
};

export default globalReducer;
