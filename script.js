/* ==========================================================================
   The Alephain Guild Official Website - Interactive Scripts
   ========================================================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('The Alephain Guild website loaded');

    // Initialize all modules
    initLanguageToggle();
    initMobileMenu();
    initSmoothScroll();
    initPrinciples();
    initCycleDiagram();
    initEcosystemCards();
    initBackToTop();
    initStarfield();

    // Set initial language
    setLanguage('en');
});

/* ==========================================================================
   Starfield Background Animation
   ========================================================================== */
function initStarfield() {
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.id = 'starfield';
    document.body.insertBefore(canvas, document.body.firstChild);

    const ctx = canvas.getContext('2d');

    // Resize canvas to window size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Star class
    class Star {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speed = Math.random() * 0.5 + 0.1;
            this.opacity = Math.random() * 0.8 + 0.2;
            this.pulseSpeed = Math.random() * 0.02 + 0.01;
            this.pulsePhase = Math.random() * Math.PI * 2;
            // Color: mix of gold (#D4AF37) and blue (#3A6B8C)
            this.isGold = Math.random() < 0.15; // 15% chance of gold star
        }

        update() {
            // Slow drift upward
            this.y -= this.speed;

            // Pulse opacity
            this.pulsePhase += this.pulseSpeed;
            this.currentOpacity = this.opacity * (0.6 + 0.4 * Math.sin(this.pulsePhase));

            // Reset if out of view
            if (this.y < -10) {
                this.y = canvas.height + 10;
                this.x = Math.random() * canvas.width;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

            if (this.isGold) {
                ctx.fillStyle = `rgba(212, 175, 55, ${this.currentOpacity})`;
                // Add glow for gold stars
                ctx.shadowBlur = 10;
                ctx.shadowColor = 'rgba(212, 175, 55, 0.5)';
            } else {
                ctx.fillStyle = `rgba(58, 107, 140, ${this.currentOpacity * 0.7})`;
                ctx.shadowBlur = 5;
                ctx.shadowColor = 'rgba(58, 107, 140, 0.3)';
            }

            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    // Constellation line class
    class ConstellationLine {
        constructor() {
            this.reset();
        }

        reset() {
            this.startX = Math.random() * canvas.width;
            this.startY = Math.random() * canvas.height;
            this.length = Math.random() * 100 + 50;
            this.angle = Math.random() * Math.PI * 2;
            this.opacity = 0;
            this.maxOpacity = Math.random() * 0.15 + 0.05;
            this.fadeIn = true;
            this.lifespan = Math.random() * 200 + 100;
            this.age = 0;
        }

        update() {
            this.age++;

            if (this.fadeIn) {
                this.opacity = Math.min(this.opacity + 0.005, this.maxOpacity);
                if (this.opacity >= this.maxOpacity) {
                    this.fadeIn = false;
                }
            } else {
                this.opacity -= 0.003;
            }

            if (this.age > this.lifespan || this.opacity <= 0) {
                this.reset();
            }
        }

        draw() {
            if (this.opacity <= 0) return;

            const endX = this.startX + Math.cos(this.angle) * this.length;
            const endY = this.startY + Math.sin(this.angle) * this.length;

            const gradient = ctx.createLinearGradient(this.startX, this.startY, endX, endY);
            gradient.addColorStop(0, `rgba(58, 107, 140, 0)`);
            gradient.addColorStop(0.5, `rgba(58, 107, 140, ${this.opacity})`);
            gradient.addColorStop(1, `rgba(58, 107, 140, 0)`);

            ctx.beginPath();
            ctx.moveTo(this.startX, this.startY);
            ctx.lineTo(endX, endY);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }

    // Create stars and constellation lines
    const stars = [];
    const constellationLines = [];
    const numStars = Math.min(150, Math.floor((canvas.width * canvas.height) / 15000));
    const numLines = 5;

    for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
    }

    for (let i = 0; i < numLines; i++) {
        constellationLines.push(new ConstellationLine());
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw constellation lines first (behind stars)
        constellationLines.forEach(line => {
            line.update();
            line.draw();
        });

        // Draw stars
        stars.forEach(star => {
            star.update();
            star.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();
}

/* ==========================================================================
   1. Language Toggle System
   ========================================================================== */
function initLanguageToggle() {
    const langToggle = document.getElementById('langToggle');
    if (!langToggle) return;
    
    langToggle.addEventListener('click', function() {
        const currentLang = document.documentElement.lang || 'en';
        const newLang = currentLang === 'en' ? 'zh' : 'en';
        setLanguage(newLang);
    });
}

function setLanguage(lang) {
    // Update html lang attribute
    document.documentElement.lang = lang;
    
    // Show/hide language-specific elements
    document.querySelectorAll('[data-lang]').forEach(element => {
        if (element.getAttribute('data-lang') === lang) {
            element.style.display = '';
        } else {
            element.style.display = 'none';
        }
    });
    
    // Update language toggle button text
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        const spans = langToggle.querySelectorAll('span[data-lang]');
        spans.forEach(span => {
            if (span.getAttribute('data-lang') === lang) {
                span.style.display = '';
            } else {
                span.style.display = 'none';
            }
        });
    }
    
    // Update page title based on language
    if (lang === 'zh') {
        document.title = '阿莱夫行会 - 市场"阿莱夫"的译者与探索者';
    } else {
        document.title = 'The Alephain Guild - Translators and explorers of the market\'s Aleph';
    }
    
    console.log(`Language switched to: ${lang}`);
}

/* ==========================================================================
   2. Mobile Menu Toggle
   ========================================================================== */
function initMobileMenu() {
    const menuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (!menuToggle || !navLinks) return;
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Animate hamburger to X
        const spans = menuToggle.querySelectorAll('span');
        if (navLinks.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 767) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 767 && 
            navLinks.classList.contains('active') &&
            !navLinks.contains(event.target) &&
            !menuToggle.contains(event.target)) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 767) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

/* ==========================================================================
   3. Smooth Scroll Navigation
   ========================================================================== */
function initSmoothScroll() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                // Calculate target position (accounting for fixed header)
                const headerHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                // Smooth scroll
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL hash without scrolling
                history.pushState(null, null, href);
            }
        });
    });
}

/* ==========================================================================
   4. First Principles Interactive Cards
   ========================================================================== */
function initPrinciples() {
    const principlesData = {
        en: [
            {
                number: 1,
                title: "Market Non-Randomness",
                statement: "The market is an evolving complex system composed of incomplete information, heterogeneous expectations, and positive/negative feedback loops, not a pure random walk process.",
                inferences: [
                    "Therefore, there exist temporary, structural inefficiencies (i.e., 'alpha opportunities') arising from differences in information transmission speed, systematic biases in participant behavior, or institutional constraints.",
                    "Therefore, purely historical price-based technical analysis has limited efficacy; it must be combined with deeper microstructure, fundamental logic, and behavioral finance.",
                    "Therefore, our core task is to identify and model the generation and annihilation mechanisms of these inefficiencies, not to search for 'holy grail' patterns."
                ]
            },
            {
                number: 2,
                title: "Alpha Origin Theory",
                statement: "Sustainable, genuine alpha originates from cognitive advantage regarding non-consensus correct truths, or superior computation of complex system internal dynamics.",
                inferences: [
                    "Therefore, chasing market consensus or simple factors equates to abandoning alpha. Uniqueness and forward-lookingness are core to strategy value.",
                    "Therefore, our research must delve into insufficiently mined data sources, unconventional logical chains, or more precise computational models.",
                    "Therefore, alpha has inherent decay. A widely recognized truth will gradually dissipate its alpha potential. Perpetual innovation is the foundation of survival."
                ]
            },
            {
                number: 3,
                title: "Mathematics & Computation Priority",
                statement: "All market insights and trading hypotheses must ultimately be expressed in forms that can be mathematically defined, computer-processed, and tested with historical and real-time data.",
                inferences: [
                    "Therefore, vague 'feelings' or 'stories' lack operational value. All ideas must undergo 'mathematical tempering.'",
                    "Therefore, backtesting is not an auxiliary tool for parameter optimization but a 'guillotine' for hypotheses. A hypothesis that cannot survive strict, realistic backtesting must be mercilessly discarded.",
                    "Therefore, our core assets are mathematical models and the code that implements them. Code clarity, reproducibility, and efficiency are strategic-level requirements."
                ]
            },
            {
                number: 4,
                title: "Risk as Foundation",
                statement: "Risk is not a byproduct of profit and loss but a more fundamental, higher-priority design and management dimension than returns. Not understanding the origin of risk means not understanding the essence of returns.",
                inferences: [
                    "Therefore, at the inception of any strategy conception, its risk profile must be conceived simultaneously and independently: in what market state might it perish? From where might its deepest drawdown originate?",
                    "Therefore, risk management is an active, structured creative activity, not passive stop-loss setting. It includes but is not limited to: strategy diversification, extreme stress testing, nonlinear exposure management.",
                    "Therefore, capital preservation is the primary task. The Guild's survival always takes precedence over capturing any single opportunity."
                ]
            },
            {
                number: 5,
                title: "Endless Game Theory",
                statement: "We are forever in an infinite game with multiple participants, information asymmetry, and rules that may slowly change. Our opponents include other alpha seekers, liquidity providers, and the market institution itself.",
                inferences: [
                    "Therefore, strategies must consider their market impact and potential adaptive responses from counterparties. A strategy that self-destructs upon large-scale deployment is useless.",
                    "Therefore, adaptability, robustness, and concealment are key traits for long-term strategy survival. Overfitting is a 'golem' that leads its creator to destruction.",
                    "Therefore, the Guild must possess the capability for continuous learning and rapid evolution. Yesterday's winning formula may fail tomorrow."
                ]
            }
        ],
        zh: [
            {
                number: 1,
                title: "市场非随机论",
                statement: "市场是一个由不完全信息、异质预期与正负反馈回路构成的、演化的复杂系统，而非一个纯粹的随机游走过程。",
                inferences: [
                    "因此，市场中存在暂时性、结构性的无效片段（即'阿尔法机会'），它们源于信息传递速度的差异、参与者行为的系统性偏差或制度性约束。",
                    "因此，纯粹基于历史价格的技术分析效力有限，必须结合更深层的微观结构、基本面逻辑与行为金融学进行理解。",
                    "因此，我们的核心任务是识别并建模这些无效性的产生与湮灭机制，而非寻找'圣杯'模式。"
                ]
            },
            {
                number: 2,
                title: "阿尔法本源论",
                statement: "可持续的、真正的阿尔法，来源于对非共识性正确真理的认知优势，或对复杂系统内部动力学的更优计算。",
                inferences: [
                    "因此，追逐市场共识或简单因子等同于放弃阿尔法。独特性和前瞻性是策略价值的核心。",
                    "因此，我们的研究工作必须深入到未被充分挖掘的数据源、非传统的逻辑链条或更精密的计算模型之中。",
                    "因此，阿尔法具有天然的衰减性。一个被广泛认知的真理，其阿尔法潜力将逐渐消散。永续的创新是生存之本。"
                ]
            },
            {
                number: 3,
                title: "数学与计算优先论",
                statement: "一切市场洞察与交易假设，必须最终表达为可被数学定义、可被计算机处理、并可被历史与实时数据检验的形式。",
                inferences: [
                    "因此，模糊的'感觉'或'故事'不具备操作价值。所有想法必须经过'数学化淬炼'。",
                    "因此，回测不是优化参数的辅助工具，而是假设的'断头台'。一个无法在严格、符合现实的回测中生存的假设，必须被无情抛弃。",
                    "因此，我们的核心资产是数学模型与实现它们的代码。代码的清晰性、可复现性与效率，是战略级要求。"
                ]
            },
            {
                number: 4,
                title: "风险本位论",
                statement: "风险不是损益的副产品，而是比收益更根本、更优先的设计与管理维度。不理解风险的本源，即不理解收益的本质。",
                inferences: [
                    "因此，在任何策略构思之初，必须同时且独立地构思其风险画像：它可能死于何种市场状态？其最深的回撤可能源自何处？",
                    "因此，风险管理是主动的、结构化的创造性活动，而非被动的止损设置。它包括但不限于：策略分散化、极端压力测试、非线性暴露管理。",
                    "因此，资本保存是首要任务。行会的生存，永远高于任何单次机会的捕获。"
                ]
            },
            {
                number: 5,
                title: "无尽博弈论",
                statement: "我们永远处于一个多参与者、信息不对称、且规则可能缓慢变化的无限博弈之中。我们的对手包括其他阿尔法寻求者、流动性提供者以及市场制度本身。",
                inferences: [
                    "因此，策略必须考虑其市场影响与可能引发的对手方适应性反应。一个一旦大规模部署就会自我毁灭的策略，是无用的。",
                    "因此，适应性、鲁棒性与隐蔽性是策略长期生存的关键特质。过拟合是'魔像'，会将创造者引向毁灭。",
                    "因此，行会必须具备持续学习与快速演进的能力。昨日的胜利方程式，可能在明日失效。"
                ]
            }
        ]
    };
    
    const container = document.getElementById('principlesContainer');
    if (!container) return;
    
    // Function to render principles for current language
    function renderPrinciples() {
        const lang = document.documentElement.lang || 'en';
        const principles = principlesData[lang] || principlesData.en;
        
        container.innerHTML = '';
        
        principles.forEach(principle => {
            const card = document.createElement('div');
            card.className = 'principle-card';
            card.innerHTML = `
                <div class="principle-header">
                    <div class="principle-title">
                        <span class="principle-number">${principle.number}</span>
                        <h3>${principle.title}</h3>
                    </div>
                    <span class="principle-toggle">+</span>
                </div>
                <div class="principle-content">
                    <p class="principle-statement">${principle.statement}</p>
                    <ul class="inferences">
                        ${principle.inferences.map(inference => 
                            `<li class="inference-item">${inference}</li>`
                        ).join('')}
                    </ul>
                </div>
            `;
            
            // Add click event to toggle expansion
            const header = card.querySelector('.principle-header');
            header.addEventListener('click', function() {
                card.classList.toggle('expanded');
                const toggle = this.querySelector('.principle-toggle');
                toggle.textContent = card.classList.contains('expanded') ? '−' : '+';
            });
            
            container.appendChild(card);
        });
    }
    
    // Initial render
    renderPrinciples();
    
    // Re-render when language changes
    document.addEventListener('languagechange', renderPrinciples);
    
    // Also monitor lang attribute changes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'lang') {
                renderPrinciples();
            }
        });
    });
    
    observer.observe(document.documentElement, { attributes: true });
}

/* ==========================================================================
   5. Four-Phase Cycle Diagram
   ========================================================================== */
function initCycleDiagram() {
    const container = document.querySelector('.cycle-diagram');
    if (!container) return;

    // Create advanced SVG cycle diagram
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 400 400");
    svg.setAttribute("class", "cycle-svg");
    svg.innerHTML = `
        <defs>
            <!-- Gradient definitions -->
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#F4D03F;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#D4AF37;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#B8860B;stop-opacity:1" />
            </linearGradient>
            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#5A9FD4;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#3A6B8C;stop-opacity:1" />
            </linearGradient>
            <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#3A6B8C;stop-opacity:0.3" />
                <stop offset="100%" style="stop-color:#3A6B8C;stop-opacity:1" />
            </linearGradient>

            <!-- Glow filters -->
            <filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur"/>
                <feFlood flood-color="#D4AF37" flood-opacity="0.6"/>
                <feComposite in2="blur" operator="in"/>
                <feMerge>
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
            <filter id="blueGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur"/>
                <feFlood flood-color="#3A6B8C" flood-opacity="0.5"/>
                <feComposite in2="blur" operator="in"/>
                <feMerge>
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>

            <!-- Arrow marker -->
            <marker id="arrowHead" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="url(#blueGradient)"/>
            </marker>
        </defs>

        <!-- Outer decorative rings -->
        <circle cx="200" cy="200" r="190" fill="none" stroke="#3A6B8C" stroke-width="1.5" stroke-dasharray="3,8" opacity="0.25">
            <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="120s" repeatCount="indefinite"/>
        </circle>
        <circle cx="200" cy="200" r="178" fill="none" stroke="#D4AF37" stroke-width="1.5" stroke-dasharray="5,10" opacity="0.2">
            <animateTransform attributeName="transform" type="rotate" from="360 200 200" to="0 200 200" dur="90s" repeatCount="indefinite"/>
        </circle>

        <!-- Main cycle path (animated) -->
        <circle cx="200" cy="200" r="145" fill="none" stroke="url(#blueGradient)" stroke-width="2.5" stroke-dasharray="15,8" opacity="0.5">
            <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="60s" repeatCount="indefinite"/>
        </circle>

        <!-- Flow arrows (curved paths between nodes) -->
        <g class="flow-arrows" opacity="0.8">
            <!-- 1 -> 2 -->
            <path d="M 250 65 Q 340 110 340 200" fill="none" stroke="url(#arrowGradient)" stroke-width="3" marker-end="url(#arrowHead)">
                <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite"/>
            </path>
            <!-- 2 -> 3 -->
            <path d="M 335 250 Q 300 350 200 360" fill="none" stroke="url(#arrowGradient)" stroke-width="3" marker-end="url(#arrowHead)">
                <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite" begin="0.5s"/>
            </path>
            <!-- 3 -> 4 -->
            <path d="M 150 355 Q 60 320 60 200" fill="none" stroke="url(#arrowGradient)" stroke-width="3" marker-end="url(#arrowHead)">
                <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite" begin="1s"/>
            </path>
            <!-- 4 -> 1 -->
            <path d="M 70 145 Q 100 50 200 40" fill="none" stroke="url(#arrowGradient)" stroke-width="3" marker-end="url(#arrowHead)">
                <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" repeatCount="indefinite" begin="1.5s"/>
            </path>
        </g>

        <!-- Connection lines to center (pulsing) -->
        <g class="center-connections" opacity="0.5">
            <line x1="200" y1="140" x2="200" y2="70" stroke="#D4AF37" stroke-width="1.5" stroke-dasharray="4,4">
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite"/>
            </line>
            <line x1="260" y1="200" x2="310" y2="200" stroke="#D4AF37" stroke-width="1.5" stroke-dasharray="4,4">
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" begin="0.75s"/>
            </line>
            <line x1="200" y1="260" x2="200" y2="330" stroke="#D4AF37" stroke-width="1.5" stroke-dasharray="4,4">
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" begin="1.5s"/>
            </line>
            <line x1="140" y1="200" x2="90" y2="200" stroke="#D4AF37" stroke-width="1.5" stroke-dasharray="4,4">
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" begin="2.25s"/>
            </line>
        </g>

        <!-- Phase nodes - larger and positioned closer to edges -->
        <g class="phase-node" data-phase="insight">
            <circle cx="200" cy="40" r="34" fill="#0A0F2C" stroke="url(#blueGradient)" stroke-width="3.5" filter="url(#blueGlow)"/>
            <circle cx="200" cy="40" r="24" fill="none" stroke="#3A6B8C" stroke-width="1.5" opacity="0.5"/>
            <text x="200" y="47" text-anchor="middle" fill="#FFFFFF" font-size="22" font-weight="bold">1</text>
        </g>

        <g class="phase-node" data-phase="modeling">
            <circle cx="360" cy="200" r="34" fill="#0A0F2C" stroke="url(#blueGradient)" stroke-width="3.5" filter="url(#blueGlow)"/>
            <circle cx="360" cy="200" r="24" fill="none" stroke="#3A6B8C" stroke-width="1.5" opacity="0.5"/>
            <text x="360" y="207" text-anchor="middle" fill="#FFFFFF" font-size="22" font-weight="bold">2</text>
        </g>

        <g class="phase-node" data-phase="refinement">
            <circle cx="200" cy="360" r="34" fill="#0A0F2C" stroke="url(#blueGradient)" stroke-width="3.5" filter="url(#blueGlow)"/>
            <circle cx="200" cy="360" r="24" fill="none" stroke="#3A6B8C" stroke-width="1.5" opacity="0.5"/>
            <text x="200" y="367" text-anchor="middle" fill="#FFFFFF" font-size="22" font-weight="bold">3</text>
        </g>

        <g class="phase-node" data-phase="verification">
            <circle cx="40" cy="200" r="34" fill="#0A0F2C" stroke="url(#blueGradient)" stroke-width="3.5" filter="url(#blueGlow)"/>
            <circle cx="40" cy="200" r="24" fill="none" stroke="#3A6B8C" stroke-width="1.5" opacity="0.5"/>
            <text x="40" y="207" text-anchor="middle" fill="#FFFFFF" font-size="22" font-weight="bold">4</text>
        </g>

        <!-- Center node (Technical Philosophy) - prominent golden core - larger -->
        <circle cx="200" cy="200" r="60" fill="#0A0F2C" stroke="url(#goldGradient)" stroke-width="5" filter="url(#goldGlow)"/>
        <circle cx="200" cy="200" r="50" fill="none" stroke="#D4AF37" stroke-width="1.5" opacity="0.6">
            <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="20s" repeatCount="indefinite"/>
        </circle>
        <circle cx="200" cy="200" r="42" fill="url(#goldGradient)" opacity="0.9"/>

        <!-- Aleph symbol in center - larger -->
        <text x="200" y="195" text-anchor="middle" fill="#0A0F2C" font-size="32" font-weight="bold" font-family="serif">א</text>
        <text x="200" y="220" text-anchor="middle" fill="#0A0F2C" font-size="11" font-weight="bold" opacity="0.8">
            <tspan data-lang="en">PHILOSOPHY</tspan>
            <tspan data-lang="zh" style="display:none;">哲学</tspan>
        </text>
    `;

    container.appendChild(svg);

    // Add interactivity to phase nodes
    svg.querySelectorAll('.phase-node').forEach(node => {
        node.style.cursor = 'pointer';
        node.addEventListener('mouseenter', function() {
            const phase = this.getAttribute('data-phase');
            document.querySelectorAll(`.phase-card[data-phase="${phase}"]`).forEach(card => {
                card.style.transform = 'scale(1.05)';
                card.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.3)';
                card.style.borderColor = '#D4AF37';
            });
        });

        node.addEventListener('mouseleave', function() {
            const phase = this.getAttribute('data-phase');
            document.querySelectorAll(`.phase-card[data-phase="${phase}"]`).forEach(card => {
                card.style.transform = '';
                card.style.boxShadow = '';
                card.style.borderColor = '';
            });
        });

        node.addEventListener('click', function() {
            const phase = this.getAttribute('data-phase');
            const card = document.querySelector(`.phase-card[data-phase="${phase}"]`);
            if (card) {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Visual feedback
                card.style.transform = 'scale(1.05)';
                card.style.boxShadow = '0 15px 50px rgba(0, 0, 0, 0.4)';
                card.style.borderColor = '#D4AF37';
                setTimeout(() => {
                    card.style.transform = '';
                    card.style.boxShadow = '';
                    card.style.borderColor = '';
                }, 1000);
            }
        });
    });

    // Update language-specific text in SVG when language changes
    function updateSVGLanguage() {
        const lang = document.documentElement.lang || 'en';
        svg.querySelectorAll('[data-lang]').forEach(element => {
            if (element.getAttribute('data-lang') === lang) {
                element.style.display = '';
            } else {
                element.style.display = 'none';
            }
        });
    }

    // Initial language update
    updateSVGLanguage();

    // Listen for language changes
    document.addEventListener('languagechange', updateSVGLanguage);
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'lang') {
                updateSVGLanguage();
            }
        });
    });
    observer.observe(document.documentElement, { attributes: true });
}

/* ==========================================================================
   6. Ecosystem Cards Interaction
   ========================================================================== */
function initEcosystemCards() {
    const cards = document.querySelectorAll('.ecosystem-card');
    
    cards.forEach(card => {
        // Hover effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
        
        // Click effect for under construction links
        const underConstruction = card.querySelector('.under-construction');
        if (underConstruction) {
            underConstruction.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Create a temporary notification
                const notification = document.createElement('div');
                notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #D4AF37;
                    color: #0A0F2C;
                    padding: 12px 20px;
                    border-radius: 8px;
                    font-weight: bold;
                    z-index: 10000;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                    animation: slideIn 0.3s ease;
                `;
                
                const lang = document.documentElement.lang || 'en';
                notification.textContent = lang === 'zh' ? 
                    '网站建设中，敬请期待！' : 
                    'Website under construction, coming soon!';
                
                document.body.appendChild(notification);
                
                // Remove after 3 seconds
                setTimeout(() => {
                    notification.style.animation = 'slideOut 0.3s ease';
                    setTimeout(() => {
                        document.body.removeChild(notification);
                    }, 300);
                }, 3000);
            });
        }
    });
}

/* ==========================================================================
   7. Back to Top Button
   ========================================================================== */
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    if (!backToTop) return;
    
    // Show/hide based on scroll position
    function updateBackToTopVisibility() {
        if (window.scrollY > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    }
    
    // Initial check
    updateBackToTopVisibility();
    
    // Update on scroll
    window.addEventListener('scroll', updateBackToTopVisibility);
    
    // Smooth scroll to top
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ==========================================================================
   8. Performance Optimizations
   ========================================================================== */
// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Any scroll-based calculations go here
}, 100));

// Apply debouncing to resize events
window.addEventListener('resize', debounce(function() {
    // Any resize-based calculations go here
}, 250));

/* ==========================================================================
   9. CSS Animations for Notifications
   ========================================================================== */
// Add keyframes for notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

/* ==========================================================================
   10. Error Handling & Fallbacks
   ========================================================================== */
// Global error handler
window.addEventListener('error', function(e) {
    console.error('Website error:', e.error);
    // In production, you might want to log this to an error tracking service
});

// Handle offline/online status
window.addEventListener('offline', function() {
    console.log('Network connection lost');
});

window.addEventListener('online', function() {
    console.log('Network connection restored');
});

// Check for required features
if (!('querySelector' in document) || !('addEventListener' in window)) {
    // Very old browser - show warning
    const warning = document.createElement('div');
    warning.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: #D4AF37;
        color: #0A0F2C;
        padding: 10px;
        text-align: center;
        font-weight: bold;
        z-index: 10000;
    `;
    warning.textContent = 'Please update your browser for the best experience';
    document.body.appendChild(warning);
}