import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SearchBar({ setLoc }) {
  const [input, setInput] = useState('');
  const [address, setAddress] = useState('');
  useEffect(() => {
    if (address) {
      setInput('');
      axios.get('/coordinates', { params: { address } })
        .then((res) => setLoc(() => ({latitude: res.data.location.lat , longitude: res.data.location.lng })))
    }
  }, [address]);
  return (
    <form onSubmit={(e) => { e.preventDefault(); setAddress(input); }}>
      <label htmlFor="address_input">
        Different origin address
        <input id="address_input" type="text" value={input} onChange={(e) => setInput(e.target.value)} required />
      </label>
      <input type="submit" value="Search" />
    </form>
  );
}

export default SearchBar;
