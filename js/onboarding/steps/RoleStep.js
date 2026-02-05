// RoleStep.js - Step 0: Role Selection
import { ROLES } from '../constants.js';

export function render(formData) {
    const rolesHtml = ROLES.map(role => `
        <button type="button" class="onb-role-card ${formData.role === role.id ? 'active' : ''}" data-role="${role.id}">
            <div class="role-icon-box">
                <i data-lucide="${role.icon}"></i>
            </div>
            <div class="role-content">
                <h3 class="role-title">${role.label}</h3>
                <p class="role-desc">${role.desc}</p>
            </div>
        </button>
    `).join('');

    return `
        <div class="onboarding-step standard-step-container">
            <div class="role-step-width">
                <div class="onb-header mb-12">
                    <h1 class="onb-title">
                        ELIGE TU <br><span class="text-accent">PERFIL</span>
                    </h1>
                    <p class="onb-subtitle">PERSONALIZAREMOS TU EXPERIENCIA SEGÚN TU ROL.</p>
                </div>
                <div class="grid-2-cols">
                    ${rolesHtml}
                </div>
            </div>
        </div>
    `;
}

export function attach(formData, setFormData, rerender, nextStep) {
    if (window.lucide) window.lucide.createIcons();
    
    const roleCards = document.querySelectorAll('.onb-role-card');

    roleCards.forEach(card => {
        card.onclick = () => {
            const role = card.dataset.role;

            // Visual feedback
            roleCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');

            formData.role = role;
            setFormData({ ...formData });
            nextStep();
        };
    });
}

export function validate(formData) {
    const errors = {};
    if (!formData.role) {
        errors.role = "Selecciona un rol";
    }
    return errors;
}

export function save(formData) {
    // Guardado deshabilitado - solo estética
    return true;
}
