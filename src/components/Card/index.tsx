import Image from "next/image";
import { Card, Suit, suits } from "../../types/game/card.types";
import styles from "./style.module.css";

type CardProps = {
	card: Card;
};

const CardComponent = ({ card }: CardProps) => {
	function renderIconRoute(suit: Suit): string {
		switch (suit) {
			case suits.CLUBS: {
				return "/images/clubs-icon.png";
			}
			case suits.DIAMONDS: {
				return "/images/diamonds-icon.png";
			}
			case suits.HEARTS: {
				return "/images/hearts-icon.png";
			}
			case suits.SPADES: {
				return "/images/spades-icon.png";
			}
		}
	}
	return (
		<div className={styles.cardWrapper}>
			<Image
				className={styles.suit}
				src={renderIconRoute(card.suit)}
				alt={card.suit}
				width="22"
				height="22"
			/>
			<div className={styles.cardValue}> {card.value}</div>
		</div>
	);
};

export default CardComponent;
