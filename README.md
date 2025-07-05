# The Developing Apologist Blog

A Markdown-powered blog built with Eleventy (11ty) that explores the intersection of Christian apologetics and software development. This blog is designed to equip Christian software developers with the tools and resources they need to defend their faith through logical, systematic reasoning.

## 🎨 Design Features

- **Dark Theme**: Modern dark color scheme with code editor aesthetics
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile
- **Typography**: Optimized for readability with proper spacing and hierarchy
- **Code Highlighting**: Syntax highlighting for code blocks
- **SEO Optimized**: Meta tags, Open Graph, and structured data

## 🚀 Quick Start

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd developing-apologist-blog
```

2. Install dependencies:
```bash
npm install
```

3. Build the CSS:
```bash
npm run build:css
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:8080`

## 📝 Creating New Blog Posts

### Step 1: Create a New Markdown File

Create a new `.md` file in the `src/posts/` directory. Use the following naming convention:

```
YYYY-MM-DD-post-title.md
```

Example: `2024-01-25-my-new-post.md`

### Step 2: Add Front Matter

Every blog post needs front matter at the top of the file:

```yaml
---
title: Your Post Title
date: 2024-01-25
description: A brief description of your post for SEO and social sharing
tags: [tag1, tag2, tag3]
layout: layouts/post.njk
---
```

### Step 3: Write Your Content

Write your content using Markdown syntax:

```markdown
# Your Post Title

Your introduction paragraph goes here.

## Section Heading

Your content here. You can use:

- **Bold text**
- *Italic text*
- [Links](https://example.com)
- `inline code`

### Code Blocks

```javascript
function example() {
  console.log("Hello, World!");
}
```

### Lists

- Item 1
- Item 2
- Item 3

1. Numbered item 1
2. Numbered item 2
3. Numbered item 3

### Blockquotes

> This is a blockquote. Use it for quotes or important callouts.

### Images

![Alt text](path/to/image.jpg)
```

### Step 4: Add Reading Time (Optional)

The reading time is automatically calculated, but you can override it by adding `readingTime: 5` to your front matter.

## 🏗️ Project Structure

```
src/
├── _data/              # Global data files
│   └── site.js        # Site configuration
├── _includes/          # Template includes
│   ├── layouts/       # Layout templates
│   │   └── post.njk   # Blog post layout
│   └── base.njk       # Base layout
├── assets/            # Static assets (images, etc.)
├── css/              # CSS files
│   └── main.css      # Main stylesheet
├── posts/            # Blog posts (Markdown files)
├── about.njk         # About page
├── blog.njk          # Blog listing page
├── index.njk         # Homepage
├── presentations.njk # Presentations page
└── feed.xml.njk      # RSS feed
```

## 🎨 Customization

### Colors

The color scheme is defined in `tailwind.config.js`. The main colors are:

- **Background**: `#0B0E11` (Dark background)
- **Primary Text**: `#FFFFFF` (White text)
- **Primary Accent**: `#00BCD4` (Cyan)
- **Secondary Accent**: `#0077B6` (Blue)

### Typography

The site uses:
- **Sans-serif**: Inter for body text
- **Monospace**: JetBrains Mono for code

### Adding New Pages

1. Create a new `.njk` file in the `src/` directory
2. Add front matter with layout and metadata
3. Write your content using HTML and Nunjucks templating

Example:
```njk
---
layout: base.njk
title: My New Page
description: Description of my new page
---

<div class="max-w-4xl mx-auto px-4 py-12">
  <h1>My New Page</h1>
  <p>Your content here...</p>
</div>
```

## 🔧 Configuration

### Site Settings

Update `src/_data/site.js` with your site information:

```javascript
module.exports = {
  url: "https://your-domain.com",
  title: "Your Blog Title",
  description: "Your blog description",
  author: "Your Name",
  email: "your-email@example.com"
};
```

### Eleventy Configuration

The main configuration is in `eleventy.config.js`. Key features:

- **Collections**: Automatically organizes blog posts
- **Filters**: Date formatting, URL encoding, etc.
- **Shortcodes**: Reading time calculation
- **Passthrough**: Static asset copying

## 📦 Build Commands

```bash
# Build CSS only
npm run build:css

# Build the entire site
npm run build

# Build CSS and site together
npm run build:full

# Start development server with watch
npm run dev

# Start development server only
npm run start

# Clean build directory
npm run clean
```

## 🚀 Deployment

### GitHub Pages

1. Push your code to a GitHub repository
2. Go to Settings > Pages
3. Select your source branch (usually `main`)
4. Set the folder to `/docs` or `/` (root)
5. Update your site URL in `src/_data/site.js`

### Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build:full`
3. Set publish directory: `_site`
4. Deploy!

### Vercel

1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build:full`
3. Set output directory: `_site`
4. Deploy!

## 📊 Features

### Blog Features

- ✅ **Markdown Support**: Write posts in Markdown
- ✅ **Automatic Reading Time**: Calculated based on word count
- ✅ **Tags and Categories**: Organize content with tags
- ✅ **Pagination**: Automatic pagination for blog listings
- ✅ **RSS Feed**: Automatic RSS feed generation
- ✅ **SEO Optimization**: Meta tags, Open Graph, structured data
- ✅ **Social Sharing**: Twitter and LinkedIn sharing buttons

### Technical Features

- ✅ **Responsive Design**: Mobile-first approach
- ✅ **Dark Theme**: Modern dark color scheme
- ✅ **Fast Loading**: Optimized CSS and assets
- ✅ **Accessibility**: Semantic HTML and ARIA labels
- ✅ **Search Engine Friendly**: Clean URLs and meta tags

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with `npm run dev`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Eleventy](https://www.11ty.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Heroicons](https://heroicons.com/)

## 📞 Support

If you have questions or need help:

1. Check the documentation above
2. Look at existing issues in the repository
3. Create a new issue with your question

---

**Happy blogging!** 🚀 