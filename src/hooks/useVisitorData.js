import { useEffect, useState } from "react";
import axios from "axios";

const getCookieValue = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
};

const setCookieValue = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
};

const getUVfromCookie = () => {
    const hash = Math.random().toString(36).substring(2, 8).toUpperCase();
    const existingHash = getCookieValue("user");
    if (!existingHash) {
        setCookieValue("user", hash, 180); // 6 months
        return hash;
    }
    return existingHash;
};

const getTimeStamp = () => {
    const pad = (n) => (n < 10 ? `0${n}` : n);
    const date = new Date();
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(
        date.getHours()
    )}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};

const getDeviceType = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    )
        ? "mobile"
        : "desktop";
};

const useVisitorData = () => {
    const [visitorData, setVisitorData] = useState(null);

    useEffect(() => {
        const fetchIP = async () => {
            try {
                const response = await axios.get("https://jsonip.com");
                const ip = response.data.ip;

                const queryString = new URLSearchParams(window.location.search);
                const utm = queryString.get("utm");

                setVisitorData({
                    id: getUVfromCookie(),
                    landingUrl: window.location.href,
                    ip,
                    referer: document.referrer || "direct",
                    time_stamp: getTimeStamp(),
                    utm,
                    device: getDeviceType(),
                });
            } catch (error) {
                console.error("Failed to fetch IP:", error);
            }
        };

        fetchIP();
    }, []);

    return visitorData;
};

export default useVisitorData;
