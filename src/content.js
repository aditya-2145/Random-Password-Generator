document.addEventListener("focusin", (e) => {
  if (e.target.type === "password") {
    chrome.runtime.sendMessage({ action: "generatePassword" }, (res) => {
      if (res && res.password) {
        e.target.setAttribute("placeholder", "Suggested: " + res.password);
      }
    });
  }
});
