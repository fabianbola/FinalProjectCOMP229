/* 
  File Name: listUsers.js
  Description: This React component fetches a list of registered users (excluding admins) from the API, displays them in a table, 
               and allows non-admin users to be deleted. It also shows a loading state while data is being fetched and handles errors.
  Team's name: BOFC 
  Group number: 04
  Date: November 23, 2024
*/

import { useEffect, useState } from "react";
import { listUsers, removeUser } from "../../datasource/API-user";

const ListUsers = () => {
  const [userList, setUserList] = useState([]);  // State to store the list of users
  const [isLoading, setIsLoading] = useState(true);  // State to handle loading state

  // Fetch the list of users from the API when the component mounts
  useEffect(() => {
    setIsLoading(true);  // Set loading state to true before fetching data
    listUsers()
      .then((data) => {
        if (data) {
          // Filter users to show only non-admin users (admin: false)
          const nonAdminUsers = data.filter((user) => user.admin === false);
          setUserList(nonAdminUsers);  // Set the state with the filtered non-admin users
        }
      })
      .catch((err) => {
        alert(err.message);  // Alert the user if there is an error
        console.error(err);  // Log the error to the console
      })
      .finally(() => setIsLoading(false));  // Set loading state to false once the fetch is complete
  }, []);

  // Handle the removal of a user
  const handleRemove = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {  // Confirm before deleting
      removeUser(id)
        .then((data) => {
          if (data && data.success) {
            const updatedList = userList.filter((user) => user.id !== id);  // Remove the user from the list
            setUserList(updatedList);  // Update the user list state
            alert("User deleted successfully.");  // Show success message
          } else {
            alert(data.message || "Failed to delete user.");  // Show error message if deletion fails
          }
        })
        .catch((err) => {
          alert(err.message);  // Alert the user if there is an error during the deletion process
          console.error(err);  // Log the error to the console
        });
    }
  };

  return (
    <main className="container" style={{ paddingTop: 80 }}>
      <div className="row">
        <h1>Registered Users</h1>
        <div className="table-responsive mt-4">
          {isLoading && <div>Loading...</div>}
          {!isLoading && (!userList || userList.length === 0) && <div>No non-admin users found.</div>}  
          {!isLoading && userList.length > 0 && (
            <table className="table table-bordered table-striped table-hover">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {userList.map((user) => (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        type="button"
                        onClick={() => handleRemove(user.id)}  // Handle delete button click
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
};

export default ListUsers;
