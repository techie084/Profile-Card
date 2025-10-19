// Declaring variables
const timestamp = document.getElementById("timestamp");

// Update timestamp on load
function updateTimestamp() {
  timestamp.textContent = Date.now();
}

// Initial update
updateTimestamp();

// Optional: Update every second
setInterval(updateTimestamp, 1000);

// Accessibility: Ensure all links are keyboard navigable
document.querySelectorAll("a").forEach((link) => {
  link.setAttribute("tabindex", "0");
});
