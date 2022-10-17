const repositorio = require('./Repositorio')
const { options } = require('../optionsDB')

module.exports = class Chat {
  constructor() {
    this.repo = new repositorio(options.sqlite3, 'mensajes')
  }

  async getAll() {
    return await this.repo.getAllDB()
  }

  async save(itemNuevo) {
    // Chequeo que el producto se haya cargado con un console log
    // console.log('item nuevo contenedor', itemNuevo)
    return await this.repo.saveDB(itemNuevo)
  }
}