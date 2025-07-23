"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useSession } from "next-auth/react";

export const useAuthRedirect = () => {
    const router = useRouter();
    const {data: session} = useSession();
    useEffect(() => {
        const token = Cookies.get("authToken");
        if (token) {
            router.push("/");
        } else {
            router.push("/authenticate");
        }
    }, []);
};