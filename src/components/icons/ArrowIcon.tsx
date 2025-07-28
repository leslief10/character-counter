import type { SVGProps } from 'react';

export const ArrowIcon = ({ className }: SVGProps<SVGSVGElement>) => (
  <svg width="14" height="9" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path stroke="currentColor" strokeWidth="2" fill="none" d="m1 1 6 6 6-6" />
  </svg>
);
