// ContactStep.js - Club Step 3: Contact Info
import { LANGUAGES_LIST } from '../../constants.js';

function renderLanguageChips(formData) {
    if (!formData.clubLanguages) formData.clubLanguages = [];

    return LANGUAGES_LIST.map(lang => {
        const isActive = formData.clubLanguages.includes(lang);
        return `
            <button 
                type="button" 
                class="pill-btn ${isActive ? 'active' : ''}" 
                data-language="${lang}"
            >
                ${lang}
            </button>
        `;
    }).join('');
}

export function render(formData) {
    return `
        <div class="onboarding-step step-content">
            <div class="step-inner">
                <div class="step-header">
                    <h1 class="step-title">Tu <span class="text-accent italic">contacto</span></h1>
                    <p class="step-subtitle">Persona responsable del club</p>
                </div>

                <div class="step-body">
                    <div class="form-section">
                        <div class="section-icon-row">
                            <div class="section-icon">
                                <i data-lucide="user"></i>
                            </div>
                            <div class="section-label">Nombre del responsable</div>
                        </div>
                        
                        <div class="input-field">
                            <input 
                                type="text" 
                                id="onb-contact-name" 
                                class="field-input"
                                placeholder="Nombre y apellidos"
                                value="${formData.contactName || ''}"
                                autocomplete="name"
                            >
                            <i data-lucide="user" class="field-icon"></i>
                        </div>
                        <div class="field-error" id="name-error" style="display:none;">
                            <i data-lucide="alert-circle"></i>
                            <span>Introduce el nombre del responsable</span>
                        </div>
                    </div>

                    <div class="form-section">
                        <div class="section-icon-row">
                            <div class="section-icon">
                                <i data-lucide="mail"></i>
                            </div>
                            <div class="section-label">Email de contacto</div>
                        </div>
                        
                        <div class="input-field">
                            <input 
                                type="email" 
                                id="onb-email" 
                                class="field-input"
                                placeholder="email@ejemplo.com"
                                value="${formData.contactEmail || ''}"
                                autocomplete="email"
                            >
                            <i data-lucide="mail" class="field-icon"></i>
                        </div>
                        <div class="field-error" id="email-error" style="display:none;">
                            <i data-lucide="alert-circle"></i>
                            <span>Introduce un email válido</span>
                        </div>
                    </div>

                    <div class="form-section">
                        <div class="section-icon-row">
                            <div class="section-icon">
                                <i data-lucide="phone"></i>
                            </div>
                            <div class="section-label">Teléfono de contacto</div>
                        </div>
                        
                        <div class="input-field">
                            <input 
                                type="tel" 
                                id="onb-phone" 
                                class="field-input"
                                placeholder="+34 600 000 000"
                                value="${formData.phone || ''}"
                                autocomplete="tel"
                            >
                            <i data-lucide="phone" class="field-icon"></i>
                        </div>
                        <div class="field-error" id="phone-error" style="display:none;">
                            <i data-lucide="alert-circle"></i>
                            <span>Introduce un teléfono</span>
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

    const contactNameInput = document.getElementById('onb-contact-name');
    const emailInput = document.getElementById('onb-email');
    const phoneInput = document.getElementById('onb-phone');
    const nextBtn = document.getElementById('onb-next-btn');

    const showError = (id, show) => {
        const el = document.getElementById(id);
        if (el) {
            el.style.display = show ? 'flex' : 'none';
            if (show && window.lucide) window.lucide.createIcons();
        }
    };

    const clearAllErrors = () => {
        showError('name-error', false);
        showError('email-error', false);
        showError('phone-error', false);
        showError('languages-error', false);
    };

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (contactNameInput) {
        contactNameInput.oninput = (e) => {
            formData.contactName = e.target.value;
            setFormData(formData);
            if (e.target.value.trim()) showError('name-error', false);
        };
    }

    if (emailInput) {
        emailInput.oninput = (e) => {
            formData.contactEmail = e.target.value;
            setFormData(formData);
            if (isValidEmail(e.target.value)) showError('email-error', false);
        };
    }

    if (phoneInput) {
        phoneInput.oninput = (e) => {
            formData.phone = e.target.value;
            setFormData(formData);
            if (e.target.value.trim()) showError('phone-error', false);
        };
    }

    // Language selection
    if (!formData.clubLanguages) formData.clubLanguages = [];

    document.querySelectorAll('[data-language]').forEach(btn => {
        btn.onclick = () => {
            const lang = btn.getAttribute('data-language');
            if (formData.clubLanguages.includes(lang)) {
                formData.clubLanguages = formData.clubLanguages.filter(l => l !== lang);
                btn.classList.remove('active');
            } else {
                formData.clubLanguages.push(lang);
                btn.classList.add('active');
            }
            setFormData(formData);
            showError('languages-error', false);

            // Update summary
            const summary = document.getElementById('selected-summary');
            const count = document.querySelector('.summary-count');
            const text = document.querySelector('.summary-text');
            if (summary && count && text) {
                count.textContent = formData.clubLanguages.length;
                text.textContent = `idioma${formData.clubLanguages.length !== 1 ? 's' : ''} seleccionado${formData.clubLanguages.length !== 1 ? 's' : ''}`;
                summary.style.display = formData.clubLanguages.length > 0 ? '' : 'none';
            }
        };
    });

    if (nextBtn) {
        nextBtn.onclick = () => {
            clearAllErrors();
            let isValid = true;

            if (!formData.contactName || !formData.contactName.trim()) {
                showError('name-error', true);
                isValid = false;
            }

            if (!formData.contactEmail || !isValidEmail(formData.contactEmail)) {
                showError('email-error', true);
                isValid = false;
            }

            if (!formData.phone || !formData.phone.trim()) {
                showError('phone-error', true);
                isValid = false;
            }

            if (!formData.clubLanguages || formData.clubLanguages.length === 0) {
                showError('languages-error', true);
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
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!formData.contactName || !formData.contactName.trim()) {
        errors.contactName = "Introduce el nombre del responsable";
    }
    if (!formData.contactEmail || !isValidEmail(formData.contactEmail)) {
        errors.contactEmail = "Introduce un email válido";
    }
    if (!formData.phone || !formData.phone.trim()) {
        errors.phone = "Introduce un teléfono";
    }
    return errors;
}

export function save(formData) {
    return true;
}
