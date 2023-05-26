import React from 'react';
import SearchBooks from '../src/pages/SearchBooks';
import SavedBooks from '../src/pages/SavedBooks';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route
            path='/'
            element={<SearchBooks />}
          />
          <Route
            path='/saved'
            element={<SavedBooks />}
          />
          <Route
            path='*'
            element={<h1 className="display-2">Wrong Page!</h1>}
          />
        </Routes>
      </>
    </Router>
    </ApolloProvider>
  );
}

export default App;
