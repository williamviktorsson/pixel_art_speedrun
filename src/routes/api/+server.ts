import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

let stuff: string[] = [];

export const GET: RequestHandler = async () => {
  return json(stuff);
};

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();
  stuff.push(body.stuff);
  return json(stuff);
};
