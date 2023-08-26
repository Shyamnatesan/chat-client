import axios from "axios";

const uri = "http://localhost:5000";
let count = 1;
export async function getMessagesByRoomId(roomId, lastMessageTimestamp) {
  console.log(count);
  count += 1;
  console.log(roomId, lastMessageTimestamp);
  try {
    const { data } = await axios.get(`${uri}/getMessages/${roomId}`, {
      headers: { Authorization: localStorage.getItem("token") },
      params: {
        lastMessageTimestamp: lastMessageTimestamp,
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
