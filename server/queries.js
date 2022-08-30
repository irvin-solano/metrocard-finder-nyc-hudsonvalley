const query1 = `select *
from merchants
where latitude < $1
  and latitude > $2
  and longitude < $3
  and longitude > $4`;

const query2 = `select json_build_object(
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
from merchants`;

module.exports = { query1, query2 };
