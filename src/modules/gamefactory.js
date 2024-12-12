import Game from './game';
import DrawingGame from './games/drawingGame';

export default function GameFactory(gameName, data) {
    switch (gameName) {
        case "Drawing Game":
            return new DrawingGame(data);
        default:
            return new Game(data);
    }
}