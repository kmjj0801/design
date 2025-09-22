import svgPaths from "./svg-vnn9ckevrm";
import imgActivityImage from "figma:asset/970cd77afcf98ee10d361e0b3260fbcff43a156d.png";

function MapPin() {
  return (
    <div className="absolute left-[78px] size-[16px] top-[358px]" data-name="map-pin">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="map-pin">
          <g id="Subtract">
            <path clipRule="evenodd" d={svgPaths.p261ab940} fill="var(--fill-0, #6050B3)" fillRule="evenodd" />
            <path d={svgPaths.p26d1c700} fill="var(--stroke-0, #6050B3)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Location() {
  return (
    <div className="absolute contents left-[78px] top-[355px]" data-name="location">
      <div className="absolute flex flex-col font-['Ubuntu:Regular',_sans-serif] justify-center leading-[0] left-[100px] not-italic text-[#151515] text-[18px] text-nowrap top-[365.5px] translate-y-[-50%]">
        <p className="leading-[normal] whitespace-pre">Location</p>
      </div>
      <MapPin />
    </div>
  );
}

function TagComponentSvg() {
  return (
    <div className="absolute left-[78px] size-[16px] top-[398px]" data-name="tag [component:svg]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="tag [component:svg]">
          <path d={svgPaths.p21693000} fill="var(--fill-0, #6050B3)" id="Vector" stroke="var(--stroke-0, #6050B3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M4.66667 4.66667H4.67375" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Price() {
  return (
    <div className="absolute contents left-[78px] top-[394px]" data-name="price">
      <div className="absolute flex flex-col font-['Ubuntu:Regular',_sans-serif] justify-center leading-[0] left-[100px] not-italic text-[#151515] text-[18px] text-nowrap top-[404.5px] translate-y-[-50%]">
        <p className="leading-[normal] whitespace-pre">$</p>
      </div>
      <div className="absolute flex flex-col font-['Ubuntu:Regular',_sans-serif] justify-center leading-[0] left-[113px] not-italic text-[#151515] text-[18px] text-nowrap top-[404.5px] translate-y-[-50%]">
        <p className="leading-[normal] whitespace-pre">40</p>
      </div>
      <TagComponentSvg />
    </div>
  );
}

function Star() {
  return (
    <div className="absolute left-[223px] size-[16px] top-[358px]" data-name="star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="star">
          <path d={svgPaths.pfe57700} fill="var(--fill-0, #6050B3)" id="Vector" stroke="var(--stroke-0, #6050B3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Rating() {
  return (
    <div className="absolute contents left-[223px] top-[355px]" data-name="rating">
      <div className="absolute flex flex-col font-['Ubuntu:Regular',_sans-serif] justify-center leading-[0] left-[245px] not-italic text-[#151515] text-[18px] text-nowrap top-[365.5px] translate-y-[-50%]">
        <p className="leading-[normal] whitespace-pre">4.5</p>
      </div>
      <Star />
    </div>
  );
}

function Clock() {
  return (
    <div className="absolute left-[223px] size-[16px] top-[398px]" data-name="clock">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_5_103)" id="clock">
          <path d={svgPaths.p3f9af080} fill="var(--fill-0, #6050B3)" id="Vector" stroke="var(--stroke-0, #6050B3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 4V8L10.6667 9.33333" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
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

function Duration() {
  return (
    <div className="absolute contents left-[223px] top-[394px]" data-name="duration">
      <div className="absolute flex flex-col font-['Ubuntu:Regular',_sans-serif] justify-center leading-[0] left-[245px] not-italic text-[#151515] text-[18px] text-nowrap top-[404.5px] translate-y-[-50%]">
        <p className="leading-[normal] whitespace-pre">2 hrs</p>
      </div>
      <Clock />
    </div>
  );
}

function ChevronLeft() {
  return (
    <div className="absolute left-[26.4px] size-[27.2px] top-[38.4px]" data-name="chevron-left">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="chevron-left">
          <path d={svgPaths.p39a0c280} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.26667" />
        </g>
      </svg>
    </div>
  );
}

function Arrow() {
  return (
    <div className="absolute contents left-[20px] top-[32px]" data-name="arrow">
      <div className="absolute bg-[rgba(255,255,255,0.3)] left-[20px] rounded-[8px] size-[40px] top-[32px]" />
      <ChevronLeft />
    </div>
  );
}

function HeaderContainer() {
  return (
    <div className="absolute h-[468px] left-0 overflow-clip top-0 w-[375px]" data-name="header [container]">
      <div className="absolute bg-[position:0%_0%,_50%_50%] bg-gradient-to-b bg-size-[auto,cover] from-[8.95%] from-[rgba(0,0,0,0.2)] h-[450px] left-0 rounded-[65px] to-[36.484%] to-[rgba(0,0,0,0)] top-[-65px] w-[375px]" data-name="*Activity image" style={{ backgroundImage: `url('${imgActivityImage}')` }} />
      <div className="absolute bg-white h-[101px] left-[61px] rounded-[20px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.1)] top-[335px] w-[253px]" />
      <Location />
      <Price />
      <Rating />
      <Duration />
      <Arrow />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute h-[59px] left-0 overflow-clip top-[466px] w-[375px]" data-name="[container]">
      <div className="absolute flex flex-col font-['Ubuntu:Bold',_sans-serif] justify-end leading-[0] left-[28px] not-italic text-[#151515] text-[24px] top-[45px] translate-y-[-100%] w-[320px]">
        <p className="leading-[normal]">Activity Name</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute h-[153px] left-0 overflow-clip top-[527px] w-[375px]" data-name="[container]">
      <div className="absolute font-['Ubuntu:Regular',_sans-serif] leading-[0] left-[28px] not-italic text-[#424242] text-[18px] top-[9px] w-[320px]">
        <p className="leading-[24px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius egestas ut nec aenean risus tincidunt massa blandit praesent. Risus justo diam orci sagittis.</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute contents left-[61px] top-[23px]" data-name="button">
      <div className="absolute bg-[#6050b3] h-[59px] left-[61px] rounded-[15px] shadow-[0px_4px_20px_0px_rgba(96,80,179,0.3)] top-[23px] w-[253px]" />
      <div className="absolute flex flex-col font-['Ubuntu:Bold',_sans-serif] h-[33px] justify-center leading-[0] left-[188px] not-italic text-[18px] text-center text-white top-[52.5px] translate-x-[-50%] translate-y-[-50%] w-[252px]">
        <p className="leading-[normal]">Book Now</p>
      </div>
    </div>
  );
}

function Layer() {
  return (
    <div className="absolute h-[106px] left-0 overflow-clip top-[680px] w-[375px]" data-name="[layer]">
      <Button />
    </div>
  );
}

export default function DetailPage() {
  return (
    <div className="bg-white relative size-full" data-name="detail page">
      <HeaderContainer />
      <Container />
      <Container1 />
      <Layer />
    </div>
  );
}