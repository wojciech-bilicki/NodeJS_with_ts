import {readFile,  writeFile, appendFile} from 'fs/promises'

export interface Game {
  name: string;
  price: number;
  id:  string;
}

export const getAll = async(): Promise<Game[]> => {
  const buffer = await readFile('./gameList.json', {
    encoding: 'utf-8'
  })

  return JSON.parse(buffer)
}

export const getById  =  async(id:string):Promise<Game> =>{
  const gamesList =  await getAll();
  const game = gamesList.find(game => game.id === id);
  if(game){
    return  game
  }
}  

export const add = async (game: Game) => {
  const gamesList =  await getAll();

  await writeFile('./gameList.json', JSON.stringify([...gamesList, game]))
}

export const removeById =  async (id: string) => {
  const gamesList = await getAll();
  const games = gamesList.filter(game  => game.id !== id);
  await writeFile('./gameList.json', JSON.stringify(games))
  return games
}

export const update = async(game: Partial<Game>) => {
  if(!game.id) {
    throw new Error('You need to pass an id!')
  }
  const gameToUpdate = await getById(game.id);
  const updatedGame =  {...gameToUpdate, ...game}
  await  removeById(game.id);
  await add(updatedGame);
}