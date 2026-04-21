const convertQueryToString = (queryObject: any) => {
  const params = new URLSearchParams();

  Object.entries(queryObject).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (typeof value === "boolean") {
      if (value) params.append(key, "true");
      return;
    }

    if (key === "search" && !value) return;

    params.append(key, String(value));
  });

  return params.toString();
};

export { convertQueryToString };
