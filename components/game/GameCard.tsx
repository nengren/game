import Image from 'next/image';
import Link from 'next/link';

interface GameCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  isFeatured?: boolean;
}

const GameCard: React.FC<GameCardProps> = ({
  id,
  title,
  description,
  imageUrl,
  category,
  isFeatured = false,
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 ${
      isFeatured ? 'md:col-span-2' : ''
    }`}>
      <div className="relative h-48">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded-full text-sm">
          {category}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        <Link 
          href={`/games/${id}`}
          className="block w-full bg-primary text-white text-center py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          立即玩
        </Link>
      </div>
    </div>
  );
};

export default GameCard; 