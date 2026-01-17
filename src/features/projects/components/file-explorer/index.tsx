import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useProject } from "../../hooks/use-projects";
import { Doc, Id } from "../../../../../convex/_generated/dataModel";
import {
  useCreateFile,
  useCreateFolder,
  useFolderContents,
} from "@/features/projects/hooks/use-files";
import CreateInput from "./create-input";
import LoadingRow from "./loading-row";
import Tree from "./tree";
import {
  ArrowDown01Icon,
  ArrowRight01Icon,
  FileAddIcon,
  FolderAddIcon,
  RemoveSquareIcon,
} from "@hugeicons/core-free-icons";
import IconButton from "@/components/icon-button";

export default function FileExplorer({
  projectId,
}: {
  projectId: Id<"projects">;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [collapseKey, setCollapseKey] = useState(0);
  const [creating, setCreating] = useState<"file" | "folder" | null>(null);

  const project = useProject(projectId);
  const rootFiles = useFolderContents({
    projectId,
    enabled: isOpen,
  });

  const createFile = useCreateFile();
  const createFolder = useCreateFolder();
  const handleCreate = (name: string) => {
    setCreating(null);

    if (creating === "file") {
      createFile({
        projectId,
        name,
        content: "",
        parentId: undefined,
      });
    } else {
      createFolder({
        projectId,
        name,
        parentId: undefined,
      });
    }
  };

  return (
    <div className="h-full bg-sidebar">
      <ScrollArea>
        <div
          role="button"
          onClick={() => setIsOpen((value) => !value)}
          className="group/project cursor-pointer w-full text-left flex items-center h-5.5 bg-accent font-bold"
        >
          {isOpen ? (
            <IconButton icon={ArrowDown01Icon} />
          ) : (
            <IconButton icon={ArrowRight01Icon} />
          )}
          <p className="text-xs uppercase line-clamp-1">
            {project?.name ?? "Loading..."}
          </p>
          <div className="opacity-0 group-hover/project:opacity-100 transition-none duration-0 flex items-center ml-auto">
            <IconButton
              icon={FileAddIcon}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setIsOpen(true);
                setCreating("file");
              }}
            />

            <IconButton
              icon={FolderAddIcon}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setIsOpen(true);
                setCreating("folder");
              }}
            />

            <IconButton
              icon={RemoveSquareIcon}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setCollapseKey((prev) => prev + 1);
              }}
            />
          </div>
        </div>
        {isOpen && (
          <>
            {rootFiles === undefined && <LoadingRow level={0} />}
            {creating && (
              <CreateInput
                type={creating}
                level={0}
                onSubmit={handleCreate}
                onCancel={() => setCreating(null)}
              />
            )}
            {rootFiles?.map((item: Doc<"files">) => (
              <Tree
                key={`${item._id}-${collapseKey}`}
                item={item}
                level={0}
                projectId={projectId}
              />
            ))}
          </>
        )}
      </ScrollArea>
    </div>
  );
}
