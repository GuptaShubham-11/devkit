export type Item = {
  path: string;
  type: "file" | "dir";
  download_url: string | null;
  url: string;
  size?: number;
};

export type File = {
  path: string;
  url: string;
  size: number;
};
