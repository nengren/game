import Image from 'next/image';
import Link from 'next/link';
import { FaGamepad } from 'react-icons/fa';

export default function GameCard({ id, title, description, imageUrl, category }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{category}</span>
          <Link
            href={`/games/${id}`}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <FaGamepad className="mr-2" />
            玩游戏
          </Link>
        </div>
      </div>
    </div>
  );
} 