import Api from "../common/api"
import { Game } from "../common/types";

const getGame = async(gameId: string): Promise<Game> => {

  const {data} = await Api.get<Game>(`/games/${gameId}`)
  return data;
}

export {
  getGame
}