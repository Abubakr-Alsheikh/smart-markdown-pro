"use client";

import React from "react";
import { useSettingsStore, SavedFont } from "@/lib/store/useSettingsStore";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExternalLink, Settings, Trash2, X } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

// A simple utility to extract the primary font name for display
const parseFontName = (fontFamily: string): string => {
  if (!fontFamily) return "Default";
  return fontFamily.split(",")[0].replace(/['"]/g, "").trim();
};

export function SettingsDialog() {
  // --- THIS IS THE FIX ---
  // Select each piece of state individually.
  const isRTL = useSettingsStore((state) => state.isRTL);
  const fontSize = useSettingsStore((state) => state.fontSize);
  const toggleRTL = useSettingsStore((state) => state.toggleRTL);
  const setFontSize = useSettingsStore((state) => state.setFontSize);
  const activeFontFamily = useSettingsStore((state) => state.activeFontFamily);
  const savedFonts = useSettingsStore((state) => state.savedFonts);
  const setActiveFont = useSettingsStore((state) => state.setActiveFont);
  const saveAndApplyNewFont = useSettingsStore(
    (state) => state.saveAndApplyNewFont
  );
  const resetActiveFont = useSettingsStore((state) => state.resetActiveFont);
  const deleteSavedFont = useSettingsStore((state) => state.deleteSavedFont);

  // Local state for the input fields
  const [newLink, setNewLink] = React.useState("");
  const [newFamily, setNewFamily] = React.useState("");

  const handleApplyNewFont = () => {
    if (!newLink.startsWith("https://fonts.googleapis.com/css2?family=")) {
      toast.error("Invalid Google Fonts URL.");
      return;
    }
    if (!newFamily.includes(",")) {
      toast.error("Invalid CSS Font Family value.");
      return;
    }

    const newFont: SavedFont = { family: newFamily, link: newLink };
    saveAndApplyNewFont(newFont);

    // Clear inputs after successful save
    setNewLink("");
    setNewFamily("");
    toast.success(`Font "${parseFontName(newFamily)}" saved and applied!`);
  };

  const handleSelectFont = (family: string) => {
    if (family === "default") {
      resetActiveFont();
      toast.info("Font reset to default.");
    } else {
      const fontToApply = savedFonts.find((f) => f.family === family);
      if (fontToApply) {
        setActiveFont(fontToApply);
        toast.success(`Applied font: "${parseFontName(family)}"`);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="h-5 w-5" />
          <span className="sr-only">Open Settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Preview Settings</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="rtl-mode">Right-to-Left (RTL) Mode</Label>
            <Switch id="rtl-mode" checked={isRTL} onCheckedChange={toggleRTL} />
          </div>

          {/* Font Size Slider */}
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="font-size">Font Size</Label>
              <span className="text-sm text-muted-foreground">
                {fontSize}px
              </span>
            </div>
            <Slider
              id="font-size"
              min={12}
              max={24}
              step={1}
              value={[fontSize]}
              onValueChange={(value) => setFontSize(value[0])}
            />
          </div>

          <div className="grid gap-4 rounded-lg border p-4">
            <h3 className="font-semibold">Custom Font</h3>

            {/* --- FONT SELECTOR --- */}
            <div className="grid gap-2">
              <Label>Active Font</Label>
              <Select
                onValueChange={handleSelectFont}
                value={activeFontFamily || "default"}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a font" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default Font</SelectItem>
                  {savedFonts.map((font) => (
                    <div
                      key={font.family}
                      className="flex items-center justify-between pr-2"
                    >
                      <SelectItem value={font.family}>
                        {parseFontName(font.family)}
                      </SelectItem>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteSavedFont(font.family);
                          toast.error(
                            `Removed font "${parseFontName(font.family)}"`
                          );
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* --- ADD NEW FONT FORM --- */}
            <div className="mt-4 border-t pt-4">
              <p className="mb-2 text-sm font-medium">Add a New Font</p>
              <div className="text-sm text-muted-foreground mb-4">
                Go to{" "}
                <Link
                  href="https://fonts.google.com"
                  target="_blank"
                  className="inline-flex items-center text-primary underline underline-offset-4"
                >
                  Google Fonts <ExternalLink className="ml-1 h-3 w-3" />
                </Link>
                , choose a font, and copy the values below.
              </div>
              <div className="grid gap-2">
                <Label htmlFor="font-link">1. Embed Link URL</Label>
                <Input
                  id="font-link"
                  value={newLink}
                  onChange={(e) => setNewLink(e.target.value)}
                  placeholder="https://fonts.googleapis.com/css2?family=..."
                />
              </div>
              <div className="grid gap-2 mt-2">
                <Label htmlFor="font-family">2. CSS `font-family` Value</Label>
                <Input
                  id="font-family"
                  value={newFamily}
                  onChange={(e) => setNewFamily(e.target.value)}
                  placeholder='"Font Name", sans-serif'
                />
              </div>
              <Button onClick={handleApplyNewFont} className="mt-4 w-full">
                Save and Apply
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
