export default class Player {

    constructor(data) {
        this.id = data.connectionId;
        this.isHost = data.isHost;
        this.name = data.name;
        this.symbol = data.symbol;
    }

}