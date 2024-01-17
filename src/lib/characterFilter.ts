import { Transform, TransformCallback } from 'node:stream'

interface Character {
  name: string,
  gender: string,
}

export default new Transform({
  objectMode: true,
  transform(character: Character, encoding: string, next: TransformCallback) {
    if (character.gender === 'female') {
      next(null, character)
    } else {
      next()
    }
  },
})
