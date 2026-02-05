// ClassesStep.js - Club Step 5: Classes
const CLASS_PRICE_RANGES = ['< 15 €', '15 € – 25 €', '25 € – 35 €', '35 € – 50 €', '50 € +'];
const STUDENTS_RANGES = ['< 20', '20 – 50', '50 – 100', '100 – 200', '200 +'];
const CLASSES_RANGES = ['< 10', '10 – 25', '25 – 50', '50 – 100', '100 +'];

export function render(formData) {
    return `
        <div class="onboarding-step step-content">
            <div class="step-inner">
                <div class="step-header">
                    <h1 class="step-title">Tus <span class="text-accent italic">clases</span></h1>
                    <p class="step-subtitle">Información sobre clases de pádel</p>
                </div>

                <div class="step-body">
                    <div class="form-section">
                        <div class="section-icon-row">
                            <div class="section-icon">
                                <i data-lucide="graduation-cap"></i>
                            </div>
                            <div class="section-label">¿Ofrecéis clases de pádel?</div>
                        </div>
                        <div class="toggle-options">
                            <button type="button" id="classes-yes" class="toggle-option ${formData.offersClasses === true ? 'active-yes' : ''}">Sí</button>
                            <button type="button" id="classes-no" class="toggle-option ${formData.offersClasses === false ? 'active-no' : ''}">No</button>
                        </div>
                        <div class="field-error" id="classes-toggle-error" style="display:none;">
                            <i data-lucide="alert-circle"></i>
                            <span>Selecciona una opción</span>
                        </div>

                        <div id="classes-details" class="expandable-content ${formData.offersClasses ? 'expanded' : ''}">
                            <div style="margin-top: 20px;">
                                <div class="form-section" style="margin-bottom: 24px;">
                                    <div class="section-icon-row">
                                        <div class="section-icon">
                                            <i data-lucide="euro"></i>
                                        </div>
                                        <div class="section-label">Precio medio por clase</div>
                                    </div>
                                    <div class="select-wrapper">
                                        <select id="class-price-select" class="field-select">
                                            <option value="">Selecciona un rango de precios</option>
                                            ${CLASS_PRICE_RANGES.map(price => `
                                                <option value="${price}" ${formData.classPriceRange === price ? 'selected' : ''}>${price}</option>
                                            `).join('')}
                                        </select>
                                    </div>
                                    <div class="field-error" id="class-price-error" style="display:none;">
                                        <i data-lucide="alert-circle"></i>
                                        <span>Selecciona un rango de precios</span>
                                    </div>
                                </div>

                                <div class="form-section" style="margin-bottom: 24px;">
                                    <div class="section-icon-row">
                                        <div class="section-icon">
                                            <i data-lucide="users"></i>
                                        </div>
                                        <div class="section-label">Alumnos estimados / semana</div>
                                    </div>
                                    <div class="select-wrapper">
                                        <select id="students-select" class="field-select">
                                            <option value="">Selecciona un rango</option>
                                            ${STUDENTS_RANGES.map(range => `
                                                <option value="${range}" ${formData.estimatedStudents === range ? 'selected' : ''}>${range}</option>
                                            `).join('')}
                                        </select>
                                    </div>
                                    <div class="field-error" id="students-error" style="display:none;">
                                        <i data-lucide="alert-circle"></i>
                                        <span>Selecciona un rango</span>
                                    </div>
                                </div>

                                <div class="form-section">
                                    <div class="section-icon-row">
                                        <div class="section-icon">
                                            <i data-lucide="calendar"></i>
                                        </div>
                                        <div class="section-label">Clases estimadas / semana</div>
                                    </div>
                                    <div class="select-wrapper">
                                        <select id="classes-count-select" class="field-select">
                                            <option value="">Selecciona un rango</option>
                                            ${CLASSES_RANGES.map(range => `
                                                <option value="${range}" ${formData.estimatedClasses === range ? 'selected' : ''}>${range}</option>
                                            `).join('')}
                                        </select>
                                    </div>
                                    <div class="field-error" id="classes-count-error" style="display:none;">
                                        <i data-lucide="alert-circle"></i>
                                        <span>Selecciona un rango</span>
                                    </div>
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

    const classesDetails = document.getElementById('classes-details');
    const nextBtn = document.getElementById('onb-next-btn');

    const showError = (id, show) => {
        const el = document.getElementById(id);
        if (el) {
            el.style.display = show ? 'flex' : 'none';
            if (show && window.lucide) window.lucide.createIcons();
        }
    };

    const clearAllErrors = () => {
        showError('classes-toggle-error', false);
        showError('class-price-error', false);
        showError('students-error', false);
        showError('classes-count-error', false);
    };

    // Classes toggle
    document.getElementById('classes-yes')?.addEventListener('click', () => {
        formData.offersClasses = true;
        setFormData(formData);
        document.getElementById('classes-yes').classList.add('active-yes');
        document.getElementById('classes-no').classList.remove('active-no');
        classesDetails?.classList.add('expanded');
        showError('classes-toggle-error', false);
    });

    document.getElementById('classes-no')?.addEventListener('click', () => {
        formData.offersClasses = false;
        formData.classPriceRange = null;
        formData.estimatedStudents = null;
        formData.estimatedClasses = null;
        setFormData(formData);
        document.getElementById('classes-no').classList.add('active-no');
        document.getElementById('classes-yes').classList.remove('active-yes');
        classesDetails?.classList.remove('expanded');
        clearAllErrors();
    });

    // Class price select
    const classPriceSelect = document.getElementById('class-price-select');
    if (classPriceSelect) {
        classPriceSelect.addEventListener('change', (e) => {
            formData.classPriceRange = e.target.value;
            setFormData(formData);
            showError('class-price-error', false);
        });
    }

    // Students select
    const studentsSelect = document.getElementById('students-select');
    if (studentsSelect) {
        studentsSelect.addEventListener('change', (e) => {
            formData.estimatedStudents = e.target.value;
            setFormData(formData);
            showError('students-error', false);
        });
    }

    // Classes count select
    const classesCountSelect = document.getElementById('classes-count-select');
    if (classesCountSelect) {
        classesCountSelect.addEventListener('change', (e) => {
            formData.estimatedClasses = e.target.value;
            setFormData(formData);
            showError('classes-count-error', false);
        });
    }

    if (nextBtn) {
        nextBtn.onclick = () => {
            clearAllErrors();
            let isValid = true;

            if (formData.offersClasses === undefined || formData.offersClasses === null) {
                showError('classes-toggle-error', true);
                isValid = false;
            } else if (formData.offersClasses === true) {
                if (!formData.classPriceRange) {
                    showError('class-price-error', true);
                    isValid = false;
                }
                if (!formData.estimatedStudents) {
                    showError('students-error', true);
                    isValid = false;
                }
                if (!formData.estimatedClasses) {
                    showError('classes-count-error', true);
                    isValid = false;
                }
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
    if (formData.offersClasses === undefined) errors.offersClasses = "Selecciona una opción";
    if (formData.offersClasses) {
        if (!formData.classPriceRange) errors.classPriceRange = "Selecciona un rango de precios";
        if (!formData.estimatedStudents) errors.estimatedStudents = "Selecciona un rango";
        if (!formData.estimatedClasses) errors.estimatedClasses = "Selecciona un rango";
    }
    return errors;
}

export function save(formData) {
    return true;
}
