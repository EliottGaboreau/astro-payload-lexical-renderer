import fs from "fs";
import Sharp from "sharp";



export async function getCachedImage(image: any) {
    const directory = "./src/assets";
    const filename = `${image.filename.split('.').slice(0, -1).join('.')}.webp`;

    const path = `${directory}/${filename}`;
    let result: Sharp.Sharp;


    if (!fs.existsSync(path)) {
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }

        const blob = await fetch(`${import.meta.env.PAYLOAD_API_URL}${image.url}`, {
            headers: {
                Authorization: `users API-Key ${import.meta.env.PAYLOAD_API_TOKEN}`,
            },
        })
            .then(response => response.blob())
            .then(blob => blob.arrayBuffer());

        console.log('creating sharp object');
        result = Sharp(new Uint8Array(blob));
        await result.toFile(path);
        console.log('created sharp object');
    }
    else {
        result = Sharp(path);
    }

    const url = path.slice(1);

    const images = import.meta.glob<{ default: ImageMetadata }>(
        "/src/assets/*.{webp,jpeg,jpg,png,gif}",
    );

    if (!images[url])
        throw new Error(
            `"${url}" does not exist in glob: "src/assets/*.{jpeg,jpg,png,gif}"`,
        );

    return images[url]();
}
