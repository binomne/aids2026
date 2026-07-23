/* ============================================================================
   HIVnext walkthrough request form
   Uses a standard HTML POST so FormSubmit can deliver the request, CC the
   second team inbox, and send an automatic copy to the submitter.
   ============================================================================ */
(function () {
  "use strict";

  function setTextCounter(textarea, counter) {
    var max = parseInt(textarea.getAttribute("maxlength") || "0", 10);
    var length = textarea.value.length;
    counter.textContent = max ? length + " / " + max : String(length);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("demo-request-form");
    if (!form) return;

    var nextInput = document.getElementById("demo-next");
    var sourceInput = document.getElementById("demo-source");
    var timeInput = document.getElementById("demo-time");
    var subjectInput = document.getElementById("demo-subject");
    var organisationInput = document.getElementById("organisation");
    var countryInput = document.getElementById("country");
    var interestInput = document.getElementById("primary-interest");
    var otherInterestField = document.getElementById("other-interest-field");
    var otherInterestInput = document.getElementById("other-interest");
    var submitButton = document.getElementById("demo-submit");
    var submitLabel = submitButton ? submitButton.querySelector(".demo-submit-label") : null;
    var status = document.getElementById("demo-form-status");

    try {
      if (nextInput && window.location.protocol !== "file:") {
        nextInput.value = new URL("demo-thank-you.html", window.location.href).href;
      }
      if (sourceInput) sourceInput.value = window.location.href.split("#")[0];
    } catch (error) {
      /* Keep the production fallback values already present in the markup. */
    }

    document.querySelectorAll("[data-counter-for]").forEach(function (counter) {
      var target = document.getElementById(counter.getAttribute("data-counter-for"));
      if (!target) return;
      setTextCounter(target, counter);
      target.addEventListener("input", function () { setTextCounter(target, counter); });
    });

    function updateOtherInterest() {
      if (!interestInput || !otherInterestField || !otherInterestInput) return;
      var isOther = interestInput.value === "Other";
      otherInterestField.hidden = !isOther;
      otherInterestInput.required = isOther;
      if (!isOther) otherInterestInput.value = "";
    }

    if (interestInput) {
      interestInput.addEventListener("change", updateOtherInterest);
      updateOtherInterest();
    }

    form.addEventListener("submit", function () {
      if (timeInput) timeInput.value = new Date().toISOString();
      if (sourceInput) sourceInput.value = window.location.href.split("#")[0];

      if (subjectInput) {
        var organisation = organisationInput ? organisationInput.value.trim() : "";
        var country = countryInput ? countryInput.value.trim() : "";
        var context = [organisation, country].filter(Boolean).join(" - ");
        subjectInput.value = "New HIVnext walkthrough request" + (context ? " - " + context : "") + " - AIDS2026 website";
      }

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.setAttribute("aria-busy", "true");
      }
      if (submitLabel) submitLabel.textContent = "Sending request...";
      if (status) status.textContent = "Your request is being handed to the email delivery service.";
    });

    window.addEventListener("pageshow", function (event) {
      if (!event.persisted) return;
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.removeAttribute("aria-busy");
      }
      if (submitLabel) submitLabel.textContent = "Send walkthrough request";
      if (status) status.textContent = "";
    });
  });
})();
