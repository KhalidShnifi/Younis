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

const videoStack =
    document.getElementById("videos");

const video1 =
    document.getElementById("video1");

const video2 =
    document.getElementById("video2");


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

            console.log(
                "Background music started"
            );

        })
        .catch(error => {

            console.error(
                "Music failed:",
                error
            );

        });

    setTimeout(() => {

        playVideos();

    }, 27400);

});

function playVideos() {
    videoStack.style.display = "flex";

    video1.style.display = "block";
    video2.style.display = "none";

    video1.currentTime = 0;
    video2.currentTime = 0;

    video1.onended = () => {
        video1.style.display = "none";
        video2.style.display = "block";
        video2.currentTime = 0;

        const playVideo2 = video2.play();

        if (playVideo2 !== undefined) {
            playVideo2
                .then(() => {
                    console.log("Video 2 playing");
                })
                .catch(error => {
                    console.error("Video 2 failed:", error);
                });
        }
    };

    video2.onended = () => {
        video2.style.display = "none";
        videoStack.style.display = "none";

        const fadeOut = setInterval(() => {
            if (music.volume > 0.01) {
                music.volume -= 0.01;
            } else {
                music.volume = 0;
                music.pause();
                clearInterval(fadeOut);
            }
        }, 50);

        const finalMessage =
            document.getElementById("finalMessage");

        finalMessage.classList.add("show");
        scrollFinalMessage();
    };

    video1.play()
        .then(() => {
            console.log("Video 1 playing");
        })
        .catch(error => {
            console.error("Video 1 failed:", error);
        });
}

updateCountdown();

setInterval(
    updateCountdown,
    1000
);
function scrollFinalMessage() {
    const finalMessage =
        document.getElementById("finalMessage");

    const text =
        finalMessage.querySelector(".finalMessageText");

    const screenCenter =
        window.innerHeight / 2;

    const textHeight =
        text.offsetHeight;

    const startY =
        window.innerHeight;

    const targetY =
        screenCenter - textHeight / 2;

    const distance =
        startY - targetY;

    const duration = 60000;

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

        text.style.top = `${currentY}px`;

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}
