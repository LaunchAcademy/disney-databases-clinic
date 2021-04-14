import pg from "pg"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/disney_databases_development"
})

class Song {
  constructor({ id, title, movie, length }) {
    this.id = id
    this.title = title
    this.movie = movie
    this.length = length
  }

  static async findAll() {
    try {
      // query the database for all songs
      // (raw data from our database)
      const rawData = await pool.query("SELECT * FROM songs;")
  
      // turn those song rows from our database into Song objects
      const songData = rawData.rows
      const songs = songData.map((song) => {
        return new Song(song)
      })
  
      // return that array of song objects
      return songs
    } catch (error) {
      console.error("MODEL ERROR")
      console.error(error)
      // return error
      throw(error)
    }
  }

  static async findById(id) {
    try {
      // query the database for the song with that particular id
      const rawData = await pool.query(`SELECT * FROM songs WHERE id = ${id};`)
      
      // console.log(rawData.rows)
      const songData = rawData.rows[0]
      
      // check if there is a song with that id
      if (songData) {
        // turn that single song into a Song object
        const song = new Song(songData)
        
        // return that Song object to the router
        return song
      } else {
        return null
      }
    } catch (error) {
      console.error(error)
      throw(error)
    }
  }

  async save() {
    try {
      const queryString = "INSERT INTO songs (title, movie, length) VALUES ($1, $2, $3) RETURNING id;"
      const result = await pool.query(queryString, [this.title, this.movie, this.length])
      // debugger
      const newSongId = result.rows[0].id
      this.id = newSongId

      return true
    } catch (error) {
      console.error(error)
      throw(error)
    }
  }
}

export default Song
