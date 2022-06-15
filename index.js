//Conexión a la DataBase solo con el require
require('./mongo')

const express = require('express') // CommonJS
const cors = require('cors')
const Note = require('./models/Note')

const logger = require('./loggerMiddleware')
const bodyParser = require('body-parser')

//Inicializamos app con express
const app = express()

app.use(cors())

app.use(express.json())
app.use(logger)

let notes = []

app.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})



app.post('/api/note', (request, response) => {
  // Este note contiene el body que añadimos en el body del post
  const note = request.body
  console.log(note)

  if (!note || !note.content) {
    return response.status(400).json({
      error: 'Note content missing'
    })
  }
  // Obtenemos los id de todas las notas
  const ids = notes.map(note => note.id)
  // Obtenemos el id más alto
  const maxId = Math.max(...ids)

  // Creamos una nueva nota con los parámentros que añadiremos con post
  const newNote = {
    // ID es el id más alto + 1
    id: maxId + 1,
    // Content es el contenido que añadimos en el body
    content: note.content,
    // important es el important que añadimos en el body,si no, por defecto es false
    important: typeof note.important !== 'undefined' ? note.important : false,
    // Date es la fecha actual
    date: new Date().toISOString()
  }

  // notes = notes.concat(newNote)
  notes = [...notes, newNote]
  Note.create(notes)
  response.json(notes)
  notes = []
  // response.send(notes)
})


app.use((request, response) => {
  response.status(404).end()
})


const PORT = process.env.PORT || 3001


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


// // id es un parametro que se puede pasar en la url. Todos los parametors
// // se obtienen como string, por lo que a veces necesitamos pasarlo a int, bool, etc
// app.get('/api/notes/:id', (request, response) => {
//   const id = Number(request.params.id)
//   const note = notes.find(note => note.id === id)
//   // Si la información que hemos pasado como parámetro es correcta (en este caso un número), nos devuelves el JSON, si no es correcta, nos devuelve un error 404
//   if (note) {
//     // Stauts code 200
//     response.json(note)
//   } else {
//     // Status code 404
//     response.status(404).end()
//   }
// })

// app.delete('/api/notes/:id', (request, response) => {
//   const id = Number(request.params.id)
//   notes = notes.filter(note => note.id !== id)
//   response.status(204).end()
// })