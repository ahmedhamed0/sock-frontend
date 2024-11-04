class Stock {
    constructor(id, name, description, currentPrice, lastUpdate) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.currentPrice = currentPrice;
        this.lastUpdate = lastUpdate;
    }
}

module.exports = Stock;
