import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";

export const useSyncUser = () => {
    const [backendToken, setBackendToken] = useState('');
    const {data: session} = useSession();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { setToken } = useAuthStore();

    useEffect(() => {
        const sendToBackend = async () => {
            if (!session) return;
            setLoading(true);

            try {
                const res = await fetch("http://localhost:8001/api/user/syncuser/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: session.user.email,
                        username: session.user.email.split("@")[0],
                        firstname: session.user?.name.split(" ")[0] || "",
                        lastname: session.user?.name.split(" ")[1] || ""
                    })
                });
                const data = await res.json();
                if (res.ok) {
                    console.log(data.key)
                    setBackendToken(data.key)
                    console.log(backendToken)
                    setToken(data.key, session);
                    
                } else {
                    throw new Error(data.error || "Failed to send user Info")
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
            const token = Cookies.get("authToken");
                    if (token) {
                        router.push("/");
                    } else {
                        router.push("/authenticate");
                    }
        };
        sendToBackend();
    }, [session]);

    return { backendToken, loading, error };
};