import api from "./axios";

export const createCheckout = (payload) => api.post("/payment/checkout", payload);