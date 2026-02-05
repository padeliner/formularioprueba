// CommunityStep.js - Club Step 7: Community & Marketing
const PLAYER_LEVELS = ['Iniciación', 'Intermedio', 'Avanzado', 'Competición'];
const TIME_SLOTS = ['Mañanas', 'Mediodías', 'Tardes', 'Noches'];
const ACTIVITY_TYPES = ['Todo el año', 'Temporadas'];
const EVENT_TYPES = ['Torneos', 'Ligas', 'Eventos Sociales'];

export function render(formData) {
    const levelChips = PLAYER_LEVELS.map(level => `
        <button type="button" class="exp-chip level-chip ${formData.playerLevels?.includes(level) ? 'active' : ''}" data-value="${level}">
            ${level}
        </button>
    `).join('');

    const timeChips = TIME_SLOTS.map(slot => `
        <button type="button" class="exp-chip time-chip ${formData.timeSlots?.includes(slot) ? 'active' : ''}" data-value="${slot}">
            ${slot}
        </button>
    `).join('');

    const activityChips = ACTIVITY_TYPES.map(type => `
        <button type="button" class="exp-chip activity-chip ${formData.activityType === type ? 'active' : ''}" data-value="${type}">
            ${type}
        </button>
    `).join('');

    const eventChips = EVENT_TYPES.map(event => `
        <button type="button" class="exp-chip event-chip ${formData.eventTypes?.includes(event) ? 'active' : ''}" data-value="${event}">
            ${event}
        </button>
    `).join('');

    return `
        <div class="onboarding-step step-content">
            <div class="step-inner">
                <div class="step-header">
                    <h1 class="step-title">Tu <span class="text-accent italic">comunidad</span></h1>
                    <p class="step-subtitle">Nivel, horarios y eventos</p>
                </div>

                <div class="step-body">
                    <div class="form-section">
                        <div class="section-icon-row">
                            <div class="section-icon">
                                <i data-lucide="target"></i>
                            </div>
                            <div class="section-label">Nivel medio del club</div>
                        </div>
                        <p class="field-hint" style="margin-bottom: 12px;">Puedes seleccionar varios</p>
                        <div class="chips-grid">
                            ${levelChips}
                        </div>
                        <div class="field-error" id="level-error" style="display:none;">
                            <i data-lucide="alert-circle"></i>
                            <span>Selecciona al menos un nivel</span>
                        </div>
                    </div>

                    <div class="form-section">
                        <div class="section-icon-row">
                            <div class="section-icon">
                                <i data-lucide="clock"></i>
                            </div>
                            <div class="section-label">Horarios habituales</div>
                        </div>
                        <div class="chips-grid">
                            ${timeChips}
                        </div>
                        <div class="field-error" id="time-error" style="display:none;">
                            <i data-lucide="alert-circle"></i>
                            <span>Selecciona al menos un horario</span>
                        </div>
                    </div>

                    <div class="form-section">
                        <div class="section-icon-row">
                            <div class="section-icon">
                                <i data-lucide="calendar"></i>
                            </div>
                            <div class="section-label">Actividad anual</div>
                        </div>
                        <div class="chips-grid">
                            ${activityChips}
                        </div>
                        <div class="field-error" id="activity-error" style="display:none;">
                            <i data-lucide="alert-circle"></i>
                            <span>Selecciona una opción</span>
                        </div>
                    </div>

                    <div class="form-section">
                        <div class="section-icon-row">
                            <div class="section-icon">
                                <i data-lucide="trophy"></i>
                            </div>
                            <div class="section-label">¿Organizáis eventos o competiciones?</div>
                        </div>
                        <div class="toggle-options">
                            <button type="button" id="events-yes" class="toggle-option ${formData.hasEvents === true ? 'active-yes' : ''}">Sí</button>
                            <button type="button" id="events-no" class="toggle-option ${formData.hasEvents === false ? 'active-no' : ''}">No</button>
                        </div>
                        <div class="field-error" id="events-toggle-error" style="display:none;">
                            <i data-lucide="alert-circle"></i>
                            <span>Selecciona una opción</span>
                        </div>

                        <div id="events-details" class="expandable-content ${formData.hasEvents ? 'expanded' : ''}">
                            <div style="margin-top: 20px;">
                                <p class="field-hint" style="margin-bottom: 12px;">Tipos de eventos</p>
                                <div class="chips-grid">
                                    ${eventChips}
                                </div>
                                <div class="field-error" id="event-type-error" style="display:none;">
                                    <i data-lucide="alert-circle"></i>
                                    <span>Selecciona al menos un tipo</span>
                                </div>
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

    if (!formData.playerLevels) formData.playerLevels = [];
    if (!formData.timeSlots) formData.timeSlots = [];
    if (!formData.eventTypes) formData.eventTypes = [];

    const eventsDetails = document.getElementById('events-details');
    const nextBtn = document.getElementById('onb-next-btn');

    const showError = (id, show) => {
        const el = document.getElementById(id);
        if (el) {
            el.style.display = show ? 'flex' : 'none';
            if (show && window.lucide) window.lucide.createIcons();
        }
    };

    const clearAllErrors = () => {
        showError('level-error', false);
        showError('time-error', false);
        showError('activity-error', false);
        showError('events-toggle-error', false);
        showError('event-type-error', false);
    };

    // Level chips (multi-select)
    document.querySelectorAll('.level-chip').forEach(chip => {
        chip.onclick = () => {
            const level = chip.dataset.value;
            if (formData.playerLevels.includes(level)) {
                formData.playerLevels = formData.playerLevels.filter(l => l !== level);
                chip.classList.remove('active');
            } else {
                formData.playerLevels.push(level);
                chip.classList.add('active');
            }
            setFormData(formData);
            if (formData.playerLevels.length > 0) showError('level-error', false);
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

    // Activity chips (single select)
    document.querySelectorAll('.activity-chip').forEach(chip => {
        chip.onclick = () => {
            formData.activityType = chip.dataset.value;
            setFormData(formData);
            document.querySelectorAll('.activity-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            showError('activity-error', false);
        };
    });

    // Events toggle
    document.getElementById('events-yes')?.addEventListener('click', () => {
        formData.hasEvents = true;
        setFormData(formData);
        document.getElementById('events-yes').classList.add('active-yes');
        document.getElementById('events-no').classList.remove('active-no');
        eventsDetails?.classList.add('expanded');
        showError('events-toggle-error', false);
    });

    document.getElementById('events-no')?.addEventListener('click', () => {
        formData.hasEvents = false;
        formData.eventTypes = [];
        setFormData(formData);
        document.getElementById('events-no').classList.add('active-no');
        document.getElementById('events-yes').classList.remove('active-yes');
        eventsDetails?.classList.remove('expanded');
        showError('events-toggle-error', false);
        showError('event-type-error', false);
    });

    // Event type chips (multi-select)
    document.querySelectorAll('.event-chip').forEach(chip => {
        chip.onclick = () => {
            const event = chip.dataset.value;
            if (formData.eventTypes.includes(event)) {
                formData.eventTypes = formData.eventTypes.filter(e => e !== event);
                chip.classList.remove('active');
            } else {
                formData.eventTypes.push(event);
                chip.classList.add('active');
            }
            setFormData(formData);
            if (formData.eventTypes.length > 0) showError('event-type-error', false);
        };
    });



    if (nextBtn) {
        nextBtn.onclick = () => {
            clearAllErrors();
            let isValid = true;

            if (!formData.playerLevels || formData.playerLevels.length === 0) {
                showError('level-error', true);
                isValid = false;
            }

            if (!formData.timeSlots || formData.timeSlots.length === 0) {
                showError('time-error', true);
                isValid = false;
            }

            if (!formData.activityType) {
                showError('activity-error', true);
                isValid = false;
            }

            if (formData.hasEvents === undefined || formData.hasEvents === null) {
                showError('events-toggle-error', true);
                isValid = false;
            } else if (formData.hasEvents === true && formData.eventTypes.length === 0) {
                showError('event-type-error', true);
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
    if (!formData.playerLevels || formData.playerLevels.length === 0) {
        errors.playerLevels = "Selecciona al menos un nivel";
    }
    if (!formData.timeSlots || formData.timeSlots.length === 0) {
        errors.timeSlots = "Selecciona al menos un horario";
    }
    if (!formData.activityType) errors.activityType = "Selecciona una opción";
    if (formData.hasEvents === undefined) errors.hasEvents = "Selecciona una opción";
    if (formData.hasEvents && formData.eventTypes.length === 0) {
        errors.eventTypes = "Selecciona al menos un tipo";
    }
    return errors;
}

export function save(formData) {
    return true;
}
