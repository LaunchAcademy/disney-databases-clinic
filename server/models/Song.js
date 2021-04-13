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
    // query the database for all songs
    // (raw data from our database)
    const rawData = await pool.query("SELECT * FROM songs;")

    // turn those song rows from our database into Song objects
    const songData = rawData.rows
    const songs = songData.map(song => {
      return new Song(song)
    })

    // return that array of song objects
    return songs
  }

  static async findById(id) {
    // query the database for the song with that particular id
    const rawData = await pool.query(`SELECT * FROM songs WHERE id = ${id};`)
    
    console.log(rawData.rows)
    const songData = rawData.rows[0]
    
    // check if there is a song with that id
    if(songData) {
      // turn that single song into a Song object
      const song = new Song(songData)
      
      // return that Song object to the router
      return song
    } else {
      return null
    }
  }

  // singAVerse() {

  // }
}

export default Song
