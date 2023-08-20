const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const articleSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    genre: { type: String, required: true },
    volume: { type: Number, required: false },
    bin: {type: Boolean, required: false },
    attachments: { type: String , required: false },
})

articleSchema.plugin(uniqueValidator)

articleSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


const Article = mongoose.model('Article', articleSchema)

module.exports = Article