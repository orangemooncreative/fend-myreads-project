import React, { Component } from 'react';
import { getAll, update } from './BooksAPI';
import BookShelf from './components/BookShelf';
import SearchButton from './components/SearchButton';
import './App.css';

export default class BooksApp extends Component {
  state = {
    books: [],
  };

  // when the component is mounted to the page run the getAll function from
  // the api in order to grab all of the books. set the state of the books from
  // an empty array to what was pulled from the api. log any errors.
  async componentDidMount() {
    try {
      const books = await getAll();
      this.setState({ books });
    } catch (error) {
      console.log(error);
    }
  }

  // update the book's shelf and state based on user input and the filter method
  updateBook = (book, shelf) => {
    update(book, shelf).then(() => {
      book.shelf = shelf;
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([book]),
      }));
    });
  };

  // filter the books based on the shelf prop
  // display the book shelf components and place the filtered books on the appropriate shelf
  // pass the updateBook prop to child component (Book)
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
