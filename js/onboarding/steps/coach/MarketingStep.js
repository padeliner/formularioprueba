// MarketingStep.js - Coach Step 5: Sponsors & Instagram
import { SPONSOR_TYPES } from '../../constants.js';

const SPONSOR_ICONS = {
    'Pala': 'sword',
    'Ropa / Calzado': 'shirt',
    'Otro': 'package'
};

export function render(formData) {
    const sponsorChips = SPONSOR_TYPES.map(type => `
        <button type="button" class="sponsor-chip ${formData.sponsorTypes.includes(type) ? 'active' : ''}" data-value="${type}">
            <i data-lucide="${SPONSOR_ICONS[type] || 'tag'}"></i>
            <span>${type}</span>
        </button>
    `).join('');

    return `
        <div class="onboarding-step step-content">
            <div class="step-inner">
                <div class="step-header">
                    <h1 class="step-title">Tu <span class="text-accent italic">visibilidad</span></h1>
                    <p class="step-subtitle">Sponsors y redes sociales</p>
                </div>

                <div class="step-body">
                    <!-- Sponsors Section -->
                    <div class="form-section">
                        <div class="section-icon-row">
                            <div class="section-icon">
                                <i data-lucide="award"></i>
                            </div>
                            <div class="section-label">¿Tienes sponsors?</div>
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
                                <p class="field-hint" style="margin-bottom: 12px;">Tipo de patrocinio</p>
                                <div class="sponsor-chips-grid">
                                    ${sponsorChips}
                                </div>
                                <div class="field-error" id="sponsor-type-error" style="display:none;">
                                    <i data-lucide="alert-circle"></i>
                                    <span>Selecciona al menos un tipo de patrocinio</span>
                                </div>
                                
                                <div class="input-field" style="margin-top: 16px;">
                                    <input type="text" id="onb-sponsorBrand" class="field-input" placeholder="Nombre de la marca principal" value="${formData.sponsorBrand || ''}">
                                    <i data-lucide="tag" class="field-icon"></i>
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
                            <div class="section-label">Instagram</div>
                        </div>
                        <div class="input-field">
                            <input type="text" id="onb-instagram" class="field-input" placeholder="@tu_usuario" value="${formData.instagram || ''}" style="text-transform: none;">
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
        showError('sponsor-type-error', false);
    };

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
        formData.sponsorTypes = [];
        formData.sponsorBrand = '';
        setFormData(formData);
        document.getElementById('sponsors-no').classList.add('active-no');
        document.getElementById('sponsors-yes').classList.remove('active-yes');
        sponsorsDetails?.classList.remove('expanded');
        showError('sponsors-toggle-error', false);
        showError('sponsor-type-error', false);
    });

    // Sponsor chips
    document.querySelectorAll('.sponsor-chip').forEach(chip => {
        chip.onclick = () => {
            const type = chip.dataset.value;
            if (formData.sponsorTypes.includes(type)) {
                formData.sponsorTypes = formData.sponsorTypes.filter(t => t !== type);
                chip.classList.remove('active');
            } else {
                formData.sponsorTypes.push(type);
                chip.classList.add('active');
            }
            setFormData(formData);
            if (formData.sponsorTypes.length > 0) {
                showError('sponsor-type-error', false);
            }
        };
    });

    // Inputs
    document.getElementById('onb-sponsorBrand')?.addEventListener('input', (e) => {
        formData.sponsorBrand = e.target.value;
        setFormData(formData);
    });

    document.getElementById('onb-instagram')?.addEventListener('input', (e) => {
        formData.instagram = e.target.value;
        setFormData(formData);
    });

    // Next button with validation
    if (nextBtn) {
        nextBtn.onclick = () => {
            clearAllErrors();
            let isValid = true;

            // Validate sponsors toggle answered
            if (formData.hasSponsors === undefined || formData.hasSponsors === null) {
                showError('sponsors-toggle-error', true);
                isValid = false;
            } else if (formData.hasSponsors === true && formData.sponsorTypes.length === 0) {
                showError('sponsor-type-error', true);
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
    if (formData.hasSponsors) {
        if (formData.sponsorTypes.length === 0) errors.sponsorTypes = "Selecciona al menos uno";
        if (!formData.sponsorBrand) errors.sponsorBrand = "Campo obligatorio";
    }
    return errors;
}

export function save(formData) {
    return true;
}
