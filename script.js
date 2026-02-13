// script.js

// --- Global Variables ---
let bgMusic1 = document.getElementById('bg-music-1');
let bgMusic2 = document.getElementById('bg-music-2');
let currentSongAudio = null;
let currentFadeInterval = null;
let isMusic2Playing = false; 

// --- Page 12 Variables ---
let rotationAngle = 0; // Tracks the ring rotation
let animationFrameId = null; // For smooth animation

window.onload = function() {
    // 1. Load Audio
    bgMusic1.src = assets.bgMusic1;
    bgMusic2.src = assets.bgMusic2;
    bgMusic2.loop = true; 

    // 2. Load Images
    document.getElementById('p7-rose-tap').src = assets.image_3;
    document.getElementById('p7-seal-btn').src = assets.image_6;
    document.getElementById('p8-embedded-rose').src = assets.image_3;
    document.getElementById('p9-next-heart').src = assets.image_4;
    document.getElementById('p10-paper-bg').src = assets.image_7;

    // 3. Set Backgrounds
    document.getElementById('page8').style.backgroundImage = `url('${assets.image_5}')`;
    document.getElementById('page11').style.backgroundImage = `url('${assets.image_8}')`;

    initPage1();
};

function goToPage(from, to) {
    document.getElementById(from).classList.add('hidden');
    document.getElementById(to).classList.remove('hidden');

    if(to === 'page2') initPage2();
    if(to === 'page3') initPage3();
    if(to === 'page4') initPage4();
    if(to === 'page5') initPage5();
    if(to === 'page6') initPage6();
    if(to === 'page7') initPage7();
    if(to === 'page9') switchMusicTo2();
    if(to === 'page12') initPage12();
}

// --- Page 1 ---
function initPage1() {
    document.getElementById('yes-btn').onclick = () => {
        bgMusic1.volume = 1;
        bgMusic1.play().catch(e => console.log("Audio waiting for interaction"));
        goToPage('page1', 'page2');
    };
    const noBtn = document.getElementById('no-btn');
    const moveNo = () => {
        noBtn.style.position = 'absolute';
        noBtn.style.left = Math.random() * 80 + '%';
        noBtn.style.top = Math.random() * 80 + '%';
    };
    noBtn.onmouseover = moveNo;
    noBtn.ontouchstart = moveNo;
}

// --- Page 2 (Counter) ---
function initPage2() {
    let count = 0;
    const target = 120;
    const timerDisplay = document.getElementById('timer');
    const nextBtn = document.querySelector('#page2 .next-btn');

    nextBtn.style.opacity = "0";
    nextBtn.style.pointerEvents = "none";

    const interval = setInterval(() => {
        timerDisplay.innerText = `${count} Days`;
        if (count >= target) {
            clearInterval(interval);
            nextBtn.style.opacity = "1";
            nextBtn.style.pointerEvents = "auto";
            nextBtn.style.transition = "opacity 0.5s ease";
            nextBtn.onclick = () => goToPage('page2', 'page3');
        }
        count++;
    }, 20);
}

// --- Page 3 ---
function initPage3() {
    document.getElementById('seal-trigger').onclick = () => {
        document.getElementById('wax-seal-container').classList.add('hidden');
        document.getElementById('letter-content').classList.remove('hidden');
    };
}

// --- Page 4 ---
function initPage4() {
    const circle = document.getElementById('hold-circle');
    let holdTimer;
    const startHold = () => {
        circle.style.transform = 'scale(0.9)';
        holdTimer = setTimeout(() => goToPage('page4', 'page5'), 2000);
    };
    const endHold = () => {
        circle.style.transform = 'scale(1)';
        clearTimeout(holdTimer);
    };
    circle.onmousedown = startHold;
    circle.onmouseup = endHold;
    circle.ontouchstart = startHold;
    circle.ontouchend = endHold;
}

// --- Page 5 ---
function initPage5() {
    const canvas = document.getElementById('frost-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.fillRect(0,0, canvas.width, canvas.height);

    let cleared = 0;
    const scratch = (x, y) => {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, Math.PI * 2);
        ctx.fill();
        cleared++;
        if(cleared > 150) setTimeout(() => goToPage('page5', 'page6'), 500);
    };
    canvas.onmousemove = (e) => scratch(e.clientX, e.clientY);
    canvas.ontouchmove = (e) => scratch(e.touches[0].clientX, e.touches[0].clientY);
}

// --- Page 6 (Timer) ---
function initPage6() {
    let timePassed = 0;
    const targetTime = 103; 
    const timerDisplay = document.getElementById('rose-gold-timer');
    timerDisplay.innerText = "00:00";

    const interval = setInterval(() => {
        timePassed++;
        let m = Math.floor(timePassed / 60);
        let s = timePassed % 60;
        timerDisplay.innerText = `0${m}:${s < 10 ? '0'+s : s}`;

        if(timePassed >= targetTime) {
            clearInterval(interval);
            const btnContainer = document.getElementById('p6-secret-buttons');
            btnContainer.classList.remove('hidden');
            for(let i=0; i<10; i++) {
                const btn = document.createElement('button');
                btn.className = 'love-btn-p6';
                btn.innerText = "I love you";
                btn.style.left = Math.random() * 80 + 10 + '%';
                btn.style.top = Math.random() * 80 + 10 + '%';
                btn.onclick = () => goToPage('page6', 'page7');
                btnContainer.appendChild(btn);
            }
        }
    }, 1000);
}

// --- Page 7 (Wilted Rose) ---
function initPage7() {
    let taps = 0;
    document.getElementById('p7-rose-tap').onclick = () => {
        taps++;
        if(taps >= 16) {
            document.getElementById('p7-stage1').classList.add('hidden');
            document.getElementById('p7-stage2').classList.remove('hidden');
            const container = document.getElementById('p7-stage2');
            for(let i=0; i<30; i++) {
                let img = document.createElement('img');
                img.src = assets.image_3;
                img.style.position = 'absolute';
                img.style.width = '60px';
                img.style.left = Math.random() * 90 + '%';
                img.style.top = Math.random() * 90 + '%';
                img.onclick = startP7Wilt;
                container.appendChild(img);
            }
        }
    };
}

function startP7Wilt() {
    document.querySelectorAll('#p7-stage2 img').forEach(img => img.classList.add('wilted'));
    setTimeout(() => {
        document.getElementById('p7-stage3').classList.remove('hidden');
        setupBucket();
    }, 1000);
}

function setupBucket() {
    const bucket = document.getElementById('p7-bucket');
    let attempts = 0;
    const handleStart = (clientX) => {
        let startX = clientX;
        const handleMove = (moveX) => {
            let dx = (moveX - startX) * 0.1;
            bucket.style.transform = `translateX(${dx}px)`;
        };
        const handleEnd = () => {
            bucket.style.transform = 'translateX(0px)';
            attempts++;
            if(attempts >= 5) {
                document.getElementById('p7-stage3').classList.add('hidden');
                document.getElementById('p7-stage4').classList.remove('hidden');
            }
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('touchmove', touchMoveHandler);
        };
        const mouseMoveHandler = (e) => handleMove(e.clientX);
        const touchMoveHandler = (e) => handleMove(e.touches[0].clientX);
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('touchmove', touchMoveHandler);
        document.addEventListener('mouseup', handleEnd, {once:true});
        document.addEventListener('touchend', handleEnd, {once:true});
    };
    bucket.onmousedown = (e) => handleStart(e.clientX);
    bucket.ontouchstart = (e) => handleStart(e.touches[0].clientX);
}

document.getElementById('p7-seal-btn').onclick = () => goToPage('page7', 'page8');
document.getElementById('p8-accept-btn').onclick = () => goToPage('page8', 'page9');

// --- Page 9 (Music Transition) ---
function switchMusicTo2() {
    if (isMusic2Playing) return;

    const fadeOutInterval = setInterval(() => {
        if (bgMusic1.volume > 0.05) {
            bgMusic1.volume -= 0.05; 
        } else {
            bgMusic1.volume = 0;
            bgMusic1.pause();
            clearInterval(fadeOutInterval);
            
            bgMusic2.volume = 0;
            bgMusic2.play().catch(e => console.log("Music 2 blocked: " + e));
            
            const fadeInInterval = setInterval(() => {
                if (bgMusic2.volume < 0.95) {
                    bgMusic2.volume += 0.05;
                } else {
                    bgMusic2.volume = 1;
                    isMusic2Playing = true; 
                    clearInterval(fadeInInterval);
                }
            }, 100);
        }
    }, 50);

    document.querySelector('.heart-seal').onclick = () => {
        document.getElementById('p9-seal-container').classList.add('hidden');
        document.getElementById('p9-message-box').classList.remove('hidden');
    };
    document.getElementById('p9-next-heart').onclick = () => goToPage('page9', 'page10');
}

// --- Page 10 & 11 ---
document.getElementById('p10-seal-btn').onclick = () => {
    document.getElementById('p10-seal-btn').classList.add('hidden');
    document.getElementById('p10-final-msg').classList.remove('hidden');
};
document.getElementById('p10-final-msg').onclick = () => goToPage('page10', 'page11');
document.getElementById('p11-send-btn').onclick = () => {
    if(document.getElementById('p11-answer').value.trim()) goToPage('page11', 'page12');
};

// ===============================================
// PAGE 12: THE PERFECT CAROUSEL (Revised)
// ===============================================

function initPage12() {
    fadeAudio(bgMusic2, 0, () => bgMusic2.pause());
    createMusicRing();
    setupRingInteraction();
    updateRingVisuals(); // Initial Render
}

function createMusicRing() {
    const container = document.getElementById('song-sphere');
    container.innerHTML = ''; 
    
    // The "Our Forever" Text
    const title = document.createElement('h1');
    title.className = "our-forever-title";
    title.innerText = "Our Forever.";
    container.appendChild(title);

    musicLibrary.forEach((song, i) => {
        const el = document.createElement('div');
        el.className = 'song-node';
        el.style.backgroundImage = `url('${song.cover}')`;
        el.dataset.index = i; // Store index for calculation

        // Click Event (Only works if active, handled by CSS pointer-events)
        el.onclick = (e) => {
            e.stopPropagation();
            playUniverseSong(i);
        };
        container.appendChild(el);
    });
}

function setupRingInteraction() {
    const container = document.getElementById('page12');
    let startX = 0;
    let isDragging = false;
    let lastRotation = 0;

    // Helper to handle drag logic
    const handleStart = (x) => {
        isDragging = true;
        startX = x;
        // Pause auto-spin if you add one later
    };

    const handleMove = (x) => {
        if (!isDragging) return;
        const delta = x - startX;
        // Sensitivity: divide by window width to control speed
        const sensitivity = 0.005; 
        rotationAngle = lastRotation + (delta * sensitivity);
        updateRingVisuals();
    };

    const handleEnd = () => {
        isDragging = false;
        lastRotation = rotationAngle;
    };

    // Touch Events
    container.ontouchstart = (e) => handleStart(e.touches[0].clientX);
    container.ontouchmove = (e) => handleMove(e.touches[0].clientX);
    container.ontouchend = handleEnd;

    // Mouse Events
    container.onmousedown = (e) => handleStart(e.clientX);
    container.onmousemove = (e) => handleMove(e.clientX);
    container.onmouseup = handleEnd;
}

function updateRingVisuals() {
    const nodes = document.querySelectorAll('.song-node');
    const radius = 250; 
    const total = nodes.length;

    nodes.forEach((node, i) => {
        // Calculate the angle for this specific song
        // (i / total) * 2PI gives its base position in the circle
        // + rotationAngle adds the user's spin
        const theta = (i / total) * Math.PI * 2 + rotationAngle;

        // MATH MAGIC:
        // x = sin(theta) -> Moves left/right
        // z = cos(theta) -> Moves forward/backward (Depth)
        const x = radius * Math.sin(theta);
        const z = radius * Math.cos(theta);
        
        // Apply position using translate3d
        // IMPORTANT: We do NOT use rotateY on the node. 
        // This keeps the image flat facing the screen (Billboarding).
        node.style.transform = `translate3d(${x}px, 0, ${z}px)`;

        // DIMMING LOGIC:
        // If z > 50 (close to front), it's active.
        // If z <= 50 (further back), it's dimmed.
        if (z > 50) {
            node.classList.add('active');
            node.classList.remove('inactive');
            node.style.opacity = "1";
            node.style.filter = "grayscale(0%)";
            node.style.zIndex = 100; // Bring to absolute front
        } else {
            node.classList.add('inactive');
            node.classList.remove('active');
            // Calculated dimming: darker the further back it is
            node.style.opacity = "0.3"; 
            node.style.filter = "grayscale(100%)";
            node.style.zIndex = 1; // Send to back
        }
    });
}

function playUniverseSong(index) {
    const song = musicLibrary[index];
    const player = document.getElementById('spotify-player');
    const universe = document.getElementById('universe-container');

    universe.classList.add('blurred');
    player.classList.remove('hidden');
    player.classList.add('active');

    document.getElementById('sp-title').innerText = song.title;
    document.getElementById('sp-artist').innerText = song.artist;
    document.getElementById('sp-cover').src = song.cover;

    if(currentSongAudio) {
        currentSongAudio.pause();
        currentSongAudio.currentTime = 0; 
    }
    
    currentSongAudio = new Audio(song.music);
    currentSongAudio.volume = 0;
    currentSongAudio.play().catch(e => console.log("Play failed", e));
    fadeAudio(currentSongAudio, 1);

    player.onclick = (e) => {
        if (e.target === player) {
            player.classList.remove('active');
            player.classList.add('hidden');
            universe.classList.remove('blurred');
            fadeAudio(currentSongAudio, 0, () => {
                currentSongAudio.pause();
                currentSongAudio = null;
            });
        }
    };
}

function fadeAudio(audio, targetVol, callback) {
    if(currentFadeInterval) clearInterval(currentFadeInterval);
    const step = targetVol > audio.volume ? 0.05 : -0.05;
    
    currentFadeInterval = setInterval(() => {
        if (!audio) {
            clearInterval(currentFadeInterval);
            return;
        }
        let newVol = audio.volume + step;
        if(newVol > 1) newVol = 1;
        if(newVol < 0) newVol = 0;
        audio.volume = newVol;

        if((step > 0 && newVol >= targetVol) || (step < 0 && newVol <= targetVol)) {
            clearInterval(currentFadeInterval);
            audio.volume = targetVol;
            if(callback) callback();
        }
    }, 50);
}
    if(to === 'page7') initPage7();
    if(to === 'page9') switchMusicTo2();
    if(to === 'page12') initPage12();
}

// --- Page 1 ---
function initPage1() {
    document.getElementById('yes-btn').onclick = () => {
        bgMusic1.volume = 1;
        bgMusic1.play().catch(e => console.log("Audio waiting for interaction"));
        goToPage('page1', 'page2');
    };
    const noBtn = document.getElementById('no-btn');
    const moveNo = () => {
        noBtn.style.position = 'absolute'; // Add absolute position only when it moves
        noBtn.style.left = Math.random() * 80 + '%';
        noBtn.style.top = Math.random() * 80 + '%';
    };
    noBtn.onmouseover = moveNo;
    noBtn.ontouchstart = moveNo;
}

// --- Page 2 (0-120 Counter) ---
function initPage2() {
    let count = 0;
    const target = 120;
    const timerDisplay = document.getElementById('timer');
    const nextBtn = document.querySelector('#page2 .next-btn');

    nextBtn.style.opacity = "0";
    nextBtn.style.pointerEvents = "none";

    const interval = setInterval(() => {
        timerDisplay.innerText = `${count} Days`;
        if (count >= target) {
            clearInterval(interval);
            nextBtn.style.opacity = "1";
            nextBtn.style.pointerEvents = "auto";
            nextBtn.style.transition = "opacity 0.5s ease";
            nextBtn.onclick = () => goToPage('page2', 'page3');
        }
        count++;
    }, 20);
}

// --- Page 3 ---
function initPage3() {
    document.getElementById('seal-trigger').onclick = () => {
        document.getElementById('wax-seal-container').classList.add('hidden');
        document.getElementById('letter-content').classList.remove('hidden');
    };
}

// --- Page 4 ---
function initPage4() {
    const circle = document.getElementById('hold-circle');
    let holdTimer;
    const startHold = () => {
        circle.style.transform = 'scale(0.9)';
        holdTimer = setTimeout(() => goToPage('page4', 'page5'), 2000);
    };
    const endHold = () => {
        circle.style.transform = 'scale(1)';
        clearTimeout(holdTimer);
    };
    circle.onmousedown = startHold;
    circle.onmouseup = endHold;
    circle.ontouchstart = startHold;
    circle.ontouchend = endHold;
}

// --- Page 5 ---
function initPage5() {
    const canvas = document.getElementById('frost-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.fillRect(0,0, canvas.width, canvas.height);

    let cleared = 0;
    const scratch = (x, y) => {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, Math.PI * 2);
        ctx.fill();
        cleared++;
        if(cleared > 150) setTimeout(() => goToPage('page5', 'page6'), 500);
    };
    canvas.onmousemove = (e) => scratch(e.clientX, e.clientY);
    canvas.ontouchmove = (e) => scratch(e.touches[0].clientX, e.touches[0].clientY);
}

// --- Page 6 (Timer counts up from 00:00 to 01:43) ---
function initPage6() {
    let timePassed = 0;
    const targetTime = 103; // 1 minute 43 seconds
    const timerDisplay = document.getElementById('rose-gold-timer');
    // Initialize display
    timerDisplay.innerText = "00:00";

    const interval = setInterval(() => {
        timePassed++;
        let m = Math.floor(timePassed / 60);
        let s = timePassed % 60;
        timerDisplay.innerText = `0${m}:${s < 10 ? '0'+s : s}`;

        if(timePassed >= targetTime) {
            clearInterval(interval);
            const btnContainer = document.getElementById('p6-secret-buttons');
            btnContainer.classList.remove('hidden');
            for(let i=0; i<10; i++) {
                const btn = document.createElement('button');
                btn.className = 'love-btn-p6';
                btn.innerText = "I love you";
                btn.style.left = Math.random() * 80 + 10 + '%';
                btn.style.top = Math.random() * 80 + 10 + '%';
                btn.onclick = () => goToPage('page6', 'page7');
                btnContainer.appendChild(btn);
            }
        }
    }, 1000);
}

// --- Page 7 ---
function initPage7() {
    let taps = 0;
    document.getElementById('p7-rose-tap').onclick = () => {
        taps++;
        if(taps >= 16) {
            document.getElementById('p7-stage1').classList.add('hidden');
            document.getElementById('p7-stage2').classList.remove('hidden');
            const container = document.getElementById('p7-stage2');
            for(let i=0; i<30; i++) {
                let img = document.createElement('img');
                img.src = assets.image_3;
                img.style.position = 'absolute';
                img.style.width = '60px';
                img.style.left = Math.random() * 90 + '%';
                img.style.top = Math.random() * 90 + '%';
                img.onclick = startP7Wilt;
                container.appendChild(img);
            }
        }
    };
}

function startP7Wilt() {
    document.querySelectorAll('#p7-stage2 img').forEach(img => img.classList.add('wilted'));
    setTimeout(() => {
        document.getElementById('p7-stage3').classList.remove('hidden');
        setupBucket();
    }, 1000);
}

function setupBucket() {
    const bucket = document.getElementById('p7-bucket');
    let attempts = 0;
    const handleStart = (clientX) => {
        let startX = clientX;
        const handleMove = (moveX) => {
            let dx = (moveX - startX) * 0.1;
            bucket.style.transform = `translateX(${dx}px)`;
        };
        const handleEnd = () => {
            bucket.style.transform = 'translateX(0px)';
            attempts++;
            if(attempts >= 5) {
                document.getElementById('p7-stage3').classList.add('hidden');
                document.getElementById('p7-stage4').classList.remove('hidden');
            }
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('touchmove', touchMoveHandler);
        };
        const mouseMoveHandler = (e) => handleMove(e.clientX);
        const touchMoveHandler = (e) => handleMove(e.touches[0].clientX);
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('touchmove', touchMoveHandler);
        document.addEventListener('mouseup', handleEnd, {once:true});
        document.addEventListener('touchend', handleEnd, {once:true});
    };
    bucket.onmousedown = (e) => handleStart(e.clientX);
    bucket.ontouchstart = (e) => handleStart(e.touches[0].clientX);
}

document.getElementById('p7-seal-btn').onclick = () => goToPage('page7', 'page8');
document.getElementById('p8-accept-btn').onclick = () => goToPage('page8', 'page9');

// --- Page 9 (Crossfade & Promise) ---
function switchMusicTo2() {
    // Crossfade Logic
    const interval = 50;
    const volStep = 0.02; // Slow fade

    bgMusic2.volume = 0;
    bgMusic2.play();

    const crossfade = setInterval(() => {
        // Fade Out 1
        if (bgMusic1.volume > 0) {
            bgMusic1.volume = Math.max(0, bgMusic1.volume - volStep);
        } else {
            bgMusic1.pause();
        }
        // Fade In 2
        if (bgMusic2.volume < 1) {
            bgMusic2.volume = Math.min(1, bgMusic2.volume + volStep);
        }
        // Stop when done
        if (bgMusic1.volume === 0 && bgMusic2.volume >= 1) {
            clearInterval(crossfade);
        }
    }, interval);

    // Click Interaction
    document.querySelector('.heart-seal').onclick = () => {
        document.getElementById('p9-seal-container').classList.add('hidden');
        document.getElementById('p9-message-box').classList.remove('hidden');
    };
    document.getElementById('p9-next-heart').onclick = () => goToPage('page9', 'page10');
}

// --- Page 10 & 11 ---
document.getElementById('p10-seal-btn').onclick = () => {
    document.getElementById('p10-seal-btn').classList.add('hidden');
    document.getElementById('p10-final-msg').classList.remove('hidden');
};
document.getElementById('p10-final-msg').onclick = () => goToPage('page10', 'page11');
document.getElementById('p11-send-btn').onclick = () => {
    if(document.getElementById('p11-answer').value.trim()) goToPage('page11', 'page12');
};

// --- Page 12 (Zoom & Exit) ---
function initPage12() {
    fadeAudio(bgMusic2, 0, () => bgMusic2.pause());
    createMusicUniverse();
    setupUniverseRotation();
}

function createMusicUniverse() {
    const container = document.getElementById('song-sphere');
    const radius = 220;
    musicLibrary.forEach((song, i) => {
        const el = document.createElement('div');
        el.className = 'song-node';
        el.style.backgroundImage = `url('${song.cover}')`;

        const phi = Math.acos(-1 + (2 * i) / musicLibrary.length);
        const theta = Math.sqrt(musicLibrary.length * Math.PI) * phi;

        const x = radius * Math.cos(theta) * Math.sin(phi);
        const y = radius * Math.sin(theta) * Math.sin(phi);
        const z = radius * Math.cos(phi);

        el.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;

        el.onclick = (e) => {
            e.stopPropagation();
            playUniverseSong(i);
        };
        container.appendChild(el);
    });
}

function setupUniverseRotation() {
    const sphere = document.getElementById('song-sphere');
    let x = 0, y = 0;
    const rotate = (cx, cy) => {
        y = (cx / window.innerWidth - 0.5) * 360;
        x = (cy / window.innerHeight - 0.5) * 360;
        sphere.style.transform = `rotateY(${y}deg) rotateX(${-x}deg)`;
    };
    document.onmousemove = (e) => rotate(e.clientX, e.clientY);
    document.ontouchmove = (e) => rotate(e.touches[0].clientX, e.touches[0].clientY);
}

function playUniverseSong(index) {
    const song = musicLibrary[index];
    const player = document.getElementById('spotify-player');
    const universe = document.getElementById('universe-container');

    // UI Effects
    universe.classList.add('blurred');
    player.classList.remove('hidden');
    player.classList.add('active');

    document.getElementById('sp-title').innerText = song.title;
    document.getElementById('sp-artist').innerText = song.artist;
    document.getElementById('sp-cover').src = song.cover;

    // Play New Song (Fade In)
    if(currentSongAudio) currentSongAudio.pause();
    currentSongAudio = new Audio(song.music);
    currentSongAudio.volume = 0;
    currentSongAudio.play();
    fadeAudio(currentSongAudio, 1);

    // EXIT LOGIC: Click Background
    player.onclick = (e) => {
        if (e.target === player) {
            player.classList.remove('active');
            player.classList.add('hidden');
            universe.classList.remove('blurred');
            fadeAudio(currentSongAudio, 0, () => currentSongAudio.pause());
        }
    };
}

function fadeAudio(audio, targetVol, callback) {
    if(currentFadeInterval) clearInterval(currentFadeInterval);
    const step = targetVol > audio.volume ? 0.05 : -0.05;
    currentFadeInterval = setInterval(() => {
        let newVol = audio.volume + step;
        if(newVol > 1) newVol = 1;
        if(newVol < 0) newVol = 0;
        audio.volume = newVol;
        if((step > 0 && newVol >= targetVol) || (step < 0 && newVol <= targetVol)) {
            clearInterval(currentFadeInterval);
            audio.volume = targetVol;
            if(callback) callback();
        }
    }, 50);
}
