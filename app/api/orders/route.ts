//import db from "@/db/db";

export async function POST(request: Request) {
  const data = await request.json();
  console.log(data);

  return new Response("ok", {
    status: 200,
  });
}
