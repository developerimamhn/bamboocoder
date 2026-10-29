import {
  AppWindow,
  Braces,
  Cloud,
  Compass,
  Gauge,
  Handshake,
  Layers,
  LifeBuoy,
  PenTool,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/content/types";
import { cn } from "@/lib/utils";

const icons: Record<IconName, LucideIcon> = {
  braces: Braces,
  "app-window": AppWindow,
  smartphone: Smartphone,
  "pen-tool": PenTool,
  cloud: Cloud,
  workflow: Workflow,
  compass: Compass,
  users: Users,
  "shield-check": ShieldCheck,
  gauge: Gauge,
  handshake: Handshake,
  "life-buoy": LifeBuoy,
  layers: Layers,
  sparkles: Sparkles,
};

export function Icon({ name, className }: { name: IconName; className?: string }) {
  const Component = icons[name];
  return <Component aria-hidden strokeWidth={1.75} className={cn("size-5", className)} />;
}

/** Icon inside a soft rounded tile — the standard treatment on cards. */
export function IconTile({ name, className }: { name: IconName; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-xl border border-bamboo-100 bg-bamboo-50 text-bamboo-700",
        className,
      )}
    >
      <Icon name={name} />
    </span>
  );
}
