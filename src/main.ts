import { createServer, request, RequestListener } from 'http';
import { getGame, getGameList, createGame, updateGame, deleteGame } from './controller';

process.on('beforeExit', () => {
  console.log('We are about to exit the program')
})

process.on('exit', () => {
  console.log('We will exit the program now!')
})

process.on('uncaughtException', (e) => {
  console.error('This should have been handled somewhere');
  console.error(e)
  process.exit(-1);
})

const requestListener: RequestListener  = async(req, res) => {
  if(req.url === '/games' && req.method === 'GET') {
    return await getGameList(res);
  } else if (req.url.match(/\games\/\w+/)  && req.method === 'GET') {
    const id = req.url.split('/')[2]
    return await getGame(res, id)
  } else if(req.url.match('/games') && req.method === 'POST') {
    return await createGame(req, res)
  } else if (req.url.match(/\games\/\w+/)  && req.method === 'PATCH') {
    const id = req.url.split('/')[2]
    return await updateGame(req, res, id);

  } if (req.url.match(/\games\/\w+/)  && req.method === 'DELETE') {
    const id = req.url.split('/')[2]
    return await deleteGame(res, id)

  } else {
    res.writeHead(404, {'Content-Type': 'application/json'})
    res.end(JSON.stringify({error: 'page not found'}))
  }

}

                                    //port 
createServer(requestListener).listen(8080);




