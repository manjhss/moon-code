"use client";

import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";

export default function Icon({ icon }: { icon: IconSvgElement }) {
  return <HugeiconsIcon icon={icon} strokeWidth={2} />;
}
