import { Transform, TransformCallback } from 'node:stream'

import { Character } from './Interfaces.js'

export default new Transform({
  objectMode: true,
  transform(character: Character, encoding: BufferEncoding, next: TransformCallback): void {
    next(null, { level: 'info', message: character.name })
  },
})
