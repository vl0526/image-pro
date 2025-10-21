export type Box = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'auto' | 'manual';
};

export type HistoryItem = {
  id: string;
  timestamp: string;
  action: string;
  thumbnail: string;
};

export type AppStatus = 'idle' | 'detecting' | 'editing' | 'processing' | 'comparing';

export type ComparisonMode = 'side-by-side' | 'slider';
