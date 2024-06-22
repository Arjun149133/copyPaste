import { revalidatePath } from "next/cache";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  if (searchParams?.secret !== process.env.REVALIDATION_SECRET) {
    return new Response(`Invalid credentials`, {
      status: 500,
    });
  }
  revalidatePath("/api/note");
  return new Response(
    {
      revalidated: true,
      now: Date.now(),
    },
    {
      status: 200,
    }
  );
}
