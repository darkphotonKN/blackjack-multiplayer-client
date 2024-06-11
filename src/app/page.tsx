"use client";

import { useEffect, useState } from "react";
import useCardManager from "../hooks/useCardManager";
import Card from "../components/Card";

import styles from "./page.module.css";
import Image from "next/image";
import { romanNumeralMapping } from "../data/mapping";
import useWebsocket from "../hooks/useWebsocket";

export default function Home() {
  const websocket = useWebsocket();
  const { deck, playersHand, dealerHand } = useCardManager();

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
          dealerHand.map((card, index) => <Card key={index} card={card} />)}
      </div>

      {/* players hand */}
      <div className={styles.playerArea}>
        {playersHand?.map((playerHand, index) => (
          <div key={index}>
            <div className={styles.titleWrapper}>
              <Image
                src={"/images/simple-deco.png"}
                alt="title-deco"
                width={40}
                height="20"
              />
              <div className={styles.playerTitle}>
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
              {playerHand &&
                playerHand.map((card, index) => (
                  <Card key={index} card={card} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
