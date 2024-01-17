import { pipeline, Readable } from 'node:stream'
import winston from 'winston'
import characterGenerator from './lib/characterGenerator.js'
import characterFilter from './lib/characterFilter.js'
import messageFormatter from './lib/messageFormatter.js'

const readable: Readable = Readable.from(characterGenerator())

const logger: winston.Logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: 'info',
      format: winston.format.printf(({ message }) => (message)),
    }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
})

pipeline(
  readable,
  characterFilter,
  messageFormatter,
  logger,
  (err: Error | null) => {
    if (err) {
      logger.error(err)
    }
  },
)
