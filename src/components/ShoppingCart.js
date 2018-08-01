import React from 'react';
import { Table, Icon, Image } from 'semantic-ui-react';

const ShoppingCart = ({movies, onRemoveFromCart}) => {
  return (
    <div className="ShoppingCart">
      <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan={2}>Shopping Cart</Table.HeaderCell>
            <Table.HeaderCell colSpan={1}><Icon onClick={onRemoveFromCart} color='red' name='trash'/></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {movies.map(movie=>(
          <Table.Row>
            <Table.Cell colSpan={2}>
              <Image avatar src={movie.small_cover_image} /> {movie.title}
            </Table.Cell>
            <Table.Cell colSpan={1}>${movie.price}</Table.Cell>
          </Table.Row>
        ))}
        <Table.Row>
          <Table.Cell colSpan={2}><h5>Total price:</h5></Table.Cell>
          <Table.Cell colSpan={1}>
            <h5>${movies.reduce((sum, movie) => sum + movie.price, 0)}</h5>
          </Table.Cell>
        </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}

export default ShoppingCart;
