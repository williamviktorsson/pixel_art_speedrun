import { prisma } from "$lib";
import { error, fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

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
  edit: async ({ request, cookies, params }) => {
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

      if (id) {
        await prisma.pixel.update({
          data: {
            color,
            placedBy,
          },
          where: {
            id: Number(id),
          },
        });
      } else {
        await prisma.pixel.create({
          data: {
            x: Number(x),
            y: Number(y),
            color,
            placedBy,
            artId: art.id,
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
  },
};
