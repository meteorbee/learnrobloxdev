const texts = [
    "Make games, together.",
    "Remember that learning takes time, don't give up!",
    "Stay determined, even if you want to stop.",
    "All bugs can be fixed, you need to find out how.",
    "Stay creative!",
    "No matter how crazy the idea, you can make it.",
    "Help others, and they just might help you too.",
    "Imagine it, then create."
];

const element = document.getElementById("RandomText");

let currentText = "";
let animationInterval = null;

function randomCharFor(target) {
    if (/[A-Z]/.test(target)) {
        return String.fromCharCode(65 + Math.floor(Math.random() * 26));
    }

    if (/[a-z]/.test(target)) {
        return String.fromCharCode(97 + Math.floor(Math.random() * 26));
    }

    if (/[0-9]/.test(target)) {
        return Math.floor(Math.random() * 10);
    }

    return target;
}

function scrambleTo(targetText) {
    clearInterval(animationInterval);

    const maxLength = Math.max(
        currentText.length,
        targetText.length
    );

    const chars = [];

    for (let i = 0; i < maxLength; i++) {
        const from = currentText[i] || "";
        const to = targetText[i] || "";

        const start = Math.floor(Math.random() * 15);
        const end = start + 10 + Math.floor(Math.random() * 15);

        chars.push({
            from,
            to,
            start,
            end
        });
    }

    let frame = 0;

    animationInterval = setInterval(() => {
        let output = "";
        let complete = true;

        for (const char of chars) {
            if (frame < char.start) {
                output += char.from;
                complete = false;
            }
            else if (frame >= char.end) {
                output += char.to;
            }
            else {
                output += randomCharFor(char.to);
                complete = false;
            }
        }

        element.textContent = output;

        if (complete) {
            clearInterval(animationInterval);
            currentText = targetText;
        }

        frame++;
    }, 40);
}

function changeText() {
    let nextText;

    do {
        nextText =
            texts[Math.floor(Math.random() * texts.length)];
    } while (
        texts.length > 1 &&
        nextText === currentText
        );

    scrambleTo(nextText);
}

changeText();

setInterval(changeText, 4000);
