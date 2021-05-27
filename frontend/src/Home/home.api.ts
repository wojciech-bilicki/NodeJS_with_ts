import Api from "../common/api"
import { Game } from "../common/types";

const getGamesList = async () => {
  const response = await Api.get<Game[]>('/games');
  return response.data;
}

export { getGamesList };