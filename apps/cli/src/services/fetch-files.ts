import { URLS } from "../config/constant.js";
import { errorMessage } from "../lib/error-message.js";
import { http } from "../lib/http.js";

export type RemoteFile = {
  path: string;
  url: string;
  size: number;
};

interface FetchFilesResponse {
  files: RemoteFile[];
}

export async function fetchFiles(
  templateId: string,
  token?: string,
  userId?: string
): Promise<RemoteFile[]> {
  if (!token || !userId) {
    throw new Error("Authentication required to download this template!");
  }

  if (!templateId) {
    throw new Error("Template id is required!");
  }

  try {
    const res = await http.post<FetchFilesResponse>(
      `/registry/template/download-file`,
      {
        templateId,
        shortLivedToken: token,
        userId,
      }
    );

    const files = res.data?.files;

    if (!Array.isArray(files)) {
      throw new Error("Invalid file list received from server!");
    }

    return files.map((file, index) => {
      if (!file?.path || !file?.url) {
        throw new Error(`Invalid file entry at index ${index}`);
      }

      return {
        path: String(file.path),
        url: String(file.url),
        size: Number(file.size || 0),
      };
    });
  } catch (err) {
    console.log(err);

    throw new Error(`Failed to fetch template files: ${errorMessage(err)}`);
  }
}
