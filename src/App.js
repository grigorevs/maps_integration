import React from 'react';
import YandexMapComponent from './components/YandexMapComponent';

const App = () => {
  const attractions = [
    { id: 1, name: 'Донская набережная', latitude: 47.2094, longitude: 39.7127, description: 'Красивая набережная в Ростове-на-Дону', image: 'public/logo192.png' },
    { id: 2, name: 'Музей изобразительных искусств', latitude: 47.2241, longitude: 39.7044, description: 'Крупнейший художественный музей в Ростове' },
    { id: 3, name: 'Старочеркасская станица', latitude: 47.3667, longitude: 40.0833, description: 'Историческая казачья станица' },
  ];

  return (
    <div>
      <h1>Карта Ростовской области</h1>
      <YandexMapComponent attractions={attractions} />
    </div>
  );
};

export default App;