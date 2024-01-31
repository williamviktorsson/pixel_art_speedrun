import { fail, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

let stuff: Record<string, number> = {};

export const GET: RequestHandler = async () => {
  return json(stuff);
};

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body = await request.json();
    console.log(body)
    stuff[body.mac] = body.alive;
    return json(stuff);
  } catch (error) {
    console.log(error);
    throw fail(400,{message:"bad request"})
  }
};
