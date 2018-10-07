import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Book extends Component {
  // run typechecking on the props for the component
  static propTypes = {
    book: PropTypes.object.isRequired,
    updateBook: PropTypes.func.isRequired,
  };

  // move the books to different shelves based on user input by using
  // the updateBook prop created in App.js to manage state
  handleChange = async e => {
    try {
      const shelf = e.target.value;
      const { book } = this.props;
      await this.props.updateBook(book, shelf);
    } catch (error) {
      console.log(error);
    }
  };

  // use props to populate the book content
  // include error handling for empty states
  render() {
    const { book } = this.props;
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 192,
                backgroundImage: `url("${(book.imageLinks &&
                  book.imageLinks.thumbnail) ||
                  ''}")`,
              }}
            />
            <div className="book-shelf-changer">
              <select value={book.shelf || 'none'} onChange={this.handleChange}>
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title || 'No title'}</div>
          <div className="book-authors">
            {(book.authors && book.authors[0]) || 'No author'}
          </div>
        </div>
      </li>
    );
  }
}
