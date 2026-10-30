(() => {
  const root = document.documentElement;
  const panel = document.querySelector("#a11y-panel");
  const launcher = document.querySelector("[data-a11y-toggle]");
  const closeButton = document.querySelector("[data-a11y-close]");
  const colorVisionSelect = document.querySelector("#color-vision-mode");
  const fontSizeOutput = document.querySelector("#font-size-output");
  const narratorStatus = document.querySelector("#narrator-status");
  const voiceSelect = document.querySelector("#narrator-voice");
  const rateSelect = document.querySelector("#narrator-rate");
  const librasStatus = document.querySelector("#libras-status");

  if (!panel || !launcher) return;

  const storage = {
    get(key) {
      try {
        return window.localStorage.getItem(key);
      } catch {
        return null;
      }
    },
    set(key, value) {
      try {
        window.localStorage.setItem(key, value);
      } catch {
        // O site continua funcional quando o navegador bloqueia armazenamento local.
      }
    },
  };

  const validColorModes = new Set([
    "normal",
    "deuteranopia",
    "protanopia",
    "tritanopia",
  ]);
  const savedColorMode = storage.get("di-lorenzo-color-vision");
  const initialColorMode = validColorModes.has(savedColorMode)
    ? savedColorMode
    : "normal";
  const minimumFontScale = 0.85;
  const maximumFontScale = 1.5;
  let fontScale = Number(storage.get("di-lorenzo-font-scale")) || 1;
  let currentUtterance = null;
  let availableVoices = [];

  const setColorMode = (mode) => {
    const nextMode = validColorModes.has(mode) ? mode : "normal";
    root.dataset.colorVision = nextMode;
    if (colorVisionSelect) colorVisionSelect.value = nextMode;
    storage.set("di-lorenzo-color-vision", nextMode);
  };

  const setFontScale = (value) => {
    const boundedScale = Math.min(
      maximumFontScale,
      Math.max(minimumFontScale, value),
    );
    fontScale = Math.round(boundedScale * 100) / 100;
    root.style.setProperty("--a11y-font-scale", String(fontScale));
    if (fontSizeOutput)
      fontSizeOutput.value = `${Math.round(fontScale * 100)}%`;
    storage.set("di-lorenzo-font-scale", String(fontScale));
  };

  setColorMode(initialColorMode);
  setFontScale(fontScale);

  colorVisionSelect?.addEventListener("change", (event) => {
    setColorMode(event.currentTarget.value);
  });

  document.querySelectorAll("[data-font-step]").forEach((button) => {
    button.addEventListener("click", () => {
      const step = Number(button.dataset.fontStep) * 0.1;
      setFontScale(fontScale + step);
    });
  });

  document.querySelector("[data-font-reset]")?.addEventListener("click", () => {
    setFontScale(1);
  });

  const setPanelOpen = (isOpen) => {
    panel.hidden = !isOpen;
    launcher.setAttribute("aria-expanded", String(isOpen));

    if (isOpen) {
      panel.querySelector("select, button:not([disabled])")?.focus();
    } else {
      launcher.focus();
    }
  };

  launcher.addEventListener("click", () => {
    setPanelOpen(panel.hidden);
  });

  closeButton?.addEventListener("click", () => setPanelOpen(false));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !panel.hidden) {
      setPanelOpen(false);
    }
  });

  const narratorButtons = {
    start: document.querySelector('[data-narrator="start"]'),
    pause: document.querySelector('[data-narrator="pause"]'),
    resume: document.querySelector('[data-narrator="resume"]'),
    stop: document.querySelector('[data-narrator="stop"]'),
  };

  const updateNarratorButtons = (state) => {
    if (narratorButtons.start)
      narratorButtons.start.disabled =
        state === "speaking" || state === "paused";
    if (narratorButtons.pause)
      narratorButtons.pause.disabled = state !== "speaking";
    if (narratorButtons.resume)
      narratorButtons.resume.disabled = state !== "paused";
    if (narratorButtons.stop)
      narratorButtons.stop.disabled =
        state !== "speaking" && state !== "paused";
  };

  const setNarratorStatus = (message) => {
    if (narratorStatus) narratorStatus.textContent = message;
  };

  const speech = window.speechSynthesis;
  const speechSupported = Boolean(
    speech && "SpeechSynthesisUtterance" in window,
  );

  const populateVoices = () => {
    if (!speechSupported || !voiceSelect) return;

    const existingValue = voiceSelect.value;
    availableVoices = speech.getVoices();
    const portugueseVoices = availableVoices.filter((voice) =>
      /^pt(-|_)/i.test(voice.lang),
    );
    const voicesToShow = portugueseVoices.length
      ? portugueseVoices
      : availableVoices;
    const options = [new Option("Voz padrão do dispositivo", "")];

    voicesToShow.forEach((voice) => {
      options.push(new Option(`${voice.name} (${voice.lang})`, voice.voiceURI));
    });

    voiceSelect.replaceChildren(...options);
    if (voicesToShow.some((voice) => voice.voiceURI === existingValue)) {
      voiceSelect.value = existingValue;
    } else if (portugueseVoices.length) {
      voiceSelect.value = portugueseVoices[0].voiceURI;
    }
  };

  if (speechSupported) {
    populateVoices();
    speech.addEventListener?.("voiceschanged", populateVoices);
    if (!speech.addEventListener) speech.onvoiceschanged = populateVoices;
  } else {
    setNarratorStatus(
      "A narração não é suportada por este navegador. Tente outro navegador ou dispositivo.",
    );
    Object.values(narratorButtons).forEach((button) => {
      if (button) button.disabled = true;
    });
  }

  const finishNarration = (message) => {
    currentUtterance = null;
    updateNarratorButtons("idle");
    if (message) setNarratorStatus(message);
  };

  narratorButtons.start?.addEventListener("click", () => {
    if (!speechSupported) return;

    const pageContent = document.querySelector("#main-content");
    const text = pageContent?.innerText.replace(/\s+/g, " ").trim();

    if (!text) {
      setNarratorStatus("Não foi encontrado texto da página para ler.");
      return;
    }

    speech.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    currentUtterance = utterance;
    utterance.lang = "pt-BR";
    utterance.rate = Number(rateSelect?.value) || 1;

    const chosenVoice = availableVoices.find(
      (voice) => voice.voiceURI === voiceSelect?.value,
    );
    if (chosenVoice) utterance.voice = chosenVoice;

    utterance.onstart = () => {
      if (currentUtterance !== utterance) return;
      updateNarratorButtons("speaking");
      setNarratorStatus("A leitura da página começou.");
    };
    utterance.onend = () => {
      if (currentUtterance === utterance)
        finishNarration("Leitura da página concluída.");
    };
    utterance.onerror = (event) => {
      if (currentUtterance === utterance && event.error !== "canceled") {
        finishNarration(
          "Não foi possível concluir a leitura. Tente novamente.",
        );
      }
    };

    updateNarratorButtons("speaking");
    setNarratorStatus("Preparando a leitura da página.");
    speech.speak(utterance);
  });

  narratorButtons.pause?.addEventListener("click", () => {
    if (speechSupported && speech.speaking && !speech.paused) {
      speech.pause();
      updateNarratorButtons("paused");
      setNarratorStatus("Leitura pausada.");
    }
  });

  narratorButtons.resume?.addEventListener("click", () => {
    if (speechSupported && speech.paused) {
      speech.resume();
      updateNarratorButtons("speaking");
      setNarratorStatus("Leitura retomada.");
    }
  });

  narratorButtons.stop?.addEventListener("click", () => {
    if (!speechSupported) return;
    speech.cancel();
    finishNarration("Leitura interrompida.");
  });

  window.addEventListener("pagehide", () => {
    if (speechSupported) speech.cancel();
  });

  const initializeLibras = () => {
    if (!window.VLibras?.Widget) return false;

    try {
      new window.VLibras.Widget("https://vlibras.gov.br/app");
      if (librasStatus)
        librasStatus.textContent = "Tradutor VLibras carregado.";
      return true;
    } catch {
      if (librasStatus)
        librasStatus.textContent =
          "Não foi possível iniciar o tradutor VLibras.";
      return false;
    }
  };

  const librasScript = document.createElement("script");
  librasScript.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
  librasScript.async = true;
  librasScript.onload = () => {
    if (!initializeLibras() && librasStatus) {
      librasStatus.textContent =
        "O tradutor VLibras não pôde ser inicializado.";
    }
  };
  librasScript.onerror = () => {
    if (librasStatus) {
      librasStatus.textContent =
        "O tradutor VLibras não carregou. Verifique sua conexão com a internet.";
    }
  };
  document.head.append(librasScript);
})();
