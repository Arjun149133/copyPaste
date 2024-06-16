import Note from "@/lib/database/models/note";
import { connectToDatabase } from "@/lib/database/mongoose";

export const GET = async (req, { params }) => {
  try {
    await connectToDatabase();

    const note = await Note.findById(params.id);

    if (!note) {
      return new Response(
        JSON.stringify({
          msg: "Note not found",
        }),
        {
          status: 404,
        }
      );
    }

    return new Response(JSON.stringify(note), {
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

export const PATCH = async (req, { params }) => {
  const { title, content } = await req.json();

  try {
    await connectToDatabase();

    const note = await Note.findByIdAndUpdate(
      params.id,
      {
        title,
        content,
      },
      {
        new: true,
      }
    );

    if (!note) {
      return new Response(
        JSON.stringify({
          msg: "Note not found",
        }),
        {
          status: 404,
        }
      );
    }

    return new Response(JSON.stringify(note), {
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

export const DELETE = async (req, { params }) => {
  try {
    await connectToDatabase();

    const note = await Note.findByIdAndDelete(params.id);

    if (!note) {
      return new Response(
        JSON.stringify({
          msg: "Note not found",
        }),
        {
          status: 404,
        }
      );
    }

    return new Response(JSON.stringify(note), {
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
