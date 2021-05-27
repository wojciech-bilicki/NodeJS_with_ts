import { RouteComponentProps } from '@reach/router';
import Typography from '@material-ui/core/Typography';
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { Delete } from '@material-ui/icons'

import React, { useEffect, useState } from 'react'
import { Game } from '../common/types';
import { getGamesList } from './home.api';

interface HomeProps extends RouteComponentProps {

}

const Home: React.FC<HomeProps> = ({}) => {
  
  const [games, setGames] = useState<Game[] | null>(null)

  useEffect(() => {
    const fetchGamesList = async () => {
      const gamesList = await getGamesList()
      setGames(gamesList)
    }
    fetchGamesList()
  }, [])

    return (<>
      <Typography variant="h1">Games</Typography>
      <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {games && games.map(game => (
            <TableRow key={game.id}>
              <TableCell>
                {game.id}
              </TableCell>
              <TableCell>
                {game.name}
              </TableCell>
              <TableCell>
                {game.price}
              </TableCell>
              <TableCell>
              <IconButton aria-label="delete" color="primary">
                  <Delete />
              </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
    </>);
}

export default Home