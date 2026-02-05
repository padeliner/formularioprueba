// PricingStep.js - Club Step 5: Pricing & Packs
const PRICE_RANGES = ['< 15 €', '15 € – 20 €', '20 € – 30 €', '30 € – 40 €', '40 € – 50 €', '50 € +'];
const PACK_TYPES = ['Bonos de Horas', 'Packs Mensuales', 'Promos Puntuales'];

export function render(formData) {
    const packChips = PACK_TYPES.map(pack => `
        <button type="button" class="chip pack-chip ${formData.packTypes?.includes(pack) ? 'active' : ''}" data-value="${pack}">
            ${pack}
        </button>
    `).join('');

    return `
        <div class="onboarding-step step-content">
            <div class="step-inner">
                <div class="step-header">
                    <h1 class="step-title">Tus <span class="text-accent italic">precios</span></h1>
                    <p class="step-subtitle">Tarifas y promociones</p>
                </div>

                <div class="step-body">
                    <div class="form-section">
                        <div class="section-icon-row">
                            <div class="section-icon">
                                <i data-lucide="euro"></i>
                            </div>
                            <div class="section-label">Precio medio por pista / hora</div>
                        </div>
                        <div class="select-wrapper">
                            <select id="price-range-select" class="field-select">
                                <option value="">Selecciona un rango de precios</option>
                                ${PRICE_RANGES.map(price => `
                                    <option value="${price}" ${formData.priceRange === price ? 'selected' : ''}>${price}</option>
                                `).join('')}
                            </select>
                        </div>
                        <div class="field-error" id="price-error" style="display:none;">
                            <i data-lucide="alert-circle"></i>
                            <span>Selecciona un rango de precios</span>
                        </div>
                    </div>

                    <div class="form-section">
                        <div class="section-icon-row">
                            <div class="section-icon">
                                <i data-lucide="ticket"></i>
                            </div>
                            <div class="section-label">¿Ofrecéis bonos o packs?</div>
                        </div>
                        <div class="toggle-options">
                            <button type="button" id="packs-yes" class="toggle-option ${formData.hasPacks === true ? 'active-yes' : ''}">Sí</button>
                            <button type="button" id="packs-no" class="toggle-option ${formData.hasPacks === false ? 'active-no' : ''}">No</button>
                        </div>
                        <div class="field-error" id="packs-toggle-error" style="display:none;">
                            <i data-lucide="alert-circle"></i>
                            <span>Selecciona una opción</span>
                        </div>

                        <div id="packs-details" class="expandable-content ${formData.hasPacks ? 'expanded' : ''}">
                            <div style="margin-top: 20px;">
                                <p class="field-hint" style="margin-bottom: 12px;">Tipos de bonos/packs disponibles</p>
                                <div class="chips-row">
                                    ${packChips}
                                </div>
                                <div class="field-error" id="pack-type-error" style="display:none;">
                                    <i data-lucide="alert-circle"></i>
                                    <span>Selecciona al menos un tipo</span>
                                </div>
                            </div>
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

    if (!formData.packTypes) formData.packTypes = [];

    const packsDetails = document.getElementById('packs-details');
    const nextBtn = document.getElementById('onb-next-btn');

    const showError = (id, show) => {
        const el = document.getElementById(id);
        if (el) {
            el.style.display = show ? 'flex' : 'none';
            if (show && window.lucide) window.lucide.createIcons();
        }
    };

    const clearAllErrors = () => {
        showError('price-error', false);
        showError('packs-toggle-error', false);
        showError('pack-type-error', false);
    };

    // Price select
    const priceSelect = document.getElementById('price-range-select');
    if (priceSelect) {
        priceSelect.addEventListener('change', (e) => {
            formData.priceRange = e.target.value;
            setFormData(formData);
            showError('price-error', false);
        });
    }

    // Packs toggle
    document.getElementById('packs-yes')?.addEventListener('click', () => {
        formData.hasPacks = true;
        setFormData(formData);
        document.getElementById('packs-yes').classList.add('active-yes');
        document.getElementById('packs-no').classList.remove('active-no');
        packsDetails?.classList.add('expanded');
        showError('packs-toggle-error', false);
    });

    document.getElementById('packs-no')?.addEventListener('click', () => {
        formData.hasPacks = false;
        formData.packTypes = [];
        setFormData(formData);
        document.getElementById('packs-no').classList.add('active-no');
        document.getElementById('packs-yes').classList.remove('active-yes');
        packsDetails?.classList.remove('expanded');
        showError('packs-toggle-error', false);
        showError('pack-type-error', false);
    });

    // Pack type chips (multi-select)
    document.querySelectorAll('.pack-chip').forEach(chip => {
        chip.onclick = () => {
            const pack = chip.dataset.value;
            if (formData.packTypes.includes(pack)) {
                formData.packTypes = formData.packTypes.filter(p => p !== pack);
                chip.classList.remove('active');
            } else {
                formData.packTypes.push(pack);
                chip.classList.add('active');
            }
            setFormData(formData);
            if (formData.packTypes.length > 0) {
                showError('pack-type-error', false);
            }
        };
    });

    if (nextBtn) {
        nextBtn.onclick = () => {
            clearAllErrors();
            let isValid = true;

            if (!formData.priceRange) {
                showError('price-error', true);
                isValid = false;
            }

            if (formData.hasPacks === undefined || formData.hasPacks === null) {
                showError('packs-toggle-error', true);
                isValid = false;
            } else if (formData.hasPacks === true && formData.packTypes.length === 0) {
                showError('pack-type-error', true);
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
    if (!formData.priceRange) errors.priceRange = "Selecciona un rango de precios";
    if (formData.hasPacks === undefined) errors.hasPacks = "Selecciona una opción";
    if (formData.hasPacks && formData.packTypes.length === 0) {
        errors.packTypes = "Selecciona al menos un tipo";
    }
    return errors;
}

export function save(formData) {
    return true;
}
