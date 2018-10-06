import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    updateBook: PropTypes.func.isRequired,
  };

  handleChange = e => {
    this.props.updateBook(this.props.book, e.target.value);
  };

  render() {
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 192,
                backgroundImage: `url("${(this.props.book.imageLinks &&
                  this.props.book.imageLinks.thumbnail) ||
                  ''}")`,
              }}
            />
            <div className="book-shelf-changer">
              <select
                value={this.props.book.shelf || 'none'}
                onChange={this.handleChange}
              >
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
          <div className="book-title">
            {this.props.book.title || 'No title'}
          </div>
          <div className="book-authors">
            {this.props.book.authors[0] || 'No author'}
          </div>
        </div>
      </li>
    );
  }
}
