// LocationStep.js - Coach Step 1: Location + Languages
import { LANGUAGES_LIST } from '../../constants.js';
import { loadGoogleMaps } from '../../../utils/googleMapsLoader.js';

export function render(formData) {
    const customLanguages = formData.customLanguages || [];
    
    const allLanguagesHtml = LANGUAGES_LIST.map(lang => `
        <button type="button" class="lang-chip ${formData.languages.includes(lang) ? 'active' : ''}" data-lang="${lang}">
            ${lang}
        </button>
    `).join('');
    
    const customLanguagesHtml = customLanguages.map(lang => `
        <button type="button" class="lang-chip active custom-lang" data-custom="${lang}">
            ${lang}
            <i data-lucide="x" class="remove-custom"></i>
        </button>
    `).join('');

    const hasLocation = formData.city && formData.country;
    const locationDisplay = hasLocation ? `${formData.city}, ${formData.country}` : '';

    return `
        <div class="onboarding-step step-content">
            <div class="step-inner">
                <div class="step-header">
                    <h1 class="step-title">¿Dónde <span class="text-accent italic">entrenas</span>?</h1>
                    <p class="step-subtitle">Configura tu zona y los idiomas en los que das clases</p>
                </div>

                <div class="step-body">
                    <!-- Location Section -->
                    <div class="form-section">
                        <div class="section-icon-row">
                            <div class="section-icon">
                                <i data-lucide="map-pin"></i>
                            </div>
                            <div class="section-label">Tu ubicación</div>
                        </div>
                        
                        <div class="location-input-wrapper">
                            <input 
                                type="text" 
                                id="onb-location-input" 
                                class="location-input ${hasLocation ? 'has-value' : ''}"
                                placeholder="Buscar ciudad..."
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
                            <p class="field-hint">Selecciona una ciudad de la lista desplegable</p>
                        `}
                        <div class="field-error" id="location-error" style="display:none;">
                            <i data-lucide="alert-circle"></i>
                            <span>Debes seleccionar una ubicación</span>
                        </div>
                    </div>

                    <!-- Languages Section -->
                    <div class="form-section" id="languages-section">
                        <div class="section-icon-row">
                            <div class="section-icon">
                                <i data-lucide="message-circle"></i>
                            </div>
                            <div class="section-label">Idiomas que hablas</div>
                        </div>
                        
                        <p class="field-hint" style="margin-bottom: 12px;">Selecciona todos los idiomas en los que puedes dar clase</p>
                        
                        <div class="chips-grid" id="languages-grid">
                            ${allLanguagesHtml}
                            ${customLanguagesHtml}
                        </div>
                        
                        <!-- Add custom language -->
                        <div class="add-language-section">
                            <p class="add-language-label">¿No encuentras tu idioma?</p>
                            <div class="add-language-row">
                                <input
                                    type="text" 
                                    id="onb-customLanguage"
                                    class="add-language-input"
                                    placeholder="Escribe el idioma..."
                                    maxlength="30"
                                >
                                <button type="button" id="add-language-btn" class="add-language-btn">
                                    <i data-lucide="plus"></i>
                                    <span>Añadir</span>
                                </button>
                            </div>
                        </div>
                        
                        <!-- Selected summary -->
                        <div class="selected-summary" id="selected-summary" style="${formData.languages.length + customLanguages.length > 0 ? '' : 'display:none'}">
                            <span class="summary-count">${formData.languages.length + customLanguages.length}</span>
                            <span class="summary-text">idioma${formData.languages.length + customLanguages.length !== 1 ? 's' : ''} seleccionado${formData.languages.length + customLanguages.length !== 1 ? 's' : ''}</span>
                        </div>
                        
                        <div class="field-error" id="languages-error" style="display:none;">
                            <i data-lucide="alert-circle"></i>
                            <span>Debes seleccionar al menos un idioma</span>
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
    const customLangInput = document.getElementById('onb-customLanguage');
    const addLangBtn = document.getElementById('add-language-btn');
    const nextBtn = document.getElementById('onb-next-btn');
    
    // Initialize customLanguages if needed
    if (!formData.customLanguages) formData.customLanguages = [];

    // Update selected summary
    const updateSummary = () => {
        const total = formData.languages.length + formData.customLanguages.length;
        const summary = document.getElementById('selected-summary');
        if (summary) {
            if (total > 0) {
                summary.style.display = '';
                summary.querySelector('.summary-count').textContent = total;
                summary.querySelector('.summary-text').textContent = 
                    `idioma${total !== 1 ? 's' : ''} seleccionado${total !== 1 ? 's' : ''}`;
            } else {
                summary.style.display = 'none';
            }
        }
    };

    // Location autocomplete
    if (locationInput) {
        loadGoogleMaps().then(async () => {
            const { Autocomplete } = await google.maps.importLibrary("places");
            const autocomplete = new Autocomplete(locationInput, {
                types: ['(cities)'],
                fields: ['address_components', 'geometry', 'name'],
            });

            locationInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') e.preventDefault();
            });

            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                if (!place.geometry) return;

                let country = '', state = '', city = '';
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

                Object.assign(formData, { country, state, city, address_raw: locationInput.value });
                setFormData(formData);
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

    // Language chips (predefined)
    document.querySelectorAll('.lang-chip[data-lang]').forEach(chip => {
        chip.onclick = () => {
            const lang = chip.dataset.lang;
            if (formData.languages.includes(lang)) {
                formData.languages = formData.languages.filter(l => l !== lang);
                chip.classList.remove('active');
            } else {
                formData.languages.push(lang);
                chip.classList.add('active');
            }
            setFormData(formData);
            updateSummary();
        };
    });

    // Custom language chips (remove)
    document.querySelectorAll('.custom-lang').forEach(chip => {
        chip.onclick = (e) => {
            const lang = chip.dataset.custom;
            formData.customLanguages = formData.customLanguages.filter(l => l !== lang);
            setFormData(formData);
            chip.remove();
            updateSummary();
        };
    });

    // Add custom language
    const addCustomLanguage = () => {
        const value = customLangInput?.value?.trim();
        if (!value) return;
        
        // Check if already exists
        if (formData.languages.includes(value) || formData.customLanguages.includes(value)) {
            customLangInput.value = '';
            return;
        }
        
        // Add to custom languages
        formData.customLanguages.push(value);
        setFormData(formData);
        
        // Create new chip visually
        const grid = document.getElementById('languages-grid');
        if (grid) {
            const newChip = document.createElement('button');
            newChip.type = 'button';
            newChip.className = 'lang-chip active custom-lang';
            newChip.dataset.custom = value;
            newChip.innerHTML = `${value}<i data-lucide="x" class="remove-custom"></i>`;
            grid.appendChild(newChip);
            
            // Add click handler for removal
            newChip.onclick = () => {
                formData.customLanguages = formData.customLanguages.filter(l => l !== value);
                setFormData(formData);
                newChip.remove();
                updateSummary();
            };
            
            if (window.lucide) window.lucide.createIcons();
        }
        
        customLangInput.value = '';
        updateSummary();
    };

    if (addLangBtn) {
        addLangBtn.onclick = addCustomLanguage;
    }

    if (customLangInput) {
        customLangInput.onkeydown = (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                addCustomLanguage();
            }
        };
    }

    // Validation helper
    const showError = (elementId, show) => {
        const errorEl = document.getElementById(elementId);
        if (errorEl) {
            errorEl.style.display = show ? 'flex' : 'none';
            if (window.lucide) window.lucide.createIcons();
        }
    };

    const clearErrors = () => {
        showError('location-error', false);
        showError('languages-error', false);
        document.getElementById('languages-section')?.classList.remove('has-error');
    };

    // Clear language error when selecting
    const originalUpdateSummary = updateSummary;
    const updateSummaryWithClear = () => {
        originalUpdateSummary();
        const total = formData.languages.length + formData.customLanguages.length;
        if (total > 0) {
            showError('languages-error', false);
            document.getElementById('languages-section')?.classList.remove('has-error');
        }
    };

    // Re-bind chips with error clearing
    document.querySelectorAll('.lang-chip[data-lang]').forEach(chip => {
        chip.onclick = () => {
            const lang = chip.dataset.lang;
            if (formData.languages.includes(lang)) {
                formData.languages = formData.languages.filter(l => l !== lang);
                chip.classList.remove('active');
            } else {
                formData.languages.push(lang);
                chip.classList.add('active');
            }
            setFormData(formData);
            updateSummaryWithClear();
        };
    });

    // Next button with validation
    if (nextBtn) {
        nextBtn.onclick = () => {
            clearErrors();
            let isValid = true;

            // Validate location
            if (!formData.city || !formData.country) {
                showError('location-error', true);
                isValid = false;
            }

            // Validate languages
            const totalLanguages = formData.languages.length + formData.customLanguages.length;
            if (totalLanguages === 0) {
                showError('languages-error', true);
                document.getElementById('languages-section')?.classList.add('has-error');
                isValid = false;
            }

            if (isValid) {
                nextStep();
            } else {
                // Scroll to first error
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
    const totalLanguages = formData.languages.length + (formData.customLanguages?.length || 0);
    if (totalLanguages === 0) {
        errors.languages = "Selecciona al menos un idioma";
    }
    return errors;
}

export function save(formData) {
    return true;
}
