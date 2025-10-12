const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // Add Luxon date filter
  eleventyConfig.addFilter("date", function(date, format = "yyyy") {
    // If input is a string 'now', use current date
    if (date === "now") {
      return DateTime.now().toFormat(format);
    }
    // If input is a Date object
    if (date instanceof Date) {
      return DateTime.fromJSDate(date).toFormat(format);
    }
    // If input is a string date
    return DateTime.fromISO(date).toFormat(format);
  });

  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy("_redirects");

  // Watch CSS files for changes
  eleventyConfig.addWatchTarget("src/css/");

  // Collections
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./src/posts/**/*.md")
      .filter(post => {
        // Only include posts that are published (date is today or in the past)
        const postDate = new Date(post.data.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to start of day
        return postDate <= today;
      })
      .sort((a, b) => {
        // First sort by pinned status (pinned posts first)
        if (a.data.pinned && !b.data.pinned) return -1;
        if (!a.data.pinned && b.data.pinned) return 1;
        
        // If both are pinned, sort by order field
        if (a.data.pinned && b.data.pinned) {
          const orderA = a.data.order || 999;
          const orderB = b.data.order || 999;
          if (orderA !== orderB) return orderA - orderB;
        }
        
        // For non-pinned posts or pinned posts with same order, sort by date
        return new Date(b.date) - new Date(a.date);
      });
  });

  // Collection for all posts (including future ones) - useful for admin/management
  eleventyConfig.addCollection("allPosts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./src/posts/**/*.md").sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
  });

  // Collection for latest articles - sorted by date only (newest first)
  eleventyConfig.addCollection("latestPosts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./src/posts/**/*.md")
      .filter(post => {
        // Only include published posts (respects scheduled publishing)
        return post.data.date && new Date(post.data.date) <= new Date();
      })
      .sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
  });

  // Collection for series posts (including future ones) - useful for series management
  eleventyConfig.addCollection("seriesPosts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./src/posts/**/*.md")
      .filter(post => {
        return post.data.tags && post.data.tags.includes('faith-isnt-syntax-error');
      })
      .sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
  });

  eleventyConfig.addCollection("helloWorldSeries", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./src/posts/**/*.md")
      .filter(post => {
        return post.data.tags && post.data.tags.includes('hello-world-series');
      })
      .sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
  });

  eleventyConfig.addCollection("tagList", function(collectionApi) {
    const tagsSet = new Set();
    collectionApi.getAll().forEach(item => {
      if (item.data.tags) {
        item.data.tags.forEach(tag => tagsSet.add(tag));
      }
    });
    return Array.from(tagsSet).sort();
  });

  // Filters
  eleventyConfig.addFilter("dateReadable", function(date) {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });

  eleventyConfig.addFilter("dateIso", function(date) {
    return new Date(date).toISOString();
  });

  eleventyConfig.addFilter("slug", function(str) {
    return str.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  });

  eleventyConfig.addFilter("postsByTag", function(posts, tag) {
    return posts.filter(post => {
      return post.data.tags && post.data.tags.includes(tag);
    });
  });

  eleventyConfig.addFilter("absoluteUrl", function(url) {
    // Updated for consolidated site
    const baseUrl = "https://developingapologist.com";
    return `${baseUrl}${url}`;
  });

  eleventyConfig.addFilter("urlencode", function(str) {
    return encodeURIComponent(str);
  });

  eleventyConfig.addFilter("striptags", function(str) {
    return str.replace(/<[^>]*>/g, '');
  });

  eleventyConfig.addFilter("truncate", function(str, length) {
    if (str.length <= length) return str;
    return str.substring(0, length) + '...';
  });

  eleventyConfig.addFilter("filterByTag", function(posts, tag) {
    return posts.filter(post => {
      return post.data.tags && post.data.tags.includes(tag);
    });
  });

  eleventyConfig.addFilter("isPublished", function(date) {
    const postDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return postDate <= today;
  });

  // Shortcodes
  eleventyConfig.addShortcode("readingTime", function(content) {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_includes/layouts"
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    nunjucksOptions: {
      // Add shared includes to the search path
      searchPaths: [
        "src/_includes",
        "src/_includes/shared/includes",
        "src/_includes/shared/includes/components"
      ]
    }
  };
}; 