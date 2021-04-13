import pg from "pg"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/disney_databases_development"
})

class Song {
  constructor({id, title, movie, length}) {
    this.id = id
    this.title = title
    this.movie = movie
    this.length = length
  }

  static async findAll() {
    try {
      const result = await pool.query("SELECT * FROM songs;")

      //get the results
      const songData = result.rows
      const songs = songData.map(song => new this(song))

      return songs
    } catch(err) {
      console.log(err)
      throw(err)
    }
  }

  static async findById(id) {
    try {
      const result = await pool.query("SELECT * FROM songs WHERE id = $1;", [id])

      //get the results
      const songData = result.rows[0]
      const song = new this(songData)

      return song
    } catch(err) {
      console.log(err)
      throw(err)
    }
  }

  async save() {
    try {
      const query = "INSERT INTO songs (title, movie, length) VALUES ($1, $2, $3) RETURNING id;"
      const result = await pool.query(query, [this.title, this.movie, this.length])
      
      const newSongId = result.rows[0].id
      this.id = newSongId
  
      return true
    } catch(err) {
      console.log(err)
      throw(err)
    }
  }
}

export default Song
