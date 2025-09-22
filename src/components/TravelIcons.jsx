import svgPaths from "../imports/svg-vnn9ckevrm";

/**
 * 맵 핀 아이콘
 * @param {Object} props - 아이콘 속성
 * @param {string} [props.className] - CSS 클래스
 */
export function MapPinIcon({ className = "size-4" }) {
  return (
    <div className={className}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g>
          <path 
            clipRule="evenodd" 
            d={svgPaths.p261ab940} 
            fill="#6050B3" 
            fillRule="evenodd" 
          />
          <path 
            d={svgPaths.p26d1c700} 
            fill="#6050B3" 
          />
        </g>
      </svg>
    </div>
  );
}

/**
 * 태그 아이콘
 * @param {Object} props - 아이콘 속성
 * @param {string} [props.className] - CSS 클래스
 */
export function TagIcon({ className = "size-4" }) {
  return (
    <div className={className}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g>
          <path 
            d={svgPaths.p21693000} 
            fill="#6050B3" 
            stroke="#6050B3" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="1.33333" 
          />
          <path 
            d="M4.66667 4.66667H4.67375" 
            stroke="white" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="1.33333" 
          />
        </g>
      </svg>
    </div>
  );
}

/**
 * 별 아이콘
 * @param {Object} props - 아이콘 속성
 * @param {string} [props.className] - CSS 클래스
 */
export function StarIcon({ className = "size-4" }) {
  return (
    <div className={className}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g>
          <path 
            d={svgPaths.pfe57700} 
            fill="#6050B3" 
            stroke="#6050B3" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="1.33333" 
          />
        </g>
      </svg>
    </div>
  );
}

/**
 * 시계 아이콘
 * @param {Object} props - 아이콘 속성
 * @param {string} [props.className] - CSS 클래스
 */
export function ClockIcon({ className = "size-4" }) {
  return (
    <div className={className}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_5_103)">
          <path 
            d={svgPaths.p3f9af080} 
            fill="#6050B3" 
            stroke="#6050B3" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="1.33333" 
          />
          <path 
            d="M8 4V8L10.6667 9.33333" 
            stroke="white" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="1.33333" 
          />
        </g>
        <defs>
          <clipPath id="clip0_5_103">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

/**
 * 왼쪽 화살표 아이콘
 * @param {Object} props - 아이콘 속성
 * @param {string} [props.className] - CSS 클래스
 */
export function ChevronLeftIcon({ className = "size-6" }) {
  return (
    <div className={className}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g>
          <path 
            d={svgPaths.p39a0c280} 
            stroke="white" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2.26667" 
          />
        </g>
      </svg>
    </div>
  );
}