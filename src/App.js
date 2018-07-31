import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Movie from './components/movie';
import Paginate from './components/paginate';
import Search from './components/search';


class App extends Component {
  constructor(){
    super()
    this.state = {
      isLoading:true,
      movies:[],
      activePage: 1,
      searchTitle:'',
    }
  }

  componentDidMount() {
    axios.get(`https://yts.am/api/v2/list_movies.json?limit=50`)
    .then(res => {
      const movies = res.data.data.movies;
      movies.map(movie => movie.price = Math.floor((Math.random() * 20000) + 10000));

      console.log(movies);
      this.setState({ movies, isLoading: false });
    })
  }

  handleTitleChange = (event) => {
    this.setState({searchTitle: event.target.value})
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
        <Search value={this.state.searchTitle} handleChange={this.handleTitleChange}/>
        <div className="movies">
          {this.state.isLoading ?
            (<p>Cargando...</p>)
            :
            filteredMovies.map(movie=> <Movie key={movie.id} movie={movie}/>)
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
