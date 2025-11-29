import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Welcome 🐊',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',

  future: {
    v4: true, 
  },
  url: 'https://your-docusaurus-site.example.com',
  baseUrl: '/',

  organizationName: 'facebook', 
  projectName: 'docusaurus', 

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl:
            'https://github.com/facebook/docusaurus',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl:
            'https://github.com/facebook/docusaurus',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: '🐊 Docusaurus English & Vietnam',
        logo: {
          alt: 'Docusaurus English & Vietnam',
          src: 'img/logo.svg',
        },
        items: [
          // {type: 'docSidebar', sidebarId: 'tutorialSidebar', position: 'left', label: 'Tutorial', },
          {to: '/blog', label: 'Blog', position: 'left'},
          {to: '/introduction', label: "Introduction", position: 'left'},
          {to: '/vocabulary', label: 'Vocabulary', position: 'left'},
          {to: '/phrases ', label: 'Phrases', position: 'left'},
          {href: 'https://github.com/facebook/docusaurus', label: 'GitHub', position: 'right', },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Individual',
            items: [
              {
                label: 'Facebook',
                href: 'https://www.facebook.com/song.an.326322',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'X',
                href: 'https://x.com/docusaurus',
              },
            ],
          },
                    {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus',
              },
            ],
          },
          {
            title: 'Introduction',
            items: [
              {label: 'Blog', to: '/blog', },
              {label: 'GitHub', to: '/github',},
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Quang Hung 2003 - Meta Learning English. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
