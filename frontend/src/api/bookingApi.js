import api from "./axios";

export const createBooking = (payload) => api.post("/bookings", payload);
export const getMyBookings = () => api.get("/bookings/mybookings");