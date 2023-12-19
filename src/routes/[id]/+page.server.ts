import { prisma } from "$lib";
import { error, fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { _streams } from "./+server";

export const load = (async ({ params }) => {
  let art = await prisma.art.findUnique({
    where: { id: Number(params.id) },
    include: { pixels: true },
  });

  if (!art) {
    throw error(404, { message: "Art not found" });
  }

  return { art };
}) satisfies PageServerLoad;

export const actions: Actions = {
  edit: async ({ request, params }) => {
    try {
      let art = await prisma.art.findUnique({
        where: { id: Number(params.id) },
      });

      if (!art) {
        throw error(404, { message: "Art not found" });
      }

      let data = await request.formData();

      let x = data.get("x");
      let y = data.get("y");
      let id = data.get("id");
      let color = data.get("color")?.toString();
      let placedBy = data.get("placedBy")?.toString();

      if (!x || !y || !color || !placedBy) {
        throw error(400, { message: "Missing required fields" });
      }

      let pixel: {
        id: number;
        artId: number;
        x: number;
        y: number;
        color: string;
        placedBy: string;
      };

      if (id) {
        pixel = await prisma.pixel.update({
          data: {
            color,
            placedBy,
          },
          where: {
            id: Number(id),
          },
        });
      } else {
        pixel = await prisma.pixel.create({
          data: {
            x: Number(x),
            y: Number(y),
            color,
            placedBy,
            artId: art.id,
          },
        });
      }

      const encoder = new TextEncoder();
      const encoded = encoder.encode("data: " + JSON.stringify(pixel) + "\n\n");
      if (!_streams[art!.id]) {
        _streams[art!.id] = { controllers: [] };
      }

      for (let controller of _streams[art.id].controllers) {
        try {
          controller.enqueue(encoded);
        } catch (e) {
          console.log(e);
        }
      }
    } catch (e) {
      console.log(e);
    }
  },
};
