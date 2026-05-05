"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { upload } from "@imagekit/next";
import { motion } from "framer-motion";
import { Loader2, Upload } from "lucide-react";

import { toastManager } from "@repo/ui";
import {
  Button,
  Field,
  Input,
  Label,
  Popover,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
  Progress,
} from "@repo/ui";

import { http } from "@/lib/http";
import { secretVariables } from "@/lib/secret-variables";
import { uploadPath } from "@/lib/upload-path";

type Props = {
  type: "template-image" | "template-video" | "user";
  slug?: string;
  userId?: string;
  onSuccess: (res: any) => void;
};

export function FileUpload({ type, slug, userId, onSuccess }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const isImage = type === "template-image" || type === "user";
  const isVideo = type === "template-video";

  const handleFile = useCallback(
    (f: File) => {
      // TYPE CHECK
      if (isImage && !f.type.startsWith("image")) {
        toastManager.add({ type: "error", title: "Only images allowed" });
        return;
      }

      if (isVideo && !f.type.startsWith("video")) {
        toastManager.add({ type: "error", title: "Only videos allowed" });
        return;
      }

      // SIZE CHECK
      if (f.size > 10 * 1024 * 1024) {
        toastManager.add({
          type: "error",
          title: "File too large (max 10MB)",
        });
        return;
      }

      // CLEAN OLD URL
      setPreview((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(f);
      });

      setFile(f);
      setUploadedFile(null);
    },
    [isImage, isVideo]
  );

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const fetchAuth = useCallback(async () => {
    const res = await http.get("/imagekit-auth");
    return res.data.authenticationParameters;
  }, []);

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    const { NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY } = secretVariables();
    try {
      const auth = await fetchAuth();
      const folder = uploadPath({ type, slug, userId });

      const res = await upload({
        file,
        fileName: file.name,
        folder,
        publicKey: NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
        ...auth,
        onProgress: (e) => {
          if (e.lengthComputable) {
            setProgress(Math.round((e.loaded / e.total) * 100));
          }
        },
      });

      onSuccess(res);

      if (res.url) {
        setUploadedFile(res.url);
      }

      toastManager.add({
        type: "success",
        title: "Uploaded successfully",
      });

      setFile(null);
      setPreview(null);
      setProgress(0);
    } catch (err: any) {
      toastManager.add({
        type: "error",
        title: "Upload failed",
        description: err.message,
      });
    } finally {
      setUploading(false);
    }
  };

  const displayFile = uploadedFile || preview;

  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" className="w-full" />}>
        <Upload className="size-4" />
        {uploadedFile ? "Change File" : "Upload File"}
      </PopoverTrigger>

      <PopoverPopup className="w-80">
        <div className="mb-4">
          <PopoverTitle>Upload File</PopoverTitle>
          <PopoverDescription>
            Upload a file for this template
          </PopoverDescription>
        </div>

        <div className="flex w-full flex-col gap-4">
          <Field>
            <Label>Select File</Label>

            <Input
              ref={inputRef}
              type="file"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  handleFile(e.target.files[0]);
                }
              }}
            />
          </Field>

          {displayFile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="overflow-hidden rounded-lg border bg-black"
            >
              {isImage ? (
                <img src={displayFile} className="h-32 w-full object-cover" />
              ) : (
                <video src={displayFile} controls className="h-32 w-full" />
              )}
            </motion.div>
          )}

          {uploading && <Progress value={progress} />}

          <Button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="w-full"
          >
            {uploading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Upload"
            )}
          </Button>
        </div>
      </PopoverPopup>
    </Popover>
  );
}
