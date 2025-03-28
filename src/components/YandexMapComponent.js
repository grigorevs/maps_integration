import React, { useEffect, useRef } from 'react';

const YandexMapComponent = ({ attractions }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const initMap = () => {
      if (typeof ymaps === 'undefined') {
        console.error("Yandex Maps API не загрузился!");
        return;
      }

      ymaps.ready(() => {
        const map = new ymaps.Map(mapRef.current, {
          center: [47.5, 41], // Примерные координаты центра
          zoom: 7, // Начальный масштаб
          controls: ['zoomControl', 'fullscreenControl']
        });

        // Координаты северо-западной и юго-восточной точек Ростовской области
        const bounds = [[49.0, 38.0], [45.8, 43.0]]; // Примерные координаты

        // Устанавливаем область видимости карты
        map.setBounds(bounds, {
          checkZoomRange: true // Проверяем, чтобы масштаб не выходил за допустимые пределы
        });

        attractions.forEach(attraction => {
            const imagePath = 'https://i.pinimg.com/736x/1f/32/de/1f32de75ae0a1ac218a902f6f361a6d7.jpg'; // Путь к изображению
            const balloonContent = `
              <div style="display: flex; flex-direction: column; align-items: center;">
                <h3>${attraction.name}</h3>
                <p>${attraction.description}</p>
                <img src="" alt="${attraction.name}" style="max-width: 200px; max-height: 200px;">
              </div>
            `;

          const placemark = new ymaps.Placemark([attraction.latitude, attraction.longitude], {
            balloonContent: balloonContent, // Используем balloonContent
          });
          map.geoObjects.add(placemark);
        });
      });
    };

    initMap();

    return () => {
      if (mapRef.current && mapRef.current.firstChild) {
        mapRef.current.removeChild(mapRef.current.firstChild);
      }
    };
  }, [attractions]);

  return <div ref={mapRef} style={{ width: '100%', height: '500px' }}></div>;
};

export default YandexMapComponent;