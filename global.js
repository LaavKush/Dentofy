window.addEventListener("load", function () {
    const loader = document.getElementById("page-loader");

    if (loader) {
        loader.classList.add("hide");

        setTimeout(() => {
            loader.remove();
        }, 500);
    }
});

/* ═══════════════════════════════════════════════
   SCROLL TO TOP
═══════════════════════════════════════════════ */

window.addEventListener("scroll", () => {

    const btn = document.getElementById("scrollTopBtn");

    if(window.scrollY > 100){
        btn.classList.add("show");
    }else{
        btn.classList.remove("show");
    }

});