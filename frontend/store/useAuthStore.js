import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";

const BACKEND_URL = "http://127.0.0.1:8001";

export const useAuthStore = create((set, get) => ({
  // ---------- STATE ----------
  isLogin: false,
  isLoggedIn: false,
  authUser: null,
  token: Cookies.get("authToken") || null, // only for initial hydration
  error: "",

  // ---------- ACTIONS ----------

  // 🔐 Login user
  login: async (credentials) => {
    set({ isLogin: true, error: "" });

    try {
      // clear any stale token first
      Cookies.remove("authToken");

      const authRes = await axios.post(
        `${BACKEND_URL}/api/auth/login/`,
        credentials,
        { headers: { "Content-Type": "application/json" } }
      );

      const { key: token } = authRes.data;

      // persist token
      Cookies.set("authToken", token, {
        expires: 7,
        secure: true,
        sameSite: "lax",
      });

      // set state FIRST
      set({ token, isLoggedIn: true });

      // fetch user using STATE token
      await get().checkUser();

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

  // 📝 Register user
  register: async (credentials) => {
    set({ isLogin: true, error: "" });

    try {
      Cookies.remove("authToken");

      const authRes = await axios.post(
        `${BACKEND_URL}/api/auth/register/`,
        credentials,
        { headers: { "Content-Type": "application/json" } }
      );

      const { key: token } = authRes.data;

      Cookies.set("authToken", token, {
        expires: 7,
        secure: true,
        sameSite: "lax",
      });

      set({ token, isLoggedIn: true });

      await get().checkUser();

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

  // 🚪 Logout user
  logout: () => {
    Cookies.remove("authToken", { path: "/" });
    set({
      token: null,
      authUser: null,
      isLoggedIn: false,
      error: "",
    });
  },

  // 👤 Fetch authenticated user (STATE ONLY)
  checkUser: async () => {
    const token = get().token;

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

      set({
        authUser: res.data,
        isLoggedIn: true,
      });

      console.log("Authenticated as:", res.data.username);
    } catch (err) {
      // token invalid / expired
      Cookies.remove("authToken");
      set({
        token: null,
        authUser: null,
        isLoggedIn: false,
        error: err.response?.data?.detail || err.message,
      });
    }
  },

  // 🔁 Hydrate token on app load
  hydrateAuth: () => {
    const token = Cookies.get("authToken");
    if (token) {
      set({ token });
    }
  },
}));
