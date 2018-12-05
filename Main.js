import React from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './Search.js'
import Shelf from './Shelf.js'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books })
    })
  }

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      BooksAPI.getAll().then((books) => {
          this.setState({ books })
        })
    })
  }

  render() {
    return (
      <div className="app">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>

              { <Shelf name='Currently Reading' updateShelf={this.updateShelf}
              booksOnShelf={this.state.books.filter(book => book.shelf === 'currentlyReading')}/> }
              { <Shelf name='Want to Read' updateShelf={this.updateShelf}
              booksOnShelf={this.state.books.filter(book => book.shelf === 'wantToRead')}/> }
              { <Shelf name='Read' updateShelf={this.updateShelf}
              booksOnShelf={this.state.books.filter(book => book.shelf === 'read')}/>}

              </div>
            </div>
            <div className="open-search">
              <Route exact path='/search' component={ Search } />
              <Link to='/search'>Add a Book</Link>
            </div>
          </div>
      </div>
    )
  }
}

export default BooksApp
