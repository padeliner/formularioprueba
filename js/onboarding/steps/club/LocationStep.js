// LocationStep.js - Club Step 2: Location (Google Places)
import { loadGoogleMaps } from '../../../utils/googleMapsLoader.js';

export function render(formData) {
    const hasLocation = formData.city && formData.country;
    const locationDisplay = hasLocation ? `${formData.city}, ${formData.country}` : '';

    return `
        <div class="onboarding-step step-content">
            <div class="step-inner">
                <div class="step-header">
                    <h1 class="step-title">Tu <span class="text-accent italic">ubicación</span></h1>
                    <p class="step-subtitle">¿Dónde está tu club?</p>
                </div>

                <div class="step-body">
                    <div class="form-section">
                        <div class="section-icon-row">
                            <div class="section-icon">
                                <i data-lucide="map-pin"></i>
                            </div>
                            <div class="section-label">Ubicación del club</div>
                        </div>
                        
                        <div class="location-input-wrapper">
                            <input 
                                type="text" 
                                id="onb-location-input" 
                                class="location-input ${hasLocation ? 'has-value' : ''}"
                                placeholder="Buscar ciudad o dirección..."
                                value="${locationDisplay}"
                                autocomplete="off"
                                autocorrect="off"
                                autocapitalize="off"
                                spellcheck="false"
                                aria-label="Buscar ubicación"
                                enterkeyhint="search"
                            >
                            ${hasLocation ? `
                                <button type="button" id="clear-location" class="clear-location-btn" aria-label="Borrar ubicación">
                                    <i data-lucide="x"></i>
                                </button>
                            ` : ''}
                        </div>
                        ${hasLocation ? `
                            <div class="location-confirmed">
                                <i data-lucide="check-circle"></i>
                                <span>Ubicación confirmada</span>
                            </div>
                        ` : `
                            <p class="field-hint">Selecciona una ubicación de la lista desplegable</p>
                        `}
                        <div class="field-error" id="location-error" style="display:none;">
                            <i data-lucide="alert-circle"></i>
                            <span>Debes seleccionar una ubicación</span>
                        </div>
                    </div>

                </div>

                <div class="step-footer">
                    <button type="button" id="onb-next-btn" class="btn-continue">
                        <span>Continuar</span>
                        <i data-lucide="arrow-right"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

export function attach(formData, setFormData, rerender, nextStep) {
    if (window.lucide) window.lucide.createIcons();
    
    const locationInput = document.getElementById('onb-location-input');
    const clearLocationBtn = document.getElementById('clear-location');
    const nextBtn = document.getElementById('onb-next-btn');

    const showError = (id, show) => {
        const el = document.getElementById(id);
        if (el) {
            el.style.display = show ? 'flex' : 'none';
            if (show && window.lucide) window.lucide.createIcons();
        }
    };

    // Location autocomplete with Google Places
    if (locationInput) {
        loadGoogleMaps().then(async () => {
            const { Autocomplete } = await google.maps.importLibrary("places");
            const autocomplete = new Autocomplete(locationInput, {
                types: ['establishment', 'geocode'],
                fields: ['address_components', 'geometry', 'name', 'formatted_address'],
            });

            locationInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') e.preventDefault();
            });

            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                if (!place.geometry) return;

                let country = '', state = '', city = '', address = '';
                if (place.address_components) {
                    for (const component of place.address_components) {
                        const types = component.types;
                        if (types.includes('country')) country = component.long_name;
                        if (types.includes('administrative_area_level_1')) state = component.long_name;
                        if (types.includes('locality')) city = component.long_name;
                        else if (!city && types.includes('postal_town')) city = component.long_name;
                    }
                }
                if (!city && place.name) city = place.name;
                if (place.formatted_address) address = place.formatted_address;

                Object.assign(formData, { 
                    country, 
                    state, 
                    city, 
                    address: address,
                    address_raw: locationInput.value 
                });
                setFormData(formData);
                showError('location-error', false);
                rerender();
            });
        }).catch(err => {
            console.error("Maps load error:", err);
        });
    }

    // Clear location button
    if (clearLocationBtn) {
        clearLocationBtn.onclick = () => {
            formData.city = '';
            formData.country = '';
            formData.state = '';
            formData.address_raw = '';
            setFormData(formData);
            rerender();
        };
    }

    // Next button with validation
    if (nextBtn) {
        nextBtn.onclick = () => {
            showError('location-error', false);
            let isValid = true;

            if (!formData.city || !formData.country) {
                showError('location-error', true);
                isValid = false;
            }

            if (isValid) {
                nextStep();
            } else {
                const firstError = document.querySelector('.field-error[style*="flex"]');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        };
    }
}

export function validate(formData) {
    const errors = {};
    if (!formData.country || !formData.city) {
        errors.location = "Selecciona una ubicación válida de la lista";
    }
    return errors;
}

export function save(formData) {
    return true;
}
