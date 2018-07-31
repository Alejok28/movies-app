import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Movie from './components/movie';
import Paginate from './components/paginate';


class App extends Component {
  constructor(){
    super()
    this.state = {
      isLoading:true,
      movies:[],
      activePage: 1,
    }
  }

  componentDidMount() {
    axios.get(`https://yts.am/api/v2/list_movies.json?page=${this.state.activePage}&limit=8`)
    .then(res => {
      const movies = res.data.data.movies;
      this.setState({ movies, isLoading: false });
    })
  }

  handlePaginationChange = (e, { activePage }) => {
    this.setState({isLoading:true})
    axios.get(`https://yts.am/api/v2/list_movies.json?page=${this.state.activePage}&limit=8`)
    .then(res => {
      const movies = res.data.data.movies;
      console.log(movies);
      this.setState({ movies, activePage, isLoading: false });
    })
  }


  render() {
    return (
      <div className="App">
        <h1>Movie App</h1>
        {this.state.isLoading ?
          (<p>Cargando...</p>)
          :
          this.state.movies.map(movie=>(
            <Movie key={movie.id} movie={movie}/>
          ))
        }

      <Paginate
        page={this.state.activePage}
        onPageChange={this.handlePaginationChange}
      />

      </div>
    );
  }
}

export default App;
