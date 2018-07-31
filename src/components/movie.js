import React from 'react';
import { Card, Item, Icon, Divider } from 'semantic-ui-react';

const Movie = ({movie}) => (
  <div className="movie-item">

      <Item.Group >
        <Item>
          <Item.Image  src={movie.medium_cover_image} />
          <Item.Content>
            <Item.Header>
              <a href={movie.url} target="_blank">{movie.title_long}</a>
            </Item.Header>
            <Card.Meta>
            
            </Card.Meta>
            <Item.Description>{movie.synopsis}</Item.Description>
            <Card.Content extra>
              <Icon name='star' />Rating: {movie.rating}
            </Card.Content>
          </Item.Content>
        </Item>
      </Item.Group>
      <Divider />
    </div>
)

export default Movie;