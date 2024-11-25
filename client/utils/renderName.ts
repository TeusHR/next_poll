export const renderName = (fileName: string): string => {
  return fileName.replace("/uploads/pdf/", "").replace("/uploads/image/", "");
};