export interface Install {
  _id: string;

  userId: string;
  templateId: string;

  duration: number;
  status: "failed" | "success";
  failedReason?: string;

  installedAt: Date;
  ipAddress: string;
  createdAt: Date;
}
