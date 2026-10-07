/**
 * إتقان (Itqan) - Core Application Logic
 * High-Converting PropTech / ConTech Landing Page
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initSmoothScroll();
  initUnitStateSelector();
  initAreaQuickPills();
  initLeadForm();
});

/**
 * 1. Navbar Sticky Background Effect on Scroll
 */
function initNavbarScroll() {
  const navbar = document.getElementById('main-navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('shadow-sm', 'border-slate-200');
      navbar.classList.remove('border-transparent');
    } else {
      navbar.classList.remove('shadow-sm', 'border-slate-200');
      navbar.classList.add('border-transparent');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * 2. Smooth Scrolling to Lead Capture Form
 */
function initSmoothScroll() {
  const scrollTriggers = document.querySelectorAll('[data-scroll-to]');
  
  scrollTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-scroll-to');
      const targetElem = document.getElementById(targetId);
      if (targetElem) {
        const navHeight = 80;
        const targetPosition = targetElem.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Focus first field for convenience
        setTimeout(() => {
          const firstInput = targetElem.querySelector('input');
          if (firstInput) firstInput.focus();
        }, 500);
      }
    });
  });
}

/**
 * 3. Unit State Pill Selector (على الطوب الأحمر / نصف تشطيب)
 */
function initUnitStateSelector() {
  const options = document.querySelectorAll('.state-option');
  const hiddenInput = document.getElementById('unit-state-input');
  const stateError = document.getElementById('state-error');

  options.forEach(option => {
    option.addEventListener('click', () => {
      options.forEach(opt => {
        opt.classList.remove('selected', 'border-primary', 'bg-slate-50', 'ring-2', 'ring-primary');
        opt.classList.add('border-slate-200');
        const indicator = opt.querySelector('.state-dot');
        if (indicator) {
          indicator.classList.remove('bg-primary', 'border-primary');
          indicator.classList.add('border-slate-300');
        }
      });

      option.classList.add('selected', 'border-primary', 'bg-slate-50', 'ring-2', 'ring-primary');
      option.classList.remove('border-slate-200');
      const activeDot = option.querySelector('.state-dot');
      if (activeDot) {
        activeDot.classList.add('bg-primary', 'border-primary');
        activeDot.classList.remove('border-slate-300');
      }

      const val = option.getAttribute('data-value');
      if (hiddenInput) hiddenInput.value = val;
      if (stateError) stateError.classList.add('hidden');
    });
  });
}

/**
 * 4. Quick Area Selection Buttons (100 م², 140 م², 180 م², 220 م²)
 */
function initAreaQuickPills() {
  const areaPills = document.querySelectorAll('.area-pill');
  const areaInput = document.getElementById('unit-area');

  areaPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const areaValue = pill.getAttribute('data-area');
      if (areaInput) {
        areaInput.value = areaValue;
        areaInput.dispatchEvent(new Event('input'));
        
        // Highlight active pill
        areaPills.forEach(p => p.classList.remove('bg-primary', 'text-white', 'border-primary'));
        pill.classList.add('bg-primary', 'text-white', 'border-primary');
      }
    });
  });

  if (areaInput) {
    areaInput.addEventListener('input', () => {
      const currentVal = areaInput.value;
      areaPills.forEach(p => {
        if (p.getAttribute('data-area') === currentVal) {
          p.classList.add('bg-primary', 'text-white', 'border-primary');
        } else {
          p.classList.remove('bg-primary', 'text-white', 'border-primary');
        }
      });
    });
  }
}

/**
 * Helper: Convert Arabic/Eastern numerals (٠-٩) to Western (0-9)
 */
function normalizeArabicNumerals(str) {
  if (!str) return '';
  const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return str.replace(/[٠-٩]/g, d => arabicNumbers.indexOf(d));
}

/**
 * Helper: Validate Egyptian Phone Number
 * Egyptian numbers: 11 digits starting with 010, 011, 012, or 015
 * Or with country code +20 / 0020
 */
function isValidEgyptianPhone(phone) {
  const cleanPhone = normalizeArabicNumerals(phone).replace(/[\s\-\(\)]/g, '');
  const egPhoneRegex = /^(?:\+?20|0020|0)?1[0125][0-9]{8}$/;
  return egPhoneRegex.test(cleanPhone);
}

/**
 * 5. Lead Form Submission & Validation
 */
function initLeadForm() {
  const form = document.getElementById('itqan-lead-form');
  const submitBtn = document.getElementById('submit-lead-btn');
  const successModal = document.getElementById('success-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalLeadId = document.getElementById('modal-lead-id');

  if (!form) return;

  // Real-time phone cleaner
  const phoneInput = document.getElementById('user-phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      e.target.value = normalizeArabicNumerals(e.target.value);
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Reset previous errors
    clearFormErrors();

    // Gather inputs
    const fullName = document.getElementById('user-name')?.value.trim();
    const phone = document.getElementById('user-phone')?.value.trim();
    const area = document.getElementById('unit-area')?.value.trim();
    const state = document.getElementById('unit-state-input')?.value.trim();
    const location = document.getElementById('unit-location')?.value.trim();

    let hasError = false;

    // Validate Name
    if (!fullName || fullName.length < 3) {
      showFieldError('user-name', 'يرجى كتابة الاسم بالكامل (3 أحرف على الأقل)');
      hasError = true;
    }

    // Validate Egyptian Phone
    if (!phone || !isValidEgyptianPhone(phone)) {
      showFieldError('user-phone', 'يرجى إدخال رقم موبايل مصري صحيح (مثال: 01012345678)');
      hasError = true;
    }

    // Validate Area
    if (!area || isNaN(area) || Number(area) < 20 || Number(area) > 2000) {
      showFieldError('unit-area', 'يرجى إدخال مساحة تقريبية واقعية بالمتر المربع (مثال: 140)');
      hasError = true;
    }

    // Validate Unit State
    if (!state) {
      const stateErr = document.getElementById('state-error');
      if (stateErr) {
        stateErr.textContent = 'يرجى تحديد حالة الوحدة (على الطوب الأحمر أو نصف تشطيب)';
        stateErr.classList.remove('hidden');
      }
      hasError = true;
    }

    // Validate Location
    if (!location || location.length < 3) {
      showFieldError('unit-location', 'يرجى تحديد موقع أو اسم الكومبوند / المنطقة في القاهرة الكبرى');
      hasError = true;
    }

    if (hasError) return;

    // Prepare lead payload
    const leadPayload = {
      fullName,
      phone: normalizeArabicNumerals(phone).replace(/[\s\-\(\)]/g, ''),
      unitArea: Number(area),
      unitState: state,
      location,
      submittedAt: new Date().toISOString(),
      userAgent: navigator.userAgent
    };

    // UI Loading state
    setButtonLoading(submitBtn, true);

    try {
      // Call Firebase / Backend API stub
      const result = await submitLead(leadPayload);

      if (result.success) {
        // Show success modal
        if (modalLeadId) modalLeadId.textContent = result.id || 'ITQ-2026';
        if (successModal) {
          successModal.classList.remove('hidden');
          successModal.classList.add('flex');
          document.body.classList.add('overflow-hidden');
        }

        // Reset form
        form.reset();
        document.querySelectorAll('.state-option').forEach(opt => {
          opt.classList.remove('selected', 'border-primary', 'bg-slate-50', 'ring-2', 'ring-primary');
          opt.classList.add('border-slate-200');
          const dot = opt.querySelector('.state-dot');
          if (dot) {
            dot.classList.remove('bg-primary', 'border-primary');
            dot.classList.add('border-slate-300');
          }
        });
        document.querySelectorAll('.area-pill').forEach(p => p.classList.remove('bg-primary', 'text-white', 'border-primary'));
        const hiddenState = document.getElementById('unit-state-input');
        if (hiddenState) hiddenState.value = '';
      }
    } catch (err) {
      console.error('Submission error:', err);
      alert('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى أو التواصل معنا عبر واتساب.');
    } finally {
      setButtonLoading(submitBtn, false);
    }
  });

  // Close modal behavior
  if (closeModalBtn && successModal) {
    closeModalBtn.addEventListener('click', () => {
      successModal.classList.add('hidden');
      successModal.classList.remove('flex');
      document.body.classList.remove('overflow-hidden');
    });

    // Close on backdrop click
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        successModal.classList.add('hidden');
        successModal.classList.remove('flex');
        document.body.classList.remove('overflow-hidden');
      }
    });
  }
}

function showFieldError(inputId, message) {
  const input = document.getElementById(inputId);
  if (!input) return;

  input.classList.add('border-rose-500', 'focus:border-rose-500', 'focus:ring-rose-200');
  input.classList.remove('border-slate-300', 'focus:border-primary');

  const errorEl = document.getElementById(`${inputId}-error`);
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');
  }
}

function clearFormErrors() {
  const inputs = ['user-name', 'user-phone', 'unit-area', 'unit-location'];
  inputs.forEach(id => {
    const input = document.getElementById(id);
    if (input) {
      input.classList.remove('border-rose-500', 'focus:border-rose-500', 'focus:ring-rose-200');
      input.classList.add('border-slate-300', 'focus:border-primary');
    }
    const err = document.getElementById(`${id}-error`);
    if (err) err.classList.add('hidden');
  });

  const stateErr = document.getElementById('state-error');
  if (stateErr) stateErr.classList.add('hidden');
}

function setButtonLoading(btn, isLoading) {
  if (!btn) return;
  const btnText = btn.querySelector('.btn-text');
  const btnSpinner = btn.querySelector('.btn-spinner');

  if (isLoading) {
    btn.disabled = true;
    btn.classList.add('opacity-90', 'cursor-not-allowed');
    if (btnText) btnText.textContent = 'جاري إرسال طلبك...';
    if (btnSpinner) btnSpinner.classList.remove('hidden');
  } else {
    btn.disabled = false;
    btn.classList.remove('opacity-90', 'cursor-not-allowed');
    if (btnText) btnText.textContent = 'طلب الاستشارة الهندسية والمعاينة';
    if (btnSpinner) btnSpinner.classList.add('hidden');
  }
}

/**
 * ============================================================================
 * Firebase Integration Function: submitLead(data)
 * Ready to be connected to Firebase Cloud Firestore
 * ============================================================================
 * Instructions for connecting:
 * 1. Initialize Firebase in your project or add Firebase SDK scripts in index.html.
 * 2. Replace this stub with:
 *
 *    import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
 *    const db = getFirestore();
 *    const docRef = await addDoc(collection(db, "leads"), {
 *      ...data,
 *      createdAt: serverTimestamp()
 *    });
 *    return { success: true, id: docRef.id };
 */
async function submitLead(data) {
  console.log("📌 [Itqan Firebase Service] Submitting Lead:", data);

  // Wait briefly if Firebase is still completing initialization
  if (!window.itqanFirebase || !window.itqanFirebase.db) {
    await new Promise((resolve) => {
      if (window.itqanFirebase && window.itqanFirebase.db) return resolve();
      const timer = setTimeout(resolve, 2500);
      window.addEventListener('itqan-firebase-ready', () => {
        clearTimeout(timer);
        resolve();
      }, { once: true });
    });
  }

  // If Firebase is initialized, submit to Cloud Firestore
  if (window.itqanFirebase && window.itqanFirebase.db) {
    const { db, collection, addDoc, serverTimestamp, analytics, logEvent } = window.itqanFirebase;

    // 1. Save document to "leads" collection
    const docRef = await addDoc(collection(db, "leads"), {
      fullName: data.fullName,
      phone: data.phone,
      unitArea: data.unitArea,
      unitState: data.unitState,
      location: data.location,
      submittedAt: data.submittedAt || new Date().toISOString(),
      userAgent: data.userAgent || navigator.userAgent,
      platform: "itqan_landing_page",
      createdAt: serverTimestamp()
    });

    console.log("✅ [Itqan Firebase Service] Document created successfully! ID:", docRef.id);

    // 2. Fire Google Analytics conversion event if available
    if (analytics && logEvent) {
      try {
        logEvent(analytics, "generate_lead", {
          lead_id: docRef.id,
          unit_area: data.unitArea,
          unit_state: data.unitState,
          value: data.unitArea,
          currency: "EGP"
        });
      } catch (err) {
        console.warn("Analytics event log notice:", err);
      }
    }

    return {
      success: true,
      id: docRef.id,
      message: "تم تسجيل طلبك بنجاح في قاعدة البيانات. مهندسنا هيتواصل معاك خلال 24 ساعة."
    };
  }

  // If Firebase is unreachable or blocked
  console.warn("⚠️ [Itqan Firebase Service] Firebase is not initialized. Using offline fallback simulation.");
  await new Promise(resolve => setTimeout(resolve, 850));
  const simulatedId = "DEMO-" + Math.floor(100000 + Math.random() * 900000);
  return {
    success: true,
    id: simulatedId,
    message: "تم تسجيل طلبك (وضع تجريبي). يرجى التأكد من تشغيل خادم محلي وتوفر الاتصال بفايربيز."
  };
}
