import axios from "axios";
const uri = "http://localhost:5000";

export async function fetchFriendsForUser() {
  try {
    const { data } = await axios.get(`${uri}/getFriends`, {
      headers: { Authorization: localStorage.getItem("token") },
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchRoomId(user) {
  try {
    const { data } = await axios.post(
      `${uri}/getRoomid`,
      { user: user },
      { headers: { Authorization: localStorage.getItem("token") } }
    );

    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
