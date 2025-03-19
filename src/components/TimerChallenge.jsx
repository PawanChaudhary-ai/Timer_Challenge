import { useState, useRef } from "react";
import ResultModel from "./ResultModel.jsx";
export default function TimerChallenge({ title, targetTime }) {
  const interval = useRef();
  const dialogRef = useRef();
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;
  if (timeRemaining <= 0) {
    clearInterval(interval.current);
    dialogRef.current.openDialogBox();
  }

  function handleTimeReset() {
    setTimeRemaining(targetTime * 1000);
  }

  function handleStartTimer() {
    interval.current = setInterval(() => {
      setTimeRemaining((previousTime) => previousTime - 10);
    }, 10);
  }

  function stopTimer() {
    clearInterval(interval.current);
    dialogRef.current.openDialogBox();
  }
  return (
    <>
      <ResultModel
        ref={dialogRef}
        targetTime={targetTime}
        timeRemaining={timeRemaining}
        onTimeReset={handleTimeReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        {/* <progress value={targetTime} max={targetTime} /> */}
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? stopTimer : handleStartTimer}>
            {timerIsActive ? "Stop Challenge" : "Start Challenge"}
          </button>
        </p>
        <p className={timerIsActive ? "active" : ""}>
          {timerIsActive ? "Timer is running.... " : " Timer is stopped."}
        </p>
      </section>
    </>
  );
}
