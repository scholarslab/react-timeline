import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const data = [
    // {tir: 1, start: new Date("2018-03-29"), end: new Date("2020-04-03")},
    // {tir: 2, start: new Date("2020-05-27"), end: new Date("2020-06-03")},
    // {tir: 3, start: new Date("2020-01-26"), end: new Date("2020-03-03")},
    {tir: 1, start: new Date("2016-03-29"), end: new Date("2018-04-03")},
    {tir: 2, start: new Date("2017-05-27"), end: new Date("2018-06-03")},
    // {tir: 3, start: new Date("2020-01-26"), end: new Date("2020-03-03")},
    {tir: 2, start: new Date("2018-10-27"), end: new Date("2019-06-03")},
    // {tir: 4, start: new Date("2019-01-26"), end: new Date("2020-03-03")}
] 
console.log(data)

ReactDOM.render(
  <React.StrictMode>
    <App data={data}/>
  </React.StrictMode>,
  document.getElementById('root')
);

