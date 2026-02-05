// TeamStep.js - Academy Step 3: Technical Team
const COACH_COUNT_OPTIONS = ['1 – 2', '3 – 5', '6 – 10', '+10'];
const CERTIFICATION_OPTIONS = [
    { id: 'all', label: 'Todos certificados', icon: 'badge-check' },
    { id: 'partial', label: 'Parcialmente certificados', icon: 'badge' },
    { id: 'none', label: 'No certificados', icon: 'badge-x' }
];

export function render(formData) {
    const countOptions = COACH_COUNT_OPTIONS.map(opt => `
        <option value="${opt}" ${formData.coachCount === opt ? 'selected' : ''}>${opt}</option>
    `).join('');

    const certChips = CERTIFICATION_OPTIONS.map(opt => `
        <button type="button" class="exp-chip cert-chip ${formData.teamCertification === opt.id ? 'active' : ''}" data-value="${opt.id}" style="display: inline-flex; align-items: center; gap: 8px;">
            <i data-lucide="${opt.icon}"></i>
            ${opt.label}
        </button>
    `).join('');

    return `
        <div class="onboarding-step step-content">
            <div class="step-inner">
                <div class="step-header">
                    <h1 class="step-title">Equipo <span class="text-accent italic">técnico</span></h1>
                    <p class="step-subtitle">Entrenadores y certificaciones</p>
                </div>

                <div class="step-body">
                    <div class="form-section">
                        <div class="section-icon-row">
                            <div class="section-icon">
                                <i data-lucide="users"></i>
                            </div>
                            <div class="section-label">Número de Entrenadores</div>
                        </div>
                        <div class="input-field">
                            <select id="onb-coach-count" class="field-input field-select">
                                <option value="">Selecciona</option>
                                ${countOptions}
                            </select>
                            <i data-lucide="hash" class="field-icon"></i>
                        </div>
                        <div class="field-error" id="count-error" style="display:none;">
                            <i data-lucide="alert-circle"></i>
                            <span>Selecciona una opción</span>
                        </div>
                    </div>

                    <div class="form-section">
                        <div class="section-icon-row">
                            <div class="section-icon">
                                <i data-lucide="award"></i>
                            </div>
                            <div class="section-label">Certificación del Equipo</div>
                        </div>
                        <div class="chips-grid">
                            ${certChips}
                        </div>
                        <div class="field-error" id="cert-error" style="display:none;">
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
    const countSelect = document.getElementById('onb-coach-count');

    const showError = (id, show) => {
        const el = document.getElementById(id);
        if (el) {
            el.style.display = show ? 'flex' : 'none';
            if (show && window.lucide) window.lucide.createIcons();
        }
    };

    const clearAllErrors = () => {
        showError('count-error', false);
        showError('cert-error', false);
    };

    countSelect?.addEventListener('change', (e) => {
        formData.coachCount = e.target.value;
        setFormData(formData);
        if (e.target.value) showError('count-error', false);
    });

    document.querySelectorAll('.cert-chip').forEach(chip => {
        chip.onclick = () => {
            formData.teamCertification = chip.dataset.value;
            setFormData(formData);
            document.querySelectorAll('.cert-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            showError('cert-error', false);
        };
    });

    if (nextBtn) {
        nextBtn.onclick = () => {
            clearAllErrors();
            let isValid = true;

            if (!formData.coachCount) {
                showError('count-error', true);
                isValid = false;
            }

            if (!formData.teamCertification) {
                showError('cert-error', true);
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
    if (!formData.coachCount) errors.coachCount = "Requerido";
    if (!formData.teamCertification) errors.teamCertification = "Requerido";
    return errors;
}

export function save(formData) {
    return true;
}
