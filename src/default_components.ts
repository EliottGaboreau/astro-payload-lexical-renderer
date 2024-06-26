
import Block from "./components/block.astro";
import Gallery from "./components/blocks/gallery.astro";
import Heading from "./components/heading.astro";
import HorizontalRule from "./components/horizontal_rule.astro";
import Linebreak from "./components/linebreak.astro";
import List from "./components/list.astro";
import ListItem from "./components/list_item.astro";
import Paragraph from "./components/paragraph.astro";
import Root from "./components/root.astro";
import Text from "./components/text.astro";
import Unknown from "./components/unknown.astro";
import UnknownBlock from "./components/blocks/unknown.astro";
import Upload from "./components/upload.astro";
import YoutubeVideo from "./components/blocks/youtube_video.astro";
import PagesList from "./components/blocks/pages_list.astro";
import Link from "./components/link.astro";

export const defaultBlockComponents = {
    Gallery: Gallery,
    YoutubeVideo: YoutubeVideo,
    PagesList: PagesList,
    unknown: UnknownBlock,
}

export const defaultComponents = {
    block: Block,
    heading: Heading,
    horizontalrule: HorizontalRule,
    linebreak: Linebreak,
    link: Link,
    list: List,
    listitem: ListItem,
    paragraph: Paragraph,
    root: Root,
    text: Text,
    unknown: Unknown,
    upload: Upload,
}


// LinkHTMLConverter,
// QuoteHTMLConverter,
// HorizontalRuleHTMLConverter,
// UploadHTMLConverter,
// BlockHtmlConverter,