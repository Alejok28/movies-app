import React from 'react';
import { Button, Card, Item, Icon, Divider } from 'semantic-ui-react';

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

            </Card.Meta>
            <Item.Description>{movie.synopsis}</Item.Description>
            <Card.Content extra>
              {movie.rating} <Icon name='star' />
            </Card.Content>
            <Button onClick={onAddToCart} color='green'><Icon name='shop'/> ${movie.price}</Button>

          </Item.Content>
        </Item>
      </Item.Group>
      <Divider />
    </div>
)

export default Movie;
