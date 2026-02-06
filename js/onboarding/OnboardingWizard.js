// OnboardingWizard.js - Main controller for onboarding flow
import { DEFAULT_FORM_DATA } from './constants.js';

// Import steps
import * as GoogleStep from './steps/GoogleStep.js';
import * as RoleStep from './steps/RoleStep.js';
import * as SuccessStep from './steps/SuccessStep.js';

// Coach steps
import * as CoachLocationStep from './steps/coach/LocationStep.js';
import * as CoachClubStep from './steps/coach/ClubStep.js';
import * as CoachAvailabilityStep from './steps/coach/AvailabilityStep.js';
import * as CoachProfileStep from './steps/coach/ProfileStep.js';
import * as CoachMarketingStep from './steps/coach/MarketingStep.js';
import * as CoachVerificationStep from './steps/coach/VerificationStep.js';

// Club steps
import * as ClubIdentityStep from './steps/club/IdentityStep.js';
import * as ClubLocationStep from './steps/club/LocationStep.js';
import * as ClubFacilitiesStep from './steps/club/FacilitiesStep.js';
import * as ClubClassesStep from './steps/club/ClassesStep.js';
import * as ClubBookingsStep from './steps/club/BookingsStep.js';
import * as ClubCommunityStep from './steps/club/CommunityStep.js';
import * as ClubMarketingStep from './steps/club/MarketingStep.js';
import * as ClubVerificationStep from './steps/club/VerificationStep.js';

// Academy steps
import * as AcademyIdentityStep from './steps/academy/IdentityStep.js';
import * as AcademyLocationStep from './steps/academy/LocationStep.js';
import * as AcademyContactStep from './steps/academy/ContactStep.js';
import * as AcademyModelStep from './steps/academy/ModelStep.js';
import * as AcademyTeamStep from './steps/academy/TeamStep.js';
import * as AcademyServicesStep from './steps/academy/ServicesStep.js';
import * as AcademyOperationsStep from './steps/academy/OperationsStep.js';
import * as AcademyMarketingStep from './steps/academy/MarketingStep.js';
import * as AcademyVerificationStep from './steps/academy/VerificationStep.js';

// Commercial steps
import * as ComercialProfileStep from './steps/comercial/ProfileStep.js';


export class OnboardingWizard {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error('[OnboardingWizard]: Container not found!', containerId);
            return;
        }

        this.onComplete = options.onComplete || (() => { });
        this.isGoogleFlow = options.isGoogleFlow || false;

        // Step: -1 = Google, 0 = Role, 1-5 = Coach steps, 6 = Success
        this.step = this.isGoogleFlow ? -1 : 0;
        this.formData = { ...DEFAULT_FORM_DATA, ...options.initialData };
        this.isSuccess = false;

        // Navigation lock to prevent double triggers
        this.isNavigating = false;

        // Header scroll behavior
        this.lastScrollY = 0;
        this.scrollThreshold = 10;
        this.header = document.querySelector('header');

        this.init();
    }

    init() {
        this.render();
        this.setupHeaderScroll();
    }

    setupHeaderScroll() {
        if (!this.header) this.header = document.querySelector('header');
        if (!this.header) return;

        // Handle header transparency and hide/show on scroll inside the container
        this.container.addEventListener('scroll', () => {
            const currentScrollY = this.container.scrollTop;

            // 1. Transparency at top
            if (currentScrollY < 30) {
                this.header.classList.remove('scrolled');
            } else {
                this.header.classList.add('scrolled');
            }

            // 2. Hide on scroll down, Show on scroll up
            if (Math.abs(currentScrollY - this.lastScrollY) > this.scrollThreshold) {
                if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
                    this.header.classList.add('header-hidden');
                } else {
                    this.header.classList.remove('header-hidden');
                }
                this.lastScrollY = currentScrollY;
            }
        }, { passive: true });
    }

    setFormData(newData) {
        this.formData = newData;
    }

    async nextStep() {
        // Prevent double execution / rapid firing
        if (this.isNavigating) return;
        this.isNavigating = true;

        try {
            this.step++;

            // Check if we've finished
            // Safety guard: Step 0 is NEVER the end.
            if (this.step > this.getMaxStep() && this.step > 0) {
                this.isSuccess = true;
            }

            this.render();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } finally {
            // Release lock after a long delay to prevent bounced clicks
            setTimeout(() => {
                this.isNavigating = false;
            }, 1000);
        }
    }

    prevStep() {
        if (this.isNavigating) return;
        this.step--;
        this.render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    getMaxStep() {
        // For coach: 6 steps after role selection (0..6)
        if (this.formData.role === 'Entrenador') return 6;
        // For club: 8 steps after role selection (0..8)
        if (this.formData.role === 'Club') return 8;
        // For academy: 9 steps after role selection (0..9)
        if (this.formData.role === 'Academia') return 9;
        // For commercial: 1 step after role selection (0..1)
        if (this.formData.role === 'Comercial') return 1;
        // Default: just role selection
        return 0;
    }


    getCurrentStep() {
        if (this.isSuccess) return SuccessStep;
        if (this.step === -1) return GoogleStep;
        if (this.step === 0) return RoleStep;

        // Coach steps
        if (this.formData.role === 'Entrenador') {
            switch (this.step) {
                case 1: return CoachProfileStep;
                case 2: return CoachLocationStep;
                case 3: return CoachClubStep;
                case 4: return CoachAvailabilityStep;
                case 5: return CoachMarketingStep;
                case 6: return CoachVerificationStep;
            }
        }

        // Club steps
        if (this.formData.role === 'Club') {
            switch (this.step) {
                case 1: return ClubIdentityStep; // Identity merged with Contact
                case 2: return ClubLocationStep;
                case 3: return ClubFacilitiesStep;
                case 4: return ClubBookingsStep;
                case 5: return ClubClassesStep;
                case 6: return ClubCommunityStep;
                case 7: return ClubMarketingStep;
                case 8: return ClubVerificationStep;
            }
        }

        // Academy steps
        if (this.formData.role === 'Academia') {
            switch (this.step) {
                case 1: return AcademyIdentityStep;
                case 2: return AcademyLocationStep;
                case 3: return AcademyContactStep;
                case 4: return AcademyModelStep;
                case 5: return AcademyTeamStep;
                case 6: return AcademyServicesStep;
                case 7: return AcademyOperationsStep;
                case 8: return AcademyMarketingStep;
                case 9: return AcademyVerificationStep;
            }
        }

        // Commercial steps
        if (this.formData.role === 'Comercial') {
            switch (this.step) {
                case 1: return ComercialProfileStep;
            }
        }

        // Fallback
        return RoleStep;
    }


    getOptionsForStep() {
        return {};
    }

    getStepInfo() {
        // Coach step names
        if (this.formData.role === 'Entrenador') {
            const coachSteps = {
                0: { name: 'Perfil', icon: 'user-circle' },
                1: { name: 'Experiencia', icon: 'award' },
                2: { name: 'Ubicación', icon: 'map-pin' },
                3: { name: 'Club', icon: 'building-2' },
                4: { name: 'Agenda', icon: 'calendar' },
                5: { name: 'Visibilidad', icon: 'eye' },
                6: { name: 'Verificación', icon: 'badge-check' }
            };
            return coachSteps[this.step] || { name: '', icon: '' };
        }

        // Club step names
        if (this.formData.role === 'Club') {
            const clubSteps = {
                0: { name: 'Perfil', icon: 'user-circle' },
                1: { name: 'Identidad', icon: 'building-2' },
                2: { name: 'Ubicación', icon: 'map-pin' },
                3: { name: 'Instalaciones', icon: 'grid-3x3' },
                4: { name: 'Reservas', icon: 'calendar-check' },
                5: { name: 'Clases', icon: 'graduation-cap' },
                6: { name: 'Comunidad', icon: 'users' },
                7: { name: 'Visibilidad', icon: 'eye' },
                8: { name: 'Verificación', icon: 'badge-check' }
            };
            return clubSteps[this.step] || { name: '', icon: '' };
        }

        // Academy step names
        if (this.formData.role === 'Academia') {
            const academySteps = {
                0: { name: 'Perfil', icon: 'user-circle' },
                1: { name: 'Identidad', icon: 'graduation-cap' },
                2: { name: 'Ubicación', icon: 'map-pin' },
                3: { name: 'Contacto', icon: 'phone' },
                4: { name: 'Modelo', icon: 'target' },
                5: { name: 'Equipo', icon: 'users' },
                6: { name: 'Servicios', icon: 'package' },
                7: { name: 'Operativa', icon: 'calendar-check' },
                8: { name: 'Visibilidad', icon: 'eye' },
                9: { name: 'Verificación', icon: 'badge-check' }
            };
            return academySteps[this.step] || { name: '', icon: '' };
        }

        // Commercial step names
        if (this.formData.role === 'Comercial') {
            const comercialSteps = {
                0: { name: 'Perfil', icon: 'user-circle' },
                1: { name: 'Profesional', icon: 'briefcase' }
            };
            return comercialSteps[this.step] || { name: '', icon: '' };
        }

        return { name: '', icon: '' };
    }

    renderProgressBar() {
        if (this.step < 1 || this.isSuccess) return '';

        const totalSteps = this.getMaxStep();
        const currentStep = this.step;
        const progress = (currentStep / totalSteps) * 100;
        const stepInfo = this.getStepInfo();

        return `
            <div class="progress-container">
                <div class="progress-header">
                    <button type="button" class="progress-back-btn" ${currentStep <= 1 ? 'style="visibility:hidden"' : ''}>
                        <i data-lucide="chevron-left"></i>
                    </button>
                    <div class="progress-info">
                        <span class="progress-step-name">${stepInfo.name}</span>
                        <span class="progress-step-count">${currentStep} de ${totalSteps}</span>
                    </div>
                    <div style="width: 40px;"></div>
                </div>
                <div class="progress-bar-wrapper">
                    <div class="progress-bar" style="width: ${progress}%"></div>
                </div>
            </div>
        `;
    }

    render(preserveScroll = false) {
        this.trackCurrentStep();

        const stepModule = this.getCurrentStep();
        if (!stepModule) {
            console.error('[OnboardingWizard]: Unknown step', this.step);
            return;
        }

        // 1. Capture current scroll
        const currentScroll = this.container.scrollTop;

        // 2. Prepare container properties
        this.container.className = 'onboarding-wizard-container reveal active';
        this.container.style.display = 'flex';

        // 3. Generate HTML in memory
        let html = '';
        html += this.renderProgressBar();
        html += stepModule.render(this.formData, this.getOptionsForStep());

        // Add navigation buttons (except for Role step, GoogleStep, and steps which have their own navigation)
        const isCoachStep = this.formData.role === 'Entrenador' && this.step >= 1 && this.step <= 6;
        const isClubStep = this.formData.role === 'Club' && this.step >= 1 && this.step <= 8;
        const isAcademyStep = this.formData.role === 'Academia' && this.step >= 1 && this.step <= 9;
        const isComercialStep = this.formData.role === 'Comercial' && this.step >= 1 && this.step <= 1;
        if (this.step !== 0 && this.step !== -1 && !this.isSuccess && !isCoachStep && !isClubStep && !isAcademyStep && !isComercialStep) {
            html += this.renderNavButtons();
        }


        // 4. Atomic DOM Update
        this.container.innerHTML = html;
        if (window.lucide) window.lucide.createIcons();

        // 5. Restore or Reset Scroll
        if (preserveScroll) {
            this.container.scrollTop = currentScroll;
        } else {
            this.container.scrollTop = 0;
            if (this.header) {
                this.header.classList.remove('header-hidden');
                this.header.classList.remove('scrolled');
                this.lastScrollY = 0;
            }
        }

        // Attach event listeners
        const rerender = () => this.render(true);
        const nextStep = () => this.nextStep();
        const finalize = () => this.onComplete(this.formData);

        stepModule.attach(
            this.formData,
            (data) => this.setFormData(data),
            rerender,
            this.isSuccess ? finalize : nextStep
        );

        // Attach nav button listeners
        const prevBtn = this.container.querySelector('.nav-back');
        const nextBtn = this.container.querySelector('.nav-next');
        const progressBackBtn = this.container.querySelector('.progress-back-btn');

        if (prevBtn) {
            prevBtn.onclick = () => this.prevStep();
        }

        if (nextBtn) {
            nextBtn.onclick = () => this.nextStep();
        }

        if (progressBackBtn) {
            progressBackBtn.onclick = () => this.prevStep();
        }
    }

    renderNavButtons() {
        return `
            <div class="onboarding-nav">
                <button type="button" class="nav-back">
                    <i data-lucide="arrow-left"></i>
                </button>
                <button type="button" class="nav-next">
                    CONTINUAR <i data-lucide="arrow-right"></i>
                </button>
            </div>
        `;
    }

    trackCurrentStep() {
        // Tracking deshabilitado - solo estética
    }
}
