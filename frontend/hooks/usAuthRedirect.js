"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export const useAuthRedirect = () => {
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get("authToken");
        if (token) {
            router.push("/");
        } else {
            router.push("/authenticate");
        }
    }, []);
};