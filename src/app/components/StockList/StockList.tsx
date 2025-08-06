import Stock from "@/app/models/interfaces/stock.interface";
import StockListProp from "@/app/models/interfaces/stockListProp.interface";
import styles from "./StockList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
const StockList: React.FC<StockListProp> = ({ stockList, follow }) => {
  return (
    <ul className={styles.stockListContainer}>
      {stockList.map((ele: Stock) => {
        return (
          <li className={styles.stockItemContainer} key={ele.name}>
            {ele.name}
            {follow ? (
              <button className={styles.followBtnContainer}>
                <FontAwesomeIcon icon={faPlus} id={styles.plusIcon} />
                <span>Follow</span>
              </button>
            ) : (
              <span className={styles.change}>{ele.change}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default StockList;
