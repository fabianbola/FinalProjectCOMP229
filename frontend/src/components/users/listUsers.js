import { useEffect, useState } from "react";
import { listUsers, removeUser } from "../../datasource/API-user";

const ListUsers = () => {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    listUsers()
      .then((data) => {
        if (data) {
          // Filtramos los usuarios que no son admin (admin: false)
          const nonAdminUsers = data.filter((user) => user.admin === false);
          setUserList(nonAdminUsers);  // Solo usuarios no admin
        }
      })
      .catch((err) => {
        alert(err.message);
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleRemove = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      removeUser(id)
        .then((data) => {
          if (data && data.success) {
            const updatedList = userList.filter((user) => user.id !== id);
            setUserList(updatedList);
            alert("User deleted successfully.");
          } else {
            alert(data.message || "Failed to delete user.");
          }
        })
        .catch((err) => {
          alert(err.message);
          console.error(err);
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
                        onClick={() => handleRemove(user.id)}
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
