// Update timestamp on load
function updateTime() {
  const timeElement = document.querySelector('[data-testid="test-user-time"]');
  if (timeElement) {
    timeElement.textContent = Date.now();
  }
}

// Initial update
updateTime();

// Optional: Update every second
setInterval(updateTime, 1000);

// Accessibility: Ensure all links are keyboard navigable
document.querySelectorAll("a").forEach((link) => {
  link.setAttribute("tabindex", "0");
});
