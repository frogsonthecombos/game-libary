/* =========================================================
   NEXUS GAME LIBRARY
   ========================================================= */


/* =========================================================
   CLOCK
   ========================================================= */

function updateClock() {

    const clock =
        document.getElementById("clock");

    if (!clock) return;

    const now = new Date();

    const hours =
        String(now.getHours()).padStart(2, "0");

    const minutes =
        String(now.getMinutes()).padStart(2, "0");

    const seconds =
        String(now.getSeconds()).padStart(2, "0");

    clock.textContent =
        `${hours}:${minutes}:${seconds}`;
}

updateClock();

setInterval(
    updateClock,
    1000
);


/* =========================================================
   SESSION TIMER
   ========================================================= */

let sessionSeconds = 0;

function updateSession() {

    const element =
        document.getElementById("sessionTime");

    if (!element) return;

    sessionSeconds++;

    const minutes =
        Math.floor(sessionSeconds / 60);

    const seconds =
        sessionSeconds % 60;

    element.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

setInterval(
    updateSession,
    1000
);


/* =========================================================
   TERMINAL TEXT
   ========================================================= */

const terminalText =
    document.getElementById("terminalText");

const messages = [
    "scanning game database...",
    "04 titles detected.",
    "checking game integrity...",
    "all systems nominal.",
    "game systems ready.",
    "awaiting launch command..."
];

let messageIndex = 0;

function cycleTerminal() {

    if (!terminalText) return;

    messageIndex =
        (messageIndex + 1) %
        messages.length;

    terminalText.style.opacity = "0";

    setTimeout(() => {

        terminalText.textContent =
            messages[messageIndex];

        terminalText.style.opacity = "1";

    }, 200);
}

setInterval(
    cycleTerminal,
    3000
);


/* =========================================================
   PARTICLES
   ========================================================= */

const particleContainer =
    document.getElementById("particles");

if (particleContainer) {

    for (let i = 0; i < 45; i++) {

        const particle =
            document.createElement("div");

        particle.className =
            "particle";

        particle.style.left =
            `${Math.random() * 100}%`;

        particle.style.animationDuration =
            `${8 + Math.random() * 15}s`;

        particle.style.animationDelay =
            `${Math.random() * -15}s`;

        particle.style.opacity =
            `${0.15 + Math.random() * 0.6}`;

        particleContainer.appendChild(
            particle
        );
    }
}


/* =========================================================
   GAME LAUNCHER
   =========================================================

   Flow:

   Google Sites
       ↓
   Game Library
       ↓
   Click button
       ↓
   New about:blank tab
       ↓
   Game CDN URL loads
*/


document
    .querySelectorAll(".game-module")
    .forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                const gameURL =
                    button.getAttribute(
                        "data-game"
                    );


                if (
                    !gameURL ||
                    gameURL.includes(
                        "YOUR-USERNAME"
                    )
                ) {

                    alert(
                        "This game has not been configured yet."
                    );

                    return;
                }


                /*
                 * Open immediately because
                 * browsers can block delayed
                 * popups.
                 */

                const gameWindow =
                    window.open(
                        "about:blank",
                        "_blank"
                    );


                if (!gameWindow) {

                    alert(
                        "The game could not open. Please allow pop-ups for this site."
                    );

                    return;
                }


                /*
                 * Build the blank game page.
                 */

                gameWindow.document.open();

                gameWindow.document.write(`

                    <!DOCTYPE html>

                    <html>

                    <head>

                        <meta
                            charset="UTF-8"
                        >

                        <meta
                            name="viewport"
                            content="width=device-width, initial-scale=1.0"
                        >

                        <title>
                            NEXUS // GAME
                        </title>

                        <style>

                            html,
                            body {

                                width: 100%;
                                height: 100%;

                                margin: 0;
                                padding: 0;

                                overflow: hidden;

                                background: #000;

                            }

                            iframe {

                                display: block;

                                width: 100%;
                                height: 100%;

                                border: 0;

                            }

                        </style>

                    </head>

                    <body>

                        <iframe
                            src="${gameURL}"
                            allowfullscreen
                            allow="fullscreen; autoplay; gamepad"
                        ></iframe>

                    </body>

                    </html>

                `);

                gameWindow.document.close();

            }
        );

    });


/* =========================================================
   FULLSCREEN
   ========================================================= */

const fullscreenButton =
    document.getElementById(
        "fullscreenButton"
    );

if (fullscreenButton) {

    fullscreenButton.addEventListener(
        "click",
        async () => {

            try {

                if (!document.fullscreenElement) {

                    await document.documentElement
                        .requestFullscreen();

                } else {

                    await document.exitFullscreen();

                }

            } catch (error) {

                console.log(
                    "Fullscreen unavailable.",
                    error
                );

            }

        }
    );

}


/* =========================================================
   ORB MOUSE EFFECT
   ========================================================= */

const orb =
    document.querySelector(".orb");

if (orb) {

    document.addEventListener(
        "mousemove",
        (event) => {

            const x =
                (event.clientX /
                    window.innerWidth -
                    0.5) * 12;

            const y =
                (event.clientY /
                    window.innerHeight -
                    0.5) * -12;

            orb.style.transform =
                `translate(${x}px, ${y}px)`;

        }
    );

}


/* =========================================================
   CONSOLE
   ========================================================= */

console.log(
    "%c NEXUS // GAME LIBRARY ONLINE ",
    "background:#090812;color:#a996ff;font-weight:bold;padding:8px;"
);
