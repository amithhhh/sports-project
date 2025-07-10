"use client";
import { useAuthRedirect } from "@/hooks/usAuthRedirect";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import Cookies from "js-cookie";


export default function Home() {
  useAuthRedirect();
  const { checkUser, authUser } = useAuthStore();
  useEffect(() => {
      const token = Cookies.get('authToken');
      if (token) {
        checkUser(token);
      }
  },[]);

  return (
    <div>
      {authUser ? `Welcome, ${authUser.username}` : "Guest"}
    </div>
  );
}
