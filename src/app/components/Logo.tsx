import logoColor from "../../assets/logo-color.svg";
import logoWhite from "../../assets/logo-white.svg";
import logoBlack from "../../assets/logo-black.svg";

type LogoProps = {
  light?: boolean;
  black?: boolean;
  className?: string;
};

export function Logo({ light = false, black = false, className }: LogoProps) {
  const src = black ? logoBlack : light ? logoWhite : logoColor;
  return <img src={src} alt="Redeemers Structural Solutions" className={className || "h-full w-auto"} />;
}
