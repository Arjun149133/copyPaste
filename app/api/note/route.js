import { connectToDatabase } from "@/lib/database/mongoose";
import Note from "@/lib/database/models/note";

export const revalidate = 0;

export const GET = async (req, res) => {
  try {
    await connectToDatabase();

    const notes = await Note.find({})
      .sort({ createdAt: -1 })
      .populate("creator");
    return new Response(JSON.stringify(notes), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        msg: error.message,
      }),
      {
        status: 500,
      }
    );
  }
};
