export interface Game {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  developer: string;
  releaseDate: string;
  rating: number;
  features: string[];
  screenshots: string[];
  videoUrl: string;
  gameUrl: string;
}

export const games: Game[] = [
  {
    id: 'super-adventure',
    title: '超级冒险',
    description: '一个激动人心的冒险游戏，玩家将在游戏中探索神秘的世界，解开各种谜题，战胜强大的敌人。',
    imageUrl: '/images/games/super-adventure.jpg',
    category: '动作冒险',
    developer: '游戏工作室',
    releaseDate: '2024-03-01',
    rating: 4.5,
    features: [
      '精美的3D画面',
      '流畅的操作体验',
      '丰富的剧情内容',
      '多样的游戏玩法'
    ],
    screenshots: [
      '/images/games/super-adventure-1.jpg',
      '/images/games/super-adventure-2.jpg',
      '/images/games/super-adventure-3.jpg'
    ],
    videoUrl: 'https://example.com/super-adventure-trailer.mp4',
    gameUrl: 'https://example.com/play/super-adventure'
  },
  {
    id: 'strategy-master',
    title: '策略大师',
    description: '考验你的战略思维，在这个回合制策略游戏中，你需要合理分配资源，训练军队，征服领土。',
    imageUrl: '/images/games/strategy-master.jpg',
    category: '策略',
    developer: '策略游戏工作室',
    releaseDate: '2024-02-15',
    rating: 4.8,
    features: [
      '深度的策略系统',
      '多样的兵种单位',
      '随机地图生成',
      '多人对战模式'
    ],
    screenshots: [
      '/images/games/strategy-master-1.jpg',
      '/images/games/strategy-master-2.jpg',
      '/images/games/strategy-master-3.jpg'
    ],
    videoUrl: 'https://example.com/strategy-master-trailer.mp4',
    gameUrl: 'https://example.com/play/strategy-master'
  },
  // 添加更多游戏...
];

export const categories = [
  { id: 'action', name: '动作', icon: '🎮' },
  { id: 'adventure', name: '冒险', icon: '🗺️' },
  { id: 'strategy', name: '策略', icon: '⚔️' },
  { id: 'puzzle', name: '益智', icon: '🧩' },
  { id: 'simulation', name: '模拟', icon: '🏢' },
  { id: 'rpg', name: '角色扮演', icon: '👤' },
  { id: 'casual', name: '休闲', icon: '🎲' },
  { id: 'sports', name: '体育', icon: '⚽' }
]; 