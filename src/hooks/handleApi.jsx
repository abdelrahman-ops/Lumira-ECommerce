import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie"; // Import the Cookies library

export function useDataFetcher(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const getData = () => {
        axios
            .get(`http://localhost:5000/api/${url}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("stable")}`,
                },
            })
            .then((res) => setData(res.data))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    };

    return { data, loading, getData };
}
