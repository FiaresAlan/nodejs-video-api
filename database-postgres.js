
import { randomUUID } from "node:crypto"
import { sql } from './db.js'

export class DatabasePostgres {

   
    async list(search = '') {     
    let videos

    if (search) {
        videos = await sql`select * from videos where title ilike ${'%' + search + '%'}`
    } else {
        videos = await sql`select * from videos`
    }

    return videos
    }

    async create(video) {
        const videoId = randomUUID()
        const { title, description, duration } = video
        await sql`insert into videos (id, title, description, duration) VALUES (${videoId}, ${title}, ${description}, ${duration})`;
    }

    async update(id, video) {
        const { title, description, duration } = video
        console.log('ID recebido para update:', id)
        console.log('Dados recebidos:', video)
        await sql`UPDATE videos set title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${id}`;
        console.log('Dados alterados!')
    }

    async delete(id) {
        await sql`DELETE from videos WHERE id =${id}`
    console.log('Dados deletados!')
    }
}