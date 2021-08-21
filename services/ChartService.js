import axios from 'axios'

// const STOCK_CANDLE_API_URL = 'http://localhost:8082/getCandleData/';
// const STOCK_PRICE_API_URL = 'http://localhost:8082/getLatestPrice/';
const IP = 'http://192.168.0.113:5000/';
const STOCK_CANDLE_API_URL = IP + "getCandleData/";
const STOCK_PRICE_API_URL = IP + "getLatestPrice/";
const STOCK_SENTIMENT_API_URL = IP + "getSentiment/";
const STOCK_TOP5_API_URL = IP + "getStockSymbol/";

// https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=1000
class ChartService {

    getChartCandleData(ticker){
        const url = STOCK_CANDLE_API_URL + ticker; 
        return axios.get(url);
    }

    getLatestClosingStockPrice(ticker){
        const url = STOCK_PRICE_API_URL + ticker; 
        return axios.get(url);
    }

    getLatestStockSentiment(ticker) {
        const url = STOCK_SENTIMENT_API_URL + ticker;
        return axios.get(url);
      }
    
      getTop5Stock(searchTerm) {
        const url = STOCK_TOP5_API_URL + searchTerm;
        return axios.get(url);
      }
}

export default new ChartService();