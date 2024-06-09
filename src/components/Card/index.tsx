import { Card } from "../../types/game/card.types";
import styles from "./style.module.css";

type CardProps = {
	card: Card;
};

const CardComponent = ({ card }: CardProps) => {
	return (
		<div className={styles.cardWrapper}>
			<div className={styles.suit}> {card.suit}</div>
			<div className={styles.cardValue}> {card.value}</div>
		</div>
	);
};

export default CardComponent;
