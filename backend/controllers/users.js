const bcrypt = require('bcrypt') //Passwort hashen
const usersRouter = require('express').Router()
const User = require('../models/user')

/*usersRouter.get('/', async (request, response) => {
    const user = await User
        .find({role: "admin"})

    response.json(user)

})*/

usersRouter.post('/', async (request, response) => {
    const { username, password } = request.body

    if (username !== "" && password.length >= 5) {

        const saltRounds = 10 //wie oft Passwort hashen
        const passwordHash = bcrypt.hashSync(password, saltRounds) //nimmt Passwort und hasht es

        const user = new User({
            username,
            passwordHash,
        })

        const savedUser = await user.save()

        response.status(201).json(savedUser)

    } else{
        response.status(400).send({ error: 'make sure a valid username is entered and password has at least 5 characters' })
    }

})

module.exports = usersRouter
