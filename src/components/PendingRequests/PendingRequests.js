// import React, { useEffect, useState } from "react";
// import {
//   fetchPendingRequests,
//   fetchUsersByUserIds,
//   handleFriendRequest,
// } from "../../services/discoverService";
// import Pagination from "../Common/Components/Pagination";

// export default function PendingRequests() {
//   const [pendingRequests, setPendingRequests] = useState([]);
//   const [page, setPage] = useState(1);
//   const usersPerPage = 10; // Number of users to show per page
//   const [totalPages, setTotalPages] = useState(0);

//   async function fetchUserPendingRequests() {
//     try {
//       const response = await fetchPendingRequests();
//       const totalResults = response.totalPendingRequests;
//       setTotalPages(Math.ceil(totalResults / usersPerPage));
//       const userIds = response.data.map((request) => request.requestSenderId);
//       const usersData = await fetchUsersByUserIds(userIds);

//       setPendingRequests(usersData.data);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   useEffect(() => {
//     fetchUserPendingRequests();
//   }, []);

//   const handlePageChange = (newPage) => {
//     setPage(newPage);
//     fetchUserPendingRequests();
//   };

//   const handleRequest = async (requestSenderId, action) => {
//     try {
//       const response = await handleFriendRequest(requestSenderId, action);
//       console.log(response);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="card">
//       <div className="card-body">
//         <h2 className="card-title">Pending Requests</h2>
//         <ul className="list-group">
//           {pendingRequests.length > 0 ? (
//             pendingRequests.map((request, index) => (
//               <li key={index} className="list-group-item">
//                 {request.fullName}
//                 <button
//                   className="btn btn-sm btn-primary ms-3"
//                   onClick={() => handleRequest(request._id, "ACCEPT")}
//                 >
//                   Accept
//                 </button>
//                 <button
//                   className="btn btn-sm btn-danger"
//                   onClick={() => handleRequest(request._id, "DECLINE")}
//                 >
//                   Decline
//                 </button>
//               </li>
//             ))
//           ) : (
//             <p>No pending requests</p>
//           )}
//         </ul>
//         <Pagination
//           currentPage={page}
//           totalPages={totalPages}
//           onPageChange={handlePageChange}
//         ></Pagination>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import {
  fetchPendingRequests,
  fetchUsersByUserIds,
  handleFriendRequest,
} from "../../services/discoverService";
import Pagination from "../Common/Components/Pagination";

export default function PendingRequests() {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [acceptedFriends, setAcceptedFriends] = useState([]); // Store accepted friend IDs
  const [page, setPage] = useState(1);
  const usersPerPage = 10; // Number of users to show per page
  const [totalPages, setTotalPages] = useState(0);

  async function fetchUserPendingRequests() {
    try {
      const response = await fetchPendingRequests();
      const totalResults = response.totalPendingRequests;
      setTotalPages(Math.ceil(totalResults / usersPerPage));
      const userIds = response.data.map((request) => request.requestSenderId);
      const usersData = await fetchUsersByUserIds(userIds);

      setPendingRequests(usersData.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUserPendingRequests();
  }, []);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchUserPendingRequests();
  };

  const handleRequest = async (requestSenderId, action) => {
    try {
      const response = await handleFriendRequest(requestSenderId, action);
      console.log(response);

      if (action === "ACCEPT") {
        setAcceptedFriends((prevAccepted) => [
          ...prevAccepted,
          requestSenderId,
        ]);
      }

      // Filter out declined request from pendingRequests
      if (action === "DECLINE") {
        setPendingRequests((prevRequests) =>
          prevRequests.filter((request) => request._id !== requestSenderId)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">Pending Requests</h2>
        <ul className="list-group">
          {pendingRequests.length > 0 ? (
            pendingRequests.map((request, index) => (
              <li key={index} className="list-group-item">
                {request.fullName}
                {acceptedFriends.includes(request._id) ? (
                  <span className="badge bg-success ms-3">
                    You are now friends
                  </span>
                ) : (
                  <>
                    <button
                      className="btn btn-sm btn-primary ms-3"
                      onClick={() => handleRequest(request._id, "ACCEPT")}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleRequest(request._id, "DECLINE")}
                    >
                      Decline
                    </button>
                  </>
                )}
              </li>
            ))
          ) : (
            <p>No pending requests</p>
          )}
        </ul>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        ></Pagination>
      </div>
    </div>
  );
}
