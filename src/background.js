import { generatePassword } from "./passwordGenerator.js";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    length: 12,
    useUpper: true,
    useLower: true,
    useNumbers: true,
    useSymbols: true,
  });
});

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.action === "generatePassword") {
    chrome.storage.sync.get(
      ["length", "useUpper", "useLower", "useNumbers", "useSymbols"],
      (opts) => {
        const pwd = generatePassword(
          opts.length,
          opts.useUpper,
          opts.useLower,
          opts.useNumbers,
          opts.useSymbols
        );
        sendResponse({ password: pwd });
      }
    );
    return true; // keep alive for async
  }
});
