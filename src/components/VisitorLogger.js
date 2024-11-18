import { useEffect } from "react";
import axios from "axios";
import useVisitorData from "../hooks/useVisitorData";

const VisitorLogger = () => {
    const visitorData = useVisitorData();

    useEffect(() => {
        if (visitorData) {
            const addrScript = process.env.REACT_APP_ADDR_SCRIPT;

            axios
                .get(`${addrScript}?action=insert&table=visitor&data=${encodeURIComponent(JSON.stringify(visitorData))}`)
                .then((response) => {
                    console.log("Visitor data sent successfully:", response.data);
                })
                .catch((error) => {
                    console.error("Failed to send visitor data:", error);
                });
        }
    }, [visitorData]);

    return null;
};

export default VisitorLogger;
