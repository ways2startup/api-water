CREATE EXTENSION cube;
CREATE EXTENSION earthdistance;
SELECT events.id, events.name, earth_distance(ll_to_earth( 13.051100,80.281320), ll_to_earth(events.lat, events.lng)) as distance_from_current_location FROM events ORDER BY distance_from_current_location ASC;
SELECT events.id, events.name FROM events WHERE earth_box( ll_to_earth(13.051100,80.281320), 196.77517870293732) @> ll_to_earth(events.lat, events.lng);