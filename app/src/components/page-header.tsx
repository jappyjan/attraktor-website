"use client";

import { useIsScrolled } from "~/utils/scroll";

function TextStencil(props: { title: string }) {
  return (
    <svg
      width="100%"
      height="152"
      viewBox="0 0 423 152"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="page-title-svg -mb-8 scale-50 md:mb-0 md:scale-100"
    >
      <g filter="url(#filter0_i_2_16)">
        <text
          className="fill-background-light dark:fill-background-dark-80"
          xmlSpace="preserve"
          style={{ whiteSpace: "pre" }}
          font-family="var(--font-agency-fb)"
          font-size="4.5rem"
          font-weight="bold"
          letter-spacing="0em"
          text-anchor="middle"
          dominant-baseline="middle"
          x="50%"
          y="50%"
        >
          <tspan>{props.title}</tspan>
        </text>
      </g>
      <defs>
        <filter
          id="filter0_i_2_16"
          x="-4.20319"
          y="-4.26562"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-3" dy="-3" /> <feGaussianBlur stdDeviation="3" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_2_16"
          />
        </filter>
      </defs>
    </svg>
  );
}

interface Props {
  title: string;
}
export function PageHeader(props: Props) {
  const isScrolled = useIsScrolled(50);

  return (
    <div
      className={
        "shadow-lg-hard m-0 -mt-24 mb-28 flex scale-150 items-center justify-center bg-attraktor-blue pt-16 md:pt-32 transition-all " +
        (isScrolled ? "" : "rotate-6")
      }
    >
      <TextStencil title={props.title} />
    </div>
  );
}
