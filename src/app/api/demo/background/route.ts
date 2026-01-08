// POST - localhost:3000/api/demo/background

import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST() {
  await inngest.send({
    name: "demo/generate",
    data: {
      prompt: "Write a vegetarian lasagna recipe for 4 people.",
    },
  });

  return NextResponse.json({ status: "started" });
}
