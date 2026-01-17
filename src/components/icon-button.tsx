"use client";

import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";
import { Button } from "./ui/button";

export default function IconButton({ icon, onClick }: { icon: IconSvgElement, onClick?: React.MouseEventHandler<HTMLButtonElement> }) {
  return (
    <Button variant="ghost" size="icon-sm" className="cursor-pointer" onClick={onClick}>
      <HugeiconsIcon icon={icon} strokeWidth={2} />
    </Button>
  );
}
