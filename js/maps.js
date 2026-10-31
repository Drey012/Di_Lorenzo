const mapFrame = document.querySelector('[data-google-map]');
const mapStatus = document.querySelector('[data-map-status]');

const loadGoogleMap = async () => {
  try {
    const response = await fetch('/api/maps-config');
    if (!response.ok) {
      throw new Error(`Configuração do mapa indisponível (${response.status}).`);
    }

    const { apiKey, placeId } = await response.json();
    if (!apiKey || !placeId) {
      throw new Error('GOOGLE_API_KEY e GOOGLE_PLACE_ID são obrigatórios.');
    }

    const mapUrl = new URL('https://www.google.com/maps/embed/v1/place');
    mapUrl.searchParams.set('key', apiKey);
    mapUrl.searchParams.set('q', `place_id:${placeId}`);

    mapFrame.addEventListener(
      'load',
      () => {
        mapStatus.hidden = true;
      },
      { once: true },
    );
    mapFrame.src = mapUrl.toString();
  } catch (error) {
    console.error('Não foi possível carregar o mapa do Google Maps.', error);
    mapStatus.textContent =
      'Não foi possível carregar o mapa. Verifique a configuração do Google Maps.';
    mapStatus.classList.add('is-error');
  }
};

if (mapFrame && mapStatus) {
  loadGoogleMap();
}
