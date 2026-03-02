function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

type SkinPart = {
  sx: number;
  sy: number;
  sw: number;
  sh: number;
  dx: number;
  dy: number;
  dw: number;
  dh: number;
  ox?: number;
  oy?: number;
  ow?: number;
  oh?: number;
};

function drawSkinPart(ctx: CanvasRenderingContext2D, skin: HTMLImageElement, part: SkinPart) {
  ctx.drawImage(skin, part.sx, part.sy, part.sw, part.sh, part.dx, part.dy, part.dw, part.dh);
  if (typeof part.ox === "number" && typeof part.oy === "number") {
    ctx.drawImage(
      skin,
      part.ox,
      part.oy,
      part.ow ?? part.sw,
      part.oh ?? part.sh,
      part.dx,
      part.dy,
      part.dw,
      part.dh,
    );
  }
}

export async function renderMinecraftSkinBodyDataUrl(skinPath: string): Promise<string | null> {
  try {
    const skin = await loadImage(skinPath);
    const size = skin.naturalWidth || skin.width;
    if (size < 64) return null;

    const canvas = document.createElement("canvas");
    canvas.width = 240;
    canvas.height = 320;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = false;

    const px = 8;
    const ox = 24;
    const oy = 24;

    const parts: SkinPart[] = [
      { sx: 8, sy: 8, sw: 8, sh: 8, dx: ox + 8 * px, dy: oy + 0 * px, dw: 8 * px, dh: 8 * px, ox: 40, oy: 8, ow: 8, oh: 8 },
      { sx: 44, sy: 20, sw: 4, sh: 12, dx: ox + 4 * px, dy: oy + 8 * px, dw: 4 * px, dh: 12 * px, ox: 44, oy: 36, ow: 4, oh: 12 },
      { sx: 36, sy: 52, sw: 4, sh: 12, dx: ox + 16 * px, dy: oy + 8 * px, dw: 4 * px, dh: 12 * px, ox: 52, oy: 52, ow: 4, oh: 12 },
      { sx: 20, sy: 20, sw: 8, sh: 12, dx: ox + 8 * px, dy: oy + 8 * px, dw: 8 * px, dh: 12 * px, ox: 20, oy: 36, ow: 8, oh: 12 },
      { sx: 4, sy: 20, sw: 4, sh: 12, dx: ox + 8 * px, dy: oy + 20 * px, dw: 4 * px, dh: 12 * px, ox: 4, oy: 36, ow: 4, oh: 12 },
      { sx: 20, sy: 52, sw: 4, sh: 12, dx: ox + 12 * px, dy: oy + 20 * px, dw: 4 * px, dh: 12 * px, ox: 4, oy: 52, ow: 4, oh: 12 },
    ];

    for (const part of parts) {
      drawSkinPart(ctx, skin, part);
    }

    
    const shade = ctx.createLinearGradient(0, oy + 8 * px, 0, oy + 32 * px);
    shade.addColorStop(0, "rgba(0,0,0,0)");
    shade.addColorStop(1, "rgba(0,0,0,0.14)");
    ctx.fillStyle = shade;
    ctx.fillRect(ox + 4 * px, oy + 8 * px, 16 * px, 24 * px);

    return canvas.toDataURL("image/png");
  } catch {
    return null;
  }
}

