import Game from './game';
import DrawingGame from './games/drawingGame';
import MadlibGame from './games/madlibGame';

export default function GameFactory(gameName, data) {
    switch (gameName) {
        case "Drawing Game":
            return new DrawingGame(data);
        case "Madlib Game":
            return new MadlibGame(data);
        default:
            return new Game(data);
    }
}