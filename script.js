document.addEventListener("DOMContentLoaded", () => {

    let loadCount = 0;
    const percentEl = document.querySelector('.loader-percent');
    const loaderEl = document.querySelector('.loader');

    const loadInterval = setInterval(() => {
        loadCount += Math.floor(Math.random() * 5) + 1;
        if(loadCount >= 100) {
            loadCount = 100;
            clearInterval(loadInterval);
            percentEl.textContent = '100%';
            setTimeout(() => {
                loaderEl.classList.add('loaded');
                setTimeout(() => loaderEl.style.display = 'none', 1200);
            }, 200);
        } else {
            percentEl.textContent = loadCount.toString().padStart(2, '0') + '%';
        }
    }, 40);

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorCircle = document.querySelector('.cursor-circle');
    const cursorText = document.querySelector('.cursor-text');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let circleX = mouseX;
    let circleY = mouseY;

    if (!isTouch) {
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
            cursorText.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
        });

        const loop = () => {
            circleX += (mouseX - circleX) * 0.15;
            circleY += (mouseY - circleY) * 0.15;
            cursorCircle.style.transform = `translate(${circleX}px, ${circleY}px) translate(-50%, -50%)`;
            requestAnimationFrame(loop);
        };
        loop();

        document.querySelectorAll('.hover-img').forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover-img'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover-img'));
        });

        document.querySelectorAll('.hover-text, a, button').forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover-text'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover-text'));
        });
    } else {
        cursorDot.style.display = 'none';
        cursorCircle.style.display = 'none';
        cursorText.style.display = 'none';
    }

    const menuBtn = document.querySelector('.menu-btn');
    const navOverlay = document.querySelector('.nav-overlay');
    const navLinks = document.querySelectorAll('.nav-link');
    let navOpen = false;

    menuBtn.addEventListener('click', () => {
        navOpen = !navOpen;
        navOverlay.classList.toggle('active');
        menuBtn.textContent = navOpen ? 'CLOSE' : 'MENU';
        if(navOpen) {
            menuBtn.style.color = 'var(--bg-color)';
        } else {
            menuBtn.style.color = '';
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navOpen = false;
            navOverlay.classList.remove('active');
            menuBtn.textContent = 'MENU';
            menuBtn.style.color = '';
        });
    });

    const hero = document.querySelector('#hero');
    const heroVisual = document.querySelector('.hero-visual');
    const heroTitleSpans = document.querySelectorAll('.hero-title span');

    if (!isTouch) {
        hero.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;

            heroVisual.style.transform = `translate3d(${x * -30}px, ${y * -30}px, 0) rotateX(${y * -10}deg) rotateY(${x * 10}deg)`;

            heroTitleSpans[0].style.transform = `translate3d(${x * 20}px, ${y * 20}px, 0)`;
            heroTitleSpans[1].style.transform = `translate3d(5vw, 0, 0) translate3d(${x * -10}px, ${y * -10}px, 0)`;
            heroTitleSpans[2].style.transform = `translate3d(${x * 30}px, ${y * 30}px, 0)`;
        });
    }

    const objectSection = document.querySelector('#object');
    const objWrapper = document.getElementById('3d-object');

    if(!isTouch) {
        objectSection.addEventListener('mousemove', (e) => {
            const rect = objectSection.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

            objWrapper.style.setProperty('--rot-x', `${y * -30}deg`);
            objWrapper.style.setProperty('--rot-y', `${x * 30}deg`);
        });
        objectSection.addEventListener('mouseleave', () => {
            objWrapper.style.setProperty('--rot-x', `0deg`);
            objWrapper.style.setProperty('--rot-y', `0deg`);
        });
    }


    const motionSection = document.querySelector('.motion-section');
    const motionTrack = document.querySelector('.motion-track');

    const splitTextEl = document.getElementById('split-text');
    const words = splitTextEl.textContent.trim().split(' ');
    splitTextEl.innerHTML = '';

    const charElements = [];
    words.forEach((word, wordIndex) => {
        const wordSpan = document.createElement('span');
        wordSpan.classList.add('typo-word');

        word.split('').forEach((char, charIndex) => {
            const charSpan = document.createElement('span');
            charSpan.textContent = char;
            charSpan.classList.add('typo-char');
            wordSpan.appendChild(charSpan);
            charElements.push({
                el: charSpan,
                speed: Math.random() * 2 + 0.5,
                rotation: (Math.random() - 0.5) * 30
            });
        });

        splitTextEl.appendChild(wordSpan);
        if (wordIndex < words.length - 1) {
            splitTextEl.appendChild(document.createTextNode(' '));
        }
    });


    window.addEventListener('scroll', () => {

        if (window.innerWidth > 768) {
            const motionRect = motionSection.getBoundingClientRect();
            const sectionTop = motionRect.top;
            const sectionHeight = motionRect.height - window.innerHeight;

            if (sectionTop <= 0 && sectionTop >= -sectionHeight) {
                const progress = Math.abs(sectionTop) / sectionHeight;
                const maxScroll = motionTrack.scrollWidth - window.innerWidth;
                motionTrack.style.transform = `translate3d(-${progress * maxScroll}px, 0, 0)`;
            } else if (sectionTop > 0) {
                motionTrack.style.transform = `translate3d(0, 0, 0)`;
            } else {
                const maxScroll = motionTrack.scrollWidth - window.innerWidth;
                motionTrack.style.transform = `translate3d(-${maxScroll}px, 0, 0)`;
            }
        }

        const typoRect = splitTextEl.getBoundingClientRect();
        if (typoRect.top < window.innerHeight && typoRect.bottom > 0) {
            const viewCenter = window.innerHeight / 2;
            const elCenter = typoRect.top + (typoRect.height / 2);
            const distFromCenter = (elCenter - viewCenter) / viewCenter;

            charElements.forEach((item) => {
                const yMove = distFromCenter * 50 * item.speed;
                const rotMove = distFromCenter * item.rotation;
                const scaleY = 1 + Math.abs(distFromCenter * 0.5 * item.speed);
                const opacity = 1 - Math.abs(distFromCenter * 0.5);

                item.el.style.transform = `translate3d(0, ${yMove}px, 0) rotate(${rotMove}deg) scaleY(${scaleY})`;
                item.el.style.opacity = Math.max(0.1, opacity);
            });
        }
    });

    const archiveItems = document.querySelectorAll('.archive-item');
    const previewContainer = document.getElementById('archive-preview');
    const previewImg = document.getElementById('archive-preview-img');

    if(!isTouch) {
        let previewX = window.innerWidth / 2;
        let previewY = window.innerHeight / 2;
        let tgtPreviewX = previewX;
        let tgtPreviewY = previewY;

        const animatePreview = () => {
            previewX += (tgtPreviewX - previewX) * 0.1;
            previewY += (tgtPreviewY - previewY) * 0.1;
            previewContainer.style.left = `${previewX}px`;
            previewContainer.style.top = `${previewY}px`;
            requestAnimationFrame(animatePreview);
        }
        animatePreview();

        archiveItems.forEach(item => {
            item.addEventListener('mouseenter', (e) => {
                const imgUrl = item.getAttribute('data-image');
                previewImg.src = imgUrl;
                previewContainer.classList.add('is-active');
                document.body.classList.add('cursor-hover-text');
            });

            item.addEventListener('mousemove', (e) => {
                tgtPreviewX = e.clientX;
                tgtPreviewY = e.clientY;
            });

            item.addEventListener('mouseleave', () => {
                previewContainer.classList.remove('is-active');
                document.body.classList.remove('cursor-hover-text');
            });
        });
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('in-view');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const statementSec = document.querySelector('#statement');
    if(statementSec) observer.observe(statementSec);

    window.addEventListener('resize', () => {
        if(window.innerWidth <= 768) {
            motionTrack.style.transform = 'none';
        }
    });

});