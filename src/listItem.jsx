import React from 'react';

function ListItem({ place }) {
  return (
    <div>
      {place.name}
      <br />
      {place.address}
      <br />
      <a href={place.url} rel="noreferrer" target="_blank">View in  google maps</a>
    </div>
  );
}

export default ListItem;
