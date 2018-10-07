import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from '../Book';
import { search, update, getAll } from '../../BooksAPI';

export default class SearchPage extends Component {
  state = {
    query: '',
    books: [],
    res: [],
  };

  // state = {
  //   query: '',
  //   books: [],
  // };

  async componentDidMount() {
    try {
      const books = await getAll();
      this.setState({ books });
    } catch (error) {
      console.log(error);
    }
  }

  handleChange = async e => {
    try {
      const query = e.target.value;
      this.setState({ query });

      if (query.trim()) {
        const res = await search(query);
        if (res.error) {
          this.setState({ res: [] });
        } else {
          res.forEach(book => {
            const foundBook = this.state.books.filter(b => b.id === book.id);
            if (foundBook[0]) {
              book.shelf = foundBook[0].shelf;
            }
          });
          return this.setState({ res });
        }
      } else {
        this.setState({ res: [] });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handleChange = async e => {
  //   try {
  //     const query = e.target.value;
  //     this.setState({ query });

  //     if (query.trim()) {
  //       const res = await search(query);
  //       if (res.error) {
  //         this.setState({ books: [] });
  //       } else {
  //         this.setState({ books: res });
  //       }
  //     } else {
  //       this.setState({ books: [] });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  updateBook = (book, shelf) => {
    update(book, shelf).then(() => {
      book.shelf = shelf;
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([book]),
      }));
    });
  };

  render() {
    const { res, books } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.handleChange}
              value={this.state.query}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {res.map((book, key) => (
              <Book key={key} book={book} updateBook={this.updateBook} />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}
