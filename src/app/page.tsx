"use client";

import { ChangeEvent, useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {}, [message]);
  function handleEmitMessage() {
    // emit message to web socket
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setMessage(e.target.value);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <input
        style={{ width: "200px" }}
        placeholder="enter message"
        onChange={(e) => handleChange(e)}
        value={message}
      />

      {message}
    </div>
  );
}
