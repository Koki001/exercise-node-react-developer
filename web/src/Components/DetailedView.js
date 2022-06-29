// Detailed repository view

import { useEffect, useState } from 'react';
import useFetch from '../useFetch';

const DetailedView = (props) => {
  const [message, setMessage] = useState('');
  const { data } = useFetch(
    `https://raw.githubusercontent.com/${props.full_name}/master/README.md`
  );

  useEffect(() => {
    if (data) {
      setMessage(data);
    }
  }, [data]);

  console.log(data);
  return (
    <div className="commitMessage">
      <h4>Most recent commit: {props.updated_at}</h4>
      <p>Author: {props.name}</p>
      <p>Message: {data && message}</p>
    </div>
  );
};

export default DetailedView;
