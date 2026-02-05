// VerificationStep.js - Coach Step 6: Competition & Certifications
import { COMPETITION_ROLES, CERTIFICATIONS } from '../../constants.js';

export function render(formData) {
    const competitionChips = COMPETITION_ROLES.map(role => `
        <button type="button" class="verify-chip ${formData.competitionRoles.includes(role) ? 'active' : ''}" data-value="${role}">
            ${role}
        </button>
    `).join('');

    const certificationChips = CERTIFICATIONS.map(cert => `
        <button type="button" class="verify-chip ${formData.certifications.includes(cert) ? 'active' : ''}" data-cert="${cert}">
            ${cert}
        </button>
    `).join('');

    return `
        <div class="onboarding-step step-content">
            <div class="step-inner">
                <div class="step-header">
                    <h1 class="step-title">Tu <span class="text-accent italic">verificación</span></h1>
                    <p class="step-subtitle">Consigue tu badge de coach verificado</p>
                </div>

                <div class="step-body">
                    <!-- Badge Preview -->
                    <div class="verify-badge-card">
                        <div class="badge-icon-glow">
                            <i data-lucide="badge-check"></i>
                        </div>
                        <div class="badge-info">
                            <span class="badge-title">Perfil Verificado</span>
                            <span class="badge-desc">Demuestra tu experiencia y accede a beneficios exclusivos</span>
                        </div>
                    </div>

                    <!-- Competition Section -->
                    <div class="form-section">
                        <div class="section-icon-row">
                            <div class="section-icon">
                                <i data-lucide="trophy"></i>
                            </div>
                            <div class="section-label">¿Has competido?</div>
                        </div>
                        
                        <div class="toggle-options">
                            <button type="button" id="competed-yes" class="toggle-option ${formData.hasCompeted === true ? 'active-yes' : ''}">Sí</button>
                            <button type="button" id="competed-no" class="toggle-option ${formData.hasCompeted === false ? 'active-no' : ''}">No</button>
                        </div>
                        <div class="field-error" id="competed-toggle-error" style="display:none;">
                            <i data-lucide="alert-circle"></i>
                            <span>Selecciona una opción</span>
                        </div>

                        <div id="competition-details" class="expandable-content ${formData.hasCompeted ? 'expanded' : ''}">
                            <div style="margin-top: 20px;">
                                <p class="field-hint" style="margin-bottom: 12px;">Categoría (opcional)</p>
                                <div class="chips-grid">
                                    ${competitionChips}
                                </div>
                                
                                <p class="field-hint" style="margin: 20px 0 12px;">Enlaces o descripción (opcional)</p>
                                <textarea id="onb-competitionProof" class="field-textarea" placeholder="Pega aquí tus rankings, reconocimientos, links de FEP, WPT...">${formData.competitionProof || ''}</textarea>
                                
                                <p class="field-hint" style="margin: 20px 0 12px;">Subir documentos (opcional)</p>
                                <div class="file-upload-zone" id="competition-upload">
                                    <input type="file" id="competition-files" multiple accept="image/*,.pdf" hidden>
                                    <div class="upload-content">
                                        <i data-lucide="upload-cloud"></i>
                                        <span class="upload-text">Arrastra archivos o haz clic</span>
                                        <span class="upload-hint">Imágenes o PDF (máx. 5MB)</span>
                                    </div>
                                </div>
                                <div id="competition-files-list" class="files-list"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Certifications Section -->
                    <div class="form-section">
                        <div class="section-icon-row">
                            <div class="section-icon">
                                <i data-lucide="graduation-cap"></i>
                            </div>
                            <div class="section-label">¿Tienes títulos oficiales?</div>
                        </div>
                        
                        <div class="toggle-options">
                            <button type="button" id="verification-yes" class="toggle-option ${formData.wantsVerification === true ? 'active-yes' : ''}">Sí</button>
                            <button type="button" id="verification-no" class="toggle-option ${formData.wantsVerification === false ? 'active-no' : ''}">No</button>
                        </div>
                        <div class="field-error" id="verification-toggle-error" style="display:none;">
                            <i data-lucide="alert-circle"></i>
                            <span>Selecciona una opción</span>
                        </div>

                        <div id="verification-details" class="expandable-content ${formData.wantsVerification ? 'expanded' : ''}">
                            <div style="margin-top: 20px;">
                                <p class="field-hint" style="margin-bottom: 12px;">Titulaciones a verificar (opcional)</p>
                                <div class="chips-grid">
                                    ${certificationChips}
                                </div>
                                
                                <p class="field-hint" style="margin: 20px 0 12px;">Subir títulos o certificados (opcional)</p>
                                <div class="file-upload-zone" id="certification-upload">
                                    <input type="file" id="certification-files" multiple accept="image/*,.pdf" hidden>
                                    <div class="upload-content">
                                        <i data-lucide="upload-cloud"></i>
                                        <span class="upload-text">Arrastra archivos o haz clic</span>
                                        <span class="upload-hint">Imágenes o PDF (máx. 5MB)</span>
                                    </div>
                                </div>
                                <div id="certification-files-list" class="files-list"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="step-footer">
                    <button type="button" id="onb-next-btn" class="btn-finish">
                        <i data-lucide="check-circle"></i>
                        <span>Finalizar registro</span>
                    </button>
                </div>
            </div>
        </div>
    `;
}

export function attach(formData, setFormData, rerender, nextStep) {
    if (window.lucide) window.lucide.createIcons();
    
    const nextBtn = document.getElementById('onb-next-btn');
    const competitionDetails = document.getElementById('competition-details');
    const verifDetails = document.getElementById('verification-details');

    // Error helpers
    const showError = (id, show) => {
        const el = document.getElementById(id);
        if (el) {
            el.style.display = show ? 'flex' : 'none';
            if (show && window.lucide) window.lucide.createIcons();
        }
    };

    const clearAllErrors = () => {
        showError('competed-toggle-error', false);
        showError('verification-toggle-error', false);
    };

    // Competition toggle
    document.getElementById('competed-yes')?.addEventListener('click', () => {
        formData.hasCompeted = true;
        setFormData(formData);
        document.getElementById('competed-yes').classList.add('active-yes');
        document.getElementById('competed-no').classList.remove('active-no');
        competitionDetails?.classList.add('expanded');
        showError('competed-toggle-error', false);
    });

    document.getElementById('competed-no')?.addEventListener('click', () => {
        formData.hasCompeted = false;
        formData.competitionRoles = [];
        formData.competitionProof = '';
        setFormData(formData);
        document.getElementById('competed-no').classList.add('active-no');
        document.getElementById('competed-yes').classList.remove('active-yes');
        competitionDetails?.classList.remove('expanded');
        showError('competed-toggle-error', false);
    });

    // Competition chips
    document.querySelectorAll('.verify-chip[data-value]').forEach(chip => {
        chip.onclick = () => {
            const value = chip.dataset.value;
            if (formData.competitionRoles.includes(value)) {
                formData.competitionRoles = formData.competitionRoles.filter(r => r !== value);
                chip.classList.remove('active');
            } else {
                formData.competitionRoles.push(value);
                chip.classList.add('active');
            }
            setFormData(formData);
        };
    });

    // Competition proof
    document.getElementById('onb-competitionProof')?.addEventListener('input', (e) => {
        formData.competitionProof = e.target.value;
        setFormData(formData);
    });

    // Verification toggle
    document.getElementById('verification-yes')?.addEventListener('click', () => {
        formData.wantsVerification = true;
        setFormData(formData);
        document.getElementById('verification-yes').classList.add('active-yes');
        document.getElementById('verification-no').classList.remove('active-no');
        verifDetails?.classList.add('expanded');
        showError('verification-toggle-error', false);
    });

    document.getElementById('verification-no')?.addEventListener('click', () => {
        formData.wantsVerification = false;
        formData.certifications = [];
        setFormData(formData);
        document.getElementById('verification-no').classList.add('active-no');
        document.getElementById('verification-yes').classList.remove('active-yes');
        verifDetails?.classList.remove('expanded');
        showError('verification-toggle-error', false);
    });

    // Certification chips
    document.querySelectorAll('.verify-chip[data-cert]').forEach(chip => {
        chip.onclick = () => {
            const cert = chip.dataset.cert;
            if (formData.certifications.includes(cert)) {
                formData.certifications = formData.certifications.filter(c => c !== cert);
                chip.classList.remove('active');
            } else {
                formData.certifications.push(cert);
                chip.classList.add('active');
            }
            setFormData(formData);
        };
    });

    // File upload helper
    const setupFileUpload = (zoneId, inputId, listId, filesKey) => {
        const zone = document.getElementById(zoneId);
        const input = document.getElementById(inputId);
        const list = document.getElementById(listId);
        
        if (!zone || !input || !list) return;
        
        // Initialize files array if needed
        if (!formData[filesKey]) formData[filesKey] = [];
        
        const renderFilesList = () => {
            list.innerHTML = formData[filesKey].map((file, idx) => `
                <div class="file-item">
                    <i data-lucide="file-text"></i>
                    <span class="file-name">${file.name}</span>
                    <button type="button" class="file-remove" data-idx="${idx}">
                        <i data-lucide="x"></i>
                    </button>
                </div>
            `).join('');
            
            if (window.lucide) window.lucide.createIcons();
            
            list.querySelectorAll('.file-remove').forEach(btn => {
                btn.onclick = () => {
                    const idx = parseInt(btn.dataset.idx);
                    formData[filesKey].splice(idx, 1);
                    setFormData(formData);
                    renderFilesList();
                };
            });
        };
        
        zone.onclick = () => input.click();
        
        input.onchange = (e) => {
            const newFiles = Array.from(e.target.files);
            formData[filesKey] = [...formData[filesKey], ...newFiles];
            setFormData(formData);
            renderFilesList();
            input.value = '';
        };
        
        // Drag and drop
        zone.ondragover = (e) => {
            e.preventDefault();
            zone.classList.add('dragover');
        };
        zone.ondragleave = () => zone.classList.remove('dragover');
        zone.ondrop = (e) => {
            e.preventDefault();
            zone.classList.remove('dragover');
            const newFiles = Array.from(e.dataTransfer.files);
            formData[filesKey] = [...formData[filesKey], ...newFiles];
            setFormData(formData);
            renderFilesList();
        };
        
        renderFilesList();
    };
    
    // Setup file uploads
    setupFileUpload('competition-upload', 'competition-files', 'competition-files-list', 'competitionFiles');
    setupFileUpload('certification-upload', 'certification-files', 'certification-files-list', 'certificationFiles');

    // Next button with validation
    if (nextBtn) {
        nextBtn.onclick = () => {
            clearAllErrors();
            let isValid = true;

            // Validate competition toggle answered
            if (formData.hasCompeted === undefined || formData.hasCompeted === null) {
                showError('competed-toggle-error', true);
                isValid = false;
            }

            // Validate verification toggle answered
            if (formData.wantsVerification === undefined || formData.wantsVerification === null) {
                showError('verification-toggle-error', true);
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
    if (formData.hasCompeted) {
        if (formData.competitionRoles.length === 0) errors.competitionRoles = "Selecciona al menos uno";
        if (!formData.competitionProof.trim() && formData.competitionFiles.length === 0) {
            errors.competitionProof = "Proporciona pruebas";
        }
    }
    if (formData.wantsVerification) {
        if (formData.certifications.length === 0 && formData.certificationFiles.length === 0) {
            errors.certifications = "Selecciona títulos";
        }
    }
    return errors;
}

export function save(formData) {
    return true;
}
