import { API } from './constants';

export const createRide = position => fetch(`${API.URL}/ride`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      position,
    }),
  });

export const fetchRide = id => fetch(`${API.URL}/ride/${id}`);

export const confirmDriver = (id) => fetch(`${API.URL}/ride/${id}/confirm-driver`);

export const confirmPassenger = (id) => fetch(`${API.URL}/ride/${id}/confirm-passenger`);

export const scanPassenger = (id, position) => fetch(`${API.URL}/ride/${id}/scan-passenger`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      position,
    }),
  });
