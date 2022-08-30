import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import SearchResults from './searchResults.jsx';
import SearchBar from './searchBar.jsx';

function App() {
  const [location, setLoc] = useState({});
  const [list, setMerchantList] = useState([]);
  const [radius, setRadius] = useState('0');
  const [completeList, setCompleteList] = useState([]);
  useEffect(() => {
    const success = (position) => {
      const locObj = { latitude: position.coords.latitude, longitude: position.coords.longitude };
      setLoc(() => locObj);
    };
    const error = (err) => console.log(err);
    const options = { enableHighAccuracy: true };
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);
  useEffect(() => {
    if (location.latitude) {
      axios.get('/getSearchResults', { params: { location } })
        .then((res) => {
          const uniqResults = (dataArr) => {
            const uniqArr = [];
            for (let i = 0; i < dataArr.length; i += 1) {
              const newArr = [];
              const tracker = [];
              for (let j = 0; j < dataArr[i].length; j += 1) {
                if (tracker.indexOf(dataArr[i][j].url) < 0) {
                  newArr.push(dataArr[i][j]);
                  tracker.push(dataArr[i][j].url);
                }
              }
              uniqArr.push(newArr);
            }
            return uniqArr;
          };
          setCompleteList(() => uniqResults(res.data));
          setRadius('0');
        })
        .catch((err) => console.log(err));
    }
  }, [location]);
  useEffect(() => {
    if (completeList.length !== 0 && Number.parseInt(radius, 10) < completeList.length) {
      setMerchantList(() => completeList[Number.parseInt(radius, 10)]);
    }
  }, [completeList, radius]);
  return (
    <>
      <SearchBar setLoc={setLoc} />
      <select onChange={(e) => setRadius(e.target.value)}>
        <option value="0">half mile</option>
        <option value="1">one mile</option>
        <option value="2">one and a half miles</option>
        <option value="3">two miles</option>
      </select>
      <SearchResults list={list} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
