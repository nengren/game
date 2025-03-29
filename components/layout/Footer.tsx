import Link from 'next/link';
import { 
  FacebookIcon, 
  TwitterIcon, 
  InstagramIcon, 
  YoutubeIcon 
} from '@heroicons/react/24/outline';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    '关于我们': [
      { name: '公司简介', href: '/about' },
      { name: '加入我们', href: '/careers' },
      { name: '联系我们', href: '/contact' },
      { name: '新闻动态', href: '/news' },
    ],
    '帮助中心': [
      { name: '常见问题', href: '/faq' },
      { name: '用户指南', href: '/guide' },
      { name: '反馈建议', href: '/feedback' },
      { name: '服务条款', href: '/terms' },
    ],
    '法律信息': [
      { name: '隐私政策', href: '/privacy' },
      { name: '使用条款', href: '/terms' },
      { name: '版权声明', href: '/copyright' },
      { name: '免责声明', href: '/disclaimer' },
    ],
  };

  const socialLinks = [
    { name: 'Facebook', icon: FacebookIcon, href: 'https://facebook.com/joygrid' },
    { name: 'Twitter', icon: TwitterIcon, href: 'https://twitter.com/joygrid' },
    { name: 'Instagram', icon: InstagramIcon, href: 'https://instagram.com/joygrid' },
    { name: 'YouTube', icon: YoutubeIcon, href: 'https://youtube.com/joygrid' },
  ];

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* 品牌信息 */}
        <div>
          <Link href="/" className="text-2xl font-bold text-white mb-4 block">
            Joy Grid
          </Link>
          <p className="text-gray-400 mb-4">
            你的游戏天堂，随时随地享受精彩游戏体验。
          </p>
          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <social.icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>

        {/* 链接列表 */}
        {Object.entries(footerLinks).map(([category, links]) => (
          <div key={category}>
            <h3 className="text-white font-semibold mb-4">{category}</h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* 联系方式 */}
        <div>
          <h3 className="text-white font-semibold mb-4">联系我们</h3>
          <ul className="space-y-2 text-gray-400">
            <li>邮箱：support@joygrid.com</li>
            <li>电话：400-123-4567</li>
            <li>地址：北京市朝阳区xxx大厦</li>
            <li>工作时间：周一至周日 9:00-22:00</li>
          </ul>
        </div>
      </div>

      {/* 版权信息 */}
      <div className="border-t border-gray-800 mt-8 pt-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; {currentYear} Joy Grid. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 