import fetch, { Response } from 'node-fetch'
import { Character, ApiResponse } from './Interfaces.js'

export default async function* characterGenerator(): AsyncGenerator<Character, void, undefined> {
  let page: string | null = 'https://swapi.dev/api/people/'

  while (page) {
    const characters: Response = await fetch(page)
    const charactersObject: ApiResponse = await characters.json() as ApiResponse
    yield* charactersObject.results

    page = charactersObject.next
  }
}
