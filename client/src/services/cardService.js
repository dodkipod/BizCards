import http from "./httpService";
// import { apiUrl } from "../config.json";
const apiUrl = process.env.PORT+"/api";

export function getAllCards() {
  return http.get(`${apiUrl}/cards/`);
}

export function deleteCard(cardId) {
  return http.delete(`${apiUrl}/cards/${cardId}`);
}

export function getCard(cardId) {
  return http.get(`${apiUrl}/cards/${cardId}`);
}

export function editCard(card) {
  const cardId = card._id;
  delete card._id;
  return http.put(`${apiUrl}/cards/${cardId}`, card);
}

export function getMyCards() {
  return http.get(`${apiUrl}/cards/my-cards`);
}

export function createCard(card) {
  return http.post(`${apiUrl}/cards`, card);
}

const service = {
  createCard,
  getMyCards,
  editCard,
  getCard,
  deleteCard,
  getAllCards,
};

export default service;
