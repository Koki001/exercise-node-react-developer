import React, { useEffect, useState } from 'react';

import './App.css';
import DetailedView from './Components/DetailedView';
import useFetch from './useFetch';

export function App() {
  const [apiData, setApiData] = useState([] as any[]);
  const [listFilter, setListFilter] = useState('');
  const [listOpen, setListOpen] = useState('' as any);

  const { data } = useFetch('http://localhost:4000/repos');
  useEffect(() => {
    if (data) {
      setApiData(data);
    }
  }, [data]);

  const handleFilter = (e: any) => {
    if (e.target.textContent === 'PHP') {
      setListFilter('PHP');
    } else if (e.target.textContent === 'English') {
      setListFilter('English');
    } else if (e.target.textContent === 'French') {
      setListFilter('French');
    } else if (e.target.textContent === 'TypeScript') {
      setListFilter('TypeScript');
    } else if (e.target.textContent === 'Clear Filter') {
      setListFilter('');
    }
  };

  return (
    <div className="App">
      <h1>Data</h1>
      <div className="dataContainer">
        <div className="filters">
          <p>Filter by language:</p>
          <button onClick={handleFilter}>PHP</button>
          <button onClick={handleFilter}>English</button>
          <button onClick={handleFilter}>French</button>
          <button onClick={handleFilter}>TypeScript</button>
          <button onClick={handleFilter}>Clear Filter</button>
        </div>
        <ul className="dataList">
          {apiData &&
            apiData
              .sort((itemA, itemB) => {
                if (itemA.created_at > itemB.created_at) {
                  return 1;
                }
                if (itemA.created_at < itemB.created_at) {
                  return -1;
                }
                return 0;
              })
              .filter((list) => {
                if (listFilter !== '') {
                  return list.language === listFilter;
                } else {
                  return list;
                }
              })
              .map((list, i) => {
                return (
                  <li
                    onClick={() =>
                      listOpen === i ? setListOpen('') : setListOpen(i)
                    }
                    key={list.id}
                  >
                    <h4 className="listTitle">{list.name}</h4>
                    <p className="listDescription">
                      {list.description !== null
                        ? list.description
                        : 'No description available'}
                    </p>
                    <p className="listLanguage">
                      Language used: {list.language}
                    </p>
                    <p className="listForks">Forks count: {list.forks_count}</p>
                    {i === listOpen ? <DetailedView {...list} /> : null}
                  </li>
                );
              })}
        </ul>
      </div>
    </div>
  );
}
