import { GameState, GameScore, GameAchievement } from '@/types/game';

class GameStateManager {
  private static instance: GameStateManager;
  private state: GameState;
  private listeners: Map<string, Set<(state: GameState) => void>>;
  private scores: GameScore[];
  private achievements: GameAchievement[];

  private constructor() {
    this.state = {
      isPlaying: false,
      isPaused: false,
      isGameOver: false,
      score: 0,
      time: 0,
      moves: 0,
      difficulty: 'medium',
      soundEnabled: true,
      musicEnabled: true,
      tutorialShown: false,
      achievements: [],
      currentLevel: 1,
      lives: 3,
      powerUps: [],
      settings: {
        volume: 1.0,
        language: 'en',
        theme: 'light',
        controls: 'auto',
      },
    };
    this.listeners = new Map();
    this.scores = [];
    this.achievements = [];
  }

  public static getInstance(): GameStateManager {
    if (!GameStateManager.instance) {
      GameStateManager.instance = new GameStateManager();
    }
    return GameStateManager.instance;
  }

  public getState(): GameState {
    return { ...this.state };
  }

  public setState(newState: Partial<GameState>): void {
    this.state = { ...this.state, ...newState };
    this.notifyListeners();
  }

  public subscribe(event: string, callback: (state: GameState) => void): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)?.add(callback);

    return () => {
      this.listeners.get(event)?.delete(callback);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listeners => {
      listeners.forEach(callback => callback(this.state));
    });
  }

  public startGame(difficulty: string = 'medium'): void {
    this.setState({
      isPlaying: true,
      isPaused: false,
      isGameOver: false,
      score: 0,
      time: 0,
      moves: 0,
      difficulty,
      currentLevel: 1,
      lives: 3,
      powerUps: [],
    });
  }

  public pauseGame(): void {
    this.setState({ isPaused: true });
  }

  public resumeGame(): void {
    this.setState({ isPaused: false });
  }

  public endGame(): void {
    this.setState({ isGameOver: true });
  }

  public updateScore(points: number): void {
    this.setState({ score: this.state.score + points });
  }

  public incrementMoves(): void {
    this.setState({ moves: this.state.moves + 1 });
  }

  public updateTime(time: number): void {
    this.setState({ time });
  }

  public toggleSound(): void {
    this.setState({ soundEnabled: !this.state.soundEnabled });
  }

  public toggleMusic(): void {
    this.setState({ musicEnabled: !this.state.musicEnabled });
  }

  public setDifficulty(difficulty: string): void {
    this.setState({ difficulty });
  }

  public addPowerUp(powerUp: string): void {
    this.setState({
      powerUps: [...this.state.powerUps, powerUp],
    });
  }

  public usePowerUp(powerUp: string): void {
    this.setState({
      powerUps: this.state.powerUps.filter(p => p !== powerUp),
    });
  }

  public loseLife(): void {
    this.setState({ lives: this.state.lives - 1 });
  }

  public gainLife(): void {
    this.setState({ lives: this.state.lives + 1 });
  }

  public saveScore(score: Omit<GameScore, 'date' | 'platform' | 'device' | 'browser'>): void {
    const newScore: GameScore = {
      ...score,
      date: new Date().toISOString(),
      platform: typeof window !== 'undefined' ? window.navigator.platform : 'unknown',
      device: typeof window !== 'undefined' ? /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/.test(window.navigator.userAgent) ? 'mobile' : 'desktop' : 'unknown',
      browser: typeof window !== 'undefined' ? window.navigator.userAgent : 'unknown',
      isVerified: false,
    };
    this.scores.push(newScore);
    this.scores.sort((a, b) => b.score - a.score);
  }

  public getScores(): GameScore[] {
    return [...this.scores];
  }

  public unlockAchievement(achievement: GameAchievement): void {
    if (!this.achievements.some(a => a.id === achievement.id)) {
      this.achievements.push({
        ...achievement,
        unlockedAt: new Date().toISOString(),
      });
    }
  }

  public getAchievements(): GameAchievement[] {
    return [...this.achievements];
  }

  public resetGame(): void {
    this.setState({
      isPlaying: false,
      isPaused: false,
      isGameOver: false,
      score: 0,
      time: 0,
      moves: 0,
      currentLevel: 1,
      lives: 3,
      powerUps: [],
    });
  }
}

export const gameStateManager = GameStateManager.getInstance(); 