create table merchants(
  name varchar(50),
  address varchar(100),
  city varchar(30),
  state varchar(20),
  zip smallint,
  longitude float(30),
  latitude float(30),
  plus_code varchar(15),
  url varchar(100)
);

 select json_build_object(
    '1', (
      select array_to_json(array_agg(
        json_build_object(
          'name', name,
          'address',address,
          'city', city,
         'state', state,
          'zip', zip,
          'longitude', longitude,
          'latitude', latitude,
          'plus_code', plus_code,
        )
      ))
      from merchants where latitude < $1 and latitude > $2 and longitude < $3 and longitude > $4
    ),
    '2',  (
      select array_to_json(array_agg(
        json_build_object(
          'name', name,
          'address',address,
          'city', city,
         'state', state,
          'zip', zip,
          'longitude', longitude,
          'latitude', latitude,
          'plus_code', plus_code,
        )
      ))
      from merchants where latitude < $5 and latitude > $6 and longitude < $7 and longitude > $8
    ),
    '3',  (
      select array_to_json(array_agg(
        json_build_object(
          'name', name,
          'address',address,
          'city', city,
         'state', state,
          'zip', zip,
          'longitude', longitude,
          'latitude', latitude,
          'plus_code', plus_code,
        )
      ))
      from merchants where latitude < $9 and latitude > $10 and longitude < $11 and longitude > $12
    ),
    '4',  (
      select array_to_json(array_agg(
        json_build_object(
          'name', name,
          'address',address,
          'city', city,
         'state', state,
          'zip', zip,
          'longitude', longitude,
          'latitude', latitude,
          'plus_code', plus_code,
        )
      ))
      from merchants where latitude < $13 and latitude > $14 and longitude < $15 and longitude > $16
    ),
 )
 from merchants

 select json_build_object(
    '1', json_build_object(
          'name', name,
          'address',address,
          'city', city,
         'state', state,
          'zip', zip,
          'longitude', longitude,
          'latitude', latitude,
          'plus_code', plus_code,
 ) from merchants where latitude < 40.8763137 and latitude > 40.8683137 and longitude < -73.8284874 and longitude > -73.8364874;

latitude: 40.8723137
longitude: -73.8324874
 location.latitude + 0.004,
    location.latitude - 0.004,
    location.longitude + 0.004,
    location.longitude - 0.004,
    40.8763137
    40.8683137
    -73.8284874
    -73.8364874