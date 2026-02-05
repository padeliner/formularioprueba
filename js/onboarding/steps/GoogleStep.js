// GoogleStep.js - Step -1: Name + Terms acceptance for Google OAuth users

export function render(formData) {
    const REFERRAL_SOURCES = [
        "Instagram",
        "LinkedIn",
        "Google",
        "Recomendación",
        "Otro"
    ];

    const sourceOptions = REFERRAL_SOURCES.map(source =>
        `<option value="${source}" ${formData.referralSource === source ? 'selected' : ''}>${source}</option>`
    ).join('');

    return `
        <div class="onboarding-step standard-step-container">
            <div class="google-content-width">
                <!-- Header -->
                <div class="onb-header mb-12">
                    <h1 class="onb-title">
                        BIENVENIDO A<br><span class="text-accent">PADELINER FOUNDERS</span>
                    </h1>
                    <p class="onb-subtitle">
                        CONFIRMA TUS DATOS PARA CONTINUAR
                    </p>
                </div>
                
                <!-- Form Content -->
                <div class="space-y-6">
                    <!-- Display Name Input -->
                    <div class="form-group" id="name-group">
                        <label for="onb-displayName" class="google-label">NOMBRE COMPLETO</label>
                        <div class="input-container">
                            <i data-lucide="user" class="input-icon"></i>
                            <input 
                                type="text" 
                                id="onb-displayName" 
                                placeholder="Nombre y Apellidos" 
                                value="${formData.displayName || ''}"
                                class="google-input-padding"
                            >
                        </div>
                        <span class="error-message google-error-msg" id="name-error"></span>
                        <p class="google-helper-text"><span class="text-accent mr-1">*</span>Este será tu nombre visible para otros usuarios</p>
                    </div>

                    <!-- Referral Source Input -->
                    <div class="form-group" id="source-group">
                        <label for="onb-source" class="google-label">¿CÓMO NOS CONOCISTE?</label>
                        <div class="input-container">
                            <i data-lucide="search" class="input-icon"></i>
                            <select id="onb-source" class="google-input-padding" style="width: 100%; height: 50px; background: transparent; border: none; color: white; outline: none; appearance: none; font-weight: bold;">
                                <option value="" disabled ${!formData.referralSource ? 'selected' : ''}>SELECCIONA UNA OPCIÓN</option>
                                ${sourceOptions}
                            </select>
                        </div>
                    </div>
                    
                    <!-- Terms Checkbox -->
                    <div class="options-row" id="terms-group">
                        <div class="checkbox-wrapper">
                            <input type="checkbox" id="onb-terms" ${formData.acceptedTerms ? 'checked' : ''}>
                            <label for="onb-terms">
                                ACEPTO LOS <a href="/terms" target="_blank">TÉRMINOS</a>, LA <a href="/privacy" target="_blank">POLÍTICA DE PRIVACIDAD</a> Y RECIBIR NOVEDADES.
                            </label>
                        </div>
                        <span class="error-message" id="terms-error"></span>
                    </div>
                    
                    <!-- Continue Button -->
                     <div>
                        <button type="button" id="onb-next-btn" class="btn btn-primary btn-submit mt-8">
                            <span>CONTINUAR</span>
                            <i data-lucide="arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export function attach(formData, setFormData, rerender, nextStep) {
    if (window.lucide) window.lucide.createIcons();
    
    const nameInput = document.getElementById('onb-displayName');
    const sourceInput = document.getElementById('onb-source');
    const termsCheckbox = document.getElementById('onb-terms');
    const nextBtn = document.getElementById('onb-next-btn');

    const showError = (elementId, message) => {
        const errorEl = document.getElementById(elementId);
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.style.display = 'block';
            if (elementId === 'name-error') {
                document.querySelector('#name-group .input-container')?.classList.add('error');
            } else if (elementId === 'terms-error') {
                document.querySelector('#terms-group .checkbox-wrapper')?.classList.add('error');
            }
        }
    };

    const clearError = (elementId) => {
        const errorEl = document.getElementById(elementId);
        if (errorEl) {
            errorEl.style.display = 'none';
            if (elementId === 'name-error') {
                document.querySelector('#name-group .input-container')?.classList.remove('error');
            } else if (elementId === 'terms-error') {
                document.querySelector('#terms-group .checkbox-wrapper')?.classList.remove('error');
            }
        }
    };

    if (nameInput) {
        nameInput.oninput = (e) => {
            formData.displayName = e.target.value;
            if (e.target.value.trim() !== '') clearError('name-error');
        };
    }

    if (sourceInput) {
        sourceInput.onchange = (e) => {
            formData.referralSource = e.target.value;
        };
    }

    if (termsCheckbox) {
        termsCheckbox.onchange = (e) => {
            formData.acceptedTerms = e.target.checked;
            if (e.target.checked) clearError('terms-error');
        };
    }

    if (nextBtn) {
        nextBtn.onclick = () => {
            // Clear previous errors
            clearError('name-error');
            clearError('terms-error');
            
            let isValid = true;

            // Validate name
            if (!formData.displayName || !formData.displayName.trim()) {
                showError('name-error', 'Por favor, introduce tu nombre');
                isValid = false;
            }

            // Validate terms
            if (!formData.acceptedTerms) {
                showError('terms-error', 'Debes aceptar los términos para continuar');
                isValid = false;
            }

            if (isValid) {
                nextStep();
            } else {
                // Scroll to first error
                const firstError = document.querySelector('.error-message[style*="block"]');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        };
    }
}

export function validate(formData) {
    const errors = {};
    if (!formData.displayName || !formData.displayName.trim()) {
        errors.displayName = "Por favor, introduce tu nombre";
    }
    if (!formData.acceptedTerms) {
        errors.acceptedTerms = "Debes aceptar los términos para continuar";
    }
    return errors;
}

export function save(formData) {
    return true;
}
