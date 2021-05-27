import { IncomingMessage, ServerResponse } from 'http';
import { add, getAll, getById, removeById, update } from './fileOperations';
import { getDataFromRequest, getDefaultHeaders } from './utils';

export const getGameList = async (res: ServerResponse) => {
  const games = await getAll();
  res.writeHead(200, getDefaultHeaders());
  res.end(JSON.stringify(games));
};

export const getGame = async (res: ServerResponse, id: string) => {
  try {
    const game = await getById(id);
    if (!game) {
      res.writeHead(404, getDefaultHeaders());
      res.end(JSON.stringify({ error: `Game with id: ${id} was not found` }));
    } else {
      res.writeHead(200, getDefaultHeaders());
      res.end(JSON.stringify(game))
    }
  } catch (e) {
    console.log("TEST")
    console.error(e)
  }
};

export const createGame = async (req: IncomingMessage, res: ServerResponse) => {
  const newGameData = await getDataFromRequest(req)
  await add(newGameData);
  res.writeHead(201, getDefaultHeaders())
  res.end(JSON.stringify(newGameData))
}

export const updateGame = async (req: IncomingMessage, res: ServerResponse, id: string) => {
  const game = await getById(id);
  if (!game) {
    res.writeHead(404, getDefaultHeaders());
    res.end(JSON.stringify({ error: `Game with id: ${id} was not found` }));
  } else {
    const {name, price} = await getDataFromRequest(req)
    const gameDataToSave = {
      name: name || game.name,
      price: price || game.price,
      id
    }

    await update(gameDataToSave);
    res.writeHead(200, getDefaultHeaders())
    res.end(JSON.stringify(gameDataToSave));

  }
}

export const deleteGame = async (res: ServerResponse, id: string) => {
  const game = await getById(id);
  if (!game) {
    res.writeHead(404, getDefaultHeaders());
    res.end(JSON.stringify({ error: `Game with id: ${id} was not found` }));
  } else {
    const gamesAfterDelete = await removeById(id);
    res.writeHead(200, getDefaultHeaders())
    res.end(JSON.stringify(gamesAfterDelete));
   }
}
