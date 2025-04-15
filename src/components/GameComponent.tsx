import {useEffect, useRef, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {GameLoop} from '../game/core/GameLoop';
import {GameStateManager, GameState} from '../game/core/StateManager';
import SoundToggle from './SoundToggle';

function GameComponent() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [stateManager, setStateManager] = useState<GameStateManager | null>(null);
    const location = useLocation();

    useEffect(() => {
        if (!canvasRef.current) return;

        console.log(stateManager)

        // Set canvas size
        canvasRef.current.width = 320;
        canvasRef.current.height = 480;

        // Initialize game with current route
        const manager = new GameStateManager(canvasRef.current, location.pathname);
        setStateManager(manager);

        const gameLoop = new GameLoop(manager);
        gameLoop.start();

        // Set initial state from URL hash if present
        const hash = window.location.hash.slice(1);
        if (hash && Object.values(GameState).includes(hash as GameState)) {
            manager.changeState(hash as GameState);
        }

        return () => {
            manager.cleanup();
        };
    }, [location.pathname]);

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <canvas
                ref={canvasRef}
                className="border border-gray-700 rounded-lg shadow-lg"
                style={{imageRendering: 'pixelated'}}
            />
            <SoundToggle/>
        </div>
    );
}

export default GameComponent;