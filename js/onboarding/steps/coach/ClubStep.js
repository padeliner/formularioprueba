// ClubStep.js - Coach Step 2: Club Details
import { DISPLACEMENT_RANGES } from '../../constants.js';

export function render(formData) {
    const hasMainClub = formData.hasMainClub === true;
    const hasNoClub = formData.hasMainClub === false;
    const wantsDisplacement = formData.wantsDisplacement === true;
    const noDisplacement = formData.wantsDisplacement === false;
    const currentDisplacement = formData.displacementRange || '';

    const distanceChips = DISPLACEMENT_RANGES.map(o => `
        <button type="button" class="distance-chip ${currentDisplacement === o.value ? 'active' : ''}" data-value="${o.value}">
            ${o.label}
        </button>
    `).join('');

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
                                    placeholder="Escribe el nombre de tu club..."
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
                        
                        <div class="toggle-options">
                            <button type="button" id="displacement-yes" class="toggle-option ${wantsDisplacement ? 'active-yes' : ''}">Sí</button>
                            <button type="button" id="displacement-no" class="toggle-option ${noDisplacement ? 'active-no' : ''}">No</button>
                        </div>
                        
                        <div class="field-error" id="displacement-toggle-error" style="display:none;">
                            <i data-lucide="alert-circle"></i>
                            <span>Selecciona una opción</span>
                        </div>

                        <div id="displacement-container" class="expandable-content ${wantsDisplacement ? 'expanded' : ''}">
                            <div style="margin-top: 16px;">
                                <p class="field-hint" style="margin-bottom: 12px;">Distancia máxima de desplazamiento</p>
                                <div class="chips-grid">
                                    ${distanceChips}
                                </div>
                                <div class="field-error" id="distance-error" style="display:none;">
                                    <i data-lucide="alert-circle"></i>
                                    <span>Selecciona una distancia</span>
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
    
    const clubYes = document.getElementById('club-yes');
    const clubNo = document.getElementById('club-no');
    const clubInput = document.getElementById('onb-club-search');
    const clubContainer = document.getElementById('club-input-container');

    const displacementYes = document.getElementById('displacement-yes');
    const displacementNo = document.getElementById('displacement-no');
    const displacementContainer = document.getElementById('displacement-container');
    const distanceChips = document.querySelectorAll('.distance-chip');

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
        showError('displacement-toggle-error', false);
        showError('distance-error', false);
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

    // Displacement toggle
    if (displacementYes && displacementNo) {
        displacementYes.onclick = () => {
            formData.wantsDisplacement = true;
            setFormData(formData);
            displacementYes.classList.add('active-yes');
            displacementNo.classList.remove('active-no');
            if (displacementContainer) displacementContainer.classList.add('expanded');
            showError('displacement-toggle-error', false);
        };

        displacementNo.onclick = () => {
            formData.wantsDisplacement = false;
            formData.displacementRange = null;
            setFormData(formData);
            displacementNo.classList.add('active-no');
            displacementYes.classList.remove('active-yes');
            if (displacementContainer) displacementContainer.classList.remove('expanded');
            showError('displacement-toggle-error', false);
            showError('distance-error', false);
        };
    }

    // Distance chips
    distanceChips.forEach(chip => {
        chip.onclick = () => {
            formData.displacementRange = chip.dataset.value;
            setFormData(formData);
            distanceChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            showError('distance-error', false);
        };
    });

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

            // Validate displacement question answered
            if (formData.wantsDisplacement === undefined || formData.wantsDisplacement === null) {
                showError('displacement-toggle-error', true);
                isValid = false;
            } else if (formData.wantsDisplacement === true && !formData.displacementRange) {
                showError('distance-error', true);
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
