// VerificationStep.js - Club Step 8: Verification
export function render(formData) {
    return `
        <div class="onboarding-step step-content">
            <div class="step-inner">
                <div class="step-header">
                    <h1 class="step-title">Tu <span class="text-accent italic">verificación</span></h1>
                    <p class="step-subtitle">Consigue el badge de club verificado</p>
                </div>

                <div class="step-body">
                    <!-- Badge Preview -->
                    <div class="verify-badge-card">
                        <div class="badge-icon-glow">
                            <i data-lucide="badge-check"></i>
                        </div>
                        <div class="badge-info">
                            <span class="badge-title">Club Verificado</span>
                            <span class="badge-desc">Genera confianza y accede a beneficios exclusivos</span>
                        </div>
                    </div>

                    <div class="form-section">
                        <div class="section-icon-row">
                            <div class="section-icon">
                                <i data-lucide="shield-check"></i>
                            </div>
                            <div class="section-label">¿Quieres verificar tu club en Padeliner?</div>
                        </div>
                        
                        <div class="toggle-options">
                            <button type="button" id="verify-yes" class="toggle-option ${formData.wantsVerification === true ? 'active-yes' : ''}">Sí</button>
                            <button type="button" id="verify-no" class="toggle-option ${formData.wantsVerification === false ? 'active-no' : ''}">No</button>
                        </div>
                        <div class="field-error" id="verify-toggle-error" style="display:none;">
                            <i data-lucide="alert-circle"></i>
                            <span>Selecciona una opción</span>
                        </div>

                        <div id="verify-details" class="expandable-content ${formData.wantsVerification ? 'expanded' : ''}">
                            <div style="margin-top: 20px;">
                                <p class="field-hint" style="margin-bottom: 12px;">Subir documento acreditativo (opcional)</p>
                                <p class="field-hint" style="margin-bottom: 16px; font-size: 12px;">Licencia, Federación, CIF u otro documento oficial</p>
                                
                                <div class="file-upload-zone" id="verification-upload">
                                    <input type="file" id="verification-files" multiple accept="image/*,.pdf" hidden>
                                    <div class="upload-content">
                                        <i data-lucide="upload-cloud"></i>
                                        <span class="upload-text">Arrastra archivos o haz clic</span>
                                        <span class="upload-hint">Imágenes o PDF (máx. 5MB)</span>
                                    </div>
                                </div>
                                <div id="verification-files-list" class="files-list"></div>
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
    
    if (!formData.verificationFiles) formData.verificationFiles = [];
    
    const verifyDetails = document.getElementById('verify-details');
    const nextBtn = document.getElementById('onb-next-btn');

    const showError = (id, show) => {
        const el = document.getElementById(id);
        if (el) {
            el.style.display = show ? 'flex' : 'none';
            if (show && window.lucide) window.lucide.createIcons();
        }
    };

    // Verification toggle
    document.getElementById('verify-yes')?.addEventListener('click', () => {
        formData.wantsVerification = true;
        setFormData(formData);
        document.getElementById('verify-yes').classList.add('active-yes');
        document.getElementById('verify-no').classList.remove('active-no');
        verifyDetails?.classList.add('expanded');
        showError('verify-toggle-error', false);
    });

    document.getElementById('verify-no')?.addEventListener('click', () => {
        formData.wantsVerification = false;
        formData.verificationFiles = [];
        setFormData(formData);
        document.getElementById('verify-no').classList.add('active-no');
        document.getElementById('verify-yes').classList.remove('active-yes');
        verifyDetails?.classList.remove('expanded');
        showError('verify-toggle-error', false);
    });

    // File upload
    const setupFileUpload = () => {
        const zone = document.getElementById('verification-upload');
        const input = document.getElementById('verification-files');
        const list = document.getElementById('verification-files-list');
        
        if (!zone || !input || !list) return;
        
        const renderFilesList = () => {
            list.innerHTML = formData.verificationFiles.map((file, idx) => `
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
                    formData.verificationFiles.splice(idx, 1);
                    setFormData(formData);
                    renderFilesList();
                };
            });
        };
        
        zone.onclick = () => input.click();
        
        input.onchange = (e) => {
            const newFiles = Array.from(e.target.files);
            formData.verificationFiles = [...formData.verificationFiles, ...newFiles];
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
            formData.verificationFiles = [...formData.verificationFiles, ...newFiles];
            setFormData(formData);
            renderFilesList();
        };
        
        renderFilesList();
    };
    
    setupFileUpload();

    if (nextBtn) {
        nextBtn.onclick = () => {
            showError('verify-toggle-error', false);
            let isValid = true;

            if (formData.wantsVerification === undefined || formData.wantsVerification === null) {
                showError('verify-toggle-error', true);
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
    if (formData.wantsVerification === undefined) {
        errors.wantsVerification = "Selecciona una opción";
    }
    return errors;
}

export function save(formData) {
    return true;
}
