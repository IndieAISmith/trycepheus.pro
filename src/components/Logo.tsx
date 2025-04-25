
interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizes = {
    sm: 'h-12',
    md: 'h-14',
    lg: 'h-16',
  };

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/cepheus-logo.svg" 
        alt="Cepheus Logo" 
        className={`${sizes[size]}`}
      />
    </div>
  );
};

export default Logo;
