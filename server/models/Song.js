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
    
  }
}

export default Song
