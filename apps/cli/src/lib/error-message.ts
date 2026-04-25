export function errorMessage(error: unknown): string {
  if (!error) return "Unknown error occurred.";

  //  string error (throw "error")
  if (typeof error === "string") {
    return error;
  }

  //  Axios-like error (safe narrowing)
  if (typeof error === "object" && error !== null) {
    const maybeAxios = error as {
      response?: {
        data?: {
          error?: string;
          message?: string;
        };
      };
      message?: string;
    };

    // API-specific error
    if (maybeAxios.response?.data?.error) {
      return maybeAxios.response.data.error;
    }

    // API message fallback
    if (maybeAxios.response?.data?.message) {
      return maybeAxios.response.data.message;
    }

    //  standard Error
    if (error instanceof Error) {
      return error.message;
    }

    // generic message
    if (maybeAxios.message) {
      return maybeAxios.message;
    }
  }

  return "Something went wrong. Please try again.";
}
