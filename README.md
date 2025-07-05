# The Developing Apologist

A static website for "The Developing Apologist" - a resource hub for Christian software developers who want to defend their faith through logical, systematic apologetics.

## 🚧 Work in Progress

This site is currently under active development. We're building out our content library, developing training materials, and establishing our community. While we're still in the early stages, we're excited about the foundation we're laying.

### Current Status
- ✅ Basic site structure and design
- ✅ Home, About, and Contact pages
- ✅ Responsive design with Darcula theme
- ✅ Navigation to external blog and presentations
- 🚧 Content development in progress
- 🚧 Contact system under development
- 🚧 Community features planned

## About The Project

The Developing Apologist exists to equip Christian software developers with the tools, knowledge, and confidence to defend their faith in professional and personal contexts. We believe that the analytical thinking, systematic problem-solving, and evidence-based approaches that make you an effective developer also make you uniquely qualified to engage with apologetics.

### Key Features
- **Developer-Focused Content**: Training materials that speak your language using analogies from software development
- **Logical Rigor**: Evidence-based approaches that mirror your debugging and problem-solving process
- **Practical Application**: Real-world scenarios you'll encounter in the tech industry
- **Community Building**: Connecting Christian developers who can support each other

## Technology Stack

- **Static Site Generator**: [Eleventy (11ty)](https://www.11ty.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Theme**: Visual Studio Code Darcula color scheme
- **Deployment**: GitHub Pages (via GitHub Actions)

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/developing-apologist-website.git
cd developing-apologist-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

### Build for Production

```bash
npm run build
```

The built site will be in the `_site` directory.

## Project Structure

```
├── src/
│   ├── _includes/
│   │   └── base.njk          # Base layout template
│   ├── index.njk             # Homepage
│   ├── about.njk             # About page
│   ├── contact.njk           # Contact page (work in progress)
│   └── styles.css            # Custom styles
├── _site/                    # Built site (generated)
├── .eleventy.js              # Eleventy configuration
├── package.json              # Dependencies and scripts
├── tailwind.config.js        # Tailwind CSS configuration
├── CNAME                     # Custom domain configuration
├── _redirects                # Netlify-style redirects
└── README.md                 # This file
```

## Deployment

The site is configured for deployment to GitHub Pages using GitHub Actions. The workflow automatically builds and deploys the site when changes are pushed to the main branch.

### Manual Deployment

If you prefer to deploy manually:

1. Build the site:
```bash
npm run build
```

2. Deploy the contents of the `_site` directory to your hosting provider.

## Customization

### Colors and Theme
The site uses a custom Darcula color scheme inspired by Visual Studio Code. Colors are defined in the Tailwind configuration in `src/_includes/base.njk`.

### Content
- Update page content by editing the `.njk` files in the `src/` directory
- Modify the layout by editing `src/_includes/base.njk`
- Add new pages by creating new `.njk` files in the `src/` directory

### Styling
- Custom styles are in `src/styles.css`
- Tailwind classes are used throughout the templates
- The Darcula theme colors are available as Tailwind classes

## External Resources

The site links to external resources that are part of The Developing Apologist ecosystem:

- **Blog**: https://blog.developingapologist.com
- **Presentations**: https://talks.developingapologist.com

## Contributing

This is a personal project, but suggestions and feedback are welcome. Please note that this is a work in progress, and we're focused on building out the core content and functionality.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

The Developing Apologist is currently in active development. For now, please connect with us through our external resources:

- **Blog**: https://blog.developingapologist.com
- **Presentations**: https://talks.developingapologist.com

Contact systems are planned for future development.

---

*The Developing Apologist - Equipping Christian software developers to defend their faith through logical, systematic apologetics that bridges faith and reason.* 