// SuccessStep.js - Final success screen after onboarding
export function render(formData) {
    return `
        <div class="onboarding-step step-content">
            <div class="step-inner">
                <div class="success-container">
                    <div class="success-icon-wrapper">
                        <div class="success-icon">
                            <i data-lucide="check" class="success-check"></i>
                        </div>
                        <div class="success-rings"></div>
                    </div>
                    
                    <h1 class="success-title">
                        ¡Perfil <span class="text-accent">completado</span>!
                    </h1>
                    
                    <p class="success-message">
                        Tu perfil de entrenador está listo. Ya puedes empezar a recibir solicitudes de alumnos en tu zona.
                    </p>
                    
                    <div class="success-stats">
                        <div class="stat-item">
                            <i data-lucide="map-pin"></i>
                            <span>${formData.city || 'Tu zona'}</span>
                        </div>
                        <div class="stat-item">
                            <i data-lucide="languages"></i>
                            <span>${(formData.languages?.length || 0) + (formData.customLanguages?.length || 0)} idiomas</span>
                        </div>
                        <div class="stat-item">
                            <i data-lucide="clock"></i>
                            <span>${formData.yearsExperience || '?'} años exp.</span>
                        </div>
                        <div class="stat-item">
                            <i data-lucide="euro"></i>
                            <span>${formData.pricePerHour || '?'}€/hora</span>
                        </div>
                    </div>
                    
                    <button type="button" id="go-dashboard" class="btn-continue" style="margin-top: 40px;">
                        <span>Empezar a usar Padeliner</span>
                        <i data-lucide="arrow-right"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

export function attach(formData, setFormData, rerender, onComplete) {
    if (window.lucide) window.lucide.createIcons();
    
    document.getElementById('go-dashboard')?.addEventListener('click', () => {
        onComplete(formData);
    });
}
