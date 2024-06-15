"use client";

import useCardManager from "../hooks/useCardManager";
import Card from "../components/Card";

import styles from "./page.module.css";
import Image from "next/image";
import { romanNumeralMapping } from "../data/mapping";
import useWebsocket from "../hooks/useWebsocket";
import { encodeAction } from "../util/dataTransfer";
import { useAppSelector } from "../state/store";

export default function Home() {
  const clientId = useAppSelector((state) => state.client).id;
  // TODO: change the 4 player limit to real server's
  const clients = useAppSelector((state) => state.client).clients.slice(0, 4);

  console.log("Current clients are:", clients);

  const { socket } = useWebsocket(); // connect to websocket and set up clean up
  const { playersHand, dealerHand } = useCardManager();

  function handleMove() {
    const actionType = 0x03;
    const actionData = "DEAL";

    if (clientId && socket) {
      // encode data into a Buffer before sending
      const encodedData = encodeAction(clientId, actionType, actionData);
      // send to server via socket
      socket?.send(encodedData);
    }
  }

  return (
    <div>
      <h3>BLACKJACK</h3>
      <Image
        src={"/images/complex-deco.png"}
        alt="title-deco"
        width={50}
        height="30"
      />

      {/* Dealers Hand */}
      <div className={styles.titleWrapper}>
        <Image
          src={"/images/star-deco.png"}
          alt="title-deco"
          width={40}
          height="20"
        />
        <div className={styles.playerTitle}>DEALER</div>
        <Image
          src={"/images/star-deco.png"}
          alt="title-deco"
          width={40}
          height="20"
        />
      </div>

      <div className={styles.cardArea}>
        {dealerHand &&
          dealerHand.map((card, index) => (
            <Card key={index} card={card} handleClick={handleMove} />
          ))}
      </div>

      {/* players hand */}
      <div className={styles.playerArea}>
        {clients?.map((player, index) => (
          <div
            // className={player[0] === clientId ? `${styles.currentTurn}` : ""}
            key={index}
          >
            <div className={styles.titleWrapper}>
              <Image
                src={"/images/simple-deco.png"}
                alt="title-deco"
                width={40}
                height="20"
              />
              {/* show current player if clientId matches */}
              <div
                className={
                  player[0] === clientId
                    ? styles.playerTitle + " " + styles.currentPlayer
                    : styles.playerTitle
                }
              >
                PLAYER{" "}
                {
                  romanNumeralMapping[
                  (index + 1).toString() as keyof typeof romanNumeralMapping
                  ]
                }
              </div>
              <Image
                src={"/images/simple-deco.png"}
                alt="title-deco"
                width={40}
                height="20"
              />
            </div>

            <div className={styles.cardArea}>
              {/* TODO: sync players hand with client ids */}

              {playersHand &&
                playersHand[0].map((card, index) => (
                  <Card key={index} card={card} handleClick={handleMove} />
                ))}
            </div>
          </div>
        ))}
      </div>

      <button className={styles.actionButton} onClick={handleMove}>
        Deal
      </button>
    </div>
  );
}
