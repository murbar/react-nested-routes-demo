import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';

const catalog = [
  {
    id: 1,
    slug: 'fiction',
    title: 'Fiction',
    books: [
      {
        id: 1,
        slug: 'great-gatsby',
        title: 'The Great Gatsby',
        description:
          'Quos, illo expedita! Quo, unde? Mollitia nobis libero voluptatibus dolorum quaerat! Inventore praesentium libero quos voluptatum fuga ab, cumque est voluptatibus ullam animi quidem placeat porro, sit dolores neque iusto.'
      },
      {
        id: 2,
        slug: 'to-kill-a-mockingbird',
        title: 'To Kill a Mockingbird',
        description:
          'Distinctio architecto culpa natus soluta beatae alias debitis omnis earum dicta consequuntur odio quos incidunt maiores pariatur fuga quibusdam, optio neque quaerat libero placeat molestiae accusamus nesciunt itaque.'
      },
      {
        id: 3,
        slug: '1984',
        title: '1984',
        description:
          'Ipsam ea rerum nihil ratione vel officia quos. Culpa vero quae voluptates quia aliquid architecto! Atque, adipisci. Totam nostrum fugit ex vero commodi optio quae. Aut at sint ullam labore.'
      }
    ]
  },
  {
    id: 2,
    slug: 'non-fiction',
    title: 'Non-Fiction',
    books: [
      {
        id: 1,
        slug: 'art-of-war',
        title: 'The Art of War',
        description:
          'Natus quod repellat iste assumenda voluptatibus animi laboriosam distinctio minima illo voluptatum? Eum nesciunt aspernatur quas quos. Ab eligendi libero minus, voluptas consequatur explicabo dolor molestiae. Nulla incidunt aliquam impedit!'
      },
      {
        id: 2,
        slug: 'on-liberty',
        title: 'On Liberty',
        description:
          'Voluptatum id ad necessitatibus? Recusandae cumque soluta odit placeat dicta, molestias numquam, corrupti sint asperiores voluptatibus dolorem minima cum, ex iure consectetur maxime. Quisquam libero veritatis, minima illo minus dolorem.'
      },
      {
        id: 3,
        slug: 'republic',
        title: 'The Republic',
        description:
          'Vel totam, eligendi dicta, ut nostrum consequuntur odio, voluptate laudantium cupiditate quis illum tempora provident excepturi! Assumenda temporibus, quae accusamus libero maxime laboriosam similique adipisci nostrum. Aliquam fuga iste iusto.'
      }
    ]
  }
];

const MainNav = () => {
  return (
    <ul className="main-nav">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/books">Books</Link>
      </li>
    </ul>
  );
};

const Home = () => {
  return <h1>Home</h1>;
};

const Section = ({ match }) => {
  const sect = catalog.find(({ slug }) => slug === match.params.sectionId);
  return <h2>{sect.title}</h2>;
};

const Books = () => {
  return (
    <div>
      <h1>Books</h1>
      <ul>
        {catalog.map(s => (
          <li key={s.id}>
            <Link to={`/books/${s.slug}`}>{s.title}</Link>
          </li>
        ))}
      </ul>
      <Route path="/books/:sectionId" component={Section} />
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
      </div>
      </Router>
    );
  }
}

export default App;
