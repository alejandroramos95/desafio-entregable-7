const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const Contenedor = require('./class/Contenedor.js')
const Chat = require('./class/Chat.js')
const moment = require('moment')
const { Router } = require('express')
const routes = Router()

const app = express()
const PORT = 8080
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

// Public statement
app.use(express.static('public'))

// Routes usage
app.use('/', routes)

const productos = new Contenedor()

routes.use(express.json())
routes.use(express.urlencoded({ extended: true }))

routes.get('/api/productos/listar', async (req, res) => {
  res.json(await productos.getAll())
})

routes.get('/api/productos/listar/:id', async (req, res) => {
  let { id } = req.params
  res.json(await productos.getById(id))
})

routes.post('/api/productos/guardar', (req, res) => {
  let producto = req.body
  productos.save(producto)
  refreshProducts()
  res.redirect('/')
})

routes.put('/api/productos/actualizar/:id', (req, res) => {
  let { id } = req.params
  let producto = req.body
  productos.updateItem(producto, id)
  refreshProducts()
  res.json(producto)
})

routes.delete('/api/productos/borrar/:id', async (req, res) => {
  let { id } = req.params
  let producto = await productos.deleteById(id)
  refreshProducts()
  res.json(producto)
})

app.get('/:file', (req, res) => {
  res.sendFile(__dirname + `/public/${req.params.file}`)
})

// Refresh products
async function refreshProducts() {
  io.sockets.emit('lista-productos', await productos.getAll())
}

// Server up

httpServer.listen(PORT, () => console.log(`SERVER LISTENING IN PORT ${PORT}`))

io.on('connection', async (socket) => {
  const chat = new Chat();
  const messages = await chat.getAll();
  io.sockets.emit('lista-productos', await productos.getAll())

  socket.emit('messages', messages)

  socket.on(
    'new-message',
    async (data) => {
      data.date = moment().format('DD-MM-YYYY HH:mm:ss')
      await chat.save(data)
      io.sockets.emit('messages', await chat.getAll())
    }
  )
})

