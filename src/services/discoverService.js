import axios from "axios";

export async function searchUsersBySearchText(searchQuery, page, usersPerPage) {
  const { data } = await axios.get(`http://localhost:5000/api/search`, {
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
}
