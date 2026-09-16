const unlockDate =
    new Date("2026-09-11T00:00:00+03:00").getTime();

const countdown =
    document.getElementById("countdown");

const lockedScreen =
    document.getElementById("lockedScreen");

const message =
    document.getElementById("message");

const photoStack =
    document.querySelector(".photo-stack");

const startOverlay =
    document.getElementById("startOverlay");

const music =
    document.getElementById("backgroundMusic");

let unlocked = false;
let started = false;


function updateCountdown() {

    const now = Date.now();

    const difference =
        unlockDate - now;

    if (difference <= 0) {

        countdown.textContent = "00:00:00";

        if (!unlocked) {
            startOverlay.style.display = "flex";
        }

        return;
    }

    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );

    const hours =
        Math.floor(
            (difference /
            (1000 * 60 * 60)) % 24
        );

    const minutes =
        Math.floor(
            (difference /
            (1000 * 60)) % 60
        );

    const seconds =
        Math.floor(
            (difference / 1000) % 60
        );

    countdown.textContent =
        `${days}d ${hours}h ${minutes}m ${seconds}s`;
}


startOverlay.addEventListener("click", () => {

    if (started) return;

    started = true;
    unlocked = true;

    lockedScreen.style.display = "none";
    startOverlay.style.display = "none";

    message.classList.add("show");
    photoStack.classList.add("show");

    music.volume = 0.35;
    music.currentTime = 0;

    music.play()
        .then(() => {
            console.log("Background music started");
        })
        .catch(error => {
            console.error("Music failed:", error);
        });

    setTimeout(() => {

        const finalMessage =
            document.getElementById("finalMessage");

        finalMessage.classList.add("show");

        setTimeout(() => {
            scrollFinalMessage();
        }, 1000);

    }, 27400);
});


function scrollFinalMessage() {

    const finalMessage =
        document.getElementById("finalMessage");

    const text =
        finalMessage.querySelector(".finalMessageText");

    const textHeight =
        text.offsetHeight;

    const startY =
        window.innerHeight;

    const targetY =
        (window.innerHeight - textHeight) / 2;

    const distance =
        startY - targetY;

    const duration = 35000;

    const startTime =
        performance.now();


    function animate(time) {

        const progress =
            Math.min(
                (time - startTime) / duration,
                1
            );

        const currentY =
            startY - distance * progress;

        text.style.top =
            `${currentY}px`;

        if (progress < 1) {

            requestAnimationFrame(animate);

        } else {

            fadeOutMusic();
        }
    }

    requestAnimationFrame(animate);
}


function fadeOutMusic() {

    const fadeOut =
        setInterval(() => {

            if (music.volume > 0.01) {

                music.volume -= 0.005;

            } else {

                music.volume = 0;
                music.pause();

                clearInterval(fadeOut);
            }

        }, 50);
}


updateCountdown();

setInterval(
    updateCountdown,
    1000
);
