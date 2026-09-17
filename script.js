const message =
    document.getElementById("message");

const photoStack =
    document.querySelector(".photo-stack");

const startOverlay =
    document.getElementById("startOverlay");

const music =
    document.getElementById("backgroundMusic");

let started = false;


startOverlay.addEventListener("click", () => {

    if (started) return;

    started = true;

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
