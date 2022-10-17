const { options } = require('./optionsDB.js')

const knexMySql = require('knex')(options.mysql)
const knexSqlite = require('knex')(options.sqlite3)

function crearTablaProductos(knex) {
  knex.schema
    .createTable('productos', (table) => {
      table.increments('id')
      table.string('title')
      table.double('price')
      table.string('thumbnail')
    })
    .then(() => {
      console.log('Products table created')
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      knex.destroy()
    })
}

function crearTablaMensajes(knex) {
  knex.schema
    .createTable('mensajes', (table) => {
      table.increments('id')
      table.string('author')
      table.string('text')
      table.string('date')
    })
    .then(() => {
      console.log('Message table created')
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      knex.destroy()
    })
}

// Creo tabla Mensajes en BD sqlite3
crearTablaMensajes(knexSqlite)
// Creo tabla Productos en BD MySql
// crearTablaProductos(knexMySql)
