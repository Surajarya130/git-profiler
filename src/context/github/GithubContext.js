import {
  createContext,
  // useState,
  useReducer,
  // useEffect
} from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initalState = {
    users: [],
    loading: true,
  };

  const [state, dispatch] = useReducer(githubReducer, initalState);
  // const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    let response = await fetch(`${GITHUB_URL}users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    const data = await response.json();

    dispatch({
      type: "GET_USERS",
      payload: data,
    });

    // setUsers(data);
    // setLoading(false);
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        fetchUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
