// IdentityStep.js - Academy Step 1: Academy Name
export function render(formData) {
    return `
        <div class="onboarding-step step-content">
            <div class="step-inner">
                <div class="step-header">
                    <h1 class="step-title">Tu <span class="text-accent italic">academia</span></h1>
                    <p class="step-subtitle">Cuéntanos sobre tu academia</p>
                </div>

                <div class="step-body">
                    <div class="form-section">
                        <div class="section-icon-row">
                            <div class="section-icon">
                                <i data-lucide="graduation-cap"></i>
                            </div>
                            <div class="section-label">Nombre de la academia</div>
                        </div>
                        
                        <div class="input-field">
                            <input 
                                type="text" 
                                id="onb-academy-name" 
                                class="field-input"
                                placeholder="Nombre de tu academia"
                                value="${formData.academyName || ''}"
                                autocomplete="off"
                            >
                            <i data-lucide="graduation-cap" class="field-icon"></i>
                        </div>
                        <div class="field-error" id="academy-name-error" style="display:none;">
                            <i data-lucide="alert-circle"></i>
                            <span>Introduce el nombre de la academia</span>
                        </div>
                        <p class="field-hint">Este será el nombre visible en Padeliner</p>
                    </div>

                    <!-- Sponsors Section -->
                    <div class="form-section">
                        <div class="section-icon-row">
                            <div class="section-icon">
                                <i data-lucide="award"></i>
                            </div>
                            <div class="section-label">¿Tenéis algún patrocinador?</div>
                        </div>

                        <div class="toggle-row">
                            <button type="button" class="toggle-btn ${formData.hasSponsors ? 'active-yes' : ''}" id="sponsor-yes">
                                SÍ
                            </button>
                            <button type="button" class="toggle-btn ${formData.hasSponsors === false ? 'active-no' : ''}" id="sponsor-no">
                                NO
                            </button>
                        </div>

                        <div id="sponsors-details" class="conditional-fields ${formData.hasSponsors ? 'expanded' : ''}" style="margin-top: 16px;">
                            <label class="field-label">¿Quiénes son?</label>
                            <div class="input-field">
                                <input 
                                    type="text" 
                                    id="onb-sponsors-list" 
                                    class="field-input"
                                    placeholder="Ej: Bullpadel, Head, Coca-Cola..."
                                    value="${formData.sponsorsList || ''}"
                                    autocomplete="off"
                                >
                                <i data-lucide="award" class="field-icon"></i>
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

    const academyNameInput = document.getElementById('onb-academy-name');
    const nextBtn = document.getElementById('onb-next-btn');

    const showError = (id, show) => {
        const el = document.getElementById(id);
        if (el) {
            el.style.display = show ? 'flex' : 'none';
            if (show && window.lucide) window.lucide.createIcons();
        }
    };

    if (academyNameInput) {
        academyNameInput.oninput = (e) => {
            formData.academyName = e.target.value;
            setFormData(formData);
            if (e.target.value.trim()) {
                showError('academy-name-error', false);
            }
        };
    }

    // Sponsors Logic
    const sponsorsDetails = document.getElementById('sponsors-details');
    const sponsorsInput = document.getElementById('onb-sponsors-list');

    document.getElementById('sponsor-yes')?.addEventListener('click', () => {
        formData.hasSponsors = true;
        setFormData(formData);

        document.getElementById('sponsor-yes').classList.add('active-yes');
        document.getElementById('sponsor-no').classList.remove('active-no');

        if (sponsorsDetails) {
            sponsorsDetails.classList.add('expanded');
            setTimeout(() => sponsorsInput?.focus(), 100);
        }
    });

    document.getElementById('sponsor-no')?.addEventListener('click', () => {
        formData.hasSponsors = false;
        formData.sponsorsList = '';
        setFormData(formData);

        document.getElementById('sponsor-no').classList.add('active-no');
        document.getElementById('sponsor-yes').classList.remove('active-yes');

        if (sponsorsDetails) sponsorsDetails.classList.remove('expanded');
    });

    if (sponsorsInput) {
        sponsorsInput.oninput = (e) => {
            formData.sponsorsList = e.target.value;
            setFormData(formData);
        };
    }

    if (nextBtn) {
        nextBtn.onclick = () => {
            showError('academy-name-error', false);
            let isValid = true;

            if (!formData.academyName || !formData.academyName.trim()) {
                showError('academy-name-error', true);
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
    if (!formData.academyName || !formData.academyName.trim()) {
        errors.academyName = "Introduce el nombre de la academia";
    }
    return errors;
}

export function save(formData) {
    return true;
}
