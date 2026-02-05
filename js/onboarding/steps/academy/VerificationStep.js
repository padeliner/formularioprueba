// VerificationStep.js - Academy Step 8: Verification (Optional)
export function render(formData) {
    return `
        <div class="onboarding-step step-content">
            <div class="step-inner">
                <div class="step-header">
                    <h1 class="step-title">Tu <span class="text-accent italic">verificación</span></h1>
                    <p class="step-subtitle">Acredita tu academia (opcional)</p>
                </div>

                <div class="step-body">
                    <div class="form-section">
                        <div class="section-icon-row">
                            <div class="section-icon">
                                <i data-lucide="badge-check"></i>
                            </div>
                            <div class="section-label">¿Quieres verificar tu academia?</div>
                        </div>
                        <p class="field-hint" style="margin-bottom: 12px;">La verificación aumenta la confianza de los alumnos</p>
                        <div class="toggle-options">
                            <button type="button" id="verify-yes" class="toggle-option ${formData.wantsVerification === true ? 'active-yes' : ''}">Sí</button>
                            <button type="button" id="verify-no" class="toggle-option ${formData.wantsVerification === false ? 'active-no' : ''}">No</button>
                        </div>

                        <div id="verify-details" class="expandable-content ${formData.wantsVerification ? 'expanded' : ''}">
                            <div style="margin-top: 20px;">
                                <p class="field-hint" style="margin-bottom: 12px;">Sube un documento acreditativo (PDF o foto)</p>
                                <div class="upload-zone" id="upload-zone">
                                    <input type="file" id="onb-document" accept=".pdf,.jpg,.jpeg,.png" style="display: none;">
                                    <div class="upload-content">
                                        <i data-lucide="upload-cloud" class="upload-icon"></i>
                                        <span id="upload-text">${formData.documentName || 'Haz clic o arrastra un archivo'}</span>
                                    </div>
                                </div>
                                <div class="field-error" id="document-error" style="display:none;">
                                    <i data-lucide="alert-circle"></i>
                                    <span>Sube un documento</span>
                                </div>
                            </div>
                        </div>
                    </div>

                <div class="step-footer">
                    <button type="button" id="onb-next-btn" class="btn-continue">
                        <span>Finalizar</span>
                        <i data-lucide="check"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

export function attach(formData, setFormData, rerender, nextStep) {
    if (window.lucide) window.lucide.createIcons();

    const nextBtn = document.getElementById('onb-next-btn');
    const verifyDetails = document.getElementById('verify-details');
    const uploadZone = document.getElementById('upload-zone');
    const fileInput = document.getElementById('onb-document');
    const uploadText = document.getElementById('upload-text');

    const showError = (id, show) => {
        const el = document.getElementById(id);
        if (el) {
            el.style.display = show ? 'flex' : 'none';
            if (show && window.lucide) window.lucide.createIcons();
        }
    };

    document.getElementById('verify-yes')?.addEventListener('click', () => {
        formData.wantsVerification = true;
        setFormData(formData);
        document.getElementById('verify-yes').classList.add('active-yes');
        document.getElementById('verify-no').classList.remove('active-no');
        verifyDetails?.classList.add('expanded');
    });

    document.getElementById('verify-no')?.addEventListener('click', () => {
        formData.wantsVerification = false;
        formData.documentName = '';
        formData.documentFile = null;
        setFormData(formData);
        document.getElementById('verify-no').classList.add('active-no');
        document.getElementById('verify-yes').classList.remove('active-yes');
        verifyDetails?.classList.remove('expanded');
        showError('document-error', false);
    });

    uploadZone?.addEventListener('click', () => fileInput?.click());

    uploadZone?.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.classList.add('dragover');
    });

    uploadZone?.addEventListener('dragleave', () => {
        uploadZone.classList.remove('dragover');
    });

    uploadZone?.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    });

    fileInput?.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) handleFile(file);
    });

    function handleFile(file) {
        const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
        if (!validTypes.includes(file.type)) {
            showError('document-error', true);
            return;
        }
        formData.documentName = file.name;
        formData.documentFile = file;
        setFormData(formData);
        if (uploadText) uploadText.textContent = file.name;
        uploadZone?.classList.add('has-file');
        showError('document-error', false);
    }

    if (nextBtn) {
        nextBtn.onclick = () => {
            showError('document-error', false);

            if (formData.wantsVerification === true && !formData.documentFile) {
                showError('document-error', true);
                const firstError = document.querySelector('.field-error[style*="flex"]');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                return;
            }

            nextStep();
        };
    }
}

export function validate(formData) {
    const errors = {};
    if (formData.wantsVerification && !formData.documentFile) {
        errors.documentFile = "Sube un documento";
    }
    return errors;
}

export function save(formData) {
    return true;
}
