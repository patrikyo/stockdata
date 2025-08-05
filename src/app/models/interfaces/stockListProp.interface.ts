import Stock from "./stock.interface";

interface StockListProp {
  stockList: Stock[];
  follow?: boolean;
}

export default StockListProp;
