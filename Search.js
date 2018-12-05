import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book.js'
import './App.css'

class Search extends React.Component {

  state = {
    allBooks: [],
    searchQuery: '',
    results: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ allBooks: books })
    })
  }


  inputQuery = (query) => {
    this.setState({searchQuery: query})
    this.submitQuery();
  }

//Submits the search query to the API, then checks the results against
//the books currently on your shelves, updating accordingly.
  submitQuery = () => {
    if(this.state.searchQuery === '' || this.state.searchQuery === undefined) {
      return this.setState({results: []})
    }
    BooksAPI.search(this.state.searchQuery).then(books => {
      if(books.error) {
        return this.setState({results: []})
      }
      else {
      books.forEach(book => {
        let match = this.state.allBooks.filter(index => index.id === book.id)
        if(match[0]) {
          book.shelf = match[0].shelf;
        }
        else {
          book.shelf = 'none'
        }
      })
      return this.setState({ results: books });
    }
    })
  }

  updateShelf = (book, shelf) => {
      BooksAPI.getAll().then((books) => {
          this.setState({ allBooks: books})
        })
        BooksAPI.update(book, shelf).then(() => {
          book.shelf = shelf;
          })
  }

  render() {
    return (

      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">

            <input type="text" placeholder="Search by title or author"
            value={this.state.searchQuery} onChange={event => this.inputQuery(event.target.value)}/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {
            this.state.results.map((book, key) =>
            <Book updateShelf={this.updateShelf} book={book} key={key}/>)
            }
          </ol>
        </div>
      </div>
    )
  }
}


export default Search
