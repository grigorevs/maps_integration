import React, { useEffect, useRef } from 'react';

const YandexMapComponent = ({ attractions }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const initMap = () => {
      if (typeof ymaps === 'undefined') {
        console.error("Yandex Maps API не загрузился");
        return;
      }

      ymaps.ready(() => {
        const map = new ymaps.Map(mapRef.current, {
          center: [47.5, 41],
          zoom: 12,
          controls: ['zoomControl', 'fullscreenControl']
        });

        const bounds = [[49.0, 38.0], [45.8, 43.0]]; 

        map.setBounds(bounds, {
          checkZoomRange: true 
        });

        attractions.forEach(attraction => {
            const balloonContent = `
              <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding-left: 30px; overflow: hidden">
                <h3>${attraction.name}</h3>
                <p>${attraction.description}</p>
                <img src="/images/${attraction.id}.jpg" alt="${attraction.name}" style="max-width: 500px; max-height: 200px;">
              </div>
            `;

          const placemark = new ymaps.Placemark([attraction.latitude, attraction.longitude], {
            balloonContent: balloonContent, 
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

  return <div ref={mapRef} style={{ width: '900px', height: '700px' }}></div>;
};

export default YandexMapComponent;