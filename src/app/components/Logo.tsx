import logoColor from "../../assets/logo-color.svg";
import logoWhite from "../../assets/logo-white.svg";
import logoBlack from "../../assets/logo-black.svg";
import logoWhiteTight from "../../assets/logo-white-tight.svg";

type LogoProps = {
  light?: boolean;
  black?: boolean;
  tight?: boolean; // viewBox recortado al ras del logo, sin sangrado
  className?: string;
};

export function Logo({ light = false, black = false, tight = false, className }: LogoProps) {
  const src = tight && light ? logoWhiteTight : black ? logoBlack : light ? logoWhite : logoColor;
  return <img src={src} alt="Redeemers Structural Solutions" className={className || "h-full w-auto"} />;
}
