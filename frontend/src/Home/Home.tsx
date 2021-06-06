import { RouteComponentProps, useNavigate } from '@reach/router';
import Typography from '@material-ui/core/Typography';
import { Fab, IconButton, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { Add, Delete } from '@material-ui/icons'

import React, { useEffect, useState } from 'react'
import { Game } from '../common/types';
import { getGamesList } from './home.api';
import { deleteGame } from '../Details/details.api';


const useStyles = makeStyles({
  tableRow: {
    cursor: 'pointer'
  },
  fab: {
    position: 'fixed',
    bottom: '32px',
    right: '32px'
  }
})

interface HomeProps extends RouteComponentProps {

}

const Home: React.FC<HomeProps> = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  
  const [games, setGames] = useState<Game[] | null>(null)

  useEffect(() => {
    const fetchGamesList = async () => {
      const gamesList = await getGamesList()
      setGames(gamesList)
    }
    fetchGamesList()
  }, [])

  const onRowClick = (gameId: string) => navigate(`games/${gameId}`)

  const onDelete = async (event: React.MouseEvent<HTMLButtonElement>, gameId: string) => {
    event.stopPropagation();
    const listAfterDelete = await deleteGame(gameId);
    setGames(listAfterDelete);
  }

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
            <TableRow className={classes.tableRow} hover key={game.id} onClick={() => onRowClick(game.id)}>
           
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
              <IconButton onClick={(event) => onDelete(event, game.id)} aria-label="delete" color="primary">
                  <Delete />
              </IconButton>
              </TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      <Fab onClick={() => navigate('/games/new')} className={classes.fab} color="primary" aria-label="add">
        <Add />
      </Fab>
    </>);
}

export default Home