"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { PlusSquare, Trash2 } from "lucide-react";
import type { Box } from "@/lib/types";

type InspectorPanelProps = {
  boxes: Box[];
  setBoxes: React.Dispatch<React.SetStateAction<Box[]>>;
  selectedBoxIds: string[];
  setSelectedBoxIds: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function InspectorPanel({
  boxes,
  setBoxes,
  selectedBoxIds,
  setSelectedBoxIds,
}: InspectorPanelProps) {
  const selectedBox =
    selectedBoxIds.length === 1
      ? boxes.find((b) => b.id === selectedBoxIds[0])
      : null;
      
  const addBox = () => {
    const newBox: Box = {
        id: `box-${Date.now()}`,
        x: 50,
        y: 50,
        width: 150,
        height: 50,
        type: 'manual',
    };
    setBoxes(prev => [...prev, newBox]);
    setSelectedBoxIds([newBox.id]);
  }

  const deleteSelectedBoxes = () => {
    setBoxes(prev => prev.filter(box => !selectedBoxIds.includes(box.id)));
    setSelectedBoxIds([]);
  }

  const updateBoxProperty = (id: string, prop: keyof Box, value: number) => {
    setBoxes(prev => prev.map(b => b.id === id ? {...b, [prop]: value} : b));
  }

  return (
    <div className="flex h-full flex-col rounded-xl border bg-card p-4 text-card-foreground shadow-lg">
      <h3 className="font-headline text-lg font-semibold">Inspector</h3>
      <p className="text-sm text-muted-foreground">Box Properties</p>
      <Separator className="my-4" />
      <div className="flex-1 space-y-6 overflow-y-auto pr-2">
        {selectedBox ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="pos-x">X</Label>
                <Input id="pos-x" type="number" value={Math.round(selectedBox.x)} onChange={e => updateBoxProperty(selectedBox.id, 'x', parseInt(e.target.value, 10))} />
              </div>
              <div>
                <Label htmlFor="pos-y">Y</Label>
                <Input id="pos-y" type="number" value={Math.round(selectedBox.y)} onChange={e => updateBoxProperty(selectedBox.id, 'y', parseInt(e.target.value, 10))} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="width">W</Label>
                <Input id="width" type="number" value={Math.round(selectedBox.width)} onChange={e => updateBoxProperty(selectedBox.id, 'width', parseInt(e.target.value, 10))} />
              </div>
              <div>
                <Label htmlFor="height">H</Label>
                <Input id="height" type="number" value={Math.round(selectedBox.height)} onChange={e => updateBoxProperty(selectedBox.id, 'height', parseInt(e.target.value, 10))} />
              </div>
            </div>
          </div>
        ) : selectedBoxIds.length > 1 ? (
             <div className="text-center text-sm text-muted-foreground p-4 border border-dashed rounded-lg">
                {selectedBoxIds.length} boxes selected.
            </div>
        ) : (
          <div className="text-center text-sm text-muted-foreground p-4 border border-dashed rounded-lg h-full flex items-center justify-center">
            Select a box to see its properties, or create a new one.
          </div>
        )}
      </div>
      <div className="mt-4 flex flex-col gap-2 border-t pt-4">
         <Button variant="outline" onClick={addBox}>
          <PlusSquare className="mr-2 h-4 w-4" />
          Thêm Box
        </Button>
        <Button variant="destructive" onClick={deleteSelectedBoxes} disabled={selectedBoxIds.length === 0}>
          <Trash2 className="mr-2 h-4 w-4" />
          Xóa Box
        </Button>
      </div>
    </div>
  );
}
