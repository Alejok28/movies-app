import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Movie from './components/Movie';
// import Paginate from './components/Paginate';
import Search from './components/Search';
import ShoppingCart from './components/ShoppingCart';
import { Grid } from 'semantic-ui-react';

class App extends Component {
  constructor(){
    super();
    this.state = {
      isLoading:true,
      movies:[],
      activePage: 1,
      searchTitle:'',
      searchGenre:'',
      cart:[],
    };
  }

  componentDidMount() {
    axios.get(`https://yts.am/api/v2/list_movies.json?limit=10`)
    .then(res => {
      const movies = res.data.data.movies;
      movies.map(movie => movie.price = Math.floor((Math.random() * 5) + 1));
      this.setState({ movies, isLoading: false });
    })
  }

  handleTitleChange = (event) => {
    this.setState({searchTitle: event.target.value});
  }
  handleGenreChange = (event) => {
    this.setState({searchGenre: event.target.value});
  }

  handleAddToCart = (movie) => {
    this.setState({...this.state,cart:this.state.cart.concat(movie)});
  }
  handleRemoveFromCart = () => {
    this.setState({cart: []});
  }

  render() {
    const filterByTitle=this.state.movies.filter( movie => {
      return movie.title_long.toLowerCase().indexOf(this.state.searchTitle) !== -1;
    });
    const filteredMovies=filterByTitle.filter(movie => {
      return movie.genres.join().toLowerCase().indexOf(this.state.searchGenre) !== -1;
    });

    return (
      <div className="App">
        <h1>Movie App</h1>
        <Grid textAlign='left' columns={2}>
          <Grid.Row>
            <Grid.Column width={4}>
              <h3>Search:</h3>
              <Search
                value={this.state.searchTitle}
                handleChange={this.handleTitleChange}
                placeholder="Title"
              />
              <Search
                value={this.state.searchGenre}
                handleChange={this.handleGenreChange}
                placeholder="Genre"
              />
              {this.state.cart.length > 0 ?
                <ShoppingCart onRemoveFromCart={this.handleRemoveFromCart} movies={this.state.cart}/>
                :
                null
              }
            </Grid.Column>
            <Grid.Column width={12}>
              <div className="movies">
                {this.state.isLoading ?
                  (<p>Loading...</p>)
                  :
                  filteredMovies.map(movie=> (
                    <Movie key={movie.id}
                      movie={movie}
                      onAddToCart={this.handleAddToCart.bind(this, movie)}
                    />
                  ))
                }
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>

      {/* <Paginate
        page={this.state.activePage}
        onPageChange={this.handlePaginationChange}
      /> */}
      </div>
    );
  }
}

export default App;
