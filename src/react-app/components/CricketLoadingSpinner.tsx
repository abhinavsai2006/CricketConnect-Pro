interface CricketLoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
  fullScreen?: boolean;
}

export default function CricketLoadingSpinner({ 
  size = 'md', 
  text,
  fullScreen = false
}: CricketLoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-32 h-32',
    xl: 'w-40 h-40'
  };

  const ballSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8'
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  };

  const content = (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Cricket Stadium Animation */}
      <div className={`${sizeClasses[size]} relative`}>
        {/* Outer circle - Stadium */}
        <div className="absolute inset-0 border-4 border-cricket-green-200 rounded-full animate-pulse"></div>
        
        {/* Middle circle - Pitch */}
        <div className="absolute inset-2 border-4 border-cricket-green-400 rounded-full animate-spin-slow"></div>
        
        {/* Cricket Ball bouncing around */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '2s' }}>
          <div className={`${ballSizes[size]} absolute top-0 left-1/2 -translate-x-1/2 bg-gradient-to-br from-red-600 to-red-700 rounded-full shadow-lg`}>
            {/* Ball seam */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-0.5 bg-white/40 rounded-full"></div>
            </div>
          </div>
        </div>
        
        {/* Rotating stumps */}
        <div className="absolute inset-0 flex items-center justify-center animate-pulse">
          <div className="flex space-x-0.5">
            <div className="w-1 h-6 bg-gradient-to-b from-cricket-green-600 to-cricket-green-700 rounded-full"></div>
            <div className="w-1 h-6 bg-gradient-to-b from-cricket-green-600 to-cricket-green-700 rounded-full"></div>
            <div className="w-1 h-6 bg-gradient-to-b from-cricket-green-600 to-cricket-green-700 rounded-full"></div>
          </div>
        </div>

        {/* Inner rotating circle - Boundary */}
        <div className="absolute inset-4 border-2 border-dashed border-cricket-blue-400 rounded-full animate-spin-reverse" style={{ animationDuration: '3s' }}></div>
      </div>
      
      {/* Loading text with cricket theme */}
      {text && (
        <div className="text-center">
          <p className={`${textSizes[size]} font-semibold text-gray-700 mb-1 animate-pulse`}>
            {text}
          </p>
          <div className="flex items-center justify-center space-x-1">
            <div className="w-2 h-2 bg-cricket-green-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-cricket-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-cricket-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/95 backdrop-blur-sm z-[9999] flex items-center justify-center">
        <div className="text-center">
          {content}
        </div>
      </div>
    );
  }

  return content;
}
