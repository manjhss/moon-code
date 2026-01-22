"use client";

import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";
import { type VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "./ui/button";

interface IconButtonProps
  extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  icon: IconSvgElement;
}

export default function IconButton({ icon, ...props }: IconButtonProps) {
  return (
    <Button
      variant="ghost"
      className="cursor-pointer"
      size={"icon-sm"}
      {...props}
    >
      <HugeiconsIcon icon={icon} strokeWidth={2} />
    </Button>
  );
}
