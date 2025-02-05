### Disclaimer

This project is not a general-purpose, ready-to-use library but rather a personal library meant to be used with the particular stack that I use for my projects.

It is very opinionated and based on the stack I personally use which includes (on top of payload and astro of course) :
 - [Tailwind](https://tailwindcss.com/) for CSS
 - [Sharp](https://sharp.pixelplumbing.com/) and [plaiceholder](https://plaiceholder.co/docs) for image manipulation
 - [lite-youtube](https://github.com/justinribeiro/lite-youtube) for youtube videos
 - [Photoswipe](https://photoswipe.com/) for zoomable gallery images

Most of those are easily discardable except maybe tailwind which is present in a lot of places.

It is meant to serve as a starting point that you will probably want to customize if you're building an Astro project with PayloadCMS and lexical rich-text.

I might make breaking changes at any time so if you're using this please either make your own fork or specify a commit in your package.json dependency declaration.

It is inspired by [this project](https://github.com/atelierdisko/payload-lexical-react-renderer) which is a renderer for react


# Usage

`npm install https://github.com/EliottGaboreau/astro-payload-lexical-renderer`

My `[slug].astro` file which renders all of my `Pages` object I have set up in Payload with a title and a `content` rich text field looks like this : 


```Astro
---
import Layout from "../layouts/layout.astro";
import Node from "astro-payload-lexical-renderer/astro";
import {
    defaultComponents,
    defaultBlockComponents,
} from "astro-payload-lexical-renderer";

export async function getStaticPaths() {
    try {
        const params = new URLSearchParams({
            limit: "100",
        });

        const response = await fetch(`${import.meta.env.PUBLIC_PAYLOAD_API_URL}/pages?${params}`, { headers: { Authorization: `users API-Key ${import.meta.env.PAYLOAD_API_TOKEN}` }},).then((r) => r.json());

        const pages = response.docs.map((item) => ({
            params: { slug: item.slug },
            props: {
                page: item,
            },
        }));

        return pages;
    } catch (err) {
        console.log(err);
    }
}

const { page } = Astro.props;
---

<Layout>
    <h1 class="text-2xl text-center md:text-4xl m-2">{page.title}</h1>
    <Node
        components={defaultComponents}
        blockComponents={defaultBlockComponents}
        node={page.content.root}
    />
</Layout>
```

You will most certainly want to take a look at the default_components.ts file and switch the values with your own astro components

This particular example file doesn't take into account pagination so do take care if you have more that 100 objects to render.

