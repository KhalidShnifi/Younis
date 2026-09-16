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


    video1.play()
        .then(() => {

            console.log(
                "Video 1 playing"
            );

        })
        .catch(error => {

            console.error(
                "Video 1 failed:",
                error
            );

        });

    video1.onended = () => {

        video1.style.display = "none";

        video2.style.display = "block";

        video2.currentTime = 0;


        video2.play()
            .then(() => {

                console.log(
                    "Video 2 playing"
                );

            })
            .catch(error => {

                console.error(
                    "Video 2 failed:",
                    error
                );

            });

    };
    video2.onended = () => {
    video2.style.display = "none";
    videoStack.style.display = "none";

    const finalMessage =
        document.getElementById("finalMessage");

    finalMessage.classList.add("show");
};
}

updateCountdown();

setInterval(
    updateCountdown,
    1000
);