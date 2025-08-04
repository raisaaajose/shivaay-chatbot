import React from "react";

interface BotIconProps {
  size?: number;
  className?: string;
}

export const BotIcon: React.FC<BotIconProps> = ({
  size = 16,
  className = "",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 1024 1024"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <mask
        id={`mask0_39_34_${size}`}
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="1024"
        height="1024"
      >
        <path d="M1024 0H0V1024H1024V0Z" fill="white" />
      </mask>
      <g mask={`url(#mask0_39_34_${size})`}>
        <path
          d="M174.55 724.31H0L174.55 435.699L262.688 577.412L174.55 724.31Z"
          fill="currentColor"
        />
        <path
          d="M767.359 575.192L680.916 721.354L1018.2 720.382L942.127 575.301L767.359 575.192Z"
          fill="currentColor"
        />
        <path
          d="M349.099 722.582L262.688 577.412L516.736 154V447.796L349.099 722.582Z"
          fill="currentColor"
        />
        <path
          d="M682.644 722.582L769.055 577.412L515.007 154V447.796L682.644 722.582Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};
