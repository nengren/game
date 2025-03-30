// 游戏数据
const games = [
    {
        id: 1,
        title: '超级冒险',
        description: '一个激动人心的冒险游戏，玩家需要在充满挑战的世界中探索、战斗和收集宝藏。',
        category: '冒险',
        image: '/images/games/game1.jpg',
        url: '/games/game1.html'
    },
    {
        id: 2,
        title: '赛车大师',
        description: '体验极速竞速的快感，在各种赛道上展现你的驾驶技巧。',
        category: '赛车',
        image: '/images/games/game2.jpg',
        url: '/games/game2.html'
    },
    {
        id: 3,
        title: '益智拼图',
        description: '考验智力的拼图游戏，通过移动方块来还原图片。',
        category: '益智',
        image: '/images/games/game3.jpg',
        url: '/games/game3.html'
    },
    {
        id: 4,
        title: '太空射击',
        description: '在浩瀚的宇宙中与外星人展开激烈的战斗。',
        category: '射击',
        image: '/images/games/game4.jpg',
        url: '/games/game4.html'
    },
    {
        id: 5,
        title: '农场物语',
        description: '经营你的农场，种植作物，照顾动物，打造理想中的田园生活。',
        category: '模拟',
        image: '/images/games/game5.jpg',
        url: '/games/game5.html'
    }
];

// 游戏分类
const categories = [
    { id: 'all', name: '全部' },
    { id: 'action', name: '动作' },
    { id: 'adventure', name: '冒险' },
    { id: 'puzzle', name: '益智' },
    { id: 'racing', name: '赛车' },
    { id: 'shooting', name: '射击' },
    { id: 'simulation', name: '模拟' }
];

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // 初始化游戏列表
    if (document.getElementById('games-grid')) {
        renderGames();
    }
    
    // 初始化分类列表
    if (document.getElementById('categories-grid')) {
        renderCategories();
    }
});

// 渲染游戏列表
function renderGames() {
    const gamesGrid = document.getElementById('games-grid');
    if (!gamesGrid) return;

    gamesGrid.innerHTML = games.map(game => `
        <div class="col-md-4 mb-4">
            <div class="card game-card">
                <img src="${game.image}" class="card-img-top" alt="${game.title}">
                <div class="card-body">
                    <h5 class="card-title">${game.title}</h5>
                    <p class="card-text">${game.description}</p>
                    <div class="mb-3">
                        <span class="badge bg-primary">${game.category}</span>
                    </div>
                    <a href="${game.url}" class="btn btn-primary w-100">开始游戏</a>
                </div>
            </div>
        </div>
    `).join('');
}

// 渲染分类列表
function renderCategories() {
    const categoriesGrid = document.getElementById('categories-grid');
    if (!categoriesGrid) return;

    categoriesGrid.innerHTML = categories.map(category => `
        <div class="col-6 col-md-4 col-lg-3 mb-3">
            <a href="#" class="d-block text-center category-badge bg-light text-dark" 
               onclick="filterGames('${category.id}')">
                ${category.name}
            </a>
        </div>
    `).join('');
}

// 根据分类筛选游戏
function filterGames(categoryId) {
    const filteredGames = categoryId === 'all' 
        ? games 
        : games.filter(game => game.category.toLowerCase() === categoryId);
    
    const gamesGrid = document.getElementById('games-grid');
    if (!gamesGrid) return;

    gamesGrid.innerHTML = filteredGames.map(game => `
        <div class="col-md-4 mb-4">
            <div class="card game-card">
                <img src="${game.image}" class="card-img-top" alt="${game.title}">
                <div class="card-body">
                    <h5 class="card-title">${game.title}</h5>
                    <p class="card-text">${game.description}</p>
                    <div class="mb-3">
                        <span class="badge bg-primary">${game.category}</span>
                    </div>
                    <a href="${game.url}" class="btn btn-primary w-100">开始游戏</a>
                </div>
            </div>
        </div>
    `).join('');
} 