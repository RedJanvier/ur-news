import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducers";
import { BASE_URL, ENDPOINTS } from "../constants";
import {
  LOGIN_USER,
  LOGIN_USER_ERROR,
  LOGIN_USER_PENDING,
  LOGOUT_USER,
  DELETE_NEWS,
  REGISTER_USER_PENDING,
  REGISTER_USER,
  REGISTER_USER_ERROR,
  CREATE_CHATS_PENDING,
  CREATE_CHATS_ERROR,
  UPDATE_CHATS_SUCCESS,
  CREATE_CHATS_SUCCESS,
  FETCH_CHATS_PENDING,
  FETCH_CHATS_ERROR,
  FETCH_CHATS_SUCCESS,
  FETCH_NEWS_PENDING,
  FETCH_NEWS_ERROR,
  FETCH_NEWS_SUCCESS,
  UPDATE_NEWS_PENDING,
  UPDATE_NEWS_ERROR,
  UPDATE_NEWS_SUCCESS,
  DELETE_NEWS_PENDING,
  DELETE_NEWS_ERROR,
  CLEAN_ERROR,
  CREATE_NEWS_PENDING,
  CREATE_NEWS_ERROR,
  CREATE_NEWS_SUCCESS,
} from "./actionTypes";

const initialState = {
  pending: false,
  chatsPending: false,
  token: localStorage.getItem("token") || null,
  userId: null,
  regNumber: null,
  role: null,
  news: [],
  chats: [],
  error: "",
};

export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, {
    ...initialState,
    ...JSON.parse(localStorage.getItem("userData")),
  });

  async function apiRequest(
    endpoint,
    body = null,
    method = "GET",
    contentType = "Application/json",
    token = state.token || localStorage.getItem("token")
  ) {
    const config = { method, headers: {} };
    if (body) {
      switch (contentType) {
        case "multipart/form-data":
          config.body = body;
          break;
        default:
          config.body = JSON.stringify(body);
          config.headers["Content-Type"] = contentType;
      }
    }
    if (token) config.headers.Authorization = `Bearer ${token}`;
    const res = await fetch(BASE_URL + endpoint, config);
    const data = await res.json();
    return data;
  }

  async function login(payload) {
    try {
      dispatch({ type: LOGIN_USER_PENDING });
      const {
        success,
        token,
        userId,
        regNumber,
        role,
        error,
      } = await apiRequest("/api/v1/users/login", payload, "POST");
      if (success) {
        dispatch({
          type: LOGIN_USER,
          payload: { token, userId, regNumber, role },
        });
        localStorage.setItem("token", token);
        localStorage.setItem(
          "userData",
          JSON.stringify({ userId, regNumber, role })
        );
      } else {
        dispatch({ type: LOGIN_USER_ERROR, payload: error });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: LOGIN_USER_ERROR, payload: error });
    }
  }

  async function register(payload) {
    try {
      dispatch({ type: REGISTER_USER_PENDING });
      const { success, error } = await apiRequest(
        ENDPOINTS.register,
        payload,
        "POST"
      );
      if (!success) {
        return dispatch({
          type: REGISTER_USER_ERROR,
          payload: error || "Registration failed!",
        });
      }
      dispatch({ type: REGISTER_USER, payload: "Registered successfully" });
    } catch (error) {
      console.log(error.message);
      dispatch({ type: REGISTER_USER_ERROR, payload: error.message });
    }
  }

  function logout() {
    localStorage.clear();
    dispatch({
      type: LOGOUT_USER,
      payload: { ...initialState, token: null },
    });
  }

  function cleanError() {
    dispatch({
      type: CLEAN_ERROR,
      payload: { error: "" },
    });
  }

  async function fetchNews(id) {
    try {
      dispatch({ type: FETCH_NEWS_PENDING });
      const { success, error, data: news } = await apiRequest(
        id === undefined ? ENDPOINTS.news : ENDPOINTS.newsByAuthor + id
      );
      if (!success) {
        return dispatch({
          type: FETCH_NEWS_ERROR,
          payload: error || "Failed to load news! Try Reloading...",
        });
      }
      dispatch({ type: FETCH_NEWS_SUCCESS, payload: news });
    } catch (error) {
      console.log(error.message);
      dispatch({ type: FETCH_NEWS_ERROR, payload: error.message });
    }
  }

  async function deleteNews(id) {
    try {
      dispatch({ type: DELETE_NEWS_PENDING });
      const { success, error, count } = await apiRequest(
        ENDPOINTS.news + id,
        null,
        "DELETE"
      );
      if (!success || count <= 0)
        return dispatch({
          type: DELETE_NEWS_ERROR,
          payload: error || "Unable to delete news",
        });
      dispatch({ type: DELETE_NEWS, payload: id });
    } catch (error) {
      console.log(error);
      dispatch({
        type: DELETE_NEWS_ERROR,
        payload: error || "Unable to delete news",
      });
    }
  }

  async function updateNews(id, payload) {
    try {
      dispatch({ type: UPDATE_NEWS_PENDING });
      const { success, error, data } = await apiRequest(
        ENDPOINTS.news + id,
        payload,
        "PUT"
      );
      if (!success)
        return dispatch({ type: UPDATE_NEWS_ERROR, payload: error });
      dispatch({ type: UPDATE_NEWS_SUCCESS, payload: data });
      return success;
    } catch (error) {
      console.log(error);
      dispatch({
        type: UPDATE_NEWS_ERROR,
        payload: error || "Unable to update news",
      });
    }
  }

  async function createNews(payload) {
    try {
      dispatch({ type: CREATE_NEWS_PENDING });
      const { success, data, error } = await apiRequest(
        ENDPOINTS.createNews,
        payload,
        "POST",
        "multipart/form-data"
      );
      if (!success) {
        dispatch({ type: CREATE_NEWS_ERROR, payload: error });
        return null;
      }
      dispatch({ type: CREATE_NEWS_SUCCESS, payload: data });
      return success;
    } catch (error) {
      console.log(error);
      dispatch({
        type: CREATE_NEWS_ERROR,
        payload: error || "Unable to create news!",
      });
    }
  }

  async function fetchChats() {
    try {
      dispatch({ type: FETCH_CHATS_PENDING });
      const { success, chats, error } = await apiRequest(ENDPOINTS.chats);
      if (!success) dispatch({ type: FETCH_CHATS_ERROR, payload: error });
      else
        dispatch({
          type: FETCH_CHATS_SUCCESS,
          payload: chats,
        });
      return success;
    } catch (error) {
      dispatch({ type: FETCH_CHATS_ERROR, payload: error });
    }
  }

  function updateChats(payload) {
    dispatch({ type: UPDATE_CHATS_SUCCESS, payload });
  }

  async function createChat(payload) {
    try {
      dispatch({ type: CREATE_CHATS_PENDING });
      const { success, chat, error } = await apiRequest(
        ENDPOINTS.chat,
        payload,
        "POST"
      );
      if (!success) dispatch({ type: CREATE_CHATS_ERROR, payload: error });
      else dispatch({ type: CREATE_CHATS_SUCCESS, payload: chat });
      return success;
    } catch (error) {
      dispatch({ type: CREATE_CHATS_ERROR, payload: error });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        updateChats,
        createChat,
        fetchChats,
        deleteNews,
        updateNews,
        createNews,
        cleanError,
        apiRequest,
        fetchNews,
        login,
        logout,
        register,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
