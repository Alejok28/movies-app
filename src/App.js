import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Movie from './components/Movie';
import Paginate from './components/Paginate';
import Search from './components/Search';
import ShoppingCart from './components/ShoppingCart';
import { Grid, Button, Icon } from 'semantic-ui-react';

class App extends Component {
  constructor(){
    super();
    this.state = {
      isLoading:true,
      movies:[],
      cart:[],
      searchTitle:'',
      searchGenre:'',
      ascending: true,
      currentPage: 1,
    };
  }

  componentDidMount() {
    axios.get(`https://yts.am/api/v2/list_movies.json?limit=40`)
    .then(res => {
      const movies = res.data.data.movies;
      movies.map(movie => movie.price = Math.floor((Math.random() * 5) + 1));
      this.setState({ movies, isLoading: false });
      this.handleAscendingOrder("title_long");
    })
  }

  handleTitleChange = (event) => {
    this.setState({searchTitle: event.target.value});
  }
  handleGenreChange = (event) => {
    this.setState({searchGenre: event.target.value});
  }

  handleOrder = (attr) => {
    if (this.state.ascending) {
      this.HandleDescendingOrder(attr);
    } else {
      this.handleAscendingOrder(attr);
    }
  }

  HandleDescendingOrder = (attr) => {
    var movies = this.state.movies;
    movies.sort((a, b) => {
      if(a[attr] > b[attr]) return -1;
      if(a[attr] < b[attr]) return 1;
      return 0;
    });
    this.setState({
      movies,
      ascending: false,
    });
  }

  handleAscendingOrder = (attr) => {
    var movies = this.state.movies;
    movies.sort((a, b) => {
      if(a[attr] < b[attr]) return -1;
      if(a[attr] > b[attr]) return 1;
      return 0;
    });
    this.setState({
      movies,
      ascending: true,
    });
  }


  handleAddToCart = (movie) => {
    this.setState({cart:this.state.cart.concat(movie)});
  }

  handleRemoveFromCart = () => {
    this.setState({cart: []});
  }

  previousPage = () => {
    if (this.state.currentPage !== 1)
      this.setState({
        currentPage: this.state.currentPage - 1,
        searchTitle: '',
        searchGenre: '',
      })
  }

  nextPage = () => {
    if (this.state.currentPage + 1 < this.state.movies.length)
      this.setState({
        currentPage: this.state.currentPage + 1,
        searchTitle: '',
        searchGenre: '',
      })
  }
  render() {
    const {movies, currentPage, searchTitle} =this.state;

    const filterByTitle = movies.slice(currentPage * 10, currentPage *10 + 10).filter( movie => {
      return movie.title_long.toLowerCase().indexOf(searchTitle) !== -1;
    });

    const filteredMovies=filterByTitle.filter(movie => {
      if (movie.genres) {
        return movie.genres.join().toLowerCase().indexOf(this.state.searchGenre) !== -1;
      }
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
                <h3>Ordernar por:</h3>
                <Button  onClick={this.handleOrder.bind(this,"title_long")} color='blue'>Title <Icon name={this.state.ascending? "angle down" : "angle up"} /></Button>
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
        <Paginate page={currentPage} next={this.nextPage} prev={this.previousPage} />
      </div>
    );
  }
}

export default App;
