import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { prisma } from "$lib";

export let _streams: Record<
  number,
  { controllers: ReadableStreamDefaultController[] }
> = {};

export const GET: RequestHandler = async ({ params }) => {
  try {
    let art = await prisma.art.findUnique({
      where: { id: Number(params.id) },
      include: { pixels: true },
    });

    if (!art) {
      throw error(404, { message: "Art not found" });
    }

    const stream = new ReadableStream({
      start(controller) {
        /* save the controller for the stream so that we can */
        /* enqueue messages into the stream */
        if (!_streams[art!.id]) {
          _streams[art!.id] = { controllers: [] };
        }
        // save controller + userid cookie pair
        _streams[art!.id].controllers.push(controller);
      },
      cancel() {
        /* remove the controller that corresponds to the cookie */ 
      },
    });

    return new Response(stream, {
      headers: {
        "content-type": "text/event-stream",
      },
    });
  } catch {
    throw error(404, "database items not found");
  }
};
