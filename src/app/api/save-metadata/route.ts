import { NextResponse as MetadataNextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

export async function POST(request: Request) {
  try {
    const { imageUrl, caption, category, rating, fileName } =
      await request.json();

    if (!imageUrl || !category || !fileName) {
      return MetadataNextResponse.json(
        { error: "Missing required metadata fields." },
        { status: 400 }
      );
    }

    const docRef = db.collection("photos").doc();
    await docRef.set({
      id: docRef.id,
      imageUrl,
      fileName,
      caption: caption || "", // Default to empty string if no caption
      category,
      rating: Number(rating) || 0, // Default to 0 if no rating
      createdAt: FieldValue.serverTimestamp(),
    });

    return MetadataNextResponse.json({ success: true, docId: docRef.id });
  } catch (error) {
    console.error("Error saving metadata to Firestore:", error);
    return MetadataNextResponse.json(
      { error: "Failed to save metadata." },
      { status: 500 }
    );
  }
}
