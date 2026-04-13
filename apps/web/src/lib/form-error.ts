export const mapRHFErrorsToFormErrors = (errors: any) => {
  const result: Record<string, string> = {};

  Object.entries(errors).forEach(([key, value]: any) => {
    if (!value) return;

    if (value.message) {
      result[key] = value.message;
    } else if (value.types) {
      result[key] = Object.values(value.types)[0] as string;
    }
  });

  return result;
};
