import axios from "axios";
const uri = "http://localhost:5000";

export async function searchUsersBySearchText(searchQuery, page, usersPerPage) {
  try {
    const { data } = await axios.get(`${uri}/api/search`, {
      params: {
        q: searchQuery,
        page: page,
        perPage: usersPerPage,
      },
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchSentRequests() {
  try {
    const { data } = await axios.get(`${uri}/fetchSentRequests`, {
      headers: { Authorization: localStorage.getItem("token") },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function sendFriendRequest(requestReceiverId) {
  try {
    const { data } = await axios.post(
      `${uri}/sendFriendRequest`,
      {
        requestReceiverId,
      },
      { headers: { Authorization: localStorage.getItem("token") } }
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchPendingRequests() {
  try {
    const { data } = await axios.get(`${uri}/pendingRequests`, {
      headers: { Authorization: localStorage.getItem("token") },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchUsersByUserIds(userIds) {
  try {
    const { data } = await axios.post(
      `${uri}/getUsersByIds`,
      {
        userIds,
      },
      { headers: { Authorization: localStorage.getItem("token") } }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function handleFriendRequest(requestSenderId, action) {
  try {
    const { data } = axios.post(
      `${uri}/friendRequestAction`,
      { requestSenderId, action },
      { headers: { Authorization: localStorage.getItem("token") } }
    );
  } catch (error) {
    console.log(error);
  }
}
