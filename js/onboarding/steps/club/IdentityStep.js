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
            // Auto focus
            setTimeout(() => sponsorsInput?.focus(), 100);
        }
    });

    document.getElementById('sponsor-no')?.addEventListener('click', () => {
        formData.hasSponsors = false;
        formData.sponsorsList = ''; // Clear if disabled
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
