import pg from "pg"

const pool = new pg.Pool({
  connectionString:"postgres://postgres:password@localhost:5432/disney_databases_development"
})

class Seeder {
  static async seed() {
    try {
      await pool.query("INSERT INTO songs (title, movie, length) VALUES ('Be Our Guest', 'Beauty and the Beast', '3.44');")
      
      const result = await pool.query("SELECT * FROM songs;")
      console.log(result.rows)
      
      pool.end()
    } catch (error) {
      console.log(`Error: ${error}`)
      pool.end()
    }
  }
}

export default Seeder
