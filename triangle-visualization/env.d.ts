/// <reference types="vite/client" />

declare module "*.json" {
  const value: Array<{
    id: number;
    size: number;
    color: string;
  }>;
  export default value;
}

interface Triangle {
  id: number;
  size: number;
  color: string;
  x?: number;
  y?: number;
}
