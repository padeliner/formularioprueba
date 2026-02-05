// ServicesStep.js - Academy Step 4: Services & Monetization
const SERVICES = ['Clases Individuales', 'Clases Grupales', 'Packs Mensuales', 'Campus / Stages'];
const PRICE_RANGES = ['< 50 €', '50 € – 100 €', '100 € – 200 €', '200 € – 300 €', '300 € +'];

export function render(formData) {
    const serviceChips = SERVICES.map(service => `
        <button type="button" class="exp-chip service-chip ${formData.services?.includes(service) ? 'active' : ''}" data-value="${service}">
            ${service}
        </button>
    `).join('');

    const priceChips = PRICE_RANGES.map(price => `
        <button type="button" class="exp-chip price-chip ${formData.monthlyPriceRange === price ? 'active' : ''}" data-value="${price}">
            ${price}
        </button>
    `).join('');

    return `
        <div class="onboarding-step step-content">
            <div class="step-inner">
                <div class="step-header">
                    <h1 class="step-title">Servicios y <span class="text-accent italic">monetización</span></h1>
                    <p class="step-subtitle">Qué ofrecéis y a qué precio</p>
                </div>

                <div class="step-body">
                    <div class="form-section">
                        <div class="section-icon-row">
                            <div class="section-icon">
                                <i data-lucide="package"></i>
                            </div>
                            <div class="section-label">Servicios Ofrecidos</div>
                        </div>
                        <p class="field-hint" style="margin-bottom: 12px;">Puedes seleccionar varios</p>
                        <div class="chips-grid">
                            ${serviceChips}
                        </div>
                        <div class="field-error" id="services-error" style="display:none;">
                            <i data-lucide="alert-circle"></i>
                            <span>Selecciona al menos un servicio</span>
                        </div>
                    </div>

                    <div class="form-section">
                        <div class="section-icon-row">
                            <div class="section-icon">
                                <i data-lucide="euro"></i>
                            </div>
                            <div class="section-label">Precio Medio Mensual por Alumno</div>
                        </div>
                        <div class="chips-grid">
                            ${priceChips}
                        </div>
                        <div class="field-error" id="price-error" style="display:none;">
                            <i data-lucide="alert-circle"></i>
                            <span>Selecciona un rango de precio</span>
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

    if (!formData.services) formData.services = [];

    const nextBtn = document.getElementById('onb-next-btn');

    const showError = (id, show) => {
        const el = document.getElementById(id);
        if (el) {
            el.style.display = show ? 'flex' : 'none';
            if (show && window.lucide) window.lucide.createIcons();
        }
    };

    const clearAllErrors = () => {
        showError('services-error', false);
        showError('price-error', false);
    };

    // Service chips (multi-select)
    document.querySelectorAll('.service-chip').forEach(chip => {
        chip.onclick = () => {
            const service = chip.dataset.value;
            if (formData.services.includes(service)) {
                formData.services = formData.services.filter(s => s !== service);
                chip.classList.remove('active');
            } else {
                formData.services.push(service);
                chip.classList.add('active');
            }
            setFormData(formData);
            if (formData.services.length > 0) showError('services-error', false);
        };
    });

    // Price chips (single select)
    document.querySelectorAll('.price-chip').forEach(chip => {
        chip.onclick = () => {
            formData.monthlyPriceRange = chip.dataset.value;
            setFormData(formData);
            document.querySelectorAll('.price-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            showError('price-error', false);
        };
    });

    if (nextBtn) {
        nextBtn.onclick = () => {
            clearAllErrors();
            let isValid = true;

            if (!formData.services || formData.services.length === 0) {
                showError('services-error', true);
                isValid = false;
            }

            if (!formData.monthlyPriceRange) {
                showError('price-error', true);
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
    if (!formData.services || formData.services.length === 0) errors.services = "Requerido";
    if (!formData.monthlyPriceRange) errors.monthlyPriceRange = "Requerido";
    return errors;
}

export function save(formData) {
    return true;
}
