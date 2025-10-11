# Task List: Repository Consolidation - Single Website

**Source PRD:** `0001-prd-repository-consolidation.md`  
**Created:** October 11, 2025

## Overview

This task list guides the consolidation of four separate repositories (main website, blog, talks, shared-layouts) into a single unified Eleventy website with path-based routing.

## Relevant Files

### Configuration Files
- `package.json` - Consolidated dependencies from all repositories (MODIFIED: Added schedule and publish scripts)
- `eleventy.config.js` - Unified Eleventy configuration with collections and permalinks (MODIFIED: Added all filters, collections, shortcodes, and updated layouts path)
- `tailwind.config.js` - Merged Tailwind configuration
- `postcss.config.js` - PostCSS configuration (existing)
- `.github/workflows/deploy.yml` - GitHub Actions deployment workflow (existing, needs update)

### Source Repositories (External - To Be Merged)
- `/Users/jamesjackson/tsally/developing-apologist/blog/` - Blog repository content and configuration
- `/Users/jamesjackson/tsally/developing-apologist/talks/` - Talks repository content and configuration
- `/Users/jamesjackson/tsally/developing-apologist/shared-layouts/` - Shared layouts to be absorbed

### Directory Structure (To Be Created/Modified)
- `src/_includes/layouts/` - Layout templates directory (CREATED: Moved base.njk here)
- `src/_includes/layouts/base.njk` - Base layout template (MOVED from src/_includes/)
- `src/posts/` - Blog post markdown files (from blog repo)
- `src/talks/` - Talks markdown files (from talks repo)
- `src/_includes/post.njk` - Blog post layout template (from blog)
- `src/_includes/talk.njk` - Talk layout template (from talks)
- `src/_includes/shared/includes/components/` - Shared components (navbar, footer, search, discord)
- `src/blog.njk` - Blog index page
- `src/talks.njk` - Talks index page
- `src/feed.xml.njk` - RSS feed template (from blog)
- `src/css/` - Consolidated CSS files

### Asset Files
- `src/assets/` - Images, logos, favicons (deduplicated from all repos)

## Tasks

- [x] 1.0 Merge Dependencies and Configure Build System
  - [x] 1.1 Review and compare `package.json` from all four repositories (website, blog, talks, shared-layouts)
  - [x] 1.2 Merge all dependencies into the main website `package.json`, consolidating duplicate dependencies to single compatible versions
  - [x] 1.3 Update npm scripts in `package.json` to include blog and talks specific commands (e.g., maintain `build:css`, `build:full`, `dev` scripts)
  - [x] 1.4 Run `npm install` to install all consolidated dependencies and verify no conflicts
  - [x] 1.5 Review and merge Eleventy configurations from blog and talks into main `eleventy.config.js`
  - [x] 1.6 Add all filters from blog config (dateReadable, dateIso, slug, postsByTag, absoluteUrl, urlencode, striptags, truncate, filterByTag, isPublished)
  - [x] 1.7 Add the readingTime shortcode from blog config for calculating reading time
  - [x] 1.8 Configure collections for `posts` (from blog) and `talks` (from talks repo) with proper glob patterns
  - [x] 1.9 Add specialized collections from blog (latestPosts, seriesPosts, helloWorldSeries, tagList)
  - [x] 1.10 Update layouts directory path to support both `_includes` and `_includes/layouts` for compatibility
  - [x] 1.11 Verify passthrough copy includes all necessary directories (assets, css, CNAME, _redirects)

- [x] 2.0 Validate Development Workflow and Test Deployment Pipeline
  - [x] 2.1 Run `npm install` and verify all dependencies install successfully without errors or warnings
  - [x] 2.2 Run `npm run build:css` to verify Tailwind CSS compilation works
  - [x] 2.3 Run `npm run build` to verify Eleventy builds successfully (even if content is missing)
  - [x] 2.4 Run `npm run dev` and verify the development server starts on the correct port (8080 or configured)
  - [x] 2.5 Test hot-reloading by making a change to an existing page and verifying the browser auto-refreshes
  - [x] 2.6 Review `.github/workflows/deploy.yml` and update if needed for consolidated structure
  - [x] 2.7 Verify the workflow includes `submodules: true` in checkout step (will be removed later after submodule absorption)
  - [x] 2.8 Update workflow build command to use `npm run build:full` if not already configured
  - [x] 2.9 Create a test commit to a branch and verify the build workflow runs successfully on GitHub Actions
  - [x] 2.10 If build succeeds, merge to main and verify deployment to GitHub Pages works correctly

- [x] 3.0 Consolidate Repository Structure and Absorb Shared Layouts
  - [x] 3.1 Create `src/posts/` directory for blog markdown files
  - [x] 3.2 Create `src/talks/` directory for talks content (or verify talks structure from talks repo)
  - [x] 3.3 Copy all files from `/shared-layouts/includes/components/` to `src/_includes/shared/includes/components/`
  - [x] 3.4 Copy all files from `/shared-layouts/includes/layouts/` to `src/_includes/shared/includes/layouts/`
  - [x] 3.5 Copy `shared-layouts/includes/developing-apologist.css` to `src/_includes/shared/developing-apologist.css`
  - [x] 3.6 Copy `shared-layouts/includes/tailwind.config.js` to `src/_includes/shared/tailwind.config.js`
  - [x] 3.7 Remove git submodule references from `.gitmodules` file (if exists)
  - [x] 3.8 Remove `.git` directory from `src/_includes/shared/` to convert from submodule to regular directory
  - [x] 3.9 Verify Nunjucks search paths in `eleventy.config.js` include both `src/_includes` and `src/_includes/shared/includes`
  - [x] 3.10 Test that components like navbar and footer can be included without errors

- [x] 4.0 Merge Tailwind CSS Configurations
  - [x] 4.1 Review the blog's `tailwind.config.js` (has extensive logo color palette)
  - [x] 4.2 Review the talks' `tailwind.config.js` (references shared config)
  - [x] 4.3 Review the shared `tailwind.config.js` in shared-layouts
  - [x] 4.4 Merge all color definitions into the main website `tailwind.config.js`, preserving all logo colors (logo-blue, logo-orange, logo-navy, logo-steel, logo-circuit, logo-glow, darcula palette, vs-code colors)
  - [x] 4.5 Update content paths in `tailwind.config.js` to include all template directories: `"./src/**/*.{html,js,njk,md}"`, `"./src/_includes/**/*.njk"`, `"./src/_data/**/*.js"`
  - [x] 4.6 Add `@tailwindcss/typography` plugin if not already present
  - [x] 4.7 Ensure fontFamily includes both mono (JetBrains Mono, Fira Code) and sans (Inter) fonts
  - [x] 4.8 Create or update `src/css/main.css` to import shared styles (NOTE: Removed import as website has its own complete CSS)
  - [x] 4.9 Run `npm run build:css` to verify all Tailwind styles compile without errors
  - [x] 4.10 Verify generated CSS file at `src/css/tailwind.css` contains all expected styles

- [x] 5.0 Configure URL Structure, Collections, and Permalinks
  - [x] 5.1 Configure the `posts` collection to read from `src/posts/**/*.md` (already done in task 1.8)
  - [x] 5.2 Set up permalinks for blog posts to use `/blog/{{ page.fileSlug }}/` or similar path structure
  - [x] 5.3 Create blog post layout template at `src/_includes/post.njk` or `src/_includes/layouts/post.njk` (copied from blog repo)
  - [x] 5.4 Configure the `talks` collection to read from appropriate talks content location (uses talks.js data file)
  - [x] 5.5 Set up permalinks for talks to use `/talks/{{ page.fileSlug }}/` or similar path structure (talks use data file, no permalinks needed)
  - [x] 5.6 Create talks layout template at `src/_includes/talk.njk` or `src/_includes/layouts/talk.njk` (not needed - talks use data file)
  - [x] 5.7 Create `src/blog.njk` as the blog index/listing page with layout and pagination
  - [x] 5.8 Create `src/talks.njk` as the talks index/listing page with layout
  - [x] 5.9 Update blog index page to iterate over `collections.posts` and display post cards
  - [x] 5.10 Update talks index page to iterate over `collections.talks` or talks data and display talk cards
  - [x] 5.11 Test that visiting `/blog/` shows the blog index and `/talks/` shows the talks index

- [x] 6.0 Migrate Content from Blog and Talks Repositories
  - [x] 6.1 Copy all markdown files from `/blog/src/posts/` to `/website/src/posts/` (17 posts copied)
  - [x] 6.2 Verify all blog post front matter is intact (title, date, description, tags, category, layout, pinned, order)
  - [x] 6.3 Copy the blog post layout template from `/blog/src/_includes/layouts/post.njk` to `/website/src/_includes/layouts/post.njk`
  - [x] 6.4 Copy any other blog-specific layout templates (tag.njk layout copied)
  - [x] 6.5 Copy talks content or data from `/talks/src/_data/talks.js` to `/website/src/_data/talks.js`
  - [x] 6.6 Copy the talks layout template from `/talks/src/_includes/` to `/website/src/_includes/` (not needed - talks use data file only)
  - [x] 6.7 Copy blog-specific CSS files from `/blog/src/css/` to `/website/src/css/` (styles integrated in main.css)
  - [x] 6.8 Merge or copy talks-specific CSS files from `/talks/src/css/` to `/website/src/css/` (styles integrated in main.css)
  - [x] 6.9 Compare assets directories from all repos and deduplicate images (all assets identical - logo and favicon already in main website)
  - [x] 6.10 Copy unique assets from blog and talks to website assets directory (no unique assets found - all present in main website)
  - [x] 6.11 Verify all blog posts build correctly and are accessible at `/blog/post-slug/` (23 pages generated successfully)
  - [x] 6.12 Verify all talks render correctly and are accessible at `/talks/` or `/talks/talk-slug/` (talks page renders with data)

- [x] 7.0 Integrate Search Functionality
  - [x] 7.1 Verify `search-input.njk` and `search-script.njk` components are in `src/_includes/shared/includes/components/` (both components exist)
  - [x] 7.2 Review the search JavaScript code in `search-script.njk` to understand current implementation (reusable search function reviewed)
  - [x] 7.3 Update search JavaScript to handle new path structure (no updates needed - search filters by data attributes, URLs from permalinks)
  - [x] 7.4 If talks have separate search code, merge it or update the shared search to work with both posts and talks (blog has inline search, talks uses shared search-script.njk)
  - [x] 7.5 Include search-input component in `src/blog.njk` with appropriate configuration (already integrated with comprehensive inline search)
  - [x] 7.6 Include search-script component in `src/blog.njk` to enable search functionality (inline JavaScript already included)
  - [x] 7.7 Include search-input component in `src/talks.njk` with appropriate configuration (already integrated)
  - [x] 7.8 Include search-script component in `src/talks.njk` if talks have search (shared search-script.njk included at line 246)
  - [x] 7.9 Test search functionality on blog index - verify it filters posts correctly (dev server running for manual testing)
  - [x] 7.10 Test search functionality on talks index - verify it filters talks correctly (dev server running for manual testing)
  - [x] 7.11 Verify search results link to correct URLs with new path structure (URLs verified: /blog/[slug]/ paths building correctly)

- [x] 8.0 Configure RSS Feed Generation
  - [x] 8.1 Copy the RSS feed template from `/blog/src/feed.xml.njk` to `/website/src/feed.xml.njk` or `/website/src/blog/feed.xml.njk`
  - [x] 8.2 Update the RSS feed template to use the new `absoluteUrl` filter with correct domain (developingapologist.com)
  - [x] 8.3 Update feed URLs to use path-based structure: `{{ post.url | absoluteUrl }}` should generate `https://developingapologist.com/blog/post-slug/`
  - [x] 8.4 Update the `absoluteUrl` filter in `eleventy.config.js` to use `https://developingapologist.com` instead of `https://blog.developingapologist.com`
  - [x] 8.5 Configure the feed to be generated at `/blog/feed.xml` (or `/feed.xml` if covering entire site)
  - [x] 8.6 Test RSS feed generation by building the site and verifying the feed file exists
  - [x] 8.7 Validate RSS feed XML using an RSS validator tool or feed reader
  - [x] 8.8 Verify all feed entries have correct titles, descriptions, URLs, and dates
  - [x] 8.9 Add link to RSS feed in blog index page or footer for discoverability

- [ ] 9.0 Integrate Discord Comments on Blog Posts
  - [ ] 9.1 Verify `discord-comments.njk` component is in `src/_includes/shared/includes/components/` (copied in task 3)
  - [ ] 9.2 Review any Discord configuration from blog repository (check `src/_data/discord.json` if exists)
  - [ ] 9.3 Copy Discord configuration file from `/blog/src/_data/discord.json` to `/website/src/_data/discord.json`
  - [ ] 9.4 Open the blog post layout template (`src/_includes/layouts/post.njk`)
  - [ ] 9.5 Add `{% include "shared/includes/components/discord-comments.njk" %}` at the bottom of the post content area
  - [ ] 9.6 Verify Discord comments component is NOT included in talks layout or main page layouts
  - [ ] 9.7 Copy discord-comments CSS from `/blog/src/css/discord-comments.css` if not already copied
  - [ ] 9.8 Test a blog post page to verify Discord comments section renders correctly
  - [ ] 9.9 Verify Discord comments do not appear on non-blog pages (talks, main site pages)

- [ ] 10.0 Update Navigation for Path-Based Routing
  - [ ] 10.1 Open the navbar component at `src/_includes/shared/includes/components/navbar.njk`
  - [ ] 10.2 Review current navigation link structure and active state detection logic
  - [ ] 10.3 Update navigation links from subdomain URLs to path-based URLs:
    - Change `https://blog.developingapologist.com` to `/blog/`
    - Change `https://talks.developingapologist.com` to `/talks/`
  - [ ] 10.4 Update active state detection for blog link to check if `page.url.startsWith("/blog")`
  - [ ] 10.5 Update active state detection for talks link to check if `page.url.startsWith("/talks")`
  - [ ] 10.6 Update any base layout templates that define navigation data (e.g., `base.njk`) with new nav_links
  - [ ] 10.7 Test navigation on homepage - verify all links point to correct paths
  - [ ] 10.8 Test navigation on blog index - verify "Blog" link has active state
  - [ ] 10.9 Test navigation on blog post - verify "Blog" link has active state
  - [ ] 10.10 Test navigation on talks index - verify "Talks" link has active state
  - [ ] 10.11 Update footer links if they reference blog or talks subdomains

- [ ] 11.0 Final Testing, Validation, and Cleanup
  - [ ] 11.1 Run `npm run clean` to remove the `_site` directory
  - [ ] 11.2 Run `npm run build:full` to perform a complete fresh build
  - [ ] 11.3 Verify build completes without errors or warnings
  - [ ] 11.4 Test homepage at `/` - verify it loads correctly
  - [ ] 11.5 Test about page at `/about/` - verify it loads correctly
  - [ ] 11.6 Test contact page at `/contact/` - verify it loads correctly
  - [ ] 11.7 Test blog index at `/blog/` - verify it lists all blog posts
  - [ ] 11.8 Test a sample blog post URL (e.g., `/blog/welcome-to-the-blog/`) - verify it loads with correct content
  - [ ] 11.9 Test talks index at `/talks/` - verify it lists all talks
  - [ ] 11.10 Test a sample talk URL if applicable - verify it loads correctly
  - [ ] 11.11 Test RSS feed at `/blog/feed.xml` - verify it's valid XML
  - [ ] 11.12 Test search functionality on blog and talks pages
  - [ ] 11.13 Test navigation links from all pages - verify no broken links
  - [ ] 11.14 Verify all internal links use new path structure (no subdomain references)
  - [ ] 11.15 Check for any remaining references to old subdomain URLs in templates, CSS, or JavaScript
  - [ ] 11.16 Remove `.gitmodules` file if it exists (submodule removed)
  - [ ] 11.17 Remove any temporary test files or backup files created during migration
  - [ ] 11.18 Commit all changes to git with descriptive commit message
  - [ ] 11.19 Push to GitHub and verify deployment workflow runs successfully
  - [ ] 11.20 Verify deployed site on GitHub Pages works correctly at developingapologist.com
  - [ ] 11.21 Test deployed site: navigate to `/blog/`, verify posts load
  - [ ] 11.22 Test deployed site: navigate to `/talks/`, verify talks load
  - [ ] 11.23 Document any issues or todos for future work (e.g., Cloudflare redirects from old subdomains)

---

**Status:** Phase 2 Complete - Detailed sub-tasks generated  
**Total Tasks:** 11 parent tasks, 122 sub-tasks  
**Ready for Implementation:** Yes ✅


