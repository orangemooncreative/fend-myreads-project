import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from '../Book';
import { search, update, getAll } from '../../BooksAPI';

export default class SearchPage extends Component {
  // keep track of component state
  state = {
    query: '',
    books: [],
    res: [],
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

  // when the user search for a book by title or author in the input field,
  // capture their query and update the state with the result.
  // use that query to run the search function from the api.
  // capture the result from the query and update the state with the result.
  // loop over the results to find the book that was changed.
  // move the book to the appropriate book shelf.
  // handle any errors by resetting state or logging the error to the console.
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

  // update the book's shelf and state based on user input
  updateBook = (book, shelf) => {
    update(book, shelf).then(() => {
      book.shelf = shelf;
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([book]),
      }));
    });
  };

  render() {
    const { res } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/* capture user input and update state */}
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
            {/* map over the results and display the individual books */}
            {res.map((book, key) => (
              <Book key={key} book={book} updateBook={this.updateBook} />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}
