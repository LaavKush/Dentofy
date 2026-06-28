const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {

            const counter = entry.target;
            const target = +counter.dataset.target;
            let count = 1;

            const interval = setInterval(() => {
                count++;
                counter.textContent = count;

                if (count >= target) {
                    counter.textContent = target;
                    clearInterval(interval);
                }
            }, target > 100 ? 2 : 80);

            obs.unobserve(counter);
        }
    });
}, {
    threshold: 0.5
});

const form = document.getElementById("contactForm");

function showToast(msg, color = "#dc3545") {

    Toastify({
        text: msg,
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: color,
        stopOnFocus: true,
        close: true
    }).showToast();

}

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = document.getElementById("name");
    const phone = document.getElementById("phone");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    // Name
    if (name.value.trim() === "") {
        showToast("Name is required");
        name.focus();
        return;
    }

    // Phone
    if (phone.value.trim() === "") {
        showToast("Phone number is required");
        phone.focus();
        return;
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(phone.value.trim())) {
        showToast("Enter a valid 10-digit phone number");
        phone.focus();
        return;
    }

    // Email validation (optional)
    if (email.value.trim() !== "") {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email.value.trim())) {
            showToast("Enter a valid email address");
            email.focus();
            return;
        }
    }

    // Message
    if (message.value.trim() === "") {
        showToast("Message is required");
        message.focus();
        return;
    }

    // Success
    showToast("Message sent successfully!", "#28a745");

    form.reset();

});