import axios from "axios";

const API_URL = "https://dummyjson.com";

export const getAllRecipes = async () => {
  const response = await axios.get(
    `${API_URL}/recipes?limit=0`
  );

  return response.data.recipes;
};

export const searchRecipes = async (query) => {
  const response = await axios.get(
    `${API_URL}/recipes/search?q=${encodeURIComponent(query)}`
  );

  return response.data.recipes;
};

export const getRecipe = async (id) => {
  const response = await axios.get(
    `${API_URL}/recipes/${id}`
  );

  return response.data;
};

export const loginUser = async (username, password) => {
  const response = await axios.post(
    `${API_URL}/auth/login`,
    {
      username,
      password,
      expiresInMins: 60,
    },
    {
      withCredentials: true,
    }
  );

  return response.data;
};