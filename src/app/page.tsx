import styles from "./page.module.css";
import myStocks from "./data/myStocks";
import Link from "next/link";
import StockList from "./components/StockList/StockList";
import PageLink from "./components/PageLink/PageLink";
export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Mina aktier</h1>
      <StockList stockList={myStocks} follow={false} />

      <PageLink href="/stockList" label="Utforska fler aktier" />
    </div>
  );
}
