import { SVGProps } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="#000"
    viewBox="0 0 24 24"
    {...props}
  >
    <g stroke="#fff" strokeLinecap="round" strokeWidth={2}>
      <path d="M5 12h15M5 17h15M5 7h15" />
    </g>
  </svg>
);
export default SvgComponent;
