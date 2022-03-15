DROP TABLE IF EXISTS songs;

CREATE TABLE songs(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  movie VARCHAR(255) NOT NULL,
  length FLOAT NOT NULL
);

INSERT INTO songs(title, movie, length)
VALUES
  ('Let It Go', 'Frozen', 3.75),
  ('You''re Welcome', 'Moana', 2.75),
  ('You''ve Got a Friend in Me', 'Toy Story 4', 2.4),
  ('Circle of Life', 'The Lion King', 5);