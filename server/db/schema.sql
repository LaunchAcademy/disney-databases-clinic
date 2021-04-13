-- Create your schema here
DROP TABLE IF EXISTS songs;

CREATE TABLE songs (
  id SERIAL PRIMARY KEY,
  title VARCHAR NOT NULL,
  movie VARCHAR(255) NOT NULL,
  length FLOAT NOT NULL
);