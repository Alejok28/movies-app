import React from 'react';
import { Table, Icon, Image } from 'semantic-ui-react';

const ShoppingCart = ({movies, onRemoveFromCart}) => {
  return (
    <div className="ShoppingCart">
      <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan='3'>ShoppingCart</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {movies.map(movie=>(
          <Table.Row>
            <Table.Cell>
              <Image avatar src={movie.small_cover_image} /> {movie.title}
            </Table.Cell>
            <Table.Cell>${movie.price}</Table.Cell>
            {/* <Table.Cell>
              <Icon name='trash' onClick={onRemoveFromCart(movie)}/>
            </Table.Cell> */}
          </Table.Row>
        ))}
        <Table.Row>
          <Table.Cell><h5>TOTAL:</h5></Table.Cell>
          <Table.Cell>
            <h5>${movies.reduce((sum, movie) => sum + movie.price, 0)}</h5>
          </Table.Cell>
          {/* <Table.Cell></Table.Cell> */}
        </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}


export default ShoppingCart;
