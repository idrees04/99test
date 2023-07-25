// author Muhammad idrees

import axios from "axios";
export const url = "https://reqres.in/api";
export const url3="https://randomuser.me/api/";

export const handleEmailLogin = (email, password) => {
  const data = {
    email,
    password,
  };

  try {
    return axios
      .post(`${url}/login`, JSON.stringify(data), tokenConfig())
      .then((res) => {
        console.log("res.data.data", res.data);
        return res.data;
      })
      .catch((e) => {
       throw new Error(e.response.data.error);
      });
  } catch (error) {
    throw new Error(error);
  }
};

export const emailSignUp = async (email, password) => {
  const body = { email, password };
  try {
    const res = await axios.post(
      `${url}/register`,
      JSON.stringify(body),
      tokenConfig()
    );
    return res.data;
  } catch (error) {
    console.log(error.response.data.error)
    throw new Error(error.response.data.error);
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

export const getData = async () => {
  try {
    const response = await axios.get(url3);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
};