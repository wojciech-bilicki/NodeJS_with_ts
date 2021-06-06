import { AxiosResponse } from "axios";
import Api from "../common/api"
import { Game } from "../common/types";

const getGame = async(gameId: string): Promise<Game> => {

  const {data} = await Api.get<Game>(`/games/${gameId}`)
  return data;
}

const updateGame = async (game: Game): Promise<Game> => {
  const { data } = await Api.patch<Game, Game>(`/games/${game.id}`, game);
  return data
}

const createGame = async (game: Game): Promise<Game> => {
  const { data } = await Api.post<Game, Game>(`/games/${game.id}`, game);
  return data;
}

const deleteGame = async (gameId: string) => {
  const {data} = await Api.delete<Game[]>(`/games/${gameId}`);
  return data
}

export {
  getGame,
  updateGame,
  createGame,
  deleteGame
}