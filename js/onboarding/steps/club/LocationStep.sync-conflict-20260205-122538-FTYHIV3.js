// LocationStep.js - Club Step 2: Location
import { COUNTRIES } from '../../constants.js';

export function render(formData) {
    const countryOptions = COUNTRIES.map(country => 
        `<option value="${country}" ${formData.country === country ? 'selected' : ''}>${country}</option>`
    ).join('');

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
                                <i data-lucide="globe"></i>
                            </div>
                            <div class="section-label">País</div>
                        </div>
                        
                        <div class="input-field">
                            <select id="onb-country" class="field-input field-select">
                                <option value="" disabled ${!formData.country ? 'selected' : ''}>Selecciona país</option>
                                ${countryOptions}
                            </select>
                            <i data-lucide="chevron-down" class="field-icon"></i>
                        </div>
                        <div class="field-error" id="country-error" style="display:none;">
                            <i data-lucide="alert-circle"></i>
                            <span>Selecciona un país</span>
                        </div>
                    </div>

                    <div class="form-section">
                        <div class="section-icon-row">
                            <div class="section-icon">
                                <i data-lucide="map-pin"></i>
                            </div>
                            <div class="section-label">Ciudad</div>
                        </div>
                        
                        <div class="input-field">
                            <input 
                                type="text" 
                                id="onb-city" 
                                class="field-input"
                                placeholder="Ciudad donde está el club"
                                value="${formData.city || ''}"
                                autocomplete="off"
                            >
                            <i data-lucide="map-pin" class="field-icon"></i>
                        </div>
                        <div class="field-error" id="city-error" style="display:none;">
                            <i data-lucide="alert-circle"></i>
                            <span>Introduce la ciudad</span>
                        </div>
                    </div>

                    <div class="form-section">
                        <div class="section-icon-row">
                            <div class="section-icon">
                                <i data-lucide="navigation"></i>
                            </div>
                            <div class="section-label">Dirección completa</div>
                        </div>
                        
                        <div class="input-field">
                            <input 
                                type="text" 
                                id="onb-address" 
                                class="field-input"
                                placeholder="Calle, número, código postal..."
                                value="${formData.address || ''}"
                                autocomplete="off"
                            >
                            <i data-lucide="navigation" class="field-icon"></i>
                        </div>
                        <div class="field-error" id="address-error" style="display:none;">
                            <i data-lucide="alert-circle"></i>
                            <span>Introduce la dirección</span>
                        </div>
                        <p class="field-hint">Preparado para Google Places en el proyecto final</p>
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
    
    const countrySelect = document.getElementById('onb-country');
    const cityInput = document.getElementById('onb-city');
    const addressInput = document.getElementById('onb-address');
    const nextBtn = document.getElementById('onb-next-btn');

    const showError = (id, show) => {
        const el = document.getElementById(id);
        if (el) {
            el.style.display = show ? 'flex' : 'none';
            if (show && window.lucide) window.lucide.createIcons();
        }
    };

    const clearAllErrors = () => {
        showError('country-error', false);
        showError('city-error', false);
        showError('address-error', false);
    };

    if (countrySelect) {
        countrySelect.onchange = (e) => {
            formData.country = e.target.value;
            setFormData(formData);
            showError('country-error', false);
        };
    }

    if (cityInput) {
        cityInput.oninput = (e) => {
            formData.city = e.target.value;
            setFormData(formData);
            if (e.target.value.trim()) showError('city-error', false);
        };
    }

    if (addressInput) {
        addressInput.oninput = (e) => {
            formData.address = e.target.value;
            setFormData(formData);
            if (e.target.value.trim()) showError('address-error', false);
        };
    }

    if (nextBtn) {
        nextBtn.onclick = () => {
            clearAllErrors();
            let isValid = true;

            if (!formData.country) {
                showError('country-error', true);
                isValid = false;
            }

            if (!formData.city || !formData.city.trim()) {
                showError('city-error', true);
                isValid = false;
            }

            if (!formData.address || !formData.address.trim()) {
                showError('address-error', true);
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
    if (!formData.country) errors.country = "Selecciona un país";
    if (!formData.city || !formData.city.trim()) errors.city = "Introduce la ciudad";
    if (!formData.address || !formData.address.trim()) errors.address = "Introduce la dirección";
    return errors;
}

export function save(formData) {
    return true;
}
