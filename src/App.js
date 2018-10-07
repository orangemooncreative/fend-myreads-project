import React, { Component } from 'react';
import { getAll, update } from './BooksAPI';
import BookShelf from './components/BookShelf';
import SearchButton from './components/SearchButton';
import './App.css';

export default class BooksApp extends Component {
  state = {
    books: [],
  };

  async componentDidMount() {
    try {
      const books = await getAll();
      this.setState({ books });
    } catch (error) {
      console.log(error);
    }
  }

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
    const currentlyReading = books.filter(b => b.shelf === 'currentlyReading');
    const wantToRead = books.filter(b => b.shelf === 'wantToRead');
    const read = books.filter(b => b.shelf === 'read');
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
                books={currentlyReading}
                updateBook={this.updateBook}
              />
              <BookShelf
                name="Want To Read"
                books={wantToRead}
                updateBook={this.updateBook}
              />
              <BookShelf
                name="Read"
                books={read}
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
