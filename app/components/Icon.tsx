import React from "react";
import { icons } from "lucide-react";

type LucideIconName = keyof typeof icons;

type LucideIconProps = {
  name: LucideIconName;
  size?: number;
  color?: string;
};

const Icon: React.FC<LucideIconProps> = ({ name, color = "purple", size }) => {
  const LucideIcon = icons[name];

  if (!LucideIcon) {
    return null;
  }

  return <LucideIcon color={color} size={size} />;
};

export default Icon;
