// ProfileStep.js - Coach Step 4: Dedication, Experience, Superpowers
import { DEDICATION_OPTS, EXPERIENCE_OPTS, SUPERPOWERS } from '../../constants.js';

const DEDICATION_ICONS = {
    '100% Pádel': 'target',
    'Estudiante': 'graduation-cap',
    'Tengo otro trabajo': 'briefcase'
};

const SUPERPOWER_ICONS = {
    'Técnica (Golpes)': 'crosshair',
    'Táctica (Juego)': 'puzzle',
    'Físico (Potencia)': 'dumbbell',
    'Mental (Competición)': 'brain',
    'Social (Dinamización)': 'users'
};

export function render(formData) {
    const dedicationCards = DEDICATION_OPTS.map(opt => `
        <button type="button" class="dedication-card ${formData.dedication === opt ? 'active' : ''}" data-value="${opt}">
            <i data-lucide="${DEDICATION_ICONS[opt] || 'circle'}"></i>
            <span>${opt}</span>
        </button>
    `).join('');


    const superpowerCards = SUPERPOWERS.map(p => `
        <button type="button" class="superpower-card ${formData.superpowers.includes(p) ? 'active' : ''}" data-value="${p}">
            <i data-lucide="${SUPERPOWER_ICONS[p] || 'star'}"></i>
            <span>${p.split(' ')[0]}</span>
        </button>
    `).join('');

    return `
        <div class="onboarding-step step-content">
            <div class="step-inner">
                <div class="step-header">
                    <h1 class="step-title">Tu <span class="text-accent italic">experiencia</span></h1>
                    <p class="step-subtitle">Cuéntanos más sobre ti como entrenador</p>
                </div>

                <div class="step-body">
                    <!-- Dedication -->
                    <div class="form-section">
                        <div class="section-icon-row">
                            <div class="section-icon">
                                <i data-lucide="heart"></i>
                            </div>
                            <div class="section-label">Tu dedicación al pádel</div>
                        </div>
                        <div class="dedication-grid">
                            ${dedicationCards}
                        </div>
                        <div class="field-error" id="dedication-error" style="display:none;">
                            <i data-lucide="alert-circle"></i>
                            <span>Selecciona tu dedicación</span>
                        </div>
                    </div>

                    <!-- Experience -->
                    <div class="form-section">
                        <div class="section-icon-row">
                            <div class="section-icon">
                                <i data-lucide="clock"></i>
                            </div>
                            <div class="section-label">Años de experiencia</div>
                        </div>
                        
                        <div class="select-wrapper">
                            <select id="experience-select" class="field-select">
                                <option value="">Selecciona tus años de experiencia</option>
                                ${EXPERIENCE_OPTS.map(o => `
                                    <option value="${o.value}" ${formData.yearsExperience === o.value ? 'selected' : ''}>${o.label}</option>
                                `).join('')}
                            </select>
                        </div>
                        
                        <div class="field-error" id="experience-error" style="display:none;">
                            <i data-lucide="alert-circle"></i>
                            <span>Selecciona tus años de experiencia</span>
                        </div>
                    </div>

                    <!-- Superpowers -->
                    <div class="form-section">
                        <div class="section-icon-row">
                            <div class="section-icon">
                                <i data-lucide="zap"></i>
                            </div>
                            <div class="section-label">
                                Tu diferencial
                                ${formData.superpowers.length > 0 ? `<span class="count-badge">${formData.superpowers.length}</span>` : ''}
                            </div>
                        </div>
                        <div class="superpowers-grid">
                            ${superpowerCards}
                        </div>
                        <p class="field-hint" style="text-align: center; margin-top: 12px;">Selecciona lo que te hace único</p>
                        <div class="field-error" id="superpowers-error" style="display:none;">
                            <i data-lucide="alert-circle"></i>
                            <span>Selecciona al menos un diferencial</span>
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

    // Error helpers
    const showError = (id, show) => {
        const el = document.getElementById(id);
        if (el) {
            el.style.display = show ? 'flex' : 'none';
            if (show && window.lucide) window.lucide.createIcons();
        }
    };

    const clearAllErrors = () => {
        showError('dedication-error', false);
        showError('experience-error', false);
        showError('superpowers-error', false);
    };

    // Dedication cards
    document.querySelectorAll('.dedication-card').forEach(card => {
        card.onclick = () => {
            formData.dedication = card.dataset.value;
            setFormData(formData);
            document.querySelectorAll('.dedication-card').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            showError('dedication-error', false);
        };
    });

    // Experience dropdown
    const experienceSelect = document.getElementById('experience-select');
    if (experienceSelect) {
        experienceSelect.onchange = (e) => {
            formData.yearsExperience = e.target.value || null;
            setFormData(formData);
            if (e.target.value) {
                showError('experience-error', false);
            }
        };
        // Initialize icons after render
        if (window.lucide) window.lucide.createIcons();
    }

    // Superpower cards
    document.querySelectorAll('.superpower-card').forEach(card => {
        card.onclick = () => {
            const p = card.dataset.value;
            if (formData.superpowers.includes(p)) {
                formData.superpowers = formData.superpowers.filter(x => x !== p);
                card.classList.remove('active');
            } else {
                formData.superpowers.push(p);
                card.classList.add('active');
            }
            setFormData(formData);

            // Update badge
            const badge = document.querySelector('.section-label .count-badge');
            if (formData.superpowers.length > 0) {
                if (badge) badge.textContent = formData.superpowers.length;
                showError('superpowers-error', false);
            }
        };
    });

    // Next button with validation
    if (nextBtn) {
        nextBtn.onclick = () => {
            clearAllErrors();
            let isValid = true;

            // Validate dedication
            if (!formData.dedication) {
                showError('dedication-error', true);
                isValid = false;
            }

            // Validate experience
            if (!formData.yearsExperience) {
                showError('experience-error', true);
                isValid = false;
            }

            // Validate superpowers
            if (!formData.superpowers || formData.superpowers.length === 0) {
                showError('superpowers-error', true);
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
    if (!formData.dedication) errors.dedication = "Campo obligatorio";
    if (formData.superpowers.length === 0) errors.superpowers = "Selecciona al menos uno";
    return errors;
}

export function save(formData) {
    return true;
}
