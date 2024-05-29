import fs from "fs";
import Sharp from "sharp";



export async function getCachedImage(image: any): Promise<string> {
    const directory = "./src/assets";
    const filename = `${image.filename.split('.').slice(0, -1).join('.')}.webp`;
    const path = `${directory}/${filename}`;

    if (!fs.existsSync(path)) {
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }
        console.log(`${import.meta.env.PAYLOAD_BASE_URL}${image.url}`);

        const blob = await fetch(`${import.meta.env.PAYLOAD_BASE_URL}${image.url}`, {
            headers: {
                Authorization: `users API-Key ${import.meta.env.PAYLOAD_API_TOKEN}`,
            },
        })
            .then(response => response.blob())
            .then(blob => blob.arrayBuffer());

        await Sharp(new Uint8Array(blob)).toFile(path);
    }

    const url = path.slice(1);

    return url;
}
