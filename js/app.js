/**
 * إتقان (Itqan) - Core Application Logic
 * High-Converting PropTech / ConTech Landing Page
 * Full Pre-Campaign Readiness: Tracking, Attribution, CRO, Modals & Mobile Sticky Bar
 */

// ============================================================================
// TRACKING & ATTRIBUTION CONFIGURATION
// TODO [META PIXEL]: Once the Facebook Page & Ad Account are created:
// 1. Open Meta Events Manager: https://business.facebook.com/events_manager
// 2. Copy your 15-16 digit Pixel / Dataset ID (e.g. "1234567890123456")
// 3. Paste it in window.ITQAN_TRACKING_CONFIG.metaPixelId below.
// ============================================================================
window.ITQAN_TRACKING_CONFIG = window.ITQAN_TRACKING_CONFIG || {
  metaPixelId: '', // TODO: Paste your 15-16 digit Meta Pixel ID here
  gaMeasurementId: 'G-VC10PXQGWQ'
};

document.addEventListener('DOMContentLoaded', () => {
  initAdTracking();
  initNavbarScroll();
  initSmoothScroll();
  initUnitStateSelector();
  initPropertyTypeSelector();
  initTimelineSelector();
  initAreaQuickPills();
  initInfoModals();
  initMobileStickyBar();
  initWhatsAppClickTracking();
  initLeadForm();
});

/**
 * 0. AD TRACKING & ATTRIBUTION ENGINE (UTM & Click IDs)
 * Captures query parameters from ad traffic (Meta, Google, TikTok, Snapchat)
 * and stores them in sessionStorage to preserve attribution across navigation.
 */
function initAdTracking() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const trackingKeys = [
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_content',
      'utm_term',
      'fbclid',
      'gclid',
      'ttclid'
    ];

    trackingKeys.forEach(key => {
      const val = urlParams.get(key);
      if (val) {
        sessionStorage.setItem(`itqan_${key}`, val);
      }
    });

    if (!sessionStorage.getItem('itqan_first_landing')) {
      sessionStorage.setItem('itqan_first_landing', window.location.href.split('?')[0]);
    }
    if (!sessionStorage.getItem('itqan_referrer') && document.referrer) {
      sessionStorage.setItem('itqan_referrer', document.referrer);
    }
  } catch (e) {
    console.warn('Ad tracking initialization notice:', e);
  }
}

/**
 * Retrieve captured ad attribution data for Firestore lead payload
 */
function getStoredAdTracking() {
  const trackingKeys = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term',
    'fbclid',
    'gclid',
    'ttclid'
  ];

  const data = {};
  const urlParams = new URLSearchParams(window.location.search);

  trackingKeys.forEach(key => {
    // Current URL takes precedence, fallback to stored session
    const val = urlParams.get(key) || sessionStorage.getItem(`itqan_${key}`);
    if (val) {
      data[key] = val;
    }
  });

  return {
    ...data,
    landingPageUrl: sessionStorage.getItem('itqan_first_landing') || window.location.href.split('?')[0],
    referrer: sessionStorage.getItem('itqan_referrer') || document.referrer || 'direct'
  };
}

/**
 * Dispatch Conversion Events to GA4 & Meta Pixel
 */
function trackLeadConversion(leadId, leadData) {
  // 1. Google Analytics 4
  if (window.itqanFirebase && window.itqanFirebase.analytics && window.itqanFirebase.logEvent) {
    try {
      window.itqanFirebase.logEvent(window.itqanFirebase.analytics, 'generate_lead', {
        lead_id: leadId,
        unit_area: leadData.unitArea,
        unit_state: leadData.unitState,
        property_type: leadData.propertyType,
        value: leadData.unitArea,
        currency: 'EGP'
      });
    } catch (e) {
      console.warn('GA4 lead tracking notice:', e);
    }
  }

  // 2. Meta Pixel (if initialized)
  if (window.fbq) {
    try {
      window.fbq('track', 'Lead', {
        content_name: 'طلب عروض تشطيب واستشارة هندسية',
        content_category: leadData.unitState,
        value: leadData.unitArea,
        currency: 'EGP'
      });
    } catch (e) {
      console.warn('Meta Pixel lead tracking notice:', e);
    }
  }
}

function trackWhatsAppClick(source) {
  // 1. GA4
  if (window.itqanFirebase && window.itqanFirebase.analytics && window.itqanFirebase.logEvent) {
    try {
      window.itqanFirebase.logEvent(window.itqanFirebase.analytics, 'whatsapp_contact', {
        source: source
      });
    } catch (e) {
      console.warn('GA4 WhatsApp tracking notice:', e);
    }
  }

  // 2. Meta Pixel
  if (window.fbq) {
    try {
      window.fbq('trackCustom', 'WhatsAppContact', { source: source });
    } catch (e) {
      console.warn('Meta Pixel WhatsApp tracking notice:', e);
    }
  }
}

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
          const firstInput = targetElem.querySelector('input:not([type="hidden"])');
          if (firstInput) firstInput.focus();
        }, 500);
      }
    });
  });
}

/**
 * 3. Unit State Pill Selector (على الطوب الأحمر / نصف تشطيب / تجديد شامل)
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
 * 4. Property Type Pill Selector (شقة / دوبلكس / فيلا / تجاري)
 */
function initPropertyTypeSelector() {
  const pills = document.querySelectorAll('.prop-type-pill');
  const hiddenInput = document.getElementById('property-type-input');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => {
        p.classList.remove('border-primary', 'bg-primary', 'text-white');
        p.classList.add('border-slate-200', 'bg-white', 'text-slate-700');
      });

      pill.classList.add('border-primary', 'bg-primary', 'text-white');
      pill.classList.remove('border-slate-200', 'bg-white', 'text-slate-700');

      const val = pill.getAttribute('data-type');
      if (hiddenInput) hiddenInput.value = val;
    });
  });
}

/**
 * 5. Execution Timeline Pill Selector (فوري / 1-3 أشهر / استلام قادم)
 */
function initTimelineSelector() {
  const pills = document.querySelectorAll('.timeline-pill');
  const hiddenInput = document.getElementById('timeline-input');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => {
        p.classList.remove('border-primary', 'bg-primary', 'text-white');
        p.classList.add('border-slate-200', 'bg-white', 'text-slate-700');
      });

      pill.classList.add('border-primary', 'bg-primary', 'text-white');
      pill.classList.remove('border-slate-200', 'bg-white', 'text-slate-700');

      const val = pill.getAttribute('data-timeline');
      if (hiddenInput) hiddenInput.value = val;
    });
  });
}

/**
 * 6. Quick Area Selection Buttons (100 م², 140 م², 180 م², 220 م²)
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
 * 7. Privacy Policy & Terms of Service Modals
 */
function initInfoModals() {
  const openButtons = document.querySelectorAll('[data-modal-open]');
  const closeButtons = document.querySelectorAll('[data-modal-close]');

  const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.classList.add('overflow-hidden');
  };

  const closeModal = (modal) => {
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.classList.remove('overflow-hidden');
  };

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-modal-open');
      openModal(targetId);
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-modal-close');
      const modal = document.getElementById(targetId) || btn.closest('[role="dialog"]');
      closeModal(modal);
    });
  });

  // Close modals on backdrop click
  ['privacy-modal', 'terms-modal'].forEach(id => {
    const modal = document.getElementById(id);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal);
      });
    }
  });

  // Escape key closes open modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openModals = document.querySelectorAll('[role="dialog"].flex');
      openModals.forEach(m => closeModal(m));
    }
  });
}

/**
 * 8. Mobile Sticky Conversion Bar
 * Appears when scrolling past the hero section and disappears when the form is in view.
 */
function initMobileStickyBar() {
  const stickyBar = document.getElementById('mobile-sticky-bar');
  const leadForm = document.getElementById('lead-form');
  const floatingBtn = document.getElementById('floating-whatsapp-btn');
  if (!stickyBar) return;

  const checkScroll = () => {
    // Only active on mobile/tablet viewports (< 768px)
    if (window.innerWidth >= 768) {
      stickyBar.classList.add('translate-y-full');
      if (floatingBtn) floatingBtn.classList.remove('bottom-20');
      return;
    }

    const scrollY = window.scrollY;
    let formInView = false;

    if (leadForm) {
      const rect = leadForm.getBoundingClientRect();
      // Form is currently covering part of viewport
      formInView = rect.top < window.innerHeight && rect.bottom > 100;
    }

    if (scrollY > 350 && !formInView) {
      stickyBar.classList.remove('translate-y-full');
      if (floatingBtn) floatingBtn.classList.add('bottom-20');
    } else {
      stickyBar.classList.add('translate-y-full');
      if (floatingBtn) floatingBtn.classList.remove('bottom-20');
    }
  };

  window.addEventListener('scroll', checkScroll, { passive: true });
  window.addEventListener('resize', checkScroll, { passive: true });
  checkScroll();
}

/**
 * 9. Universal WhatsApp Click Tracking
 */
function initWhatsAppClickTracking() {
  const trackedLinks = [
    { id: 'floating-whatsapp-btn', source: 'floating_icon' },
    { id: 'modal-whatsapp-cta', source: 'success_modal' }
  ];

  trackedLinks.forEach(item => {
    const el = document.getElementById(item.id);
    if (el) {
      el.addEventListener('click', () => {
        trackWhatsAppClick(item.source);
      });
    }
  });

  // Track any footer or inline WhatsApp anchor
  document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    if (!trackedLinks.some(item => item.id === link.id)) {
      link.addEventListener('click', () => {
        trackWhatsAppClick('inline_link');
      });
    }
  });
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
 * ============================================================================
 * WhatsApp Integration: Dual-Engine Architecture
 * Target Phone Number: +201554941678
 * ============================================================================
 */
const ITQAN_WHATSAPP_CONFIG = {
  phone: '201554941678', // International format without '+'
  callMeBotApiKey: '9610059', // Activated CallMeBot API key
  enableBackgroundAlert: true // Enabled for silent admin alerts
};

/**
 * Format lead payload into a branded, high-converting Arabic WhatsApp message
 */
function formatWhatsAppLeadMessage(leadData, leadId) {
  const formattedDate = new Date().toLocaleString('ar-EG', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  const lines = [
    `🏗️ *طلب عروض تشطيب واستشارة هندسية | منصة إتقان*`,
    `────────────────────────────`,
    `👤 *اسم العميل:* ${leadData.fullName}`,
    `📞 *رقم الموبايل:* ${leadData.phone}`,
    `🏛️ *نوع العقار:* ${leadData.propertyType || 'شقة سكنية'}`,
    `📐 *المساحة التقريبية:* ${leadData.unitArea} م²`,
    `🧱 *حالة الوحدة:* ${leadData.unitState}`,
    `⏱️ *الموعد المتوقع:* ${leadData.timeline || 'فوري'}`,
    `📍 *الموقع / الكومبوند:* ${leadData.location}`,
    `🔖 *كود الطلب:* ${leadId}`,
    `🕒 *تاريخ التقديم:* ${formattedDate}`
  ];

  if (leadData.utm_source) {
    lines.push(`🏷️ *مصدر الحملة:* ${leadData.utm_source}`);
  }

  lines.push(`────────────────────────────`);
  lines.push(`تم تسجيل البيانات بنجاح في قاعدة بيانات إتقان. يرجى التواصل لمراجعة المواصفات وتجهيز مقارنة أفضل 3 عروض تشطيب معتمدة وتحديد موعد المعاينة.`);

  return lines.join('\n');
}

/**
 * Build Universal WhatsApp deep-link URL (wa.me)
 */
function buildWhatsAppUrl(phoneNumber, message) {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Engine 2: Send silent background alert via CallMeBot API
 */
function sendBackgroundWhatsAppAlert(leadData, leadId) {
  if (!ITQAN_WHATSAPP_CONFIG.callMeBotApiKey || !ITQAN_WHATSAPP_CONFIG.enableBackgroundAlert) {
    return;
  }
  try {
    const text = formatWhatsAppLeadMessage(leadData, leadId);

    // Reuse or create hidden iframe
    let iframe = document.getElementById('itqan-callmebot-frame');
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.id = 'itqan-callmebot-frame';
      iframe.name = 'itqan-callmebot-frame';
      iframe.style.display = 'none';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = 'none';
      document.body.appendChild(iframe);
    }

    const form = document.createElement('form');
    form.action = 'https://api.callmebot.com/whatsapp.php';
    form.method = 'GET';
    form.target = 'itqan-callmebot-frame';
    form.style.display = 'none';

    const phoneInput = document.createElement('input');
    phoneInput.type = 'hidden';
    phoneInput.name = 'phone';
    phoneInput.value = ITQAN_WHATSAPP_CONFIG.phone;
    form.appendChild(phoneInput);

    const textInput = document.createElement('input');
    textInput.type = 'hidden';
    textInput.name = 'text';
    textInput.value = text;
    form.appendChild(textInput);

    const keyInput = document.createElement('input');
    keyInput.type = 'hidden';
    keyInput.name = 'apikey';
    keyInput.value = ITQAN_WHATSAPP_CONFIG.callMeBotApiKey;
    form.appendChild(keyInput);

    document.body.appendChild(form);

    setTimeout(() => {
      try {
        form.submit();
      } catch (submitErr) {
        console.warn('Form submit fallback notice:', submitErr);
      }
      setTimeout(() => form.remove(), 1000);
    }, 50);

    console.log('✅ [WhatsApp Service] Background alert submitted via iframe bridge to CallMeBot');
  } catch (err) {
    console.warn('⚠️ [WhatsApp Service] Background alert notice:', err);
  }
}

/**
 * 10. Lead Form Submission & Validation
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
    const propertyType = document.getElementById('property-type-input')?.value.trim() || 'شقة سكنية';
    const timeline = document.getElementById('timeline-input')?.value.trim() || 'فوري (خلال أسبوعين)';
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
        stateErr.textContent = 'يرجى تحديد حالة الوحدة (على الطوب الأحمر، نصف تشطيب، أو تجديد شامل)';
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

    // Retrieve Ad Tracking Parameters (UTMs, Click IDs, Referrer)
    const adTracking = getStoredAdTracking();

    // Prepare lead payload
    const leadPayload = {
      fullName,
      phone: normalizeArabicNumerals(phone).replace(/[\s\-\(\)]/g, ''),
      unitArea: Number(area),
      unitState: state,
      propertyType,
      timeline,
      location,
      ...adTracking,
      submittedAt: new Date().toISOString(),
      userAgent: navigator.userAgent
    };

    // UI Loading state
    setButtonLoading(submitBtn, true);

    try {
      const result = await submitLead(leadPayload);

      if (result.success) {
        const leadId = result.id || 'ITQ-2026';

        // 1. Update Lead Reference ID Badge
        if (modalLeadId) modalLeadId.textContent = leadId;

        // 2. Build dynamic WhatsApp message & deep-link with all submitted data
        const waMessage = formatWhatsAppLeadMessage(leadPayload, leadId);
        const waUrl = buildWhatsAppUrl(ITQAN_WHATSAPP_CONFIG.phone, waMessage);

        const modalWaCta = document.getElementById('modal-whatsapp-cta');
        if (modalWaCta) {
          modalWaCta.href = waUrl;
        }

        // 3. Trigger Conversion Events (GA4 + Meta Pixel)
        trackLeadConversion(leadId, leadPayload);

        // 4. Trigger background alert (CallMeBot bridge)
        sendBackgroundWhatsAppAlert(leadPayload, leadId);

        // 5. Show success modal
        if (successModal) {
          successModal.classList.remove('hidden');
          successModal.classList.add('flex');
          document.body.classList.add('overflow-hidden');
        }

        // Reset form & restore default pill selections
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
        
        // Reset property type to default
        const propPills = document.querySelectorAll('.prop-type-pill');
        propPills.forEach((p, idx) => {
          if (idx === 0) {
            p.classList.add('border-primary', 'bg-primary', 'text-white');
            p.classList.remove('border-slate-200', 'bg-white', 'text-slate-700');
          } else {
            p.classList.remove('border-primary', 'bg-primary', 'text-white');
            p.classList.add('border-slate-200', 'bg-white', 'text-slate-700');
          }
        });
        const propInput = document.getElementById('property-type-input');
        if (propInput) propInput.value = 'شقة سكنية';

        // Reset timeline to default
        const timelinePills = document.querySelectorAll('.timeline-pill');
        timelinePills.forEach((p, idx) => {
          if (idx === 0) {
            p.classList.add('border-primary', 'bg-primary', 'text-white');
            p.classList.remove('border-slate-200', 'bg-white', 'text-slate-700');
          } else {
            p.classList.remove('border-primary', 'bg-primary', 'text-white');
            p.classList.add('border-slate-200', 'bg-white', 'text-slate-700');
          }
        });
        const timeInput = document.getElementById('timeline-input');
        if (timeInput) timeInput.value = 'فوري (خلال أسبوعين)';

        const hiddenState = document.getElementById('unit-state-input');
        if (hiddenState) hiddenState.value = '';
      }
    } catch (err) {
      console.error('Submission error:', err);
      alert('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة عبر واتساب.');
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
    if (btnText) btnText.textContent = 'طلب المعاينة واستلام عروض التشطيب';
    if (btnSpinner) btnSpinner.classList.add('hidden');
  }
}

/**
 * ============================================================================
 * Firebase Cloud Firestore Integration: submitLead(data)
 * Saves full lead data including UTM campaign parameters & property attributes.
 * ============================================================================
 */
async function submitLead(data) {
  console.log("📌 [Itqan Firebase Service] Submitting Lead with Attribution:", data);

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
    const { db, collection, addDoc, serverTimestamp } = window.itqanFirebase;

    const firestorePayload = {
      fullName: data.fullName,
      phone: data.phone,
      unitArea: data.unitArea,
      unitState: data.unitState,
      propertyType: data.propertyType || "شقة سكنية",
      timeline: data.timeline || "فوري (خلال أسبوعين)",
      location: data.location,
      utm_source: data.utm_source || "direct",
      utm_medium: data.utm_medium || "none",
      utm_campaign: data.utm_campaign || "none",
      utm_content: data.utm_content || "none",
      utm_term: data.utm_term || "none",
      fbclid: data.fbclid || "",
      gclid: data.gclid || "",
      ttclid: data.ttclid || "",
      landingPageUrl: data.landingPageUrl || window.location.href.split('?')[0],
      referrer: data.referrer || document.referrer || "direct",
      submittedAt: data.submittedAt || new Date().toISOString(),
      userAgent: data.userAgent || navigator.userAgent,
      platform: "itqan_landing_page",
      createdAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, "leads"), firestorePayload);

    console.log("✅ [Itqan Firebase Service] Document created successfully! ID:", docRef.id);

    return {
      success: true,
      id: docRef.id,
      message: "تم تسجيل طلبك بنجاح في قاعدة البيانات. مهندسنا هيتواصل معاك خلال 24 ساعة."
    };
  }

  // If Firebase is unreachable or blocked by client extension
  console.warn("⚠️ [Itqan Firebase Service] Firebase is not initialized. Using offline fallback simulation.");
  await new Promise(resolve => setTimeout(resolve, 850));
  const simulatedId = "DEMO-" + Math.floor(100000 + Math.random() * 900000);
  return {
    success: true,
    id: simulatedId,
    message: "تم تسجيل طلبك (وضع تجريبي). يرجى التأكد من تشغيل خادم محلي وتوفر الاتصال بفايربيز."
  };
}
