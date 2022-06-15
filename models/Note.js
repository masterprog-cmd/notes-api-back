const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
    done: Boolean
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Note = mongoose.model('Note', noteSchema)

// Note.find({}).then(notes => {
//     console.log(notes);
//     mongoose.connection.close();
// })

// const note = new Note({
//     content: 'MongoDB is cool',
//     date: new Date(),
//     important: true
// })

// note.save()
//     .then(result => {
//         console.log(result);
//         mongoose.connection.close();
//     })
//     .catch(error => {
//         console.log(error);
//     })

module.exports = Note;