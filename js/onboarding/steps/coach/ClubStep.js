// ClubStep.js - Coach Step 2: Club Details

export function render(formData) {
    const hasMainClub = formData.hasMainClub === true;
    const hasNoClub = formData.hasMainClub === false;

    return `
        <div class="onboarding-step step-content">
            <div class="step-inner">
                <div class="step-header">
                    <h1 class="step-title">Tu <span class="text-accent italic">lugar</span> de trabajo</h1>
                    <p class="step-subtitle">Configura dónde impartes tus clases</p>
                </div>

                <div class="step-body">
                    <!-- Club Base Section -->
                    <div class="form-section">
                        <div class="section-icon-row">
                            <div class="section-icon">
                                <i data-lucide="building-2"></i>
                            </div>
                            <div class="section-label">¿Tienes un club base?</div>
                        </div>
                        
                        <div class="toggle-options">
                            <button type="button" id="club-yes" class="toggle-option ${hasMainClub ? 'active-yes' : ''}">Sí</button>
                            <button type="button" id="club-no" class="toggle-option ${hasNoClub ? 'active-no' : ''}">No</button>
                        </div>
                        
                        <div class="field-error" id="club-toggle-error" style="display:none;">
                            <i data-lucide="alert-circle"></i>
                            <span>Selecciona una opción</span>
                        </div>

                        <div id="club-input-container" class="expandable-content ${hasMainClub ? 'expanded' : ''}">
                            <div class="input-field" style="margin-top: 16px;">
                                <input 
                                    type="text" 
                                    id="onb-club-search" 
                                    class="field-input"
                                    placeholder="Nombre del club"
                                    value="${formData.mainClub || ''}"
                                    autocomplete="off"
                                >
                                <i data-lucide="search" class="field-icon"></i>
                            </div>
                            <div class="field-error" id="club-name-error" style="display:none;">
                                <i data-lucide="alert-circle"></i>
                                <span>Introduce el nombre del club</span>
                            </div>
                        </div>
                    </div>

                    <!-- Displacement Section -->
                    <div class="form-section">
                        <div class="section-icon-row">
                            <div class="section-icon">
                                <i data-lucide="car"></i>
                            </div>
                            <div class="section-label">¿Te desplazas a otros lugares?</div>
                        </div>
                        
                        <div class="select-wrapper">
                            <select id="displacement-select" class="field-select">
                                <option value="">Selecciona una opción</option>
                                <option value="no" ${formData.displacementRange === 'no' ? 'selected' : ''}>No me desplazo</option>
                                <option value="< 5 KM" ${formData.displacementRange === '< 5 KM' ? 'selected' : ''}>&lt; 5 KM</option>
                                <option value="5-10 KM" ${formData.displacementRange === '5-10 KM' ? 'selected' : ''}>5-10 KM</option>
                                <option value="10-20 KM" ${formData.displacementRange === '10-20 KM' ? 'selected' : ''}>10-20 KM</option>
                                <option value="20-40 KM" ${formData.displacementRange === '20-40 KM' ? 'selected' : ''}>20-40 KM</option>
                                <option value="> 40 KM" ${formData.displacementRange === '> 40 KM' ? 'selected' : ''}>&gt; 40 KM</option>
                            </select>
                        </div>
                        
                        <div class="field-error" id="displacement-error" style="display:none;">
                            <i data-lucide="alert-circle"></i>
                            <span>Selecciona una opción de desplazamiento</span>
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

    const clubYes = document.getElementById('club-yes');
    const clubNo = document.getElementById('club-no');
    const clubInput = document.getElementById('onb-club-search');
    const clubContainer = document.getElementById('club-input-container');

    const displacementSelect = document.getElementById('displacement-select');

    const nextBtn = document.getElementById('onb-next-btn');

    // Error helpers
    const showError = (id, show) => {
        const el = document.getElementById(id);
        if (el) {
            el.style.display = show ? 'flex' : 'none';
            if (show && window.lucide) window.lucide.createIcons();
        }
    };

    const clearAllErrors = () => {
        showError('club-toggle-error', false);
        showError('club-name-error', false);
        showError('displacement-error', false);
    };

    // Club toggle
    if (clubYes && clubNo) {
        clubYes.onclick = () => {
            formData.hasMainClub = true;
            setFormData(formData);
            clubYes.classList.add('active-yes');
            clubNo.classList.remove('active-no');
            if (clubContainer) clubContainer.classList.add('expanded');
            showError('club-toggle-error', false);
        };

        clubNo.onclick = () => {
            formData.hasMainClub = false;
            formData.mainClub = "";
            setFormData(formData);
            clubNo.classList.add('active-no');
            clubYes.classList.remove('active-yes');
            if (clubContainer) clubContainer.classList.remove('expanded');
            showError('club-toggle-error', false);
            showError('club-name-error', false);
        };
    }

    if (clubInput) {
        clubInput.oninput = (e) => {
            formData.mainClub = e.target.value;
            setFormData(formData);
            if (e.target.value.trim()) {
                showError('club-name-error', false);
            }
        };
    }

    // Displacement dropdown
    if (displacementSelect) {
        displacementSelect.onchange = (e) => {
            formData.displacementRange = e.target.value || null;
            formData.wantsDisplacement = e.target.value && e.target.value !== 'no';
            setFormData(formData);
            if (e.target.value) {
                showError('displacement-error', false);
            }
        };
        // Initialize icons after render
        if (window.lucide) window.lucide.createIcons();
    }

    // Next button with validation
    if (nextBtn) {
        nextBtn.onclick = () => {
            clearAllErrors();
            let isValid = true;

            // Validate club question answered
            if (formData.hasMainClub === undefined || formData.hasMainClub === null) {
                showError('club-toggle-error', true);
                isValid = false;
            } else if (formData.hasMainClub === true && (!formData.mainClub || !formData.mainClub.trim())) {
                showError('club-name-error', true);
                isValid = false;
            }

            // Validate displacement selection
            if (!formData.displacementRange) {
                showError('displacement-error', true);
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
    if (formData.hasMainClub && (!formData.mainClub || !formData.mainClub.trim())) {
        errors.mainClub = "Introduce el nombre del club";
    }
    if (formData.wantsDisplacement && !formData.displacementRange) {
        errors.displacementRange = "Selecciona una distancia máxima";
    }
    return errors;
}

export function save(formData) {
    return true;
}
