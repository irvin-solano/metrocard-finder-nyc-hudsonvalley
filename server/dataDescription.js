const { allGameData } = require('./theData.js');

const getDataStructure = (gamesArr) => {
  // console.log(Object.keys(gamesArr[0]));
  for (let i = 0; i < gamesArr.length; i += 1) {
    const tempObj = {};
    const keys = Object.keys(gamesArr[0]);
    for (let j = 0; j < keys.length; j += 1) {
      console.log(keys[j]);
      console.log(gamesArr[i][keys[j]]);
    }
  }
};

getDataStructure([allGameData[0]]);
