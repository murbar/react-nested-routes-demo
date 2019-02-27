import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import './App.css';
import appData from './data';

const MainNav = () => {
  return (
    <ul className="nav main-nav">
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
      <h2>Concepts explored</h2>
      <ul>
        <li>Declarative client side routing with React Router v4</li>
        <li>Dynamic routes with URL parameters</li>
        <li>Passing data to components via render props</li>
        <li>Nested routes</li>
        <li>Linking between routes with Link and NavLink</li>
      </ul>
    </div>
  );
};

const Book = ({ match, catalog }) => {
  const sect = catalog.find(({ slug }) => slug === match.params.sectionSlug);
  const book = sect.books.find(({ slug }) => slug === match.params.bookSlug);
  return (
    <div className="book-detail">
      <h2>
        {book.title} <span>{book.author}</span>
      </h2>
      <p>{book.description}</p>
    </div>
  );
};

const Section = ({ match, catalog }) => {
  const sect = catalog.find(({ slug }) => slug === match.params.sectionSlug);
  return (
    <div>
      <ul className="nav books-nav">
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
      <ul className="nav sections-nav">
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
        <h1>React Routing Demo</h1>
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
