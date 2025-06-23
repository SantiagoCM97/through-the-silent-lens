import { Storage } from "@google-cloud/storage";

export async function getPhotosFromGCS(bucketName: string, prefix?: string) {
  const storage = new Storage({
    projectId: process.env.GCP_PROJECT_ID,
    credentials: {
      client_email: process.env.GCP_CLIENT_EMAIL,
      private_key: process.env.GCP_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
  });

  const options: { prefix?: string } = {};
  if (prefix) options.prefix = prefix;

  const [files] = await storage.bucket(bucketName).getFiles(options);

  return files
    .filter((file) => file.name !== options.prefix)
    .map((file) => ({
      id: file.name,
      url: `https://storage.googleapis.com/${bucketName}/${file.name}`,
      alt: file.name,
    }));
}
