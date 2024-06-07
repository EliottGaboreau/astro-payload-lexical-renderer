import { getPlaiceholder } from "plaiceholder";
import Sharp from "sharp";



export async function getBase64Placeholder(url: string) {
    const sharp = Sharp(url);

    console.log(sharp);

    const buffer = await sharp.toBuffer();

    const plaiceholder = await getPlaiceholder(buffer, { size: 8 });

    return plaiceholder.base64
}

