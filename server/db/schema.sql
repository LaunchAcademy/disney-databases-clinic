DROP TABLE IF EXISTS songs;

CREATE TABLE songs(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  movie VARCHAR(255) NOT NULL,
  length FLOAT NOT NULL,
  character_name VARCHAR(255)
);

INSERT INTO songs(title, movie, length, character_name)
VALUES
  ('Let It Go', 'Frozen', 3.75, null),
  ('You''ve Got a Friend in Me', 'Toy Story 4', 2.4, 'Woody'),
  ('You''re Welcome', 'Moana', 2.75, 'Maui'),
  ('Circle of Life', 'The Lion King', 5, null);