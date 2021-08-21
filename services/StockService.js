import axios from "axios";

const IP = 'http://192.168.0.113:5000/';
const STOCK_COMMENT_API_URL =  IP + "comments/";
const STOCK_CANDLE_SCAN_API_URL = IP + "candlehistory";

class StockService {
  getStockComments(ticker) {
    const url = STOCK_COMMENT_API_URL + ticker;
    return axios.get(url);
  }

  postStockComment(ticker, comment) {
    const url = STOCK_COMMENT_API_URL + ticker;
    return axios.post(url, JSON.stringify(comment), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  getScanStockCandleResult(ticker, user) {
    const url = STOCK_CANDLE_SCAN_API_URL;
    const userStock = { username: user, stockticker: ticker };
    return axios.post(url, JSON.stringify(userStock), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export default new StockService();
