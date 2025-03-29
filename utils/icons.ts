// 社交媒体图标
import { 
  FaFacebookSquare, 
  FaTwitter, 
  FaInstagram, 
  FaYoutube 
} from 'react-icons/fa';

// 游戏相关图标
import { 
  FaStar, 
  FaFire, 
  FaGamepad, 
  FaUsers,
  FaHeart,
  FaShare,
  FaPlay,
  FaPause,
  FaExpand,
  FaCompress
} from 'react-icons/fa';

// 导航和UI图标
import { 
  FaSearch, 
  FaBars, 
  FaTimes, 
  FaChevronLeft,
  FaChevronRight,
  FaFilter
} from 'react-icons/fa';

// 导出所有图标
export const Icons = {
  // 社交媒体
  Facebook: FaFacebookSquare,
  Twitter: FaTwitter,
  Instagram: FaInstagram,
  Youtube: FaYoutube,

  // 游戏相关
  Star: FaStar,
  Fire: FaFire,
  Gamepad: FaGamepad,
  Users: FaUsers,
  Heart: FaHeart,
  Share: FaShare,
  Play: FaPlay,
  Pause: FaPause,
  Expand: FaExpand,
  Compress: FaCompress,

  // 导航和UI
  Search: FaSearch,
  Menu: FaBars,
  Close: FaTimes,
  ChevronLeft: FaChevronLeft,
  ChevronRight: FaChevronRight,
  Filter: FaFilter,
} as const;

// 导出图标类型
export type IconName = keyof typeof Icons; 