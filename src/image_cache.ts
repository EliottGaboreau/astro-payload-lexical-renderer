import fs from "fs";
import Sharp from "sharp";



export async function getCachedImage(image: any): Promise<string> {
    const directory = "./src/assets";
    const name = image.filename || 'undefined';
    const filename = `${name.split('.').slice(0, -1).join('.')}.webp`;
    const path = `${directory}/${filename}`;

    if (!fs.existsSync(path)) {
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }

        const blob = await fetch(`${import.meta.env.PAYLOAD_BASE_URL}${image.url}`, {
            headers: {
                Authorization: `users API-Key ${import.meta.env.PAYLOAD_API_TOKEN}`,
            },
        })
            .then(response => response.blob())
            .then(blob => blob.arrayBuffer());

        const s = Sharp(new Uint8Array(blob))
        await s.toFile(path);
    }

    const url = path.slice(1);

    return url;
}
