"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";

export default function Home() {
  const projects = useQuery(api.projects.get);
  const createProject = useMutation(api.projects.create);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button
        onClick={() =>
          createProject({ name: "New Project", ownerId: "owner123" })
        }
      >
        Create Project
      </Button>

      {projects?.map(({ _id, name, ownerId, importStatus }) => (
        <div key={_id}>
          <h1>{name}</h1>
          <p className="text-muted-foreground">
            completed: {importStatus === "completed" ? "Yes" : "No"}
          </p>
					<p>owner: {ownerId}</p>
        </div>
      ))}
    </main>
  );
}
