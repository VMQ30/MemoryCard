import soundOn from "../assets/sound-on.svg";
import soundOff from "../assets/sound-off.svg";
import { useState, useEffect } from "react";
import "../styles/Music.css";

export function Music({ play, stop }) {
  const [isMusicOn, setIsMusicOn] = useState(false);
  useEffect(() => {
    if (isMusicOn) {
      play();
    } else {
      stop();
    }
  }, [isMusicOn]);
  return (
    <button className="toggleMusic" onClick={() => setIsMusicOn(!isMusicOn)}>
      <img
        src={isMusicOn ? soundOn : soundOff}
        alt={isMusicOn ? "Sound On" : "Sound Off"}
      />
    </button>
  );
}
