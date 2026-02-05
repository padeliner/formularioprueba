// FacilitiesStep.js - Club Step 4: Facilities
const COURT_COUNTS = ['1 – 2', '3 – 5', '6 – 10', '+10'];
const INSTALLATION_TYPES = ['Indoor', 'Outdoor'];
const SURFACE_TYPES = ['Césped artificial', 'Hormigón', 'Resina', 'Moqueta', 'Otro'];

export function render(formData) {
    const installationChips = INSTALLATION_TYPES.map(type => `
        <button type="button" class="exp-chip installation-chip ${formData.installationTypes?.includes(type) ? 'active' : ''}" data-value="${type}" style="display: inline-flex; align-items: center; gap: 6px;">
            <i data-lucide="${type === 'Indoor' ? 'warehouse' : 'sun'}"></i>
            <span>${type}</span>
        </button>
    `).join('');

    return `
        <div class="onboarding-step step-content">
            <div class="step-inner">
                <div class="step-header">
                    <h1 class="step-title">Tus <span class="text-accent italic">instalaciones</span></h1>
                    <p class="step-subtitle">Información sobre tus pistas</p>
                </div>

                <div class="step-body">
                    <div class="form-section">
                        <div class="section-icon-row">
                            <div class="section-icon">
                                <i data-lucide="grid-3x3"></i>
                            </div>
                            <div class="section-label">Número de pistas</div>
                        </div>
                        <div class="select-wrapper">
                            <select id="court-count-select" class="field-select">
                                <option value="">Selecciona el número de pistas</option>
                                ${COURT_COUNTS.map(count => `
                                    <option value="${count}" ${formData.courtCount === count ? 'selected' : ''}>${count}</option>
                                `).join('')}
                            </select>
                        </div>
                        <div class="field-error" id="court-count-error" style="display:none;">
                            <i data-lucide="alert-circle"></i>
                            <span>Selecciona el número de pistas</span>
                        </div>
                    </div>

                    <div class="form-section">
                        <div class="section-icon-row">
                            <div class="section-icon">
                                <i data-lucide="building"></i>
                            </div>
                            <div class="section-label">Tipo de instalación</div>
                        </div>
                        <p class="field-hint" style="margin-bottom: 12px;">Puedes seleccionar ambos si tienes mixto</p>
                        <div class="chips-grid">
                            ${installationChips}
                        </div>
                        <div class="field-error" id="installation-type-error" style="display:none;">
                            <i data-lucide="alert-circle"></i>
                            <span>Selecciona al menos un tipo</span>
                        </div>
                    </div>

                    <div class="form-section">
                        <div class="section-icon-row">
                            <div class="section-icon">
                                <i data-lucide="layers"></i>
                            </div>
                            <div class="section-label">Superficie de pistas</div>
                        </div>
                        <p class="field-hint" style="margin-bottom: 12px;">Selecciona todas las que apliquen</p>
                        <div class="chips-grid">
                            ${SURFACE_TYPES.map(surface => `
                                <button type="button" class="chip surface-chip ${formData.surfaceTypes?.includes(surface) ? 'active' : ''}" data-value="${surface}">
                                    ${surface}
                                </button>
                            `).join('')}
                        </div>
                        <div class="field-error" id="surface-error" style="display:none;">
                            <i data-lucide="alert-circle"></i>
                            <span>Selecciona el tipo de superficie</span>
                        </div>
                    </div>

                    <div class="form-section">
                        <div class="section-icon-row">
                            <div class="section-icon">
                                <i data-lucide="lightbulb"></i>
                            </div>
                            <div class="section-label">Iluminación nocturna</div>
                        </div>
                        <div class="toggle-options">
                            <button type="button" id="lighting-yes" class="toggle-option ${formData.hasLighting === true ? 'active-yes' : ''}">Sí</button>
                            <button type="button" id="lighting-no" class="toggle-option ${formData.hasLighting === false ? 'active-no' : ''}">No</button>
                        </div>
                        <div class="field-error" id="lighting-error" style="display:none;">
                            <i data-lucide="alert-circle"></i>
                            <span>Selecciona una opción</span>
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

    if (!formData.installationTypes) formData.installationTypes = [];

    const nextBtn = document.getElementById('onb-next-btn');

    const showError = (id, show) => {
        const el = document.getElementById(id);
        if (el) {
            el.style.display = show ? 'flex' : 'none';
            if (show && window.lucide) window.lucide.createIcons();
        }
    };

    const clearAllErrors = () => {
        showError('court-count-error', false);
        showError('installation-type-error', false);
        showError('surface-error', false);
        showError('lighting-error', false);
    };

    // Court count select
    const courtCountSelect = document.getElementById('court-count-select');
    if (courtCountSelect) {
        courtCountSelect.addEventListener('change', (e) => {
            formData.courtCount = e.target.value;
            setFormData(formData);
            showError('court-count-error', false);
        });
    }

    // Installation type chips (multi-select)
    document.querySelectorAll('.installation-chip').forEach(chip => {
        chip.onclick = () => {
            const type = chip.dataset.value;
            if (formData.installationTypes.includes(type)) {
                formData.installationTypes = formData.installationTypes.filter(t => t !== type);
                chip.classList.remove('active');
            } else {
                formData.installationTypes.push(type);
                chip.classList.add('active');
            }
            setFormData(formData);
            if (formData.installationTypes.length > 0) {
                showError('installation-type-error', false);
            }
        };
    });

    // Surface type chips (multi-select)
    if (!formData.surfaceTypes) formData.surfaceTypes = [];

    document.querySelectorAll('.surface-chip').forEach(chip => {
        chip.onclick = () => {
            const surface = chip.dataset.value;
            if (formData.surfaceTypes.includes(surface)) {
                formData.surfaceTypes = formData.surfaceTypes.filter(s => s !== surface);
                chip.classList.remove('active');
            } else {
                formData.surfaceTypes.push(surface);
                chip.classList.add('active');
            }
            setFormData(formData);
            if (formData.surfaceTypes.length > 0) {
                showError('surface-error', false);
            }
        };
    });

    // Lighting toggle
    document.getElementById('lighting-yes')?.addEventListener('click', () => {
        formData.hasLighting = true;
        setFormData(formData);
        document.getElementById('lighting-yes').classList.add('active-yes');
        document.getElementById('lighting-no').classList.remove('active-no');
        showError('lighting-error', false);
    });

    document.getElementById('lighting-no')?.addEventListener('click', () => {
        formData.hasLighting = false;
        setFormData(formData);
        document.getElementById('lighting-no').classList.add('active-no');
        document.getElementById('lighting-yes').classList.remove('active-yes');
        showError('lighting-error', false);
    });

    if (nextBtn) {
        nextBtn.onclick = () => {
            clearAllErrors();
            let isValid = true;

            if (!formData.courtCount) {
                showError('court-count-error', true);
                isValid = false;
            }

            if (!formData.installationTypes || formData.installationTypes.length === 0) {
                showError('installation-type-error', true);
                isValid = false;
            }

            if (!formData.surfaceTypes || formData.surfaceTypes.length === 0) {
                showError('surface-error', true);
                isValid = false;
            }

            if (formData.hasLighting === undefined || formData.hasLighting === null) {
                showError('lighting-error', true);
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
    if (!formData.courtCount) errors.courtCount = "Selecciona el número de pistas";
    if (!formData.installationTypes || formData.installationTypes.length === 0) {
        errors.installationTypes = "Selecciona al menos un tipo";
    }
    if (!formData.surfaceTypes || formData.surfaceTypes.length === 0) {
        errors.surfaceTypes = "Selecciona al menos un tipo";
    }
    if (formData.hasLighting === undefined) errors.hasLighting = "Selecciona una opción";
    return errors;
}

export function save(formData) {
    return true;
}
