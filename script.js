// ========================================
// SQUID GAME THEMED BACKGROUND ANIMATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initAnimatedBackground();
    initCanvas();
    initGeometricShapes();
    initSmoothScroll();
    initButtonEffects();
    initLightning();
    initDollAnimation();
    initScrollAnimations();
    initEventCardModals(); // NEW: Initialize modal functionality
});

// ========================================
// EVENT CARD MODAL FUNCTIONALITY
// ========================================

function initEventCardModals() {
    const eventCards = document.querySelectorAll('.event-card');
    
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    document.body.appendChild(modalOverlay);
    
    eventCards.forEach(card => {
        const cardHeader = card.querySelector('.card-header');
        
        // Create "Tap for Details" button
        const tapButton = document.createElement('div');
        tapButton.className = 'tap-details-btn';
        tapButton.innerHTML = `
            Tap for Details <span class="arrow">→</span>
        `;
        
        // Add button to card header
        cardHeader.appendChild(tapButton);
        
        // Make entire card clickable
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            openModal(card, modalOverlay);
        });
    });
    
    // Close modal when clicking overlay
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal(modalOverlay);
        }
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal(modalOverlay);
        }
    });
}

function openModal(card, modalOverlay) {
    // Get card details
    const eventName = card.querySelector('.card-header h3').textContent;
    const eventTiming = card.querySelector('.event-timing').textContent;
    const eventTeam = card.querySelector('.event-team').textContent;
    const cardDetails = card.querySelector('.card-details');
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal-close';
    closeBtn.innerHTML = '×';
    closeBtn.addEventListener('click', () => closeModal(modalOverlay));
    
    // Create modal header
    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';
    modalHeader.innerHTML = `
        <h3>${eventName}</h3>
        <p class="event-timing">${eventTiming}</p>
        <p class="event-team">${eventTeam}</p>
    `;
    
    // Create modal body
    const modalBody = document.createElement('div');
    modalBody.className = 'modal-body';
    modalBody.innerHTML = cardDetails.innerHTML;
    
    // Assemble modal
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    
    // Clear any existing content and add new modal
    modalOverlay.innerHTML = '';
    modalOverlay.appendChild(modalContent);
    
    // Show modal
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalOverlay) {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    
    // Remove modal content after animation
    setTimeout(() => {
        modalOverlay.innerHTML = '';
    }, 300);
}

// ========================================
// ANIMATED BACKGROUND LAYERS
// ========================================

function initAnimatedBackground() {
    const animatedBg = document.createElement('div');
    animatedBg.className = 'animated-bg';
    document.body.insertBefore(animatedBg, document.body.firstChild);
    
    const cloudLayer1 = document.createElement('div');
    cloudLayer1.className = 'cloud-layer';
    animatedBg.appendChild(cloudLayer1);
    
    const cloudLayer2 = document.createElement('div');
    cloudLayer2.className = 'cloud-layer-2';
    animatedBg.appendChild(cloudLayer2);
    
    const cloudLayer3 = document.createElement('div');
    cloudLayer3.className = 'cloud-layer-3';
    animatedBg.appendChild(cloudLayer3);
    
    const doll = document.createElement('div');
    doll.className = 'squid-doll';
    doll.innerHTML = `
        <img src="squid-doll.png" alt="Squid Game Doll" class="doll-image" />
    `;
    animatedBg.appendChild(doll);
    
    const vignette = document.createElement('div');
    vignette.className = 'vignette';
    animatedBg.appendChild(vignette);
    
    const spotlight = document.createElement('div');
    spotlight.className = 'spotlight';
    animatedBg.appendChild(spotlight);
    
    const spotlightGlow = document.createElement('div');
    spotlightGlow.className = 'spotlight-glow';
    animatedBg.appendChild(spotlightGlow);
    
    const lightning = document.createElement('div');
    lightning.className = 'lightning';
    lightning.id = 'lightning';
    animatedBg.appendChild(lightning);
}

// ========================================
// DOLL ANIMATION (RED/GREEN + BLINK)
// ========================================

function initDollAnimation() {
    const doll = document.querySelector('.squid-doll');
    const lightning = document.getElementById('lightning');
    if (!doll) return;

    let isRedLight = false;

    function cycleDoll() {
        const waitTime = Math.random() * 3000 + 4000;

        setTimeout(() => {
            isRedLight = !isRedLight;

            doll.classList.add('blink');
            setTimeout(() => doll.classList.remove('blink'), 350);

            if (isRedLight) {
                if (lightning) {
                    lightning.style.background = 'rgba(255, 8, 68, 0.25)';
                    lightning.style.opacity = '1';

                    setTimeout(() => {
                        lightning.style.opacity = '0';
                        lightning.style.background = 'transparent';
                    }, 500);
                }

                doll.classList.add('red');
                doll.classList.remove('green');

            } else {
                if (lightning) {
                    lightning.style.background = 'rgba(0, 255, 135, 0.2)';
                    lightning.style.opacity = '1';

                    setTimeout(() => {
                        lightning.style.opacity = '0';
                        lightning.style.background = 'transparent';
                    }, 500);
                }

                doll.classList.add('green');
                doll.classList.remove('red');
            }

            cycleDoll();
        }, waitTime);
    }

    doll.classList.add('green');
    setTimeout(cycleDoll, 3000);
}

// ========================================
// LIGHTNING EFFECTS
// ========================================

function initLightning() {
    const lightning = document.getElementById('lightning');
    if (!lightning) return;
    
    function createLightning() {
        const nextStrike = Math.random() * 5000 + 3000;
        
        setTimeout(() => {
            lightning.style.background = 'rgba(247, 66, 111, 0.3)';
            lightning.style.opacity = '1';
            
            setTimeout(() => {
                lightning.style.opacity = '0';
            }, 100);
            
            setTimeout(() => {
                lightning.style.background = 'rgba(247, 66, 111, 0.4)';
                lightning.style.opacity = '1';
                
                setTimeout(() => {
                    lightning.style.opacity = '0';
                    lightning.style.background = 'transparent';
                }, 80);
            }, 200);
            
            createLightning();
        }, nextStrike);
    }
    
    setTimeout(createLightning, 3000);
}

// ========================================
// CANVAS PARTICLE SYSTEM
// ========================================

function initCanvas() {
    const canvas = document.createElement('canvas');
    canvas.id = 'bg-canvas';
    document.body.insertBefore(canvas, document.body.firstChild.nextSibling);
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    class Particle {
        constructor() {
            this.reset();
            this.y = Math.random() * canvas.height;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = -10;
            this.size = Math.random() * 3 + 1;
            this.speedY = Math.random() * 0.5 + 0.2;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.5 + 0.2;
            
            const colors = ['#f7426f', '#00d9c0', '#00ff87', '#ff0844'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
            
            this.shape = Math.floor(Math.random() * 3);
        }
        
        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            
            if (this.y > canvas.height + 10) {
                this.reset();
            }
            
            this.opacity = 0.3 + Math.sin(Date.now() * 0.001 + this.x) * 0.2;
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 2;
            
            switch(this.shape) {
                case 0:
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                    break;
                    
                case 1:
                    ctx.beginPath();
                    ctx.moveTo(this.x, this.y - this.size);
                    ctx.lineTo(this.x - this.size, this.y + this.size);
                    ctx.lineTo(this.x + this.size, this.y + this.size);
                    ctx.closePath();
                    ctx.fill();
                    break;
                    
                case 2:
                    ctx.fillRect(this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
                    break;
            }
            
            ctx.restore();
        }
    }
    
    const particleCount = window.innerWidth < 768 ? 40 : 100;
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function drawConnections() {
        ctx.save();
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.globalAlpha = (1 - distance / 150) * 0.15;
                    ctx.strokeStyle = '#f7426f';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        ctx.restore();
    }
    
    function animate() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        drawConnections();
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    let mouse = { x: null, y: null, radius: 150 };
    
    canvas.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
        
        particles.forEach(particle => {
            const dx = mouse.x - particle.x;
            const dy = mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouse.radius) {
                const force = (mouse.radius - distance) / mouse.radius;
                const angle = Math.atan2(dy, dx);
                particle.x -= Math.cos(angle) * force * 3;
                particle.y -= Math.sin(angle) * force * 3;
            }
        });
    });
    
    canvas.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });
}

// ========================================
// GEOMETRIC SHAPES
// ========================================

function initGeometricShapes() {
    const shapesContainer = document.createElement('div');
    shapesContainer.className = 'geometric-shapes';
    document.body.insertBefore(shapesContainer, document.body.firstChild);
    
    const shapes = [
        { class: 'circle', delay: 0 },
        { class: 'triangle', delay: 1 },
        { class: 'square', delay: 2 },
        { class: 'circle-2', delay: 3 },
        { class: 'triangle-2', delay: 4 },
        { class: 'square-2', delay: 5 }
    ];
    
    shapes.forEach(shape => {
        const div = document.createElement('div');
        div.className = `shape ${shape.class}`;
        div.style.animationDelay = `${shape.delay}s`;
        shapesContainer.appendChild(div);
    });
    
    const gridOverlay = document.createElement('div');
    gridOverlay.className = 'grid-overlay';
    document.body.insertBefore(gridOverlay, document.body.firstChild);
}

// ========================================
// SMOOTH SCROLL
// ========================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========================================
// SCROLL ANIMATIONS FOR TIMELINE
// ========================================

function initScrollAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// ========================================
// BUTTON EFFECTS
// ========================================

function initButtonEffects() {
    const registerBtn = document.getElementById('register-btn');
    
    if (registerBtn) {
        registerBtn.addEventListener('click', () => {
            triggerBombExplosion();
            
            setTimeout(() => {
                window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSfM2fvAd18VqrETj4iOcd8sHPangCXd18MYV76sHZGPAttJag/viewform?usp=sharing&ouid=104229856726734096506';
            }, 1500);
        });
    }
    
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '100';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
}

// ========================================
// BOMB EXPLOSION ANIMATION
// ========================================

function triggerBombExplosion() {
    const explosionContainer = document.createElement('div');
    explosionContainer.className = 'explosion-container active';
    document.body.appendChild(explosionContainer);
    
    const whiteFlash = document.createElement('div');
    whiteFlash.className = 'white-flash active';
    document.body.appendChild(whiteFlash);
    
    document.body.classList.add('shake');
    setTimeout(() => {
        document.body.classList.remove('shake');
    }, 500);
    
    const flash = document.createElement('div');
    flash.className = 'explosion-flash';
    explosionContainer.appendChild(flash);
    
    for (let i = 0; i < 4; i++) {
        const shockwave = document.createElement('div');
        shockwave.className = 'shockwave';
        explosionContainer.appendChild(shockwave);
    }
    
    const particleCount = 40;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'explosion-particle';
        
        const angle = (Math.PI * 2 * i) / particleCount;
        const distance = 200 + Math.random() * 300;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        
        const colors = ['#f7426f', '#ff0844', '#00d9c0', '#00ff87'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.width = `${4 + Math.random() * 8}px`;
        particle.style.height = particle.style.width;
        
        explosionContainer.appendChild(particle);
    }
    
    const lightning = document.getElementById('lightning');
    if (lightning) {
        lightning.style.background = 'rgba(255, 255, 255, 0.8)';
        lightning.style.opacity = '1';
        setTimeout(() => {
            lightning.style.background = 'rgba(247, 66, 111, 0.6)';
        }, 100);
        setTimeout(() => {
            lightning.style.opacity = '0';
            lightning.style.background = 'transparent';
        }, 400);
    }
    
    setTimeout(() => {
        explosionContainer.remove();
        whiteFlash.remove();
    }, 1500);
}

// ========================================
// TITLE GLITCH EFFECT
// ========================================

function glitchTitle() {
    const title = document.querySelector('.logo h1');
    if (!title) return;
    
    setInterval(() => {
        if (Math.random() > 0.95) {
            title.style.textShadow = `
                ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #f7426f,
                ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #00d9c0
            `;
            
            setTimeout(() => {
                title.style.textShadow = '0 0 60px rgba(247, 66, 111, 0.5)';
            }, 50);
        }
    }, 100);
}

glitchTitle();

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

if (window.innerWidth < 768) {
    document.querySelectorAll('.shape').forEach(shape => {
        shape.style.opacity = '0.06';
    });
}

document.addEventListener('visibilitychange', () => {
    const canvas = document.getElementById('bg-canvas');
    if (document.hidden) {
        if (canvas) canvas.style.animationPlayState = 'paused';
    } else {
        if (canvas) canvas.style.animationPlayState = 'running';
    }
});