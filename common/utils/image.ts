/**
 * Normalize image path for Next.js Image component
 * Supports various input formats and converts them to proper web paths
 */
export function normalizeImagePath(imagePath?: string): string {
  if (!imagePath) return "/images/default-certificate.svg";
  
  // If it's already a URL, use as is
  if (imagePath.startsWith("http")) {
    return imagePath;
  }
  
  // If it already starts with /, use as is
  if (imagePath.startsWith("/")) {
    return imagePath;
  }
  
  // If it's an absolute Windows path, convert to relative
  if (imagePath.includes("public\\images") || imagePath.includes("public/images")) {
    const pathParts = imagePath.split(/[\\\/]/);
    const publicIndex = pathParts.findIndex(part => part === "public");
    if (publicIndex !== -1) {
      return "/" + pathParts.slice(publicIndex + 1).join("/");
    }
  }
  
  // Handle path like "images\achievements\certificates\namo6-2025.jpg"
  // Convert backslashes to forward slashes and add leading slash
  if (imagePath.includes("images") && (imagePath.includes("\\") || imagePath.includes("/"))) {
    const normalizedPath = imagePath.replace(/\\/g, "/");
    return normalizedPath.startsWith("/") ? normalizedPath : "/" + normalizedPath;
  }
  
  // Default fallback
  return "/images/default-certificate.svg";
}

/**
 * Normalize project image path for project items
 */
export function normalizeProjectImagePath(imagePath?: string): string {
  if (!imagePath) return "/images/default-project.svg";
  
  // If it's already a URL, use as is
  if (imagePath.startsWith("http")) {
    return imagePath;
  }
  
  // If it already starts with /, use as is
  if (imagePath.startsWith("/")) {
    return imagePath;
  }
  
  // Handle path like "images\projects\project-name.jpg"
  if (imagePath.includes("images") && (imagePath.includes("\\") || imagePath.includes("/"))) {
    const normalizedPath = imagePath.replace(/\\/g, "/");
    return normalizedPath.startsWith("/") ? normalizedPath : "/" + normalizedPath;
  }
  
  // Default fallback
  return "/images/default-project.svg";
}
