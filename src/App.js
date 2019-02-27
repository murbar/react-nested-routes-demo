import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import './App.css';
import appData from './data';

const MainNav = () => {
  return (
    <ul className="main-nav">
      <li>
        <NavLink exact to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/books">Books</NavLink>
      </li>
    </ul>
  );
};

const Home = () => {
  return (
    <div>
      <h1>React Nested Routes</h1>
    </div>
  );
};

const Book = ({ match }) => {
  const sect = catalog.find(({ slug }) => slug === match.params.sectionSlug);
  const book = sect.books.find(({ slug }) => slug === match.params.bookSlug);
  return (
    <div className="book-detail">
      <h3>{book.title}</h3>
      <p>{book.description}</p>
    </div>
  );
};

const Section = ({ match }) => {
  const sect = catalog.find(({ slug }) => slug === match.params.sectionSlug);
  return (
    <div>
      <ul className="books-nav">
        {sect.books.map(b => (
          <li key={b.id}>
            <NavLink to={`/books/${sect.slug}/${b.slug}`}>{b.title}</NavLink>
          </li>
        ))}
      </ul>
      <Route path="/books/:sectionSlug/:bookSlug" component={Book} />
    </div>
  );
};

const Books = () => {
  return (
    <div>
      <ul className="sections-nav">
        {catalog.map(({ id, slug, title }) => (
          <li key={id}>
            <NavLink to={`/books/${slug}`}>{title}</NavLink>
          </li>
        ))}
      </ul>
      <Route path="/books/:sectionSlug" component={Section} />
    </div>
  );
};

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <MainNav />
          <Route exact path="/" component={Home} />
          <Route path="/books" component={Books} />
          <footer>
            A demo by Joel Bartlett. See my code on{' '}
            <a href="https://github.com/murbar/react-nested-routes-demo">GitHub</a>.
          </footer>
        </div>
      </Router>
    );
  }
}

export default App;
