import { useState, useRef } from "react";
import ResultModel from "./ResultModel.jsx";
export default function TimerChallenge({ title, targetTime }) {
  const interval = useRef();
  const dialogRef = useRef();
  const [timerStarted, setTimerStarted] = useState(false);
  const [timeExpired, setTimeExpired] = useState(false);

  function handleTimerExpired() {
    setTimerStarted(true);
    interval.current = setTimeout(() => {
      setTimeExpired(true);
      setTimerStarted(false);
      dialogRef.current.openDialogBox();
    }, targetTime * 1000);
  }

  function stopTimer() {
    clearInterval(interval.current);
    setTimerStarted(false);
  }
  return (
    <>
      <ResultModel ref={dialogRef} targetTime={targetTime} />
      <section className="challenge">
        <h2>{title}</h2>
        {/* <progress value={targetTime} max={targetTime} /> */}
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerStarted ? stopTimer : handleTimerExpired}>
            {timerStarted ? "Stop Challenge" : "Start Challenge"}
          </button>
        </p>
        <p className={timerStarted ? "active" : ""}>
          {timerStarted ? "Timer is running.... " : " Timer is stopped."}
        </p>
      </section>
    </>
  );
}
