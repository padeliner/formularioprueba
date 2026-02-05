// MarketingStep.js - Academy Step 8: Marketing (Founder Status)
export function render(formData) {
    return `
        <div class="onboarding-step step-content">
            <div class="step-inner">
                <div class="step-header">
                    <h1 class="step-title">Tu <span class="text-accent italic">visibilidad</span></h1>
                    <p class="step-subtitle">Presencia digital</p>
                </div>

                <div class="step-body">
                    <div class="form-section">
                        <div class="section-icon-row">
                            <div class="section-icon" style="background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);">
                                <i data-lucide="instagram" style="color: white;"></i>
                            </div>
                            <div class="section-label">Presencia Digital</div>
                        </div>
                        <div class="input-field">
                            <input 
                                type="text" 
                                id="onb-instagram" 
                                class="field-input"
                                placeholder="@tu_academia o web"
                                value="${formData.instagram || ''}"
                                autocomplete="off"
                            >
                            <i data-lucide="at-sign" class="field-icon"></i>
                        </div>
                        <p class="field-hint">Opcional - Se mostrará en tu perfil público</p>
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

    document.getElementById('onb-instagram')?.addEventListener('input', (e) => {
        formData.instagram = e.target.value;
        setFormData(formData);
    });

    if (nextBtn) {
        nextBtn.onclick = () => {
            nextStep();
        };
    }
}

export function validate(formData) {
    return {};
}

export function save(formData) {
    return true;
}
