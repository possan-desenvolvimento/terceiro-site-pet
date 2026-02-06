// Template 3 - PetLux (JavaScript Premium)

document.addEventListener('DOMContentLoaded', function() {
    // ========== PRELOADER ==========
    const preloader = document.querySelector('.preloader');
    
    setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500);
    
    // ========== MENU MOBILE ==========
    const menuToggle = document.querySelector('.menu-toggle');
    const hamburger = document.querySelector('.hamburger');
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navContainer.classList.toggle('active');
            document.body.style.overflow = navContainer.classList.contains('active') ? 'hidden' : '';
        });
        
        // Fecha menu ao clicar em um link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navContainer.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Fecha menu ao clicar fora
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.navbar') && navContainer.classList.contains('active')) {
                hamburger.classList.remove('active');
                navContainer.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // ========== SLIDES DO HERO ==========
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Inicia slideshow se houver slides
    if (slides.length > 1) {
        setInterval(nextSlide, 5000);
    }
    
    // ========== GALERIA DE ESPAÇOS ==========
    const galleryItems = document.querySelectorAll('.gallery-item');
    const navButtons = document.querySelectorAll('.nav-btn');
    
    if (galleryItems.length > 0 && navButtons.length > 0) {
        navButtons.forEach(button => {
            button.addEventListener('click', function() {
                const target = this.getAttribute('data-target');
                
                // Remove active de todos
                galleryItems.forEach(item => item.classList.remove('active'));
                navButtons.forEach(btn => btn.classList.remove('active'));
                
                // Adiciona active no target
                const targetItem = document.querySelector(`[data-space="${target}"]`);
                if (targetItem) {
                    targetItem.classList.add('active');
                }
                this.classList.add('active');
            });
        });
    }
    
    // ========== FORMULÁRIO DE RESERVA ==========
    const reservationForm = document.getElementById('reservationForm');
    
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Coletar dados
            const formData = {
                name: this.querySelector('#name').value,
                phone: this.querySelector('#phone').value,
                email: this.querySelector('#email').value,
                pet: this.querySelector('#pet').value,
                service: this.querySelector('#service').value,
                message: this.querySelector('#message').value
            };
            
            // Validar
            if (!formData.name || !formData.phone || !formData.email || !formData.pet || !formData.service) {
                showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }
            
            // Formatar mensagem WhatsApp
            const phone = '5511999998888'; // SUBSTITUIR
            const message = `🏆 SOLICITAÇÃO DE AGENDAMENTO - PETLUX 🏆

👑 Dados do Cliente:
Nome: ${formData.name}
WhatsApp: ${formData.phone}
E-mail: ${formData.email}

🐾 Dados do Pet:
Nome: ${formData.pet}

🎯 Serviço de Interesse:
${formData.service}

📝 Observações:
${formData.message || 'Nenhuma observação adicional.'}

💎 Agendado via Site PetLux`;
            
            // Abrir WhatsApp
            window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
            
            // Mostrar notificação
            showNotification('Solicitação enviada! Abrindo WhatsApp para confirmação...', 'success');
            
            // Resetar formulário
            reservationForm.reset();
        });
        
        // Função de notificação
        function showNotification(message, type) {
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.innerHTML = `
                <div class="notification-content">
                    <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                    <span>${message}</span>
                </div>
            `;
            
            document.body.appendChild(notification);
            
            // Estilos da notificação
            notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: ${type === 'success' ? 'var(--gold)' : '#ff6b6b'};
                color: var(--dark);
                padding: 15px 25px;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                z-index: 10000;
                animation: slideIn 0.3s ease-out;
            `;
            
            notification.querySelector('.notification-content').style.cssText = `
                display: flex;
                align-items: center;
                gap: 10px;
                font-weight: 500;
            `;
            
            // Remove após 5 segundos
            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease-out';
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }, 5000);
            
            // Animação CSS
            const style = document.createElement('style');
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // ========== VALIDAÇÃO E FORMATAÇÃO DE TELEFONE ==========
    const phoneInput = document.getElementById('phone');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            
            if (value.length > 11) {
                value = value.substring(0, 11);
            }
            
            if (value.length > 10) {
                this.value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
            } else if (value.length > 6) {
                this.value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
            } else if (value.length > 2) {
                this.value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
            } else if (value.length > 0) {
                this.value = value.replace(/^(\d*)/, '($1');
            }
        });
    }
    
    // ========== ANO ATUAL NO FOOTER ==========
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('currentYear');
    
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
    
    // ========== WHATSAPP FLOAT ==========
    const whatsappFloat = document.querySelector('.whatsapp-float');
    
    if (whatsappFloat) {
        whatsappFloat.addEventListener('click', function(e) {
            e.preventDefault();
            const phone = '5511999998888'; // SUBSTITUIR
            const message = 'Olá! Gostaria de informações sobre os serviços premium da PetLux.';
            window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
        });
    }
    
    // ========== SCROLL SUAVE ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    // Fecha menu mobile se aberto
                    if (navContainer && navContainer.classList.contains('active')) {
                        hamburger.classList.remove('active');
                        navContainer.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                    
                    // Scroll suave
                    window.scrollTo({
                        top: target.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ========== ANIMAÇÃO AO SCROLL ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const animateElements = document.querySelectorAll('.experience-card, .service-item, .product-card, .contact-item');
    animateElements.forEach(el => observer.observe(el));
    
    // ========== NAVEGAÇÃO ATIVA NO SCROLL ==========
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Inicial
    
    // ========== NEWSLETTER FORM ==========
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (!email || !email.includes('@')) {
                alert('Por favor, insira um e-mail válido.');
                return;
            }
            
            // Simular envio
            this.querySelector('input').value = '';
            alert('Obrigado por se inscrever! Você receberá nossas novidades em breve.');
        });
    }
    
    // ========== EFEITO PARALLAX NO HERO ==========
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // ========== CONTADOR ANIMADO (OPCIONAL) ==========
    setTimeout(() => {
        const counterSection = document.createElement('div');
        counterSection.className = 'luxury-counter';
        counterSection.innerHTML = `
            <div style="
                background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(139, 95, 191, 0.1));
                border: 1px solid rgba(212, 175, 55, 0.2);
                border-radius: 20px;
                padding: 50px 30px;
                margin: 60px 0;
                text-align: center;
            ">
                <h3 style="
                    font-family: 'Playfair Display', serif;
                    font-size: 2rem;
                    color: var(--gold);
                    margin-bottom: 40px;
                ">Nossos Números de Excelência</h3>
                
                <div style="
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 30px;
                ">
                    <div class="counter-item">
                        <div class="counter-number" data-target="1500">0</div>
                        <p style="color: var(--text-light); margin-top: 10px;">Pets de Alto Padrão Atendidos</p>
                    </div>
                    <div class="counter-item">
                        <div class="counter-number" data-target="98">0</div>
                        <p style="color: var(--text-light); margin-top: 10px;">Índice de Satisfação</p>
                    </div>
                    <div class="counter-item">
                        <div class="counter-number" data-target="50">0</div>
                        <p style="color: var(--text-light); margin-top: 10px;">Especialistas Certificados</p>
                    </div>
                    <div class="counter-item">
                        <div class="counter-number" data-target="24">0</div>
                        <p style="color: var(--text-light); margin-top: 10px;">Horas de Monitoramento</p>
                    </div>
                </div>
            </div>
        `;
        
        // Inserir após experiência
        const experienceSection = document.querySelector('.experience');
        if (experienceSection) {
            experienceSection.parentNode.insertBefore(counterSection, experienceSection.nextSibling);
            
            // Animar contadores
            setTimeout(() => {
                const counters = document.querySelectorAll('.counter-number');
                const speed = 200;
                
                counters.forEach(counter => {
                    const updateCount = () => {
                        const target = +counter.getAttribute('data-target');
                        const count = +counter.innerText;
                        const increment = target / speed;
                        
                        if (count < target) {
                            counter.innerText = Math.ceil(count + increment);
                            setTimeout(updateCount, 10);
                        } else {
                            counter.innerText = target + '+';
                        }
                    };
                    
                    updateCount();
                });
            }, 500);
        }
    }, 1000);
    
    // ========== EFEITO DE DIGITAÇÃO NO HERO (OPCIONAL) ==========
    const heroTitle = document.querySelector('.hero-title .highlight');
    
    if (heroTitle && window.innerWidth > 768) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Inicia após carregamento
        setTimeout(typeWriter, 2000);
    }
});