export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000"
    : "https://newsposter.herokuapp.com";

export const NODE_ENV = process.env.NODE_ENV;
export const ENDPOINTS = {
  register: "/api/v1/users/register",
  login: "/api/v1/users/login",
  chats: "/api/v1/chats/",
  chat: "/api/v1/chat/",
  news: "/api/v1/news/",
  newsByAuthor: "/api/v1/news/by/",
  createNews: "/api/v1/news/create",
};
