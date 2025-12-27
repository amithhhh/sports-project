import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";

const BACKEND_URL = "http://127.0.0.1:8001";

export const useAuthStore = create((set, get) => ({
  // ---------- STATE ----------
  isLogin: false,        // for loading during login/register
  isLoggedIn: false,     // true if user is logged in
  authUser: null,        // user info
  token: Cookies.get("authToken") || null,
  error: "",

  // ---------- ACTIONS ----------

  // Login user
  login: async (credentials) => {
    set({ isLogin: true, error: "" });

    try {
      const authRes = await axios.post(
        `${BACKEND_URL}/api/auth/login/`,
        credentials,
        { headers: { "Content-Type": "application/json" } }
      );

      const { key: token } = authRes.data;

      // Save token to cookie and state
      Cookies.set("authToken", token, { expires: 7, secure: true, sameSite: "lax" });
      set({ token, isLoggedIn: true });

      // Fetch user info immediately
      await get().checkUser(token);

      return true;
    } catch (err) {
      set({
        error: err.response?.data?.detail || err.message,
        isLoggedIn: false,
      });
      return false;
    } finally {
      set({ isLogin: false });
    }
  },

  // Register user
  register: async (credentials) => {
    set({ isLogin: true, error: "" });

    try {
      const authRes = await axios.post(
        `${BACKEND_URL}/api/auth/register/`,
        credentials,
        { headers: { "Content-Type": "application/json" } }
      );

      const { key: token } = authRes.data;

      // Save token to cookie and state
      Cookies.set("authToken", token, { expires: 7, secure: true, sameSite: "lax" });
      set({ token, isLoggedIn: true });

      // Fetch user info immediately
      await get().checkUser(token);

      return true;
    } catch (err) {
      set({
        error: err.response?.data?.detail || err.message,
        isLoggedIn: false,
      });
      return false;
    } finally {
      set({ isLogin: false });
    }
  },

  // Logout user
  logout: () => {
    Cookies.remove("authToken");
    set({
      token: null,
      authUser: null,
      isLoggedIn: false,
    });
  },

  // Fetch user info based on token (defaults to cookie)
  checkUser: async (keyValue) => {
    const token = keyValue || Cookies.get("authToken");
    if (!token) {
      set({ authUser: null, isLoggedIn: false });
      return;
    }

    try {
      const res = await axios.get(`${BACKEND_URL}/api/user/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });

      set({ authUser: res.data, token, isLoggedIn: true });
    } catch (err) {
      set({ authUser: null, error: err.response?.data?.detail || err.message, isLoggedIn: false });
    }
  },

  // Utility: manually set token (optional)
  setToken: (backendToken, sessionUser) => {
    Cookies.set("authToken", backendToken, { expires: 7, secure: true, sameSite: "lax" });
    set({ token: backendToken, authUser: sessionUser, isLoggedIn: true });
  },
}));
