import { SVGProps } from 'react';

const NeutralOutlined = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    id="Icons"
    viewBox="0 0 32 32"
    {...props}
  >
    <style>
      {
        '.st0{fill:none;stroke:#000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10}'
      }
    </style>
    <circle cx={16} cy={16} r={13} className="st0" />
    <path d="M12 12v4M20 12v4M10 20h12" className="st0" />
  </svg>
);
export default NeutralOutlined;
