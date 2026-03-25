import React, { useState } from 'react';
import { useGetCardsQuery } from './services/pokemonApi';
import './App.css';

function App() {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');

  const { data, error, isLoading } = useGetCardsQuery(search);

  if (isLoading) return <h2 className="text-center mt-5">Loading...</h2>;
  if (error) return <h2 className="text-center mt-5">Error fetching data</h2>;

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Pokémon Cards</h1>

      {/* SEARCH */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search Pokémon..."
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* FILTER */}
      <select
        className="form-select mb-3"
        onChange={(e) => setType(e.target.value)}
      >
        <option value="">All Types</option>
        <option value="Fire">Fire</option>
        <option value="Water">Water</option>
        <option value="Grass">Grass</option>
        <option value="Electric">Electric</option>
        <option value="Psychic">Psychic</option>
      </select>

      {/* CARDS */}
      <div className="row">
        {data?.data
          ?.filter(card =>
            type === '' || card.types?.includes(type)
          )
          .map((card) => (
            <div key={card.id} className="col-md-3 mb-4">
              <div className="card shadow-sm">
                <img
                  src={card.images.small}
                  className="card-img-top"
                  alt={card.name}
                />
                <div className="card-body text-center">
                  <h6>{card.name}</h6>
                  <p>{card.types?.join(', ')}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;