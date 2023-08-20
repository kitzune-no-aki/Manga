const articleRouter = require('express').Router()
const Article = require('../models/article')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const Token = require('../utils/middleware')
const config = require('../utils/config')


articleRouter.get('/', async (request, response) => {
    const decodedToken = jwt.verify(request.token, config.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    //const userId = jwt.decode(request.token, process.env.SECRET).id
    //if (!userId) {
    //    return response.status(401).json({ error: 'user not found' })
    //}

    //const user = await User
    //    .findById(userId)

    const articles = await Article
        .find({})

    response.json(articles)

})

articleRouter.get('/:id', async (request, response) => {
    const decodedToken = jwt.verify(request.token, config.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    //const userId = jwt.decode(request.token, process.env.SECRET).id
    //if (!userId) {
    //    return response.status(401).json({ error: 'user not found' })
    //}

    //const user = await User
    //    .findById(userId)

    const articles = await Article
        .find({_id: request.params.id})

    response.json(articles)

})



articleRouter.post('/', async (request, response) => {
    const body = request.body

    const decodedToken = jwt.verify(request.token, config.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const userId = jwt.decode(request.token, config.SECRET).id
    if (!userId) {
        return response.status(401).json({ error: 'user not found' })
    }

    const user = await User
        .findById(userId)
    if(user.username === 'usagi') {
        if (body.title === undefined) {
            return response.status(400).json({error: 'title missing'})
        }
        if (body.author === undefined) {
            return response.status(400).json({error: 'Author missing'})
        }
        if (body.category === undefined || (body.category !== 'manga' && body.category !== 'book' && body.category !== 'movie')) {
            return response.status(400).json({error: 'category missing or wrong. category has to be Manga, Book or Movie'})
        }
        if (body.genre === undefined || (body.genre !== 'yaoi' && body.genre !== 'yuri' && body.genre !== 'shojo' && body.genre !== 'shonen' && body.genre !== 'magical girl')) {
            return response.status(400).json({error: 'genre missing or wrong. genre has to be yaoi, yuri, shonen, shojo or magical girl'})
        }

        const article = new Article({
            title: body.title,
            author: body.author,
            category: body.category,
            genre: body.genre,
            volume: body.volume,
            bin: body.bin,
            attachments: body.imageUrl,
        })

        const savedArticle = await article.save()


        response.json(savedArticle)
    }else{
        return response.status(401).json({ error: 'no permission' })
    }
})

articleRouter.patch('/:id', async (request, response) => {
    const decodedToken = jwt.verify(request.token, config.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const userId = jwt.decode(request.token, config.SECRET).id
    if (!userId) {
        return response.status(401).json({ error: 'user not found' })
    }

    const user = await User
        .findById(userId)

    const body = request.body

    if(user.username === 'usagi'){
        const filter = { _id: request.params.id };
        const update = {
            title: body.title,
            author: body.author,
            category: body.category,
            genre: body.genre,
            volume: body.volume,
            bin: body.bin,
            attachments: body.imageUrl,
        }

        await Article.findOneAndUpdate(filter, update, {new: true})
            .then(updatedArticle => {
                response.json(updatedArticle)
            })

    } else if(user.username !== 'usagi'){
        return response.status(401).json({ error: 'no permission' })
    }

})


module.exports = articleRouter
