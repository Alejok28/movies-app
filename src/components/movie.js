import React from 'react';
import { Button, Card, Item, Icon } from 'semantic-ui-react';

const Movie = ({movie, onAddToCart}) => (
  <div className="movie-item">
    <Item.Group >
      <Item>
        <Item.Image  src={movie.medium_cover_image} />
        <Item.Content>
          <Item.Header>
            <a href={movie.url} target="_blank">{movie.title_long}</a>
          </Item.Header>
          <Card.Meta>
            Genres: {movie.genres ? (movie.genres.join()) : 0}.
          </Card.Meta>
          <Item.Description>{movie.synopsis}</Item.Description>
          <Card.Content>
            Rating: {movie.rating} <Icon name='star' />
          </Card.Content>
          <Button onClick={onAddToCart} color='green'><Icon name='shop'/> ${movie.price}</Button>
        </Item.Content>
      </Item>
    </Item.Group>
  </div>
)

export default Movie;
