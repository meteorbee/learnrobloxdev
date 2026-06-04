document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("#Header");
    const toc = document.querySelector("#TOC");
    const backBtn = document.querySelector("#BackToToc");

    let headerVisible = true;
    let tocVisible = true;

    const updateButton = () => {
        if (headerVisible) {
            backBtn.classList.remove("visible");
            return;
        }

        if (!tocVisible) {
            backBtn.classList.add("visible");
        } else {
            backBtn.classList.remove("visible");
        }
    };

    const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (entry.target === header) {
                headerVisible = entry.isIntersecting;
            }

            if (entry.target === toc) {
                tocVisible = entry.isIntersecting;
            }
        }
        updateButton();
    }, {
        threshold: 0.1
    });

    observer.observe(header);
    observer.observe(toc);
});
