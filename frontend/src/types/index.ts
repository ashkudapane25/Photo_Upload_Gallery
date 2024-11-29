export interface Image {
  id: string;
  url: string;
  title?: string;
  uploadedAt: string;
}

export interface UploadResponse {
  success: boolean;
  imageUrl: string;
  message?: string;
}