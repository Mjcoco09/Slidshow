// Initialize Reveal.js presentation
Reveal.initialize({
    hash: true,
    
    // Transition settings
    transition: 'slide', // none/fade/slide/convex/concave/zoom
    transitionSpeed: 'default', // default/fast/slow
    backgroundTransition: 'fade',
    
    // Display settings
    progress: true,
    controls: true,
    controlsTutorial: true,
    controlsLayout: 'bottom-right',
    controlsBackArrows: 'faded',
    
    // Navigation settings
    keyboard: true,
    touch: true,
    loop: false,
    rtl: false,
    navigationMode: 'default',
    shuffle: false,
    
    // Mobile-specific settings
    embedded: false,
    autoPlayMedia: null,
    preloadIframes: null,
    
    // Fragment settings
    fragments: true,
    fragmentInURL: false,
    
    // Presentation size
    width: 1920,
    height: 1080,
    margin: 0.04,
    minScale: 0.2,
    maxScale: 2.0,
    
    // Auto-slide settings (disabled for manual control)
    autoSlide: 0,
    autoSlideStoppable: true,
    
    // Mouse wheel navigation
    mouseWheel: false,
    
    // Hides cursor after time
    hideInactiveCursor: true,
    hideCursorTime: 5000,
    
    // Presentation mode
    showSlideNumber: 'speaker',
    
    // Plugins
    plugins: [ 
        RevealMarkdown, 
        RevealHighlight, 
        RevealNotes 
    ]
});

// Add custom keyboard shortcuts
Reveal.addKeyBinding({
    keyCode: 72, // 'h' key
    key: 'H',
    description: 'Go to first slide'
}, () => {
    Reveal.slide(0);
});

// Speaker notes configuration
if (window.location.search.match(/receiver/gi)) {
    // This is the receiver window (speaker notes)
    document.body.classList.add('receiver');
}

// Custom event handlers
Reveal.addEventListener('slidechanged', function(event) {
    // Update slide numbers in footer
    updateSlideNumbers();
});

Reveal.addEventListener('ready', function(event) {
    // Initialize slide numbers
    updateSlideNumbers();
});

function updateSlideNumbers() {
    const indices = Reveal.getIndices();
    const totalSlides = Reveal.getTotalSlides();
    
    const currentElement = document.querySelector('.slide-current');
    const totalElement = document.querySelector('.slide-total');
    
    if (currentElement && totalElement) {
        currentElement.textContent = indices.h + 1;
        totalElement.textContent = totalSlides;
    }
}

// Mobile device detection and optimization
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function isTabletDevice() {
    return /iPad|Android/i.test(navigator.userAgent) && window.innerWidth >= 768;
}

// Apply mobile-specific optimizations
function applyMobileOptimizations() {
    if (isMobileDevice()) {
        document.body.classList.add('mobile-device');
        
        // Disable mouse wheel on mobile
        Reveal.configure({
            mouseWheel: false,
            touch: true
        });
        
        // Add touch gesture hints for first-time users
        addTouchHints();
    }
    
    if (isTabletDevice()) {
        document.body.classList.add('tablet-device');
    }
}

// Add touch gesture hints
function addTouchHints() {
    const firstSlide = document.querySelector('.slides section:first-child');
    if (firstSlide && !localStorage.getItem('touch-hints-shown')) {
        const hintElement = document.createElement('div');
        hintElement.className = 'touch-hints';
        hintElement.innerHTML = `
            <div class="touch-hint">
                <i class="fas fa-hand-point-right"></i>
                <span>Swipe to navigate slides</span>
            </div>
        `;
        hintElement.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 20px;
            background: rgba(30, 64, 175, 0.9);
            color: white;
            padding: 10px 15px;
            border-radius: 8px;
            font-size: 14px;
            z-index: 1000;
            animation: fadeInOut 4s ease-in-out;
        `;
        
        document.body.appendChild(hintElement);
        
        // Remove hint after 4 seconds
        setTimeout(() => {
            if (hintElement.parentNode) {
                hintElement.parentNode.removeChild(hintElement);
            }
            localStorage.setItem('touch-hints-shown', 'true');
        }, 4000);
    }
}

// Handle device orientation changes
function handleOrientationChange() {
    setTimeout(() => {
        Reveal.layout();
    }, 500);
}

// Add CSS animation for touch hints
function addTouchHintStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translateY(20px); }
            20% { opacity: 1; transform: translateY(0); }
            80% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(-20px); }
        }
        
        .touch-hint {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .mobile-device .slide-footer {
            padding: 0 1rem;
            font-size: 0.8rem;
        }
        
        .tablet-device .reveal .slides section {
            padding: 2rem 3rem;
        }
    `;
    document.head.appendChild(style);
}

// Initialize mobile optimizations
document.addEventListener('DOMContentLoaded', function() {
    addTouchHintStyles();
    applyMobileOptimizations();
});

// Handle orientation changes
window.addEventListener('orientationchange', handleOrientationChange);
window.addEventListener('resize', handleOrientationChange);

// Add speaker notes content for each slide
const speakerNotes = {
    0: `Quick welcome and one-line purpose: to share clear, non-technical context so leaders can make informed decisions. Keep it short — 20–30 seconds.
    
    Script: "Hello — I'm [Name]. Today I'll share an overview of cybersecurity: the kinds of threats that are common, how they can affect operations, and the considerations organizations often weigh when deciding how to respond."`,
    
    1: `Define each item in one sentence and focus on observable signs (e.g., unexpected login alerts, encrypted files, unusual vendor requests). Emphasize that the threats are not always dramatic headlines — often slow, quietly harmful activity.
    
    Script: "Phishing means convincing emails or messages that trick someone into giving up access. Ransomware locks systems or data. Credential compromise happens when reused or leaked logins are exploited. And vendor or supply-chain incidents create indirect exposures."`,
    
    2: `Use a single brief, anonymized example: e.g., a vendor compromise that caused multi-day outage and invoicing delays. Highlight that impacts vary by industry and systems involved — not everyone experiences the same consequences.
    
    Script: "When incidents occur the immediate effect is often downtime; beyond that, there can be recovery costs and damaged trust. For instance, an outage affecting invoicing systems can ripple into cash-flow and client relations."`,
    
    3: `Describe each category in one non-prescriptive sentence (what it addresses, not how to implement). Mention trade-offs: stronger controls often require staff time, tools, or process changes.
    
    Script: "These categories describe areas organizations commonly consider: identity and access control focuses on who has what permission; backups and recovery are the copies and plans needed to return to normal; monitoring is about detecting anomalies; system design covers how systems are arranged; and vendor governance is about third-party exposure."`,
    
    4: `Offer conversation prompts rather than recommendations (this keeps it non-prescriptive). Give a calm closing: invite questions and suggest a short discussion on priorities if time allows.`
};

// Add notes to slides programmatically
Reveal.addEventListener('ready', function() {
    const slides = document.querySelectorAll('.slides section');
    slides.forEach((slide, index) => {
        if (speakerNotes[index]) {
            const notesElement = document.createElement('aside');
            notesElement.className = 'notes';
            notesElement.textContent = speakerNotes[index];
            slide.appendChild(notesElement);
        }
    });
});