const options = {
    mysql: {
      client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'ecommercemysql'
    }
    },
    sqlite3: {
      client: "sqlite3",
      connection: {
        filename: "./DB/ecommerce.sqlite",
      },
      useNullAsDefault: true,
    },
  };
  
  module.exports = { options };