import React from 'react'
import './App.css'
import Book from './Book.js'

class Shelf extends React.Component {

render() {
    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              this.props.booksOnShelf.map((book, key) =>
              <Book updateShelf={this.props.updateShelf} book={book} key={key}/>)
              }
          </ol>
        </div>
      </div>

    )
  }
}


export default Shelf
