import { useEffect, useState } from "react";
import Axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    async function fetchData() {
      try {
        const response = await Axios.get(url, { signal: abortCont.signal });
        setData(response.data);
        setError(null);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      } catch (error) {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
        setError(error);
      }
    }

    fetchData();

    return () => {
      abortCont.abort(); // Cancel the fetch when the component unmounts
    };
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
