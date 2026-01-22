import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { useFile } from "@/features/projects/hooks/use-files";

import { useEditor } from "../hooks/use-editor";
import { Id } from "../../../../convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import { FileIcon } from "@react-symbols/icons/utils";
import IconButton from "@/components/icon-button";
import { Cancel01Icon } from "@hugeicons/core-free-icons";

const Tab = ({
  fileId,
  isFirst,
  projectId,
}: {
  fileId: Id<"files">;
  isFirst: boolean;
  projectId: Id<"projects">;
}) => {
  const file = useFile(fileId);
  const { activeTabId, previewTabId, setActiveTab, openFile, closeTab } =
    useEditor(projectId);

  const isActive = activeTabId === fileId;
  const isPreview = previewTabId === fileId;
  const fileName = file?.name ?? "Loading...";

  return (
    <div
      onClick={() => setActiveTab(fileId)}
      onDoubleClick={() => openFile(fileId, { pinned: true })}
      className={cn(
        "flex items-center gap-2 h-8.75 pl-2 pr-1.5 cursor-pointer text-muted-foreground group border-y border-x border-transparent hover:bg-accent/30",
        isActive &&
          "bg-background text-foreground border-x-border border-b-background -mb-px drop-shadow",
        isFirst && "border-l-transparent!",
      )}
    >
      {file === undefined ? (
        <Spinner className="text-ring" />
      ) : (
        <FileIcon fileName={fileName} autoAssign className="size-4" />
      )}
      <span className={cn("text-sm whitespace-nowrap", isPreview && "italic")}>
        {fileName}
      </span>

      <IconButton
        icon={Cancel01Icon}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          closeTab(fileId);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            e.stopPropagation();
            closeTab(fileId);
          }
        }}
      />
    </div>
  );
};

export default function TopNavigation({
  projectId,
}: {
  projectId: Id<"projects">;
}) {
  const { openTabs } = useEditor(projectId) as { openTabs: Id<"files">[] };

  return (
    <ScrollArea className="flex-1">
      <nav className="bg-sidebar flex items-center h-8.75 border-b">
        {openTabs.map((fileId, index) => (
          <Tab
            key={fileId}
            fileId={fileId}
            isFirst={index === 0}
            projectId={projectId}
          />
        ))}
      </nav>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
