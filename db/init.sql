CREATE TABLE IF NOT EXISTS hives(
    id SERIAL PRIMARY KEY,
    hive_name varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS readings(
    id SERIAL PRIMARY KEY,
    hive_id INT REFERENCES hives(id),
    processed_value REAL,
    date_added TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS data_points(
    id  SERIAL PRIMARY KEY,
    reading_id INT REFERENCES readings(id),
    data_value REAL NOT NULL
);