document.addEventListener("DOMContentLoaded", function () {
  const bookingForm = document.getElementById("bookingForm");
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  const appointmentSection = document.getElementById("appointmentSection");

  if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // List of mandatory IDs to inspect
      const requiredFields = ["userName", "userPhone", "userEmail", "userDate", "userTime"];
      let formIsValid = true;

      requiredFields.forEach(id => {
        const inputElement = document.getElementById(id);
        const wrapperGroup = document.getElementById(`group-${id}`);

        if (!inputElement.value.trim()) {
          // Field empty: show custom screenshot error state
          wrapperGroup.classList.add("is-invalid");
          formIsValid = false;
        } else {
          // Field filled: clear error elements
          wrapperGroup.classList.remove("is-invalid");
        }
      });

      if (formIsValid) {
        alert("Thank you! Your appointment request has been submitted successfully.");
        bookingForm.reset();
      }
    });

    // Clear validation error highlights instantly when user begins typing
    const inputs = bookingForm.querySelectorAll(".form-control-custom");
    inputs.forEach(input => {
      input.addEventListener("input", function () {
        const wrapperGroup = this.closest(".input-group-custom");
        if (wrapperGroup) {
          wrapperGroup.classList.remove("is-invalid");
        }
      });
    });
  }

  // Scroll to top display tracking logic
  window.addEventListener("scroll", function () {
    if (appointmentSection && scrollTopBtn) {
      const sectionTopOffset = appointmentSection.offsetTop;
      if (window.scrollY >= (sectionTopOffset - 200)) {
        scrollTopBtn.style.display = "flex";
      } else {
        scrollTopBtn.style.display = "none";
      }
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});