// Fetch hook

import axios from 'axios';
import { useEffect, useState } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log('Error while fetching from localhost', err);
      });
  }, [url]);
  return { data };
};

export default useFetch;
