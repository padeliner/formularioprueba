// IdentityStep.js - Club Step 1: Club Name
export function render(formData) {
    return `
        <div class="onboarding-step step-content">
            <div class="step-inner">
                <div class="step-header">
                    <h1 class="step-title">Tu <span class="text-accent italic">club</span></h1>
                    <p class="step-subtitle">Cuéntanos sobre tu instalación</p>
                </div>

                <div class="step-body">
                    <div class="form-section">
                        <div class="section-icon-row">
                            <div class="section-icon">
                                <i data-lucide="building-2"></i>
                            </div>
                            <div class="section-label">Nombre del club</div>
                        </div>
                        
                        <div class="input-field">
                            <input 
                                type="text" 
                                id="onb-club-name" 
                                class="field-input"
                                placeholder="Nombre de tu club"
                                value="${formData.clubName || ''}"
                                autocomplete="off"
                            >
                            <i data-lucide="building-2" class="field-icon"></i>
                        </div>
                        <div class="field-error" id="club-name-error" style="display:none;">
                            <i data-lucide="alert-circle"></i>
                            <span>Introduce el nombre del club</span>
                        </div>
                        <p class="field-hint">Este será el nombre visible en Padeliner</p>
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

    const clubNameInput = document.getElementById('onb-club-name');
    const nextBtn = document.getElementById('onb-next-btn');

    const showError = (id, show) => {
        const el = document.getElementById(id);
        if (el) {
            el.style.display = show ? 'flex' : 'none';
            if (show && window.lucide) window.lucide.createIcons();
        }
    };

    if (clubNameInput) {
        clubNameInput.oninput = (e) => {
            formData.clubName = e.target.value;
            setFormData(formData);
            if (e.target.value.trim()) {
                showError('club-name-error', false);
            }
        };
    }

    if (nextBtn) {
        nextBtn.onclick = () => {
            showError('club-name-error', false);
            let isValid = true;

            if (!formData.clubName || !formData.clubName.trim()) {
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
    if (!formData.clubName || !formData.clubName.trim()) {
        errors.clubName = "Introduce el nombre del club";
    }
    return errors;
}

export function save(formData) {
    return true;
}
