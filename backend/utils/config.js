require('dotenv').config()

const PORT = process.env.PORT
const POPO = process.env.MONGODB_URI
const SECRET = process.env.SECRET

module.exports = {
    POPO,
    PORT,
    SECRET
}