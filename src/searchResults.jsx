import React from 'react';
import ListItem from './listItem.jsx';

function SearchResults({ list }) {
  return (
    <>
      <h3>Merchant List</h3>
      About 0.4 miles away
      <br />
      {list.map((place) => <ListItem place={place} key={place.url} />)}
    </>
  );
}

export default SearchResults;
