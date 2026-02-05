// ModelStep.js - Academy Step 2: Academy Model
const ACADEMY_TYPES = [
    { id: 'base', label: 'Base', icon: 'users' },
    { id: 'alto-rendimiento', label: 'Alto Rendimiento', icon: 'trophy' },
    { id: 'mixta', label: 'Mixta', icon: 'layers' }
];

export function render(formData) {
    const typeButtons = ACADEMY_TYPES.map(type => `
        <button type="button" class="exp-chip type-chip ${formData.academyType === type.id ? 'active' : ''}" data-value="${type.id}" style="display: inline-flex; align-items: center; gap: 8px;">
            <i data-lucide="${type.icon}"></i>
            ${type.label}
        </button>
    `).join('');

    return `
        <div class="onboarding-step step-content">
            <div class="step-inner">
                <div class="step-header">
                    <h1 class="step-title">Modelo de <span class="text-accent italic">academia</span></h1>
                    <p class="step-subtitle">Tipo y ubicación</p>
                </div>

                <div class="step-body">
                    <div class="form-section">
                        <div class="section-icon-row">
                            <div class="section-icon">
                                <i data-lucide="target"></i>
                            </div>
                            <div class="section-label">Tipo de Academia</div>
                        </div>
                        <div class="chips-grid">
                            ${typeButtons}
                        </div>
                        <div class="field-error" id="type-error" style="display:none;">
                            <i data-lucide="alert-circle"></i>
                            <span>Selecciona un tipo</span>
                        </div>
                    </div>

                    <div class="form-section">
                        <div class="section-icon-row">
                            <div class="section-icon">
                                <i data-lucide="building-2"></i>
                            </div>
                            <div class="section-label">¿Trabajáis en un club principal?</div>
                        </div>
                        <div class="toggle-options">
                            <button type="button" id="club-yes" class="toggle-option ${formData.hasMainClub === true ? 'active-yes' : ''}">Sí</button>
                            <button type="button" id="club-no" class="toggle-option ${formData.hasMainClub === false ? 'active-no' : ''}">No</button>
                        </div>
                        <div class="field-error" id="club-toggle-error" style="display:none;">
                            <i data-lucide="alert-circle"></i>
                            <span>Selecciona una opción</span>
                        </div>

                        <div id="club-details" class="expandable-content ${formData.hasMainClub ? 'expanded' : ''}">
                            <div style="margin-top: 16px;">
                                <div class="input-field">
                                    <input 
                                        type="text" 
                                        id="onb-main-club" 
                                        class="field-input"
                                        placeholder="Nombre del club"
                                        value="${formData.mainClubName || ''}"
                                        autocomplete="off"
                                    >
                                    <i data-lucide="home" class="field-icon"></i>
                                </div>
                                <div class="field-error" id="club-name-error" style="display:none;">
                                    <i data-lucide="alert-circle"></i>
                                    <span>Introduce el nombre del club</span>
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
    const clubDetails = document.getElementById('club-details');
    const mainClubInput = document.getElementById('onb-main-club');

    const showError = (id, show) => {
        const el = document.getElementById(id);
        if (el) {
            el.style.display = show ? 'flex' : 'none';
            if (show && window.lucide) window.lucide.createIcons();
        }
    };

    const clearAllErrors = () => {
        ['type-error', 'club-toggle-error', 'club-name-error'].forEach(id => showError(id, false));
    };

    // Academy Type Chips
    document.querySelectorAll('.type-chip').forEach(chip => {
        chip.onclick = () => {
            formData.academyType = chip.dataset.value;
            setFormData(formData);

            // UI Update
            document.querySelectorAll('.type-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');

            showError('type-error', false);
        };
    });

    // Main Club Toggle
    document.getElementById('club-yes')?.addEventListener('click', () => {
        formData.hasMainClub = true;
        setFormData(formData);

        // UI Update
        document.getElementById('club-yes').classList.add('active-yes');
        document.getElementById('club-no').classList.remove('active-no');
        clubDetails?.classList.add('expanded');

        showError('club-toggle-error', false);
    });

    document.getElementById('club-no')?.addEventListener('click', () => {
        formData.hasMainClub = false;
        formData.mainClubName = ''; // clear name if No
        setFormData(formData);

        // UI Update
        document.getElementById('club-no').classList.add('active-no');
        document.getElementById('club-yes').classList.remove('active-yes');
        clubDetails?.classList.remove('expanded');

        showError('club-toggle-error', false);
        showError('club-name-error', false);
    });

    // Main Club Name Input
    mainClubInput?.addEventListener('input', (e) => {
        formData.mainClubName = e.target.value;
        setFormData(formData);
        if (e.target.value.trim()) showError('club-name-error', false);
    });

    if (nextBtn) {
        nextBtn.onclick = () => {
            clearAllErrors();
            let isValid = true;

            if (!formData.academyType) {
                showError('type-error', true);
                isValid = false;
            }

            if (formData.hasMainClub === undefined || formData.hasMainClub === null) {
                showError('club-toggle-error', true);
                isValid = false;
            } else if (formData.hasMainClub === true && !formData.mainClubName?.trim()) {
                showError('club-name-error', true);
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
    if (!formData.academyType) errors.academyType = "Requerido";
    if (formData.hasMainClub === undefined) errors.hasMainClub = "Requerido";
    if (formData.hasMainClub && !formData.mainClubName?.trim()) errors.mainClubName = "Requerido";
    return errors;
}

export function save(formData) {
    return true;
}
