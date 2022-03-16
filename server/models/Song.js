import pg from "pg"

// type://username:password@portLocation/database name
const pool = new pg.Pool({
  connectionString:
    "postgres://postgres:password@localhost:5432/disney_databases_development",
})

class Song {
  // Values in constructor should match the table columns in schema
  constructor({ id, title, movie, length, character_name, characterName }) {
    this.id = id
    this.title = title
    this.movie = movie
    this.length = length
    this.characterName = character_name || characterName
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

  async save() {
    try {
      // set up our query
      const queryString = "INSERT INTO songs (title, movie, length, character_name) VALUES ($1, $2, $3, $4) RETURNING id;"
      // this.title === "A song; DROP TABLE songs;"
      // send it to the database with our user input
      // pool.query wants two arguments: the query String, and the data it should insert into each column
      const result = await pool.query(queryString, [this.title, this.movie, this.length, this.characterName])
      
      // take the id the database assigned to this record
      const createdId = result.rows[0].id
      // and save it in this instance of a Song
      this.id = createdId
      
      // return true -- the record saved
      return true
    } catch(err) {
      console.error(err)
      throw(err)
    }
  }
}

export default Song
