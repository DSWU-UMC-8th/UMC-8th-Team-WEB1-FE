import React from "react";

const HalfStar: React.FC<{ size?: number; color?: string }> = ({
  size = 20,
  color = "#B4D780",
}) => (
  <svg
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  style={{ verticalAlign: 'middle', display: 'inline-block' }}
>

    <defs>
      <linearGradient id="halfGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="50%" stopColor={color} />
        <stop offset="50%" stopColor="transparent" />
      </linearGradient>
    </defs>
    <path
      fill="url(#halfGrad)"
      stroke={color}
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63
         2 9.24l5.46 4.73L5.82 21z"
    />
  </svg>
);

export default HalfStar;
