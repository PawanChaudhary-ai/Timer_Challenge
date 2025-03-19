import { useState, useRef } from "react";

export default function Player() {
  const playerNameInputRef = useRef();
  const [enterPlayerName, setEnterPlayerName] = useState(null);
  // function handleChange(event) {
  //   setSubMitted(false);
  //   setEnteredPlayerName(event.target.value);
  // }
  function handleClick() {
    setEnterPlayerName(playerNameInputRef.current.value);
  }
  return (
    <section id="player">
      <h2>Welcome {enterPlayerName ?? "unknown entity"}</h2>
      <p>
        <input ref={playerNameInputRef} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
