import { RouteComponentProps } from '@reach/router';
import React from 'react'

interface DetailsProps extends RouteComponentProps {
  gameId?: string;
}

const Details: React.FC<DetailsProps> = ({gameId}) => {
    return (<div>{gameId || "Add new Game"}</div>);
}

export default Details