import React, { useState, useEffect } from 'react';
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

const Book = ({ match, catalog }) => {
  const sect = catalog.find(({ slug }) => slug === match.params.sectionSlug);
  const book = sect.books.find(({ slug }) => slug === match.params.bookSlug);
  return (
    <div className="book-detail">
      <h3>{book.title}</h3>
      <p>{book.description}</p>
    </div>
  );
};

const Section = ({ match, catalog }) => {
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
      <Route
        path="/books/:sectionSlug/:bookSlug"
        render={props => <Book {...props} catalog={catalog} />}
      />
    </div>
  );
};

const Books = () => {
  const [catalog, setCatalog] = useState([]);

  useEffect(() => {
    setCatalog(appData);
  }, []);

  if (!catalog.length) return <div className="loading">Loading data...</div>;

  return (
    <div>
      <ul className="sections-nav">
        {catalog.map(({ id, slug, title }) => (
          <li key={id}>
            <NavLink to={`/books/${slug}`}>{title}</NavLink>
          </li>
        ))}
      </ul>
      <Route
        path="/books/:sectionSlug"
        render={props => <Section {...props} catalog={catalog} />}
      />
    </div>
  );
};

const App = props => {
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
};

export default App;
