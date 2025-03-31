import React from 'react';
import YandexMapComponent from './components/YandexMapComponent';
import attractions from './data/attractionsList';

const App = () => {
 

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <h1>Карта достопримечательностей Ростовской области</h1>
        <YandexMapComponent attractions={attractions} />
    </div>
  );
};

export default App;