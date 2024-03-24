import axios from "axios";

axios.defaults.baseURL =
  "https://nannies-service-7f22d-default-rtdb.europe-west1.firebasedatabase.app/";

export const fetchNannies = async (params) => {
  const searchParams = new URLSearchParams(params);

  const queryString = searchParams.toString();

  const { data } = await axios.get(`${queryString}`);
  return data;
};
