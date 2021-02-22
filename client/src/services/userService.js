import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const tokenKey = "token";

export function deleteFavorite(cardID) {
  return http.delete(`${apiUrl}/users/favorites`,{ data:{cardID} });
}


export function getFavorites() {
  return http.get(`${apiUrl}/users/favorites`);
}

export function addFavorite(cardID) {
  return http.patch(`${apiUrl}/users/favorites`, { cardID });
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export async function login(email, password) {
  const { data } = await http.post(`${apiUrl}/auth`, { email, password });
  localStorage.setItem(tokenKey, data.token);
}

const user = {
  login,
  getCurrentUser,
  logout,
  getJwt,
  addFavorite,
  getFavorites,
  deleteFavorite,
};

export default user;
