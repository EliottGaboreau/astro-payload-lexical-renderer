import fs from "fs";
import Sharp from "sharp";



export async function getCachedImage(image: any) {
    const directory = "./src/assets";
    const filename = `${image.filename.split('.').slice(0, -1).join('.')}.webp`;

    const path = `${directory}/${filename}`;


    console.log("ENTERING");


    if (!fs.existsSync(path)) {
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }

        // await fetch(`${import.meta.env.PAYLOAD_BASE_URL}${image.url}`, {
        //     headers: {
        //         Authorization: `users API-Key ${import.meta.env.PAYLOAD_API_TOKEN}`,
        //     },
        // }).then(r => console.log(r));
        console.log(`${import.meta.env.PAYLOAD_BASE_URL}${image.url}`);

        const blob = await fetch(`${import.meta.env.PAYLOAD_BASE_URL}${image.url}`, {
            headers: {
                Authorization: `users API-Key ${import.meta.env.PAYLOAD_API_TOKEN}`,
            },
        })
            // .then(response => { console.log(response); return response })
            .then(response => response.blob())
            .then(blob => blob.arrayBuffer());

        console.log('creating sharp object');
        await Sharp(new Uint8Array(blob)).toFile(path);
        console.log('created sharp object');
    }

    const url = path.slice(1);

    // const images = import.meta.glob<{ default: ImageMetadata }>(
    //     "/src/assets/*.{webp,jpeg,jpg,png,gif}",
    // );

    // if (!images[url])
    //     throw new Error(
    //         `"${url}" does not exist in glob: "src/assets/*.{jpeg,jpg,png,gif}"`,
    //     );

    // const a = await images[url]();
    // console.log(a);


    // console.log("LEAVIN");

    return url;
}
