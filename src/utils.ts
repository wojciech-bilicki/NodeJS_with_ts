import { IncomingMessage } from "http";
import { Game } from './fileOperations';

export const getDataFromRequest = (req: IncomingMessage):Promise<Game> => new Promise((resolve, reject) => {

  try {
    let body = '';

    req.on('data', (dataPart) => {
      body += dataPart.toString()
    })

    req.on('end', () => {
      resolve(JSON.parse(body) as Game)
    })


  } catch (err) {
    reject(err)
  }
})