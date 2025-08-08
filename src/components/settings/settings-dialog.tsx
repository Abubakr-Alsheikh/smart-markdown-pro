"use client";

import React from "react";
import { useSettingsStore } from "@/lib/store/useSettingsStore";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ExternalLink, Settings, X } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export function SettingsDialog() {
  const {
    isRTL,
    fontSize,
    fontLink,
    fontFamily,
    toggleRTL,
    setFontSize,
    setFont,
    resetFont,
  } = useSettingsStore();

  const [localLink, setLocalLink] = React.useState(fontLink);
  const [localFamily, setLocalFamily] = React.useState(fontFamily);

  const handleApplyFont = () => {
    // Basic validation
    if (!localLink.startsWith("https://fonts.googleapis.com/css2?family=")) {
      toast.error("Invalid Google Fonts URL.", {
        description: "Please paste the full <link> `href` value.",
      });
      return;
    }
    if (!localFamily.includes(",")) {
      toast.error("Invalid CSS Font Family.", {
        description: 'It should look like: "Roboto", sans-serif',
      });
      return;
    }
    setFont(localLink, localFamily);
    toast.success("Custom font applied!");
  };

  const handleResetFont = () => {
    resetFont();
    setLocalLink("");
    setLocalFamily("");
    toast.info("Font has been reset to default.");
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

          {/* --- NEW FONT CONTROLS SECTION --- */}
          <div className="grid gap-4 rounded-lg border p-4">
            <h3 className="font-semibold">Custom Font</h3>
            <div className="text-sm text-muted-foreground">
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
                placeholder="https://fonts.googleapis.com/css2?family=..."
                value={localLink}
                onChange={(e) => setLocalLink(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="font-family">2. CSS `font-family` Value</Label>
              <Input
                id="font-family"
                placeholder='"Font Name", sans-serif'
                value={localFamily}
                onChange={(e) => setLocalFamily(e.target.value)}
              />
            </div>

            <div className="flex justify-between">
              <Button
                variant="ghost"
                onClick={handleResetFont}
                className="text-destructive hover:text-destructive"
              >
                <X className="mr-2 h-4 w-4" /> Reset
              </Button>
              <Button onClick={handleApplyFont}>Apply Font</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
