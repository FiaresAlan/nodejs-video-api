// SET (como se fosse uma array no JS), MAP(parece com OBJ no JS)
// UUID (Universal Unique ID)
// list retornara todos os videos, porém, sem o ID (value citado por isso)


import { randomUUID } from "node:crypto"

export class DatabaseMemory {
    #videos = new Map()
    
   
    list(search) {
        return Array.from(this.#videos.entries())
        .map((videoArray) => {
               const id = videoArray[0]
               const data = videoArray[1]

               return {
                id,
                ...data,
               }
        })
        .filter(video => {
            if (search) {
                return video.title.include(search)
            }
            return true
        })
    }

    create(video) {
        const videoId = randomUUID()

        this.#videos.set(videoId, video)
    }

    update(id, video) {
        this.#videos.set(id, video)
    }

    delete(id) {
        this.#videos.delete(id)
    }
}