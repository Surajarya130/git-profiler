import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initalState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initalState);

  // Get users for test practice
  // const fetchUsers = async () => {
  //   setLoading();
  //   let response = await fetch(`${GITHUB_URL}users`, {
  //     headers: {
  //       Authorization: `token ${GITHUB_TOKEN}`,
  //     },
  //   });
  //   const data = await response.json();

  //   dispatch({
  //     type: "GET_USERS",
  //     payload: data,
  //   });
  // };

  // Search users
  const searchUsers = async (text) => {
    setLoading();
    const params = new URLSearchParams({
      q: text,
    });
    let response = await fetch(`${GITHUB_URL}search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    const { items } = await response.json();

    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };

  // Get a single user
  const getUser = async (login) => {
    setLoading();
    let response = await fetch(`${GITHUB_URL}users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    if (response.status === 404) {
      window.location = "/notfound";
    } else {
      const data = await response.json();
      // console.log(data);
      dispatch({
        type: "GET_USER",
        payload: data,
      });
    }
  };

  // Get Repos
  const getUserRepos = async (login) => {
    const params = new URLSearchParams({
      sort: "created",
      per_page: 10,
    });

    setLoading();
    let response = await fetch(`${GITHUB_URL}users/${login}/repos?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    const data = await response.json();

    dispatch({
      type: "GET_REPOS",
      payload: data,
    });
  };

  const setLoading = () => {
    dispatch({
      type: "SET_LOADING",
    });
  };

  const clearUsers = () => {
    dispatch({
      type: "CLEAR_USERS",
    });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        user: state.user,
        repos: state.repos,
        // fetchUsers,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
