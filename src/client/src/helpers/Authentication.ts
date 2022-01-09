import IStorageUser from "../interfaces/IStorageUser";

const key = 'username';

/**
 * Object with functions that set/get a user to/from localstorage.
 * @author Caesar Lennartsson
 */
const Authentication = {
  getUser(): IStorageUser {
    const usernameLocalstorage = JSON.parse(
      localStorage.getItem(key) ||
        '{"id":"null", "username":"null"}'
    );
    return usernameLocalstorage;
  },

  setUser(user: IStorageUser) {
    localStorage.setItem(key, JSON.stringify(user));
  },

  deleteUser() {
    localStorage.removeItem(key);
  },
};

export default Authentication;