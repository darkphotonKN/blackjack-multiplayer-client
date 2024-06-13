import Image from "next/image";
import { Card, Suit, suits } from "../../types/game/card.types";
import styles from "./style.module.css";

type CardProps = {
	card: Card;
	handleClick: () => void;
};

const CardComponent = ({ card, handleClick }: CardProps) => {
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
		<div className={styles.cardWrapper} onClick={handleClick}>
			<Image
				className={styles.suit}
				src={renderIconRoute(card.suit)}
				alt={card.suit}
				width="23"
				height="23"
			/>
			<div className={styles.cardValue}> {card.value}</div>
		</div>
	);
};

export default CardComponent;
