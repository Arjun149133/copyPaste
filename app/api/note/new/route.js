import Note from "@/lib/database/models/note";
import { connectToDatabase } from "@/lib/database/mongoose";

export const POST = async (req, res) => {
  const { title, content } = await req.json();
  try {
    await connectToDatabase();
    const newNote = new Note({
      title,
      content,
    });

    await newNote.save();

    return new Response(JSON.stringify(newNote), {
      status: 201,
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
