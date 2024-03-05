import { useState, useEffect } from "react";
import { useGetUsersQuery } from "../redux/api/userApi";

const Users = () => {
  const { data: usersData, isLoading, isError } = useGetUsersQuery();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (usersData) {
      setUsers(usersData);
    }
  }, [usersData]);

  if (isError) {
    return <div className="loading-error">Oh no! Error loading users</div>;
  }

  return (
    <>
      <div className="users-main">
        <h1>Users</h1>
      </div>
      <div className="users-wrapper">
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          users.map((user) => (
            <div key={user.id}>
              <div>
                <p>User Id: {user.id}</p>
                <p>First Name: {user.firstName}</p>
                <p>Last Name: {user.lastName}</p>
                <p>Email: {user.email}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Users;
