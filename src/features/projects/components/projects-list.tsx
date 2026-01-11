import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

import { Kbd } from "@/components/ui/kbd";
import { Button } from "@/components/ui/button";

import { Doc } from "../../../../convex/_generated/dataModel";

import { useProjectsPartial } from "../hooks/use-projects";
import Icon from "@/components/icon";
import {
  ArrowRight02Icon,
  CodeSimpleIcon,
} from "@hugeicons/core-free-icons";

const formatTimestamp = (timestamp: number) => {
  return formatDistanceToNow(new Date(timestamp), {
    addSuffix: true,
  });
};

interface ProjectsListProps {
  onViewAll: () => void;
}

const ContinueCard = ({ data }: { data: Doc<"projects"> }) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs text-muted-foreground">Last updated</span>
      <Button
        variant="outline"
        asChild
        className="h-auto items-start justify-start p-4 bg-background border flex flex-col gap-2"
      >
        <Link href={`/projects/${data._id}`} className="group">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Icon icon={CodeSimpleIcon} />
              <span className="font-medium truncate">{data.name}</span>
            </div>
            <Icon icon={ArrowRight02Icon} />
          </div>
          <span className="text-xs text-muted-foreground">
            {formatTimestamp(data._creationTime)}
          </span>
        </Link>
      </Button>
    </div>
  );
};

const ProjectItem = ({ data }: { data: Doc<"projects"> }) => {
  return (
    <Button variant="ghost" className="p-0">
      <Link
        href={`/projects/${data._id}`}
        className="text-sm text-foreground/60 font-medium hover:text-foreground py-1 flex items-center justify-between w-full group"
      >
        <div className="flex items-center gap-2">
          <Icon icon={CodeSimpleIcon} />
          <span className="truncate">{data.name}</span>
        </div>
        <span className="text-xs text-muted-foreground group-hover:text-foreground/60 transition-colors">
          {formatTimestamp(data._creationTime)}
        </span>
      </Link>
    </Button>
  );
};

export default function ProjectsList({ onViewAll }: ProjectsListProps) {
  const projects = useProjectsPartial(6);

  if (projects === undefined) {
    return <div>loading...</div>;
  }

  const [mostRecent, ...rest] = projects;

  return (
    <div className="flex flex-col gap-4">
      {mostRecent ? <ContinueCard data={mostRecent} /> : null}
      {rest.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-muted-foreground">
              Recent projects
            </span>
            <button
              onClick={onViewAll}
              className="flex items-center gap-2 text-muted-foreground text-xs hover:text-foreground transition-colors"
            >
              <span>View all</span>
              <Kbd className="bg-accent border">⌘K</Kbd>
            </button>
          </div>
          <ul className="flex flex-col">
            {rest.map((project) => (
              <ProjectItem key={project._id} data={project} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
