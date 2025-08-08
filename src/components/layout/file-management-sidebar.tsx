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
import { Input } from "@/components/ui/input"; // <-- Import Input
import { ScrollArea } from "@/components/ui/scroll-area";
import { FilePlus2, PanelLeft, Search, Trash2 } from "lucide-react"; // <-- Import Search icon
import { ExportControls } from "../export/export-controls";

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
  const [searchTerm, setSearchTerm] = useState(""); // <-- NEW: State for search input

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

  // --- NEW: Filtering Logic ---
  const filteredDocuments = Object.values(documents)
    .filter((doc) => {
      // If search term is empty, show all documents
      if (!searchTerm.trim()) return true;

      const term = searchTerm.toLowerCase();
      // Check both title and content for a match
      return (
        doc.title.toLowerCase().includes(term) ||
        doc.content.toLowerCase().includes(term)
      );
    })
    // Sort the filtered results by creation date
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
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
        <SheetContent side="left" className=" flex flex-col p-0">
          <SheetHeader className="p-4 pb-0">
            <SheetTitle>My Documents</SheetTitle>
          </SheetHeader>
          <div className="p-4 pb-0">
            <Button onClick={addDocument} className="w-full">
              <FilePlus2 className="mr-2 h-4 w-4" />
              New Document
            </Button>
          </div>

          {/* --- NEW: Search Input --- */}
          <div className="relative px-4 pb-4">
            <Search className="absolute left-7 top-[9px] h-5 w-5  text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by title or content..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <ScrollArea className="flex-1 min-h-0 px-4">
            {/* --- NEW: Conditional Rendering for Search Results --- */}
            {filteredDocuments.length > 0 ? (
              <div className="flex flex-col gap-2 pb-4">
                {filteredDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => setActiveDocumentId(doc.id)}
                    className={cn(
                      "group flex cursor-pointer items-center justify-between rounded-md border p-3 text-sm transition-colors",
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
                        e.stopPropagation();
                        handleDeleteClick(doc);
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-sm text-muted-foreground">
                No documents found.
              </div>
            )}
          </ScrollArea>

          <ExportControls />
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              document titled {docToDelete?.title}.
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
