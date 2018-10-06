import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

export default class BookShelf extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    updateBook: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((book, key) => (
              <Book key={key} book={book} updateBook={this.props.updateBook} />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}
