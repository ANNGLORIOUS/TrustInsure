import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api"; // Django backend

export const getPolicies = () => axios.get(`${API_URL}/policies/`);
export const getClaims = () => axios.get(`${API_URL}/claims/`);
export const getPayments = () => axios.get(`${API_URL}/payments/`);

export const createPolicy = (data: any) => axios.post(`${API_URL}/policies/`, data);
export const updateClaimStatus = (id: number, status: string) => 
  axios.patch(`${API_URL}/claims/${id}/`, { status });
