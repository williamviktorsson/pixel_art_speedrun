import { prisma } from "$lib";
import { error, fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load = (async () => {
  let arts = await prisma.art.findMany();
  return { arts };
}) satisfies PageServerLoad;

export const actions: Actions = {
  create: async ({ request, cookies }) => {
    let data = await request.formData();

    let name = data.get("name")?.toString();
    let w = data.get("width");
    let h = data.get("height");
    let createdBy = data.get("createdBy")?.toString();

    if (!name || !w || !h || !createdBy) {
      return error(400, { message: "Missing required fields" });
    }

    let width = Number(w);
    let height = Number(h);

    let art = await prisma.art.create({
      data: {
        name,
        width,
        height,
        createdBy,
        pixels: {
          create: Array.from({ length: width * height }, (_, i) => ({
            x: i % width,
            y: Math.floor(i / width),
            color: "#ffffff",
            placedBy: "none",
          })),
        },
      },
    });
    return { art };
  },
};
