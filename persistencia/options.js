const optionsMySql = {
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '123',
    database: 'test'
  }
}

const optionsSQLite = {
  client: 'sqlite3',
  connection: {
    filename : './mensajes2.sqlite',
  },
  useNullAsDefault: true
}

module.exports = {optionsMySql , optionsSQLite};