// OperationsStep.js - Academy Step 7: Operations & Availability (Levels + Booking + Hours)
const LEVELS = ['Iniciación', 'Intermedio', 'Avanzado', 'Competición'];
const BOOKING_METHODS = [
    { id: 'whatsapp', label: 'WhatsApp', icon: 'message-circle' },
    { id: 'excel', label: 'Excel / Manual', icon: 'table' },
    { id: 'app', label: 'App', icon: 'smartphone' },
    { id: 'mixto', label: 'Mixto', icon: 'layers' }
];
const TIME_SLOTS = ['Mañanas', 'Mediodías', 'Tardes', 'Noches'];

export function render(formData) {
    const levelChips = LEVELS.map(level => `
        <button type="button" class="exp-chip level-chip ${formData.trainingLevels?.includes(level) ? 'active' : ''}" data-value="${level}">
            ${level}
        </button>
    `).join('');

    const methodChips = BOOKING_METHODS.map(method => `
        <button type="button" class="exp-chip method-chip ${formData.bookingMethod === method.id ? 'active' : ''}" data-value="${method.id}" style="display: inline-flex; align-items: center; gap: 8px;">
            <i data-lucide="${method.icon}"></i>
            ${method.label}
        </button>
    `).join('');

    const timeChips = TIME_SLOTS.map(slot => `
        <button type="button" class="exp-chip time-chip ${formData.timeSlots?.includes(slot) ? 'active' : ''}" data-value="${slot}">
            ${slot}
        </button>
    `).join('');

    return `
        <div class="onboarding-step step-content">
            <div class="step-inner">
                <div class="step-header">
                    <h1 class="step-title">Tu <span class="text-accent italic">operativa</span></h1>
                    <p class="step-subtitle">Niveles, gestión y horarios</p>
                </div>

                <div class="step-body">
                    <div class="form-section">
                        <div class="section-icon-row">
                            <div class="section-icon">
                                <i data-lucide="bar-chart-3"></i>
                            </div>
                            <div class="section-label">Niveles que trabaja la academia</div>
                        </div>
                        <p class="field-hint" style="margin-bottom: 12px;">Puedes seleccionar varios</p>
                        <div class="chips-grid">
                            ${levelChips}
                        </div>
                        <div class="field-error" id="levels-error" style="display:none;">
                            <i data-lucide="alert-circle"></i>
                            <span>Selecciona al menos un nivel</span>
                        </div>
                    </div>

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
                                <i data-lucide="clock"></i>
                            </div>
                            <div class="section-label">Horarios habituales</div>
                        </div>
                        <p class="field-hint" style="margin-bottom: 12px;">Puedes seleccionar varios</p>
                        <div class="chips-grid">
                            ${timeChips}
                        </div>
                        <div class="field-error" id="time-error" style="display:none;">
                            <i data-lucide="alert-circle"></i>
                            <span>Selecciona al menos un horario</span>
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

    if (!formData.trainingLevels) formData.trainingLevels = [];
    if (!formData.timeSlots) formData.timeSlots = [];

    const nextBtn = document.getElementById('onb-next-btn');

    const showError = (id, show) => {
        const el = document.getElementById(id);
        if (el) {
            el.style.display = show ? 'flex' : 'none';
            if (show && window.lucide) window.lucide.createIcons();
        }
    };

    const clearAllErrors = () => {
        showError('levels-error', false);
        showError('method-error', false);
        showError('time-error', false);
    };

    // Level chips (multi-select)
    document.querySelectorAll('.level-chip').forEach(chip => {
        chip.onclick = () => {
            const level = chip.dataset.value;
            if (formData.trainingLevels.includes(level)) {
                formData.trainingLevels = formData.trainingLevels.filter(l => l !== level);
                chip.classList.remove('active');
            } else {
                formData.trainingLevels.push(level);
                chip.classList.add('active');
            }
            setFormData(formData);
            if (formData.trainingLevels.length > 0) showError('levels-error', false);
        };
    });

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

    // Time chips (multi-select)
    document.querySelectorAll('.time-chip').forEach(chip => {
        chip.onclick = () => {
            const slot = chip.dataset.value;
            if (formData.timeSlots.includes(slot)) {
                formData.timeSlots = formData.timeSlots.filter(s => s !== slot);
                chip.classList.remove('active');
            } else {
                formData.timeSlots.push(slot);
                chip.classList.add('active');
            }
            setFormData(formData);
            if (formData.timeSlots.length > 0) showError('time-error', false);
        };
    });

    if (nextBtn) {
        nextBtn.onclick = () => {
            clearAllErrors();
            let isValid = true;

            if (!formData.trainingLevels || formData.trainingLevels.length === 0) {
                showError('levels-error', true);
                isValid = false;
            }

            if (!formData.bookingMethod) {
                showError('method-error', true);
                isValid = false;
            }

            if (!formData.timeSlots || formData.timeSlots.length === 0) {
                showError('time-error', true);
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
    if (!formData.trainingLevels || formData.trainingLevels.length === 0) errors.trainingLevels = "Requerido";
    if (!formData.bookingMethod) errors.bookingMethod = "Requerido";
    if (!formData.timeSlots || formData.timeSlots.length === 0) errors.timeSlots = "Requerido";
    return errors;
}

export function save(formData) {
    return true;
}
