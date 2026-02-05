// BookingsStep.js - Club Step 6: Court Bookings
const BOOKING_PRICE_RANGES = ['< 15 €', '15 € – 20 €', '20 € – 30 €', '30 € – 40 €', '40 € +'];
const BOOKINGS_RANGES = ['< 50', '50 – 100', '100 – 200', '200 – 500', '500 +'];

export function render(formData) {
    const bookingPriceChips = BOOKING_PRICE_RANGES.map(price => `
        <button type="button" class="exp-chip booking-price-chip ${formData.bookingPriceRange === price ? 'active' : ''}" data-value="${price}">
            ${price}
        </button>
    `).join('');

    const bookingsChips = BOOKINGS_RANGES.map(range => `
        <button type="button" class="exp-chip bookings-chip ${formData.estimatedBookings === range ? 'active' : ''}" data-value="${range}">
            ${range}
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
                                <i data-lucide="euro"></i>
                            </div>
                            <div class="section-label">Precio medio por pista / hora</div>
                        </div>
                        <div class="chips-grid">
                            ${bookingPriceChips}
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
                        <div class="chips-grid">
                            ${bookingsChips}
                        </div>
                        <div class="field-error" id="bookings-error" style="display:none;">
                            <i data-lucide="alert-circle"></i>
                            <span>Selecciona un rango</span>
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
        showError('booking-price-error', false);
        showError('bookings-error', false);
    };

    // Booking price chips
    document.querySelectorAll('.booking-price-chip').forEach(chip => {
        chip.onclick = () => {
            formData.bookingPriceRange = chip.dataset.value;
            setFormData(formData);
            document.querySelectorAll('.booking-price-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            showError('booking-price-error', false);
        };
    });

    // Bookings count chips
    document.querySelectorAll('.bookings-chip').forEach(chip => {
        chip.onclick = () => {
            formData.estimatedBookings = chip.dataset.value;
            setFormData(formData);
            document.querySelectorAll('.bookings-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            showError('bookings-error', false);
        };
    });

    if (nextBtn) {
        nextBtn.onclick = () => {
            clearAllErrors();
            let isValid = true;

            if (!formData.bookingPriceRange) {
                showError('booking-price-error', true);
                isValid = false;
            }

            if (!formData.estimatedBookings) {
                showError('bookings-error', true);
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
    if (!formData.bookingPriceRange) errors.bookingPriceRange = "Selecciona un rango de precios";
    if (!formData.estimatedBookings) errors.estimatedBookings = "Selecciona un rango";
    return errors;
}

export function save(formData) {
    return true;
}
