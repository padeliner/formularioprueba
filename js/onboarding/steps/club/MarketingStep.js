// MarketingStep.js - Club Step 8: Marketing (Visibilidad)
import { DISCOVERY_SOURCES } from '../../constants.js';

export function render(formData) {
    const discoveryChips = DISCOVERY_SOURCES.map(source => `
        <button type="button" class="discovery-chip ${formData.discoverySource === source ? 'active' : ''}" data-value="${source}">
            <span>${source}</span>
        </button>
    `).join('');

    return `
        <div class="onboarding-step step-content">
            <div class="step-inner">
                <div class="step-header">
                    <h1 class="step-title">Tu <span class="text-accent italic">visibilidad</span></h1>
                    <p class="step-subtitle">Sponsors y presencia digital</p>
                </div>

                <div class="step-body">
                    <!-- Discovery Source Section -->
                    <div class="form-section">
                        <div class="section-icon-row">
                            <div class="section-icon">
                                <i data-lucide="search"></i>
                            </div>
                            <div class="section-label">¿Cómo nos has conocido?</div>
                        </div>
                        <div class="discovery-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 10px; margin-top: 12px;">
                            ${discoveryChips}
                        </div>
                        <div class="field-error" id="discovery-error" style="display:none;">
                            <i data-lucide="alert-circle"></i>
                            <span>Selecciona una opción</span>
                        </div>
                    </div>

                    <!-- Sponsors Section -->
                    <div class="form-section">
                        <div class="section-icon-row">
                            <div class="section-icon">
                                <i data-lucide="award"></i>
                            </div>
                            <div class="section-label">¿Tenéis algún patrocinador?</div>
                        </div>
                        
                        <div class="toggle-options">
                            <button type="button" id="sponsors-yes" class="toggle-option ${formData.hasSponsors === true ? 'active-yes' : ''}">Sí</button>
                            <button type="button" id="sponsors-no" class="toggle-option ${formData.hasSponsors === false ? 'active-no' : ''}">No</button>
                        </div>
                        <div class="field-error" id="sponsors-toggle-error" style="display:none;">
                            <i data-lucide="alert-circle"></i>
                            <span>Selecciona una opción</span>
                        </div>

                        <div id="sponsors-details" class="expandable-content ${formData.hasSponsors ? 'expanded' : ''}">
                            <div style="margin-top: 20px;">
                                <div class="input-field">
                                    <input type="text" id="onb-sponsorBrand" class="field-input" placeholder="Nombres de los patrocinadores" value="${formData.sponsorBrand || ''}">
                                    <i data-lucide="tag" class="field-icon"></i>
                                </div>
                                <div class="field-error" id="sponsor-brand-error" style="display:none;">
                                    <i data-lucide="alert-circle"></i>
                                    <span>Introduce los patrocinadores</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Instagram Section -->
                    <div class="form-section">
                        <div class="section-icon-row">
                            <div class="section-icon" style="background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);">
                                <i data-lucide="instagram" style="color: white;"></i>
                            </div>
                            <div class="section-label">Presencia Digital</div>
                        </div>
                        <div class="input-field">
                            <input 
                                type="text" 
                                id="onb-instagram" 
                                class="field-input"
                                placeholder="@tu_club o web"
                                value="${formData.instagram || ''}"
                                autocomplete="off"
                            >
                            <i data-lucide="at-sign" class="field-icon"></i>
                        </div>
                        <p class="field-hint">Opcional - Se mostrará en tu perfil público</p>
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

    const nextBtn = document.getElementById('onb-next-btn');
    const sponsorsDetails = document.getElementById('sponsors-details');

    // Error helpers
    const showError = (id, show) => {
        const el = document.getElementById(id);
        if (el) {
            el.style.display = show ? 'flex' : 'none';
            if (show && window.lucide) window.lucide.createIcons();
        }
    };

    const clearAllErrors = () => {
        showError('sponsors-toggle-error', false);
        showError('sponsor-brand-error', false);
        showError('discovery-error', false);
    };

    // Discovery Source chips
    document.querySelectorAll('.discovery-chip').forEach(chip => {
        chip.onclick = () => {
            const val = chip.dataset.value;
            formData.discoverySource = val;
            setFormData(formData);

            // Visual update
            document.querySelectorAll('.discovery-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            showError('discovery-error', false);
        };
    });

    // Sponsors toggle
    document.getElementById('sponsors-yes')?.addEventListener('click', () => {
        formData.hasSponsors = true;
        setFormData(formData);
        document.getElementById('sponsors-yes').classList.add('active-yes');
        document.getElementById('sponsors-no').classList.remove('active-no');
        sponsorsDetails?.classList.add('expanded');
        showError('sponsors-toggle-error', false);
    });

    document.getElementById('sponsors-no')?.addEventListener('click', () => {
        formData.hasSponsors = false;
        formData.sponsorBrand = '';
        setFormData(formData);
        document.getElementById('sponsors-no').classList.add('active-no');
        document.getElementById('sponsors-yes').classList.remove('active-yes');
        sponsorsDetails?.classList.remove('expanded');
        showError('sponsors-toggle-error', false);
        clearAllErrors();
    });

    // Inputs
    document.getElementById('onb-sponsorBrand')?.addEventListener('input', (e) => {
        formData.sponsorBrand = e.target.value;
        setFormData(formData);
        if (e.target.value.trim()) {
            showError('sponsor-brand-error', false);
        }
    });

    document.getElementById('onb-instagram')?.addEventListener('input', (e) => {
        formData.instagram = e.target.value;
        setFormData(formData);
    });

    if (nextBtn) {
        nextBtn.onclick = () => {
            clearAllErrors();
            let isValid = true;

            // Validate Discovery Source
            if (!formData.discoverySource) {
                showError('discovery-error', true);
                isValid = false;
            }

            // Validate sponsors
            if (formData.hasSponsors === undefined || formData.hasSponsors === null) {
                showError('sponsors-toggle-error', true);
                isValid = false;
            } else if (formData.hasSponsors === true) {
                if (!formData.sponsorBrand || !formData.sponsorBrand.trim()) {
                    showError('sponsor-brand-error', true);
                    isValid = false;
                }
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
    if (!formData.discoverySource) errors.discoverySource = "Obligatorio";
    if (formData.hasSponsors === true) {
        if (!formData.sponsorBrand) errors.sponsorBrand = "Obligatorio";
    }
    return errors;
}

export function save(formData) {
    return true;
}
