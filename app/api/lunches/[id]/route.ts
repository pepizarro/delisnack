import db from "@/db/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const lunch = await db.getLunch(params.id);
    console.log("lunch: ", lunch);

    return new Response(JSON.stringify(lunch), {
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("error", {
      status: 500,
    });
  }
}
