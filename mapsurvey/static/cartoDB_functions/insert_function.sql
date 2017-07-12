DROP FUNCTION IF EXISTS insert_bikeways_data(text,text,text,text,text);
--Assumes only one value being inserted

CREATE OR REPLACE FUNCTION insert_bikeways_data (
    _geojson TEXT,
    _description TEXT,
    _name TEXT,
    -- _password TEXT,
    _email TEXT,
    _org TEXT
)
--Has to return something in order to be used in a "SELECT" statement
RETURNS integer
AS $$
DECLARE
    _the_geom GEOMETRY;
BEGIN
    --Convert the GeoJSON to a geometry type for insertion.
    _the_geom := ST_SetSRID(ST_GeomFromGeoJSON(_geojson),4326);

    EXECUTE ' INSERT INTO bikeways (the_geom, description, name, email, org)
            VALUES ($1, $2, $3, $4, $5)
            ' USING _the_geom, _description, _name, _email, _org;

    RETURN 1;
END;
$$
LANGUAGE plpgsql SECURITY DEFINER ;

--Grant access to the public user
GRANT EXECUTE ON FUNCTION insert_bikeways_data(text,text,text,text,text) TO publicuser;
