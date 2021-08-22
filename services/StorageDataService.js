import AsyncStorage from "@react-native-async-storage/async-storage";

class SessionDataService{

     //watchlist session array of obj: [{stockticker: , stockname: , username: , }, ...]
  async getUserWatchlist() {

      //return an array of js objects [{stockticker: , stockname: , username: , }, ...]
      return JSON.parse(await AsyncStorage.getItem("watchlist"));
  }

  setUserWatchlist(stockTickerArr) {
      AsyncStorage.setItem(
        "watchlist",
        JSON.stringify(stockTickerArr)
      );
  }

  async addStockToWatchlist(ticker, companyName) {
        const user = await AsyncStorage.getItem('username');
      const stockToAdd = {
        stockticker: ticker,
        stockname: companyName,
        username: user,
      };
      var watchlist = await this.getUserWatchlist();
      watchlist = [stockToAdd, ...watchlist];
      this.setUserWatchlist(watchlist);

  }

  async deleteStockToWatchlist(ticker) {
    const user = await AsyncStorage.getItem('username');

      var watchlist = this.getUserWatchlist();
      if (watchlist) {
        const stockToDelete = watchlist.find((x) => x.stockticker === ticker);
        var stockIndex = watchlist.indexOf(stockToDelete);
        watchlist.splice(stockIndex, 1);
        this.setUserWatchlist(watchlist);
      }

  }

  async checkIsStockWatched(ticker) {
    const watchlist = await this.getUserWatchlist();
    if (watchlist) {
      const stockToFind = watchlist.find((x) => x.stockticker === ticker);
      console.log(stockToFind)
      if (stockToFind) {
        return true;
      }
    }
    return false;
  }


}

export default new SessionDataService();