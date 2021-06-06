import { Box, Button, makeStyles, TextField, Typography } from '@material-ui/core';
import { RouteComponentProps, useNavigate } from '@reach/router';
import React, { FormEventHandler, useEffect, useState } from 'react'
import { Game } from '../common/types';
import { createGame, deleteGame, getGame, updateGame } from './details.api';

interface DetailsProps extends RouteComponentProps {
  gameId?: string;
}

const useStyles = makeStyles({
  spacing: {
    marginBottom: '16px'
  },
  error: {
    color: 'red',
    fontSize: '20px',
    fontWeight: 'bold'
  }
})

const Details: React.FC<DetailsProps> = ({gameId}) => {
  const classes = useStyles()
  const navigate = useNavigate();


  const [error, setError] = useState<string | null>(null)
  const [game, setGame] = useState<Game | null>(null)

  useEffect(() => {
    if(!gameId) {
      return;
    }

    getGame(gameId).then(game => setGame(game)).catch(err => {
        setError(err.response.data.error)
    })

  }, [gameId])

  const onFormSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if(!game) {
      return;
    }
    // check whether to update or create new
    if(gameId) {
      await updateGame(game)
     
    } else {
      await createGame(game) 
    }
    navigate('/')
  }

  const onDelete = async () => {
    if(!gameId) {
      return;
    }
    await deleteGame(gameId);
    navigate('/')
  }

  const onFormValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGame(prevValue => {
      if(prevValue) {
        return {
          ...prevValue,
          [e.target.name]: e.target.value
        } as Game
      } else {
        return {
          [e.target.name]: e.target.value
        } as unknown as Game
      }
    })
    console.log(e.target.value)
    console.log(e.target.name)
  }

    return (<div>
      <Typography variant="h1">{game ? game.name : 'New game'}</Typography>
      <form onSubmit={onFormSubmit}>
        <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
          <TextField onChange={onFormValueChange} className={classes.spacing} name="id" value={game?.id || ''} label="Id" placeholder="Id"/>
          <TextField onChange={onFormValueChange} className={classes.spacing} name="name" value={game?.name || ''} label="Name" placeholder="Name"/>
          <TextField onChange={onFormValueChange} className={classes.spacing} type="number" name="price" value={game?.price || ''} label="Price" placeholder="Price"/>
          <Button className={classes.spacing} type="submit" variant="contained" color="primary">Submit</Button>
          <Button disabled={!gameId} variant="outlined" color="secondary" onClick={onDelete}>Delete</Button>
        </Box>
      </form>
      {error && <p className={classes.error}>{error}</p>}
    </div>);
}

export default Details