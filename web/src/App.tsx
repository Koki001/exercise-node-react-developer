import React, { useEffect, useState } from 'react';

import './App.css';
import useFetch from './useFetch';

export function App() {
  const [apiData, setApiData] = useState([] as any[]);

  const { data } = useFetch('http://localhost:4000/repos');
  console.log(apiData);
  useEffect(() => {
    if (data) {
      setApiData(data);
    }
  }, [data]);

  return (
    <div className="App">
      <h1>Data</h1>
      <div className="dataContainer">
        <ul className="dataList">
          {apiData &&
            apiData.map((list) => {
              console.log(list);
              return (
                <li key={list.id}>
                  <h4 className="listTitle">{list.name}</h4>
                  <p className="listDescription">
                    {list.description !== null
                      ? list.description
                      : 'No description available'}
                  </p>
                  <p className="listLanguage">{list.language}</p>
                  <p className="listForks">{list.forks_count}</p>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
