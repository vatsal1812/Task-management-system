import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token && router.pathname !== "/login" && router.pathname !== "/register") {
            router.push("/login");
        }
    }, [router]);

    return <Component {...pageProps} />;
}

export default MyApp;
