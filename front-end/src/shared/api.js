import axios from 'axios';

const baseUrl = "/api";

export const getDebts = (aituId) => {
  const headers = {
    "Authorization": `Bearer ${aituId}`
  }

  return axios.get(`${baseUrl}/debts/`, { headers: headers })
        .then(res => res.data);
}

export const addDebt = (aituId, deckId, actionId) => {
  const headers = {
    "Authorization": `Bearer ${aituId}`
  }

  return axios.post(`${baseUrl}/debts/${deckId}/${actionId}`, {} , { headers: headers })
        .then(res => res.data);
}

export const removeDebt = (aituId, debtId) => {
  const headers = {
    "Authorization": `Bearer ${aituId}`
  }

  return axios.delete(`${baseUrl}/debts/${debtId}`, { headers: headers })
        .then(res => res.data);
}

export const getDecks = (aituId) => {
  const headers = {
    "Authorization": `Bearer ${aituId}`
  }

  return axios.get(`${baseUrl}/decks/`, { headers: headers })
        .then(res => res.data);
}

export const addDeck = (aituId, newDeck) => {
  const headers = {
    "Authorization": `Bearer ${aituId}`
  }

  return axios.post(`${baseUrl}/decks/`, newDeck , { headers: headers })
        .then(res => res.data);
}

export const archiveDeck = (aituId, deckId) => {
  const headers = {
    "Authorization": `Bearer ${aituId}`
  }

  return axios.delete(`${baseUrl}/decks/${deckId}`, { headers: headers })
        .then(res => res.data);
}