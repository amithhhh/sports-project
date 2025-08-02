import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";

const BACKEND_URL = "http://127.0.0.1:8001";

export const useAuthStore = create((set, get) => ({
  // ---------- state ----------
  isLogin: false,
  isLoggedIn: false,
  authUser: null,
  token: null,
  error: "",

  // ---------- actions ----------
  login: async (credentials) => {
    set({ isLogin: true, error: "" });

    try {
      // 1) authenticate and get token
      const authRes = await axios.post(
        `${BACKEND_URL}/api/auth/login/`,
        credentials,
        { headers: { "Content-Type": "application/json" } }
      );

      const { key: token } = authRes.data;
      Cookies.set("authToken", token, {
        expires: 7,
        secure: true,
        sameSite: "lax",
      });
      return true;
    } catch (err) {
      set({
        error: err.response?.data?.detail || err.message,
        isLoggedIn: false,
      });
    } finally {
      set({ isLogin: false });
    }
  },
  checkUser: async (keyValue) => {
      try {
      const res = await axios.get(
        `${BACKEND_URL}/api/user/`,
        { headers: { "Content-Type": "application/json", Authorization: `Token ${keyValue}` } }
      );
      set({authUser: res.data})
    } catch (err) {
      set({
        error: err.response?.data?.detail || err.message,
      });
    }
  },
  register: async (credentials) => {
    set({ isLogin: true, error: "" });

    try {
      // 1) authenticate and get token
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
      return true;
    } catch (err) {
      set({
        error: err.response?.data?.detail || err.message,
        isLoggedIn: false,
      });
    } finally {
      set({ isLogin: false });
    }
  },
  logout: async () => {
    set({ isLogin: true, error: "" });
    Cookies.remove('authToken')
    
  },
  setToken: async (backendToken, session) => {
    set({authUser: session.user.email.split("@")[0]})
    console.log(backendToken)
    await Cookies.set("authToken", backendToken, {
        expires: 7,
        secure: true,
        sameSite: "lax",
      });
  }
}));
