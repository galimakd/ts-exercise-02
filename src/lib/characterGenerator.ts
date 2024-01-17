import fetch from 'node-fetch'

interface CharacterObject {
  next: string | null,
  results: {
    name: string,
    gender: string,
  }[]
}

export default async function* characterGenerator(): AsyncGenerator<{ name: string, gender: string }, void, undefined> {
  let page: string | null = 'https://swapi.dev/api/people/'

  while (page) {
    const characters = await fetch(page)
    const charactersObject = await characters.json() as CharacterObject
    yield* charactersObject.results

    page = charactersObject.next
  }
}
