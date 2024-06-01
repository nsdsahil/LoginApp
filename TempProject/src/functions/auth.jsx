
const LOCAL_STORAGE_KEY = "users";
const LOGGED_IN_USER_KEY = "loggedInUser";


async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(hash)));
  }
export const register = async (userData) => {
  const users = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
  if (users.some((user) => user.email === userData.email)) {
    throw new Error("User already exists");
  }
  userData.password = await hashPassword(userData.password);
  users.push(userData);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
  return userData;
};


export const login = async (userData) => {
  const users = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
  const user = users.find((user) => user.email === userData.email);
  if (!user) {
    throw new Error("User not found");
  }
  const hashedPassword = await hashPassword(userData.password);
  if (user.password !== hashedPassword) {
    throw new Error("Invalid password");
  }
  localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(user));
  return user;
};

export const getLoggedInUser = () => {
  return JSON.parse(localStorage.getItem(LOGGED_IN_USER_KEY));
};
export const logout = () => {
  localStorage.removeItem(LOGGED_IN_USER_KEY);
};
export const getAllUsers = () => {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
};

export const deleteUser = (email) => {
  let users = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
  users = users.filter((user) => user.email !== email);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
};
