import React, { useEffect } from "react";
import Spinner from "../layout/Spinner";
import UserItem from "./UserItem";
import { useContext } from "react";
import GithubContext from "../../context/github/GithubContext";

function UserResults() {
  const { users, loading, fetchUsers } = useContext(GithubContext);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    fetchUsers();
  }, []);

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
