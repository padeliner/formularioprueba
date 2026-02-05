// ProfileStep.js - Commercial Step 1: Basic Professional Info

export function render(formData) {
    return `
        <div class="onboarding-step step-content">
            <div class="step-inner">
                <div class="step-header">
                    <h1 class="step-title">Tu perfil <span class="text-accent italic">comercial</span></h1>
                    <p class="step-subtitle">Información básica para captar profesionales</p>
                </div>

                <div class="step-body">
                    <!-- Personal Info Section -->
                    <div class="form-section">
                        <div class="section-icon-row">
                            <div class="section-icon">
                                <i data-lucide="user"></i>
                            </div>
                            <div class="section-label">Datos personales</div>
                        </div>
                        
                        <div class="input-field">
                            <input 
                                type="text" 
                                id="onb-commercial-name" 
                                class="field-input"
                                placeholder="Nombre completo"
                                value="${formData.commercialName || ''}"
                            >
                            <i data-lucide="user" class="field-icon"></i>
                        </div>
                        
                        <div class="field-error" id="name-error" style="display:none;">
                            <i data-lucide="alert-circle"></i>
                            <span>Introduce tu nombre completo</span>
                        </div>
                    </div>

                    <!-- Phone Section -->
                    <div class="form-section">
                        <div class="section-icon-row">
                            <div class="section-icon">
                                <i data-lucide="phone"></i>
                            </div>
                            <div class="section-label">Contacto</div>
                        </div>
                        
                        <div class="input-field">
                            <input 
                                type="tel" 
                                id="onb-commercial-phone" 
                                class="field-input"
                                placeholder="+34 600 000 000"
                                value="${formData.commercialPhone || ''}"
                            >
                            <i data-lucide="smartphone" class="field-icon"></i>
                        </div>
                        
                        <p class="field-hint">Número de teléfono de contacto</p>
                        
                        <div class="field-error" id="phone-error" style="display:none;">
                            <i data-lucide="alert-circle"></i>
                            <span>Introduce un número de teléfono válido</span>
                        </div>
                    </div>

                    <!-- Employment Status Section -->
                    <div class="form-section">
                        <div class="section-icon-row">
                            <div class="section-icon">
                                <i data-lucide="briefcase"></i>
                            </div>
                            <div class="section-label">Situación laboral</div>
                        </div>
                        
                        <p class="field-hint" style="margin-bottom: 12px;">¿Cuál es tu situación actual?</p>
                        
                        <div class="chips-grid">
                            <button 
                                type="button" 
                                class="pill-btn ${formData.commercialEmployment === 'Trabajando' ? 'active' : ''}" 
                                data-employment="Trabajando"
                            >
                                <i data-lucide="briefcase"></i>
                                <span>Trabajando</span>
                            </button>
                            <button 
                                type="button" 
                                class="pill-btn ${formData.commercialEmployment === 'Estudiante' ? 'active' : ''}" 
                                data-employment="Estudiante"
                            >
                                <i data-lucide="graduation-cap"></i>
                                <span>Estudiante</span>
                            </button>
                            <button 
                                type="button" 
                                class="pill-btn ${formData.commercialEmployment === 'Sin nada' ? 'active' : ''}" 
                                data-employment="Sin nada"
                            >
                                <i data-lucide="user-x"></i>
                                <span>Sin nada</span>
                            </button>
                        </div>
                        
                        <div class="field-error" id="employment-error" style="display:none;">
                            <i data-lucide="alert-circle"></i>
                            <span>Selecciona tu situación laboral</span>
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

    const nameInput = document.getElementById('onb-commercial-name');
    const phoneInput = document.getElementById('onb-commercial-phone');
    const employmentBtns = document.querySelectorAll('[data-employment]');
    const nextBtn = document.getElementById('onb-next-btn');

    // Show/hide error messages
    const showError = (elementId, show) => {
        const errorEl = document.getElementById(elementId);
        if (errorEl) {
            errorEl.style.display = show ? 'flex' : 'none';
            if (window.lucide) window.lucide.createIcons();
        }
    };

    const clearErrors = () => {
        showError('name-error', false);
        showError('phone-error', false);
        showError('employment-error', false);
    };

    // Name input handler
    if (nameInput) {
        nameInput.oninput = (e) => {
            formData.commercialName = e.target.value;
            if (e.target.value.trim() !== '') {
                showError('name-error', false);
            }
        };
    }

    // Phone input handler
    if (phoneInput) {
        phoneInput.oninput = (e) => {
            formData.commercialPhone = e.target.value;
            if (e.target.value.trim() !== '') {
                showError('phone-error', false);
            }
        };
    }

    // Employment status buttons
    employmentBtns.forEach(btn => {
        btn.onclick = () => {
            const employment = btn.dataset.employment;

            // Remove active from all buttons
            employmentBtns.forEach(b => b.classList.remove('active'));

            // Add active to clicked button
            btn.classList.add('active');

            // Update form data
            formData.commercialEmployment = employment;
            setFormData(formData);

            // Clear error
            showError('employment-error', false);
        };
    });

    // Next button validation
    if (nextBtn) {
        nextBtn.onclick = () => {
            clearErrors();
            let isValid = true;

            // Validate name
            if (!formData.commercialName || !formData.commercialName.trim()) {
                showError('name-error', true);
                isValid = false;
            }

            // Validate phone
            if (!formData.commercialPhone || !formData.commercialPhone.trim()) {
                showError('phone-error', true);
                isValid = false;
            }

            // Validate employment status
            if (!formData.commercialEmployment) {
                showError('employment-error', true);
                isValid = false;
            }

            if (isValid) {
                nextStep();
            } else {
                // Scroll to first error
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

    if (!formData.commercialName || !formData.commercialName.trim()) {
        errors.commercialName = "Introduce tu nombre completo";
    }

    if (!formData.commercialPhone || !formData.commercialPhone.trim()) {
        errors.commercialPhone = "Introduce un número de teléfono válido";
    }

    if (!formData.commercialEmployment) {
        errors.commercialEmployment = "Selecciona tu situación laboral";
    }

    return errors;
}

export function save(formData) {
    return true;
}
