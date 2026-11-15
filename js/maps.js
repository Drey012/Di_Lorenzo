const mapFrame = document.querySelector('[data-google-map]');
const mapStatus = document.querySelector('[data-map-status]');

const STATIC_MAP_CONFIG = {
  apiKey: 'AIzaSyDtly1BAFPBwr-hAfZOQpy-n7ToJzfhYnM',
  placeId: 'ChIJ8bzs5TNOzpQREml5WbACMWY',
};

const getMapConfig = async () => {
  try {
    const response = await fetch('/api/maps-config', { cache: 'no-store' });
    if (response.ok) {
      return await response.json();
    }
  } catch {
    // Segue para a configuração estática (GitHub Pages)
  }

  return STATIC_MAP_CONFIG;
};

const loadGoogleMap = async () => {
  try {
    const { apiKey, placeId } = await getMapConfig();
    if (!apiKey || !placeId || apiKey === 'AIzaSyDtly1BAFPBwr-hAfZOQpy-n7ToJzfhYnM') {
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
