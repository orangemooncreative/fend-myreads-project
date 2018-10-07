import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

export default class BookShelf extends Component {
  // run typechecking on the props for the component
  static propTypes = {
    name: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    updateBook: PropTypes.func.isRequired,
  };

  // map over the books array to pass props to the book component
  // and display shelves
  render() {
    const { name, books } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book, key) => (
              <Book key={key} book={book} updateBook={this.props.updateBook} />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}
