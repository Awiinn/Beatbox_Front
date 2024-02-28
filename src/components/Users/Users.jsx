import { useState, useEffect } from "react";
import { useGetUsersQuery } from "../../redux/api/userApi";

const Users = () => {
  const { data: usersData, isLoading, isError, refetch } = useGetUsersQuery();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (usersData) {
      setUsers(usersData);
    }
  }, [usersData]);

  if (isError) {
    return <div>Error loading users</div>;
  }

  return (
    <>
      <div className="user-container">
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
      <br />
      <button onClick={() => refetch()}>Refresh Users</button>
    </>
  );
};

export default Users;
