// AvailabilityStep.js - Coach Step 3: Schedule & Pricing
import { DAYS, SLOTS, STUDENTS_RANGES, CLASSES_RANGES, PRICES } from '../../constants.js';

const BOOKING_METHODS = [
    { id: 'whatsapp', label: 'WhatsApp', icon: 'message-circle' },
    { id: 'excel', label: 'Excel / Manual', icon: 'table' },
    { id: 'app', label: 'App', icon: 'smartphone' },
    { id: 'mixto', label: 'Mixto', icon: 'layers' }
];

export function render(formData) {
    // Generate compact availability grid
    const daysHeaders = DAYS.map(day => `
        <button type="button" class="avail-day-header" data-day="${day}">${day}</button>
    `).join('');

    let gridRows = '';
    SLOTS.forEach(slot => {
        const cells = DAYS.map(day => {
            const id = `${day}-${slot}`;
            const isActive = formData.availability.includes(id);
            return `<button type="button" class="avail-cell ${isActive ? 'active' : ''}" data-id="${id}"></button>`;
        }).join('');

        gridRows += `
            <button type="button" class="avail-slot-header" data-slot="${slot}">${slot}</button>
            ${cells}
        `;
    });



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
                    <h1 class="step-title">Tu <span class="text-accent italic">disponibilidad</span></h1>
                    <p class="step-subtitle">¿Cuándo puedes dar clases?</p>
                </div>

                <div class="step-body">
                    <!-- Availability Matrix -->
                    <div class="form-section">
                        <div class="section-icon-row">
                            <div class="section-icon">
                                <i data-lucide="calendar-clock"></i>
                            </div>
                            <div class="section-label">Horarios habituales</div>
                        </div>
                        
                        <div class="avail-grid-compact">
                            <div class="avail-corner"></div>
                            ${daysHeaders}
                            ${gridRows}
                        </div>
                        <p class="field-hint" style="text-align: center; margin-top: 12px;">
                            Toca encabezados para seleccionar filas/columnas
                        </p>
                        <div class="field-error" id="availability-error" style="display:none;">
                            <i data-lucide="alert-circle"></i>
                            <span>Selecciona al menos un horario disponible</span>
                        </div>
                    </div>

                    <!-- Booking Method Section -->
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

                    <!-- Stats Section -->
                    <div class="form-section">
                        <div class="section-icon-row">
                            <div class="section-icon">
                                <i data-lucide="bar-chart-3"></i>
                            </div>
                            <div class="section-label">Tu actividad actual</div>
                        </div>
                        
                        <p class="field-hint" style="margin-bottom: 16px;">Ayuda a conocerte mejor</p>
                        
                        <div class="stats-column">
                            <div class="stat-select-item">
                                <label class="stat-label">Alumnos activos</label>
                                <select id="onb-studentsCount" class="stat-select">
                                    <option value="" disabled ${!formData.studentsCount ? 'selected' : ''}>Seleccionar</option>
                                    ${STUDENTS_RANGES.map(o => `<option value="${o.value}" ${formData.studentsCount === o.value ? 'selected' : ''}>${o.label}</option>`).join('')}
                                </select>
                                <div class="field-error" id="students-error" style="display:none;">
                                    <i data-lucide="alert-circle"></i>
                                    <span>Selecciona el número de alumnos</span>
                                </div>
                            </div>
                            <div class="stat-select-item">
                                <label class="stat-label">Clases/semana</label>
                                <select id="onb-classesPerWeek" class="stat-select">
                                    <option value="" disabled ${!formData.classesPerWeek ? 'selected' : ''}>Seleccionar</option>
                                    ${CLASSES_RANGES.map(o => `<option value="${o.value}" ${formData.classesPerWeek === o.value ? 'selected' : ''}>${o.label}</option>`).join('')}
                                </select>
                                <div class="field-error" id="classes-error" style="display:none;">
                                    <i data-lucide="alert-circle"></i>
                                    <span>Selecciona las clases por semana</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Price Section -->
                    <div class="form-section" id="price-section">
                        <div class="section-icon-row">
                            <div class="section-icon">
                                <i data-lucide="euro"></i>
                            </div>
                            <div class="section-label">Precio por hora</div>
                        </div>
                        
                        <div class="stats-column">
                            <div class="stat-select-item">
                                <label class="stat-label">Precio por hora</label>
                                <select id="onb-pricePerHour" class="stat-select">
                                    <option value="" disabled ${!formData.pricePerHour ? 'selected' : ''}>Seleccionar</option>
                                    ${PRICES.map(o => `<option value="${o.value}" ${formData.pricePerHour === o.value ? 'selected' : ''}>${o.label}</option>`).join('')}
                                </select>
                                <div class="field-error" id="price-error" style="display:none;">
                                    <i data-lucide="alert-circle"></i>
                                    <span>Selecciona un precio por hora</span>
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
    const nextBtn = document.getElementById('onb-next-btn');

    // Helper to clear availability error
    const clearAvailError = () => {
        const el = document.getElementById('availability-error');
        if (el && formData.availability.length > 0) {
            el.style.display = 'none';
        }
    };

    // Column Toggle (Days)
    document.querySelectorAll('.avail-day-header').forEach(btn => {
        btn.onclick = () => {
            const day = btn.dataset.day;
            const allSlotsForDay = SLOTS.map(s => `${day}-${s}`);
            const allSelected = allSlotsForDay.every(id => formData.availability.includes(id));

            if (allSelected) {
                formData.availability = formData.availability.filter(id => !allSlotsForDay.includes(id));
                allSlotsForDay.forEach(id => {
                    document.querySelector(`.avail-cell[data-id="${id}"]`)?.classList.remove('active');
                });
            } else {
                formData.availability = [...new Set([...formData.availability, ...allSlotsForDay])];
                allSlotsForDay.forEach(id => {
                    document.querySelector(`.avail-cell[data-id="${id}"]`)?.classList.add('active');
                });
            }
            setFormData(formData);
            clearAvailError();
        };
    });

    // Row Toggle (Slots)
    document.querySelectorAll('.avail-slot-header').forEach(btn => {
        btn.onclick = () => {
            const slot = btn.dataset.slot;
            const allDaysForSlot = DAYS.map(d => `${d}-${slot}`);
            const allSelected = allDaysForSlot.every(id => formData.availability.includes(id));

            if (allSelected) {
                formData.availability = formData.availability.filter(id => !allDaysForSlot.includes(id));
                allDaysForSlot.forEach(id => {
                    document.querySelector(`.avail-cell[data-id="${id}"]`)?.classList.remove('active');
                });
            } else {
                formData.availability = [...new Set([...formData.availability, ...allDaysForSlot])];
                allDaysForSlot.forEach(id => {
                    document.querySelector(`.avail-cell[data-id="${id}"]`)?.classList.add('active');
                });
            }
            setFormData(formData);
            clearAvailError();
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

    // Stats selects
    document.getElementById('onb-studentsCount')?.addEventListener('change', (e) => {
        formData.studentsCount = e.target.value;
        setFormData(formData);
        showError('students-error', false);
    });

    document.getElementById('onb-classesPerWeek')?.addEventListener('change', (e) => {
        formData.classesPerWeek = e.target.value;
        setFormData(formData);
        showError('classes-error', false);
    });

    // Price select
    document.getElementById('onb-pricePerHour')?.addEventListener('change', (e) => {
        formData.pricePerHour = e.target.value;
        setFormData(formData);
        showError('price-error', false);
        document.getElementById('price-section')?.classList.remove('has-error');
    });

    // Error helpers
    const showError = (id, show) => {
        const el = document.getElementById(id);
        if (el) {
            el.style.display = show ? 'flex' : 'none';
            if (show && window.lucide) window.lucide.createIcons();
        }
    };

    const clearAllErrors = () => {
        showError('availability-error', false);
        showError('method-error', false);
        showError('students-error', false);
        showError('classes-error', false);
        showError('price-error', false);
        document.getElementById('price-section')?.classList.remove('has-error');
    };

    // Clear availability error when selecting slots
    const originalCellClick = (btn) => {
        const id = btn.dataset.id;
        if (formData.availability.includes(id)) {
            formData.availability = formData.availability.filter(x => x !== id);
        } else {
            formData.availability.push(id);
        }
        btn.classList.toggle('active');
        setFormData(formData);
        if (formData.availability.length > 0) {
            showError('availability-error', false);
        }
    };

    document.querySelectorAll('.avail-cell').forEach(btn => {
        btn.onclick = () => originalCellClick(btn);
    });

    // Next button with validation
    if (nextBtn) {
        nextBtn.onclick = () => {
            clearAllErrors();
            let isValid = true;

            // Validate availability
            if (!formData.availability || formData.availability.length === 0) {
                showError('availability-error', true);
                isValid = false;
            }

            // Validate booking method
            if (!formData.bookingMethod) {
                showError('method-error', true);
                isValid = false;
            }

            // Validate students count
            if (!formData.studentsCount) {
                showError('students-error', true);
                isValid = false;
            }

            // Validate classes per week
            if (!formData.classesPerWeek) {
                showError('classes-error', true);
                isValid = false;
            }

            // Validate price
            if (!formData.pricePerHour) {
                showError('price-error', true);
                document.getElementById('price-section')?.classList.add('has-error');
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
    if (!formData.availability || formData.availability.length === 0) {
        errors.availability = "Selecciona al menos un horario";
    }
    if (!formData.bookingMethod) errors.bookingMethod = "Requerido";
    if (!formData.studentsCount) errors.studentsCount = "Requerido";
    if (!formData.classesPerWeek) errors.classesPerWeek = "Requerido";
    if (!formData.pricePerHour) errors.pricePerHour = "Requerido";
    return errors;
}

export function save(formData) {
    return true;
}
