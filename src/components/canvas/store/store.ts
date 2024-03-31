import create from 'zustand';
import { Object3D } from 'three';

interface Store {
  target: Object3D | null;
  setTarget: (target: Object3D | null) => void;
  isDragging: boolean;
  setIsDragging: (isDragging: boolean) => void;
}

export const useStore = create<Store>((set) => ({
  target: null,
  setTarget: (target: Object3D | null) => set({ target }),
  isDragging: false,
  setIsDragging: (isDragging: boolean) => set({ isDragging }),
}));
