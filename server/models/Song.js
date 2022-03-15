import pg from "pg"

// type://username:password@portLocation/database name
const pool = new pg.Pool({
  connectionString:
    "postgres://postgres:password@localhost:5432/disney_databases_development",
})

class Song {
  // Values in constructor should match the table columns in schema
  constructor({ id, title, movie, length }) {
    this.id = id
    this.title = title
    this.movie = movie
    this.length = length
  }

  // Async because we are accessing outside data that may take awhile
  static async findAll() {
    try {
      // Retrieve all records from the database table songs
      const result = await pool.query("SELECT * FROM songs;")

      // Map through result.rows to create an array of Song objects
      const songs = result.rows.map((song) => {
        return new Song(song)
      })

      // Return songs to router
      return songs
    } catch (error) {
      // Log error if something went wrong
      console.error(error)
    }
  }

  // Async because we are accessing outside data that may take awhile
  static async findById(id) {
    try {
      // Retrieve record that matches the id passed in by router
      const query = "SELECT * FROM songs WHERE id = $1;"

      // Execute query with sanitized data
      const result = await pool.query(query, [id])

      // Access the first element of the rows array
      const songData = result.rows[0]

      // Was able to find song
      if (songData) {
        return new Song(songData)
      }

      // Undefined returned if no song was found
    } catch (error) {
      // Log error if something went wrong
      console.error(error)
    }
  }
}

export default Song
