import API from "./api";

// Signup
export const signup = async (userData) => {
  const { data } = await API.post("/auth/signup", userData);
  return data;
};

// Login
export const login = async (userData) => {
  const { data } = await API.post("/auth/login", userData);
  return data;
};