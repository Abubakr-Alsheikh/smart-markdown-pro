"use client";

import { useSettingsStore } from "@/lib/store/useSettingsStore";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Settings } from "lucide-react";

export function SettingsDialog() {
  const { isRTL, fontSize, toggleRTL, setFontSize } = useSettingsStore();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="h-5 w-5" />
          <span className="sr-only">Open Settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Preview Settings</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          {/* RTL Toggle */}
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
