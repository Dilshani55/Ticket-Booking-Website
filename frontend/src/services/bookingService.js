import API from "./api";

// Create booking
export const createBooking = async (bookingData) => {
  const { data } = await API.post("/bookings", bookingData);
  return data;
};

// Get my bookings
export const getMyBookings = async () => {
  const { data } = await API.get("/bookings/mybookings");
  return data;
};

// Cancel booking (example: DELETE)
export const cancelBooking = async (id) => {
  const { data } = await API.delete(/bookings/${id});
  return data;
};