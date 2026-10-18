import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CornerDownLeft, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import "./ProjectKeyboard.css";

const word = "cd Proyectos";
const rows = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
const letters = rows.join("").split("");
const bottomKeys = [
  { id: "Control", label: "ctrl" },
  { id: "Alt", label: "alt" },
  { id: "Espacio", label: "" },
  { id: "Izquierda", label: "←" },
  { id: "Derecha", label: "→" },
];
const interactiveKeys = [...letters, ...bottomKeys.map((key) => key.id)];
const soundPreference = "portfolio-keyboard-sound";

function getSoundPreference() {
  try {
    return window.localStorage.getItem(soundPreference) !== "off";
  } catch {
    return true;
  }
}

export default function ProjectKeyboard() {
  const reducedMotion = useReducedMotion();
  const [letterCount, setLetterCount] = useState(0);
  const [activeKey, setActiveKey] = useState("");
  const [focusedKey, setFocusedKey] = useState("P");
  const [playback, setPlayback] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(getSoundPreference);
  const soundEnabledRef = useRef(soundEnabled);
  const audioRef = useRef(null);
  const noiseRef = useRef(null);
  const releaseTimer = useRef(null);
  const stopPlayback = useRef(() => {});
  const keyRefs = useRef({});
  const enterRef = useRef(null);

  // The initial sequence is silent. AudioContext is created only in a user gesture.
  const playKeySound = useCallback((userGesture = false, isEnter = false) => {
    if (!soundEnabledRef.current) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext || (!audioRef.current && !userGesture)) return;

    try {
      const context = audioRef.current || new AudioContext();
      audioRef.current = context;
      if (context.state === "suspended") {
        if (!userGesture) return;
        void context.resume().catch(() => {});
      }

      if (!noiseRef.current) {
        const noise = context.createBuffer(1, Math.ceil(context.sampleRate * 0.045), context.sampleRate);
        const samples = noise.getChannelData(0);
        for (let index = 0; index < samples.length; index += 1) {
          samples[index] = Math.random() * 2 - 1;
        }
        noiseRef.current = noise;
      }

      const time = context.currentTime;
      const source = context.createBufferSource();
      const filter = context.createBiquadFilter();
      const gain = context.createGain();
      source.buffer = noiseRef.current;
      filter.type = "bandpass";
      filter.frequency.value = isEnter ? 1000 : 1800;
      filter.Q.value = 0.65;
      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.exponentialRampToValueAtTime(isEnter ? 0.105 : 0.075, time + 0.002);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.04);
      source.connect(filter);
      filter.connect(gain);
      gain.connect(context.destination);
      source.start(time);
      source.stop(time + 0.045);

      const body = context.createOscillator();
      const bodyGain = context.createGain();
      body.type = "triangle";
      body.frequency.setValueAtTime(isEnter ? 200 : 310, time);
      body.frequency.exponentialRampToValueAtTime(100, time + 0.025);
      bodyGain.gain.setValueAtTime(0.025, time);
      bodyGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.035);
      body.connect(bodyGain);
      bodyGain.connect(context.destination);
      body.start(time);
      body.stop(time + 0.04);
    } catch {
      // Sound is an enhancement; the keyboard and links work without Web Audio.
    }
  }, []);

  const flashKey = useCallback((letter) => {
    window.clearTimeout(releaseTimer.current);
    setActiveKey(letter);
    releaseTimer.current = window.setTimeout(() => setActiveKey(""), 170);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    let timer;
    let cancelled = false;
    let count = 0;
    const typeLetter = () => {
      if (cancelled) return;
      const letter = word[count] === " " ? "Espacio" : word[count].toUpperCase();
      count += 1;
      setLetterCount(count);
      flashKey(letter);
      // Only an explicitly requested replay may make sound.
      if (playback > 0) playKeySound();
      if (count < word.length) timer = window.setTimeout(typeLetter, count % 3 === 0 ? 210 : 145);
    };
    const cancel = () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
    stopPlayback.current = cancel;
    timer = window.setTimeout(typeLetter, playback > 0 ? 160 : 750);
    return cancel;
  }, [playback, reducedMotion, flashKey, playKeySound]);

  useEffect(() => () => {
    window.clearTimeout(releaseTimer.current);
    const context = audioRef.current;
    // Let Enter finish its short click when navigation unmounts the keyboard.
    if (context) window.setTimeout(() => { void context.close().catch(() => {}); }, 70);
  }, []);

  function pressKey(letter) {
    stopPlayback.current();
    setLetterCount(word.length);
    flashKey(letter);
    playKeySound(true, letter === "Enter");
  }

  function replay() {
    stopPlayback.current();
    setLetterCount(reducedMotion ? word.length : 0);
    setActiveKey("");
    playKeySound(true);
    setPlayback((current) => current + 1);
  }

  function toggleSound() {
    const next = !soundEnabled;
    soundEnabledRef.current = next;
    setSoundEnabled(next);
    try {
      window.localStorage.setItem(soundPreference, next ? "on" : "off");
    } catch {
      // Private browsing can prevent persisting this optional preference.
    }
    if (next) playKeySound(true);
  }

  function handleKeyDown(event) {
    // Keep shortcuts local to the keycaps; never capture typing elsewhere.
    if (!event.target.dataset.keyboardKey || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === "Enter") {
      event.preventDefault();
      enterRef.current?.click();
      return;
    }

    let nextKey;
    const currentIndex = interactiveKeys.indexOf(event.target.dataset.keyboardKey);
    if (event.key === "ArrowRight") nextKey = interactiveKeys[(currentIndex + 1) % interactiveKeys.length];
    if (event.key === "ArrowLeft") nextKey = interactiveKeys[(currentIndex + interactiveKeys.length - 1) % interactiveKeys.length];
    if (event.key === "ArrowDown") nextKey = interactiveKeys[(currentIndex + 10) % interactiveKeys.length];
    if (event.key === "ArrowUp") nextKey = interactiveKeys[(currentIndex + interactiveKeys.length - 10) % interactiveKeys.length];
    if (/^[a-z]$/i.test(event.key)) {
      nextKey = event.key.toUpperCase();
      pressKey(nextKey);
    }
    if (nextKey) {
      event.preventDefault();
      setFocusedKey(nextKey);
      keyRefs.current[nextKey]?.focus();
    }
  }

  const typing = !reducedMotion && letterCount < word.length;

  return (
    <div className="keyboard-scene" data-ui>
      <div className="project-keyboard">
        <div className="keyboard-hardware">
          <span className="keyboard-signature" aria-hidden="true">MF</span>
          <div className="keyboard-tools">
            <button type="button" onClick={replay} className="keyboard-tool" aria-label="Repetir la escritura de Proyectos" title="Repetir escritura">
              <RotateCcw size={15} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={toggleSound}
              className="keyboard-tool keyboard-sound"
              aria-label="Sonido del teclado"
              aria-pressed={soundEnabled}
              title={soundEnabled ? "Silenciar teclado" : "Activar sonido del teclado"}
            >
              {soundEnabled ? <Volume2 size={17} aria-hidden="true" /> : <VolumeX size={17} aria-hidden="true" />}
            </button>
          </div>
        </div>

        <div className="keyboard-display">
          <span className="keyboard-prompt" aria-hidden="true">›</span>
          <span className="sr-only">Proyectos. Prueba las teclas y pulsa Enter para abrir mis proyectos.</span>
          <span className="keyboard-output" aria-hidden="true">
            {reducedMotion ? word : word.slice(0, letterCount)}
            <span className={`keyboard-cursor${typing ? " is-writing" : ""}`} />
          </span>
          <span className="keyboard-status" aria-hidden="true">{typing ? "Escribiendo" : "Pulsa Enter"}</span>
        </div>

        <div className="keyboard-keys" role="group" aria-label="Teclado interactivo. Usa las flechas para cambiar de tecla; Enter abre Proyectos." onKeyDown={handleKeyDown}>
          {rows.map((row, rowIndex) => (
            <div className={`keyboard-row keyboard-row-${rowIndex + 1}`} key={row}>
              {[...row].map((letter) => (
                <button
                  type="button"
                  key={letter}
                  ref={(element) => { keyRefs.current[letter] = element; }}
                  data-letter={letter}
                  data-keyboard-key={letter}
                  className={`keyboard-key${activeKey === letter ? " is-typing" : ""}`}
                  tabIndex={focusedKey === letter ? 0 : -1}
                  onFocus={() => setFocusedKey(letter)}
                  onClick={() => pressKey(letter)}
                  aria-label={`Probar tecla ${letter}`}
                >
                  <span className="keyboard-keycap">{letter}</span>
                </button>
              ))}
              {rowIndex === 2 && (
                <Link
                  ref={enterRef}
                  to="/proyectos"
                  className={`keyboard-key keyboard-enter${activeKey === "Enter" ? " is-typing" : ""}`}
                  aria-label="Abrir proyectos"
                  onClick={() => pressKey("Enter")}
                >
                  <span className="keyboard-keycap">
                    <span className="keyboard-enter-top"><span>Abrir</span><CornerDownLeft size={21} aria-hidden="true" /></span>
                    <span className="keyboard-enter-label" aria-hidden="true">Enter</span>
                  </span>
                </Link>
              )}
            </div>
          ))}
          <div className="keyboard-row keyboard-bottom">
            {bottomKeys.map((key) => (
              <button
                key={key.id}
                type="button"
                ref={(element) => { keyRefs.current[key.id] = element; }}
                data-keyboard-key={key.id}
                className={`keyboard-key ${key.id === "Espacio" ? "keyboard-space" : "keyboard-modifier"}${activeKey === key.id ? " is-typing" : ""}`}
                tabIndex={focusedKey === key.id ? 0 : -1}
                onFocus={() => setFocusedKey(key.id)}
                onClick={() => pressKey(key.id)}
                aria-label={`Probar tecla ${key.id}`}
              >
                <span className="keyboard-keycap">{key.id === "Espacio" ? <span aria-hidden="true" /> : key.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="keyboard-front-lip" aria-hidden="true"><span /><span /><span /></div>
      </div>
    </div>
  );
}
