const { Client } = require('pg');
const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const fs = require('fs');
const { query1, query2 } = require('./queries');
// const {
//   manhattan,
//   brooklyn,
//   bronx,
//   queens,
//   statenIsland,
//   nassau,
//   suffolk,
//   westchester,
// } = require('../rawData');
//const { gameIds } = require('../gameIds');
const { allGameData } = require('./theData.js')
app.use(express.json());
app.use('/', express.static(path.join(path.resolve(__dirname, '../dist'))));
const googleAPI = {
  findPlaceUrl: 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json',
  placeDetailsUrl: 'https://maps.googleapis.com/maps/api/place/details/json',
  geocodeUrl: 'https://maps.googleapis.com/maps/api/geocode/json',
};
const key = 'AIzaSyA7Jqe2tZpKOIaQmNvLcWq4cCxDK-1mCgo';

// app.get('/makeCSV', (req, res) => {
//   const recFunc = () => {
//     for (let i = 0; i < allGameData.length; i += 1) {
//       fs.open(path.join(__dirname, '/theNOData.txt'), 'a', (err, fd) => {
//         fs.write(fd, `${JSON.stringify(allGameData[i].appID)}\n`, async (writeErr) => {
//           dataInsert(i += 1);
//         });
//       });
//     }
//   }
// })

app.get('/coordinates', (req, res) => {
  axios.get(googleAPI.geocodeUrl, { params: { address: req.query.address, fields: 'geometry/location', key } })
    .then((geoRes) => res.status(200).json(geoRes.data.results[0].geometry))
    .catch((err) => res.status(404).send(err));
});
app.get('/getSearchResults', (req, res) => {
  const location = JSON.parse(req.query.location);
  const client = new Client({
    user: 'irvin',
    database: 'metrocardmerchants',
  });
  const values = [
    location.latitude + 0.004,
    location.latitude - 0.004,
    location.longitude + 0.004,
    location.longitude - 0.004,
    location.latitude + 0.008,
    location.latitude - 0.008,
    location.longitude + 0.008,
    location.longitude - 0.008,
    location.latitude + 0.012,
    location.latitude - 0.012,
    location.longitude + 0.012,
    location.longitude - 0.012,
    location.latitude + 0.016,
    location.latitude - 0.016,
    location.longitude + 0.016,
    location.longitude - 0.016,
  ];

  client.connect();
  client.query(query1, values.slice(0, 4))
    .then((dbRes1) => {
      return client.query(query1, values.slice(4, 8))
        .then((dbRes2) => {
          return client.query(query1, values.slice(8, 12))
            .then((dbRes3) => {
              return client.query(query1, values.slice(12, 16))
                .then((dbRes4) => {
                  return res.status(200).json([dbRes1.rows, dbRes2.rows, dbRes3.rows, dbRes4.rows]);
                });
            });
        });
    })
    .catch((err) => {
      res.status(404).send(err);
    })
    .then(() => client.end());
});

// app.get('/populateDatabase', (req, res) => {
//   const dataInsert = (merchant) => {
//     const extractAddress = (place, values) => {
//       const reqdFields = ['Name', 'Address', 'City', 'State', 'Zipcode'];
//       let address = '';
//       place.forEach((placeProp) => {
//         const key = Object.keys(placeProp)[0];
//         reqdFields.indexOf(key) > -1 && (address += `${placeProp[key]}`);
//         reqdFields.indexOf(key) > -1 && values.push(placeProp[key]);
//       });
//       return address.trim();
//     };
//     const values = [];
//     axios.get(googleAPI.findPlaceUrl, { params: { input: extractAddress(merchant, values), inputtype: 'textquery', key } })
//       .then((findPlRes) => {
//         axios.get(googleAPI.placeDetailsUrl, { params: { fields: 'geometry/location,plus_code/compound_code,url', place_id: findPlRes.data.candidates[0].place_id, key } })
//           .then((placeDeetsRes) => {
//             values.push(placeDeetsRes.data.result.geometry.location.lng);
//             values.push(placeDeetsRes.data.result.geometry.location.lat);
//             placeDeetsRes.data.result.plus_code ? values.push(placeDeetsRes.data.result.plus_code.compound_code.slice(0, placeDeetsRes.data.result.plus_code.compound_code.indexOf(' '))) : values.push('null')
//             values.push(placeDeetsRes.data.result.url);
//             // https://www.google.com/maps/search/Q233%2B78+New+York  ->> for plus code
//             pool.connect()
//               .then((client) => {
//                 client.query('insert into merchants(name, address, city, state, zip, longitude, latitude, plus_code, url) values($1, $2, $3, $4, $5, $6, $7, $8, $9)', values, (err, res) => {
//                   client.release();
//                   err && console.log(values);
//                 });
//               });
//           });
//       })
//       .catch((err) => console.log(err));
//   };
//   const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

//   const writeToTable = async (county) => {
//     for (let i = 0; i < county.length; i += 1) {
//       await sleep(250);
//       dataInsert(county[i]);
//     }
//   };
//   res.sendStatus(201);
//   writeToTable(westchester);
// });

const dataInsert = (i) => {
  if (i === gameIds.length) {
    console.log('all done!!!');
    return;
  }
  axios.get('https://store.steampowered.com/api/appdetails', { params: { appids: gameIds[i].appID } })
    .then((steamRes) => {
      if (steamRes.data[gameIds[i].appID].success === false) {
        fs.open(path.join(__dirname, '/theNOData.txt'), 'a', (err, fd) => {
          fs.write(fd, `${JSON.stringify(gameIds[i].appID)}\n`, async (writeErr) => {
            console.log('no write', gameIds[i].appID);
            //await sleep(1000);
            dataInsert(i += 1);
          });
        });
      } else {
        fs.open(path.join(__dirname, '/theData.txt'), 'a', (err, fd) => {
          fs.write(fd, `${JSON.stringify(steamRes.data[gameIds[i].appID].data)}\n`, async (writeErr) => {
            console.log('write', gameIds[i].appID);
            //await sleep(1000);
            dataInsert(i += 1);
          });
        });
      }
    })
    .catch((err) => {
      if (i !== gameIds.length) {
        console.log(err.response.statusText, ' waiting some time');
        setTimeout(((i) => {
          console.log('this is where we left off', i);
          dataInsert(i);
        }).bind(null, i), 260000);
      } else {
        console.log(err);
      }
    });
};
const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
const writeToTable = async (gameIds) => {
  for (let i = 0; i < gameIds.length; i += 1) {
    await sleep(100);
    dataInsert(gameIds[i]);
  }
};
app.get('/getGameInfo', (req, res) => {
  // res.sendStatus(201); //for closing out request
  res.json(allGameData[0]); //to test to see if the data is accesible
  //dataInsert(0); // for writing to the file
});


app.listen(3000, () => {
  console.log('server up');
});
