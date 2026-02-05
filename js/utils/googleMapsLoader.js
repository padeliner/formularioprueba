// Mock de Google Maps Loader para desarrollo local
export function loadGoogleMaps() {
    return new Promise((resolve, reject) => {
        // Si Google Maps ya está cargado, resolver inmediatamente
        if (window.google && window.google.maps) {
            resolve();
            return;
        }

        // Mock de Google Maps para desarrollo sin API key
        window.google = {
            maps: {
                importLibrary: async (library) => {
                    if (library === 'places') {
                        return {
                            Autocomplete: class MockAutocomplete {
                                constructor(input, options) {
                                    this.input = input;
                                    this.listeners = {};
                                    
                                    // Simular autocompletado con datos de prueba
                                    input.addEventListener('blur', () => {
                                        if (this.listeners['place_changed']) {
                                            this.listeners['place_changed']();
                                        }
                                    });
                                }
                                
                                addListener(event, callback) {
                                    this.listeners[event] = callback;
                                }
                                
                                getPlace() {
                                    // Retornar datos mock basados en el input
                                    const value = this.input.value;
                                    return {
                                        geometry: { location: { lat: () => 40.4168, lng: () => -3.7038 } },
                                        name: value || 'Madrid',
                                        address_components: [
                                            { long_name: value || 'Madrid', types: ['locality'] },
                                            { long_name: 'Comunidad de Madrid', types: ['administrative_area_level_1'] },
                                            { long_name: 'España', types: ['country'] }
                                        ]
                                    };
                                }
                            }
                        };
                    }
                    return {};
                }
            }
        };
        
        resolve();
    });
}
