import prompts from "prompts";

export type OverwriteMode = "replace" | "skip" | "cancel";

export async function promptOverwriteMode(): Promise<OverwriteMode> {
  if (!process.stdout.isTTY) {
    throw new Error("Cannot resolve file conflicts in non-interactive mode.");
  }

  const response = await prompts(
    {
      type: "select",
      name: "mode",
      message: "Existing files detected. How would you like to proceed?",
      choices: [
        {
          title: "Replace existing files",
          description: "Overwrite all conflicting files",
          value: "replace",
        },
        {
          title: "Skip existing files",
          description: "Keep existing files and skip conflicts",
          value: "skip",
        },
        {
          title: "Cancel setup",
          description: "Abort the operation",
          value: "cancel",
        },
      ],
      initial: 0,
    },
    {
      onCancel: () => {
        throw new Error("Operation cancelled by user.");
      },
    }
  );

  const mode = response?.mode as OverwriteMode | undefined;
  if (!mode || mode === "cancel") {
    throw new Error("Operation cancelled.");
  }

  return mode;
}
