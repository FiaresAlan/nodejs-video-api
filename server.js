// import { createServer } from 'node:http'

// const server = createServer((request, response) => {
//     console.log('oi')
//     response.write("teste")

//     return response.end()
// })

// server.listen(1232)

// POST http://localhost:1232/videos
// DELETE http://localhost:1232/videos/1


//FASTIFY, CREATE SERVER COM FASTIFYYYYY
// GET, POST, PUT, DELETE
// Route Parameter
// POST http://localhost:3333/videos
// PUT http://localhost:3333/videos/3

// no reply.status(201) significa que algo foi criado, o 201 é este código

import { fastify } from 'fastify'
// import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify()

const database = new DatabasePostgres()
// const database = new DatabaseMemory() 


// Request Body

server.post('/videos', async (request, reply) => {
    const { title, description, duration } = request.body
    console.log(request.body)
    
    await database.create({
        title,
        description,
        duration,
    })

    return reply.status(201).send()
})




server.get('/videos', async (request) => {
    const search = request.query.search

    const videos = await database.list()
    console.log(videos)
    
    return videos
})


server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id
    const { title, description, duration } = request.body

    await database.update(videoId, {
        title,
        description,
        duration,
    })

    return reply.status(204).send()
})


server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id

    await database.delete(videoId)

    return reply.status(204).send()
})


server.listen({
    port: process.env.PORT ?? 3333, //configurei o ambiente para rodar no Render, mas caso ele não exista, roda na própria máquina mesmo.
})