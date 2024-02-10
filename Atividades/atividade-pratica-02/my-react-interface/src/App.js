import React, { useState } from 'react';
import './App.css';
import CitiesComponent from './CitiesComponent.js';
import StatesComponent from './StatesComponent.js';
import BloodTypesComponent from './BloodTypesComponent.js';
import PeopleComponent from './PeopleComponent.js';
import CollectPlacesComponent from './CollectPlacesComponent.js';
import DonationsComponent from './DonationsComponent.js'; // Importação do novo componente

function App() {
  const [currentPage, setCurrentPage] = useState('cities');

  return (
    <div className="App">
      <header className="App-header">
        <nav className="top-nav">
          <ul>
            <li>
              <a href="#cities" onClick={() => setCurrentPage('cities')} className={currentPage === 'cities' ? 'selected' : ''}>Cidades</a>
            </li>
            <li>
              <a href="#states" onClick={() => setCurrentPage('states')} className={currentPage === 'states' ? 'selected' : ''}>Estados</a>
            </li>
            <li>
              <a href="#bloodTypes" onClick={() => setCurrentPage('bloodTypes')} className={currentPage === 'bloodTypes' ? 'selected' : ''}>Tipos Sanguíneos</a>
            </li>
            <li>
              <a href="#collectplaces" onClick={() => setCurrentPage('collectplaces')} className={currentPage === 'collectplaces' ? 'selected' : ''}>Locais de Coleta</a>
            </li>
            <li>
              <a href="#people" onClick={() => setCurrentPage('people')} className={currentPage === 'people' ? 'selected' : ''}>Pessoas</a>
            </li>
            <li>
              <a href="#donations" onClick={() => setCurrentPage('donations')} className={currentPage === 'donations' ? 'selected' : ''}>Doações</a> {/* Nova opção de navegação */}
            </li>
          </ul>
        </nav>
        {currentPage === 'cities' && <CitiesComponent />}
        {currentPage === 'states' && <StatesComponent />}
        {currentPage === 'bloodTypes' && <BloodTypesComponent />}
        {currentPage === 'people' && <PeopleComponent />}
        {currentPage === 'collectplaces' && <CollectPlacesComponent />}
        {currentPage === 'donations' && <DonationsComponent />} {/* Renderização condicional do DonationsComponent */}
      </header>
    </div>
  );
}

export default App;
