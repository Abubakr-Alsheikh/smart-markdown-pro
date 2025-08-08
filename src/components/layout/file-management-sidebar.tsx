"use client";

import { useState } from "react";
import { useDocumentStore, Document } from "@/lib/store/useDocumentStore";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FilePlus2, PanelLeft, Trash2 } from "lucide-react";
import { Separator } from "../ui/separator";

export function FileManagementSidebar() {
  const {
    documents,
    activeDocumentId,
    addDocument,
    deleteDocument,
    setActiveDocumentId,
  } = useDocumentStore();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [docToDelete, setDocToDelete] = useState<Document | null>(null);

  const handleDeleteClick = (doc: Document) => {
    setDocToDelete(doc);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (docToDelete) {
      deleteDocument(docToDelete.id);
    }
    setIsDeleteDialogOpen(false);
    setDocToDelete(null);
  };

  const documentList = Object.values(documents).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Documents Sidebar</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <SheetHeader>
            <SheetTitle>My Documents</SheetTitle>
          </SheetHeader>
          <div className="px-4">
            <Button onClick={addDocument} className="w-full">
              <FilePlus2 className="mr-2 h-4 w-4" />
              New Document
            </Button>
          </div>
          <Separator />
          <ScrollArea className="flex-1">
            <div className="flex flex-col gap-2 pr-7">
              {documentList.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => setActiveDocumentId(doc.id)}
                  className={cn(
                    "group flex cursor-pointer items-center justify-between rounded-md border p-3 m-3 mt-0 w-full text-sm transition-colors",
                    activeDocumentId === doc.id
                      ? "border-primary bg-muted"
                      : "hover:bg-muted/50"
                  )}
                >
                  <div className="flex flex-col">
                    <span className="font-semibold">{doc.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(doc.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent setting doc as active
                      handleDeleteClick(doc);
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              document titled "{docToDelete?.title}".
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
