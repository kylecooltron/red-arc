export default class ConnectionRequestData {

    constructor(gameName, isHost, name, roomCode) {
        this.gameName = gameName;
        this.isHost = isHost;
        this.name = name;
        this.roomCode = roomCode;
    }

    get() {
        // return args for invoking create / join request
        if (this.isHost) {
            return ["CreateRoomRequest", this.gameName, this.name];
        }
        return ["JoinRoomRequest", this.name, this.roomCode];
    }
}