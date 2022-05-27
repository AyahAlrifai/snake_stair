import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Table from './Table.js';
import Staircase from './Staircase.js';
import Snake from './Snake.js';
import { useState, createContext } from 'react';

export const dimentionsContext = createContext();
export const setDimentionsContext = createContext();

const App = () => {
  let [dimentions, setDimentions] = useState({});
  let data= require(`./input.json`)[0];

  return <div className='container'>
    <setDimentionsContext.Provider value={setDimentions}>
      <dimentionsContext.Provider value={dimentions}>
        <Table  data={data}/>
      </dimentionsContext.Provider>
    </setDimentionsContext.Provider>
    <Staircase dimentions={dimentions} data={data.up} />
    <Snake dimentions={dimentions} data={data.down} />
  </div>
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <App />
);


