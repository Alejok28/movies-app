import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Movie from './components/Movie';
// import Paginate from './components/Paginate';
import Search from './components/Search';
import ShoppingCart from './components/ShoppingCart';


class App extends Component {
  constructor(){
    super()
    this.state = {
      isLoading:true,
      movies:[],
      activePage: 1,
      searchTitle:'',
      cart:[],
    }
  }

  componentDidMount() {
    axios.get(`https://yts.am/api/v2/list_movies.json?limit=5`)
    .then(res => {
      const movies = res.data.data.movies;
      movies.map(movie => movie.price = Math.floor((Math.random() * 5) + 1));
      this.setState({ movies, isLoading: false });
    })
  }

  handleTitleChange = (event) => {
    this.setState({searchTitle: event.target.value})
  }

  handleAddToCart = (movie) => {
    this.setState({...this.state,cart:this.state.cart.concat(movie)})
  }
  handleRemoveFromCart = (m) => {
   //  this.setState({
   //   cart: this.state.cart.filter((movie, i) => m.id !== movie.id)
   // });
  }

  render() {
    const filteredMovies=this.state.movies.filter(
      (movie) => {
        return movie.title_long.toLowerCase().indexOf(this.state.searchTitle) !== -1;
      }
    );
    return (
      <div className="App">
        <h1>Movie App</h1>
        {this.state.cart.length > 0 ?
          <ShoppingCart movies={this.state.cart}/>
          :
          null
        }

        <Search value={this.state.searchTitle} handleChange={this.handleTitleChange}/>

        <div className="movies">
          {this.state.isLoading ?
            (<p>Loading...</p>)
            :
            filteredMovies.map(movie=> <Movie key={movie.id} movie={movie} onAddToCart={this.handleAddToCart.bind(this, movie)}/>)
          }
        </div>
      {/* <Paginate
        page={this.state.activePage}
        onPageChange={this.handlePaginationChange}
      /> */}
      </div>
    );
  }
}

export default App;
