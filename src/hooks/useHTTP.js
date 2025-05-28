import { useState, useCallback, useEffect } from "react";

async function manageHTTPRequest(url, config) {
    const response = await fetch(url, config);
    if (!response.ok) {
        throw new Error(response.statusText || "Something went wrong! Cannot fetch data.");
    }
    const data = await response.json();
    return data;
}

export default function useHTTP({ url, config, initialData }) {
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(async (data) => {
        setIsLoading(true);
        setError(null);
        try {
            const resData = await manageHTTPRequest(url,{...config, body: data });
            setData(resData);
        } catch (err) {
            setError(err.message || "Something went wrong!");
        } finally {
            setIsLoading(false);
        }
    }, [url, config]);

    useEffect(() => {
        if (config && (config.method==="GET" || !config.method)) {
            sendRequest();
        }
    }, [sendRequest,config]);

    return {
        isLoading,
        error,
        data,
        sendRequest,
    };
}