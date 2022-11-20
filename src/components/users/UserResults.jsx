import React, { useEffect, useState } from "react";
import Spinner from "../layout/Spinner";
import UserItem from "./UserItem";

function UserResults() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    let response = await fetch(`${process.env.REACT_APP_GIHTUB_URL}users`, {
      headers: {
        Authorization: `token ${process.env.REACT_APP_GIHTUB_TOKEN}`,
      },
    });
    const data = await response.json();
    setUsers(data);
    setLoading(false);
  };

  if (!loading) {
    return (
      <div className="grid sm:gird-cols-1 md:grid-cols-2 gap-8 xl:grid-cols-4 lg:grid-cols-3">
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  } else {
    return <Spinner />;
  }
}

export default UserResults;
