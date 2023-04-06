const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes) {
    let metadata = await Image(src, {
      widths: [300, 600, 900],
      formats: ["jpeg"],
      outputDir: "./_site/assets/images",
      urlPath: "/assets/images/"
    });
  
    let imageAttributes = {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async",
    };
  
    let srcset = metadata.jpeg.map((entry) => `${entry.url} ${entry.width}w`).join(", ");
  
    return `<img src="${src}" srcset="${srcset}" ${Object.keys(imageAttributes).map(key => `${key}="${imageAttributes[key]}"`).join(" ")}>`;
  }

module.exports = function(eleventyConfig) {

    eleventyConfig.addPassthroughCopy('./src/style.css');
    eleventyConfig.addPassthroughCopy('./src/assets');
    eleventyConfig.addPassthroughCopy('./src/admin');
    eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

    return {
        dir: {
            input: "src"
        }
    }
}