import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookShelf from './components/BookShelf';

export default class BooksApp extends Component {
  state = {
    books: [],
  };

  componentDidMount = () => {
    BooksAPI.getAll().then(res => {
      this.setState({
        books: res,
      });
    });
  };

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf;
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([book]),
      }));
    });
  };

  render() {
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <BookShelf
                name="Currently Reading"
                books={this.state.books.filter(
                  b => b.shelf === 'currentlyReading'
                )}
                updateBook={this.updateBook}
              />
              <BookShelf
                name="Want To Read"
                books={this.state.books.filter(b => b.shelf === 'wantToRead')}
                updateBook={this.updateBook}
              />
              <BookShelf
                name="Read"
                books={this.state.books.filter(b => b.shelf === 'read')}
                updateBook={this.updateBook}
              />
            </div>
          </div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>
      </div>
    );
  }
}
