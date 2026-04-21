export const uploadPath = ({
  type,
  slug,
  userId,
}: {
  type: "template-image" | "template-video" | "user";
  slug?: string;
  userId?: string;
}) => {
  switch (type) {
    case "template-image":
      return `devkit/templates/images/${slug}`;
    case "template-video":
      return `devkit/templates/videos/${slug}`;
    case "user":
      return `devkit/user/${userId}`;
    default:
      return "devkit/misc";
  }
};
