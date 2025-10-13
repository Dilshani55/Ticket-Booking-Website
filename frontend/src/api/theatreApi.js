import API from "./axios";

export const getTheatres = async () => {
  const { data } = await API.get("/theatres");
  return data;
};

export const addTheatre = async (theatre) => {
  const { data } = await API.post("/theatres", theatre); // Needs admin token
  return data;
};
