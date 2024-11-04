class StockExchange {
    constructor(id, name, description, liveInMarket, stocks = []) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.liveInMarket = liveInMarket;
        this.stocks = stocks; // Array of Stock IDs
    }
}

module.exports = StockExchange;
