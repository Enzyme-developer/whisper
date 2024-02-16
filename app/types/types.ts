import { icons } from "lucide-react";

export type messageType = {
  content: string;
  createdAt: string;
  id: number;
};

type LucideIconName = keyof typeof icons;

export type featureType = {
  title: string;
  description: string;
  icon: LucideIconName;
};
