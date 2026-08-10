import type { StaticImageData } from "next/image";

import alphaexplora from "../../public/projects/alphaexplora.png";
import autocards from "../../public/projects/autocards.png";
import resumae from "../../public/projects/resumae.png";
import taskspay from "../../public/projects/taskspay.png";

const projectImageMap: Record<string, StaticImageData> = {
  "/projects/alphaexplora.png": alphaexplora,
  "/projects/autocards.png": autocards,
  "/projects/resumae.png": resumae,
  "/projects/taskspay.png": taskspay,
};

export const getProjectImage = (path: string): StaticImageData | undefined =>
  projectImageMap[path];
