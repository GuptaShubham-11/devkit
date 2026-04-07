import { Connection } from "mongoose";

declare global {
  var mongoose: {
    conn: Connection | null;
    promise: Promise<Connection> | null;
  };
}

declare module "*.css" {
  const classes: Record<string, string>;
  export default classes;
}

export {};
