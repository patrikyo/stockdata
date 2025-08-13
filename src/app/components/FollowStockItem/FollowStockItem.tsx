import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import styles from "./FollowStockItem.module.css";
import FollowStockItemProps from "@/app/models/interfaces/FollowStockItemProps.interface";

const FollowStockItem: React.FC<FollowStockItemProps> = ({
  name,
  ticker,
  isFollowed,
  onToggle,
}) => {
  return (
    <div className={styles.stockItemContainer}>
      <span>{name}</span>
      <button
        className={styles.followBtnContainer}
        onClick={() => onToggle(ticker)}
      >
        <FontAwesomeIcon
          icon={isFollowed ? faMinus : faPlus}
          id={styles.icon}
        />
        <span>{isFollowed ? "Unfollow" : "Follow"}</span>
      </button>
    </div>
  );
};

export default FollowStockItem;
