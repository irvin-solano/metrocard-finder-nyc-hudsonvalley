// const axios = require('axios');
// const cheerio = require('cheerio');

// const getData = () => {
//   axios.get('https://tripplanner.mta.info/metrocardmerchants/')
//     .then((res) => {
//       const nycBrghAbbs = [];
//       const $ = cheerio.load(res.data);
//       $('#ContentPlaceHolder1_ddlBoro2 > option').each((index, element) => {
//         nycBrghAbbs.push($(element).attr('value'));
//       })
//       Promise.all(nycBrghAbbs.map((brgh, i) => {
//         axios.get(`https://tripplanner.mta.info/metrocardmerchants/BoroughMetroCardMap.aspx?zone=${brgh}`)
//           .then((brghRes) => {
//             const $ = cheerio.load(brghRes.data);
//             i === 0 && console.log(brghRes.data)
//           })
//       }))
//     })
//     .catch((err) => console.log(err))

//   return 'okay'
// }

// console.log(getData())