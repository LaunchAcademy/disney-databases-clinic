import pg from 'pg'
const pool = new pg.Pool({connectionString:"postgres://postgres:password@localhost:5432/concert_venues_development"})

class Seeder {
  static async seed() {
    // your seed code here
  }
}

export default Seeder
