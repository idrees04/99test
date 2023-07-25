// githubApi.js

import axios from "axios";
export const url = "https://api.babylonclubhouse.com";
export const url2 = "https://api.babylonclubhouse.com/auth/v1";

export const handleEmailLogin = (email, password) => {
  const data = {
    email,
    password,
  };

  try {
    return axios
      .post(`${url}/auth/v1/login`, JSON.stringify(data), tokenConfig())
      .then((res) => {
        console.log("res.data.data", res.data.data);
        return res.data.data;
      })
      .catch((e) => {
        throw new Error(e.response.data.message);
      });
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const emailSignUp = async (email, password) => {
  const body = { email, password };
  try {
    const res = await axios.post(
      `${url2}/signup`,
      JSON.stringify(body),
      tokenConfig()
    );
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const tokenConfig = () => {
  var token = localStorage.getItem("userToken");
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
};
