// BookingsStep.js - Club Step 6: Court Bookings
const BOOKING_PRICE_RANGES = ['< 15 €', '15 € – 20 €', '20 € – 30 €', '30 € – 40 €', '40 € +'];
const BOOKINGS_RANGES = ['< 50', '50 – 100', '100 – 200', '200 – 500', '500 +'];
const BOOKING_METHODS = [
    { id: 'whatsapp', label: 'WhatsApp', icon: 'message-circle' },
    { id: 'excel', label: 'Excel / Manual', icon: 'table' },
    { id: 'app', label: 'App', icon: 'smartphone' },
    { id: 'mixto', label: 'Mixto', icon: 'layers' }
];

const ACTIVITY_TYPES = ['Todo el año', 'Temporadas'];

export function render(formData) {
    const methodChips = BOOKING_METHODS.map(method => `
        <button type="button" class="exp-chip method-chip ${formData.bookingMethod === method.id ? 'active' : ''}" data-value="${method.id}" style="display: inline-flex; align-items: center; gap: 8px;">
            <i data-lucide="${method.icon}"></i>
            ${method.label}
        </button>
    `).join('');

    return `
        <div class="onboarding-step step-content">
            <div class="step-inner">
                <div class="step-header">
                    <h1 class="step-title">Tus <span class="text-accent italic">reservas</span></h1>
                    <p class="step-subtitle">Información sobre alquiler de pistas</p>
                </div>

                <div class="step-body">
                    <div class="form-section">
                        <div class="section-icon-row">
                            <div class="section-icon">
                                <i data-lucide="calendar-check"></i>
                            </div>
                            <div class="section-label">Gestión de reservas</div>
                        </div>
                        <div class="chips-grid">
                            ${methodChips}
                        </div>
                        <div class="field-error" id="method-error" style="display:none;">
                            <i data-lucide="alert-circle"></i>
                            <span>Selecciona una opción</span>
                        </div>
                    </div>

                    <div class="form-section">
                        <div class="section-icon-row">
                            <div class="section-icon">
                                <i data-lucide="euro"></i>
                            </div>
                            <div class="section-label">Precio medio por pista / hora</div>
                        </div>
                        <div class="select-wrapper">
                            <select id="booking-price-select" class="field-select">
                                <option value="">Selecciona un rango de precios</option>
                                ${BOOKING_PRICE_RANGES.map(price => `
                                    <option value="${price}" ${formData.bookingPriceRange === price ? 'selected' : ''}>${price}</option>
                                `).join('')}
                            </select>
                        </div>
                        <div class="field-error" id="booking-price-error" style="display:none;">
                            <i data-lucide="alert-circle"></i>
                            <span>Selecciona un rango de precios</span>
                        </div>
                    </div>

                    <div class="form-section">
                        <div class="section-icon-row">
                            <div class="section-icon">
                                <i data-lucide="calendar-check"></i>
                            </div>
                            <div class="section-label">Reservas estimadas / semana</div>
                        </div>
                        <div class="select-wrapper">
                            <select id="bookings-count-select" class="field-select">
                                <option value="">Selecciona un rango</option>
                                ${BOOKINGS_RANGES.map(range => `
                                    <option value="${range}" ${formData.estimatedBookings === range ? 'selected' : ''}>${range}</option>
                                `).join('')}
                            </select>
                        </div>
                        <div class="field-error" id="bookings-error" style="display:none;">
                            <i data-lucide="alert-circle"></i>
                            <span>Selecciona un rango</span>
                        </div>
                    </div>

                    <div class="form-section">
                        <div class="section-icon-row">
                            <div class="section-icon">
                                <i data-lucide="calendar-days"></i>
                            </div>
                            <div class="section-label">Actividad anual</div>
                        </div>
                        <div class="select-wrapper">
                            <select id="annual-activity-select" class="field-select">
                                <option value="">Selecciona una opción</option>
                                ${ACTIVITY_TYPES.map(type => `
                                    <option value="${type}" ${formData.annualActivity === type ? 'selected' : ''}>${type}</option>
                                `).join('')}
                            </select>
                        </div>
                        <div class="field-error" id="activity-error" style="display:none;">
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

    const nextBtn = document.getElementById('onb-next-btn');

    const showError = (id, show) => {
        const el = document.getElementById(id);
        if (el) {
            el.style.display = show ? 'flex' : 'none';
            if (show && window.lucide) window.lucide.createIcons();
        }
    };

    const clearAllErrors = () => {
        showError('method-error', false);
        showError('booking-price-error', false);
        showError('bookings-error', false);
        showError('activity-error', false);
    };

    // Method chips (single select)
    document.querySelectorAll('.method-chip').forEach(chip => {
        chip.onclick = () => {
            formData.bookingMethod = chip.dataset.value;
            setFormData(formData);
            document.querySelectorAll('.method-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            showError('method-error', false);
        };
    });

    // Booking price select
    const bookingPriceSelect = document.getElementById('booking-price-select');
    if (bookingPriceSelect) {
        bookingPriceSelect.addEventListener('change', (e) => {
            formData.bookingPriceRange = e.target.value;
            setFormData(formData);
            showError('booking-price-error', false);
        });
    }

    // Bookings count select
    const bookingsCountSelect = document.getElementById('bookings-count-select');
    if (bookingsCountSelect) {
        bookingsCountSelect.addEventListener('change', (e) => {
            formData.estimatedBookings = e.target.value;
            setFormData(formData);
            showError('bookings-error', false);
        });
    }

    // Annual activity select
    const annualActivitySelect = document.getElementById('annual-activity-select');
    if (annualActivitySelect) {
        annualActivitySelect.addEventListener('change', (e) => {
            formData.annualActivity = e.target.value;
            setFormData(formData);
            showError('activity-error', false);
        });
    }

    if (nextBtn) {
        nextBtn.onclick = () => {
            clearAllErrors();
            let isValid = true;

            if (!formData.bookingMethod) {
                showError('method-error', true);
                isValid = false;
            }

            if (!formData.bookingPriceRange) {
                showError('booking-price-error', true);
                isValid = false;
            }

            if (!formData.estimatedBookings) {
                showError('bookings-error', true);
                isValid = false;
            }

            if (!formData.annualActivity) {
                showError('activity-error', true);
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
    if (!formData.bookingMethod) errors.bookingMethod = "Selecciona una opción";
    if (!formData.bookingPriceRange) errors.bookingPriceRange = "Selecciona un rango de precios";
    if (!formData.estimatedBookings) errors.estimatedBookings = "Selecciona un rango";
    if (!formData.annualActivity) errors.annualActivity = "Selecciona una opción";
    return errors;
}

export function save(formData) {
    return true;
}
