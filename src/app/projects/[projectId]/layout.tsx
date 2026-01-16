import ProjectIdLayout from "@/features/projects/components/project-id-layout";
import { Id } from "../../../../convex/_generated/dataModel";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params as { projectId: Id<"projects"> };

  return <ProjectIdLayout projectId={projectId}>{children}</ProjectIdLayout>;
}
