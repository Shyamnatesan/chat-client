import axios from "axios";

export async function signup(userDetails) {
  try {
    const { data } = await axios.post("http://localhost:5000/auth/signup", {
      userDetails,
    });

    const { status } = data;
    if (status) {
      localStorage.setItem("token", data.token);
      return { status, data };
    } else {
      return status;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function verifyToken() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "http://localhost:5000/auth/verifyToken",
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function login(userDetails) {
  try {
    const { data } = await axios.post("http://localhost:5000/auth/login", {
      userDetails,
    });

    const { status } = data;

    if (status) {
      console.log("token set");
      localStorage.setItem("token", data.token);
      return { status, data };
    } else {
      return status;
    }
  } catch (error) {
    console.log(error);
  }
}
