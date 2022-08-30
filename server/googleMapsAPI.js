const googleAPI = {
  findPlaceUrl: 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json',
};
const extractAddress = (place) => {
  let address = ''
  const placeObj = {};
  place.forEach((placeProp, i) => {
    const key = Object.keys(placeProp)[0];

    i !== 0 && (address += `${placeProp[key]} `);
  });
  console.log(address.trim());
  return address.trim();
};
axios.get(googleAPI.findPlaceUrl, { params: { input: extractAddress(manhattan[0]), inputtype: 'textquery', key: 'AIzaSyA7Jqe2tZpKOIaQmNvLcWq4cCxDK-1mCgo' } })
  .then((res) => console.log(JSON.stringify(res)))
  .catch((err) => JSON.stringify(err));
