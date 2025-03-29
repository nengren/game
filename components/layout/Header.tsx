import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { categories } from '@/data/games';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-content">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">Joy Grid</span>
        </Link>

        {/* 搜索框 */}
        <form onSubmit={handleSearch} className="hidden md:block flex-1 max-w-xl mx-8">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索游戏..."
              className="search-input"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary"
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
            </button>
          </div>
        </form>

        {/* 导航链接 */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/popular" className="nav-link">
            热门游戏
          </Link>
          <Link href="/categories" className="nav-link">
            游戏分类
          </Link>
          <Link href="/about" className="nav-link">
            关于我们
          </Link>
          <button className="btn-primary">
            登录
          </button>
        </nav>

        {/* 移动端菜单按钮 */}
        <button
          className="md:hidden text-gray-600 hover:text-primary"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* 移动端菜单 */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索游戏..."
                  className="search-input"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary"
                >
                  <MagnifyingGlassIcon className="w-5 h-5" />
                </button>
              </div>
            </form>

            <div className="space-y-4">
              <Link
                href="/popular"
                className="block nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                热门游戏
              </Link>
              <Link
                href="/categories"
                className="block nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                游戏分类
              </Link>
              <Link
                href="/about"
                className="block nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                关于我们
              </Link>
              <button className="btn-primary w-full">
                登录
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 