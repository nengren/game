export const theme = {
  colors: {
    primary: {
      gradient: 'from-pink-400 to-blue-400',
      light: '#F9A8D4',
      DEFAULT: '#EC4899',
      dark: '#DB2777',
    },
    secondary: {
      gradient: 'from-blue-400 to-indigo-400',
      light: '#93C5FD',
      DEFAULT: '#3B82F6',
      dark: '#2563EB',
    },
    background: {
      light: '#F9FAFB',
      DEFAULT: '#F3F4F6',
      dark: '#E5E7EB',
    },
    text: {
      light: '#6B7280',
      DEFAULT: '#374151',
      dark: '#111827',
    },
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '1rem',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  },
  transitions: {
    default: 'all 0.2s ease-in-out',
    slow: 'all 0.3s ease-in-out',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
} as const;

export type Theme = typeof theme; 