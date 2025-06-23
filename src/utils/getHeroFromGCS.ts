import { Storage } from "@google-cloud/storage";

// Initialize the storage client once and reuse it across your app
const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  credentials: {
    client_email: process.env.GCP_CLIENT_EMAIL,
    private_key: process.env.GCP_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
});

// It's best to also make the bucket name an environment variable
const bucketName = process.env.GCP_BUCKET_NAME || "through-the-quiet-len";

/**
 * Fetches the public URL for a single image file from the bucket.
 * @param fileName The full name of the file, e.g., 'Hero.jpg'.
 * @returns A promise that resolves to the public URL of the image.
 */
export async function getSingleImageUrl(fileName: string): Promise<string> {
  try {
    const file = storage.bucket(bucketName).file(fileName);
    // Note: publicUrl() creates the URL string; it doesn't check if the file exists.
    // Ensure the file is public.
    return file.publicUrl();
  } catch (error) {
    console.error(
      `Failed to generate URL for single image ${fileName}:`,
      error
    );
    return ""; // Return an empty string on error
  }
}
