import query from "@/lib/queryApi";
import type { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";
import { adminDb } from "@/firebaseAdmin";
import { NextResponse } from "next/server";

type Data = {
  answer: string;
};

export async function POST(req: Request, res: NextApiResponse) {
  const request = await req.json();
  if (!request.prompt) {
    res.status(400).json({ answer: "Please provide a prompt!" });
    return;
  }

  if (!request.chatId) {
    res.status(400).json({ answer: "Please provide a valid chat ID!" });
    return;
  }

  const response = await query(request.prompt, request.chatId, request.model);

  const message: Message = {
    text: response || "NeuroNexa was unable to find an answer for that!",
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: "NeuroNexa",
      name: "NeuroNexa",
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/neuro-nexa.appspot.com/o/open-ai-img.png?alt=media&token=1e1f5aa8-9c0d-4488-bca1-437ae80c00de",
    },
  };

  await adminDb
    .collection("users")
    .doc(request.session?.user?.email)
    .collection("chats")
    .doc(request.chatId)
    .collection("messages")
    .add(message);

  return NextResponse.json({ answer: message.text });
}
