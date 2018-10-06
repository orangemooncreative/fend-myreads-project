import React, { Component } from 'react';
import { getAll, update } from './BooksAPI';
import BookShelf from './components/BookShelf';
import SearchButton from './components/SearchButton';
import './App.css';

export default class BooksApp extends Component {
  state = {
    books: [],
  };

  componentDidMount = () => {
    getAll().then(res => {
      this.setState({
        books: res,
      });
    });
  };

  updateBook = (book, shelf) => {
    update(book, shelf).then(() => {
      book.shelf = shelf;
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([book]),
      }));
    });
  };

  render() {
    const { books } = this.state;
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
                books={books.filter(b => b.shelf === 'currentlyReading')}
                updateBook={this.updateBook}
              />
              <BookShelf
                name="Want To Read"
                books={books.filter(b => b.shelf === 'wantToRead')}
                updateBook={this.updateBook}
              />
              <BookShelf
                name="Read"
                books={books.filter(b => b.shelf === 'read')}
                updateBook={this.updateBook}
              />
            </div>
          </div>
          <SearchButton />
        </div>
      </div>
    );
  }
}
