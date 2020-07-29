import React from 'react';
import './App.css';
import AnimalCardList from './components/AnimalCardList';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <AnimalCardList />
      </div>
    </ApolloProvider>
  );
}

export default App;
