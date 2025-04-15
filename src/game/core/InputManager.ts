export class InputManager {
    private handlers: Map<string, () => void> = new Map();
    private enabled: boolean = true;

    constructor() {
        this.handleInput = this.handleInput.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);

        // Add event listeners for mouse, touch, and keyboard
        window.addEventListener('mousedown', this.handleInput);
        window.addEventListener('touchsta‚rt', this.handleInput);
        window.addEventListener('keydown', this.handleKeyDown);
    }

    public addHandler(state: string, handler: () => void): void {
        const normalizedState = state.toLowerCase();
        this.handlers.set(normalizedState, handler);
    }

    public removeHandler(state: string): void {
        const normalizedState = state.toLowerCase();
        this.handlers.delete(normalizedState);
    }

    public setEnabled(enabled: boolean): void {
        this.enabled = enabled;
    }

    private handleKeyDown(e: KeyboardEvent): void {
        // Always allow input in game over state
        const currentState = (window.location.hash.slice(1) || 'title').toLowerCase();
        if (!this.enabled && currentState !== 'gameover') return;

        if (e.code === 'Space' || e.code === 'Tab') {
            e.preventDefault();
            this.triggerHandler();
        }
    }

    private handleInput(e?: Event): void {
        // Always allow input in game over state
        const currentState = (window.location.hash.slice(1) || 'title').toLowerCase();
        if (!this.enabled && currentState !== 'gameover') return;

        if (e) {
            e.preventDefault();
        }

        this.triggerHandler();
    }

    private triggerHandler(): void {
        const currentState = (window.location.hash.slice(1) || 'title').toLowerCase();
        const handler = this.handlers.get(currentState);

        if (handler) {
            handler();
        }
    }

    public cleanup(): void {
        window.removeEventListener('mousedown', this.handleInput);
        window.removeEventListener('touchstart', this.handleInput);
        window.removeEventListener('keydown', this.handleKeyDown);
    }
}