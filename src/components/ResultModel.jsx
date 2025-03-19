import { useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

export default function ResultModel({
  ref,
  targetTime,
  timeRemaining,
  onTimeReset,
}) {
  const innerDialog = useRef();
  const youLost = timeRemaining <= 0;
  let remainingTimeWithFormatted = 0;
  if (timeRemaining > 0)
    remainingTimeWithFormatted = (timeRemaining / 1000).toFixed(2);

  const score = Math.round((1 - timeRemaining / (targetTime * 1000)) * 100);

  useImperativeHandle(ref, () => {
    return {
      openDialogBox() {
        innerDialog.current.showModal();
      },
    };
  });
  return createPortal(
    <dialog ref={innerDialog} className="result-modal" onClose={onTimeReset}>
      {youLost && <h2>You lost</h2>}
      {!youLost && <h2>You score : {score}%</h2>}
      <p>
        The target time was <strong>{targetTime} seconds</strong>
      </p>
      <p>
        You stop the timer{" "}
        <strong>{remainingTimeWithFormatted} second left</strong>.
      </p>
      <form method="dialog" onSubmit={onTimeReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
}
