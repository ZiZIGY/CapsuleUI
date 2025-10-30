import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'CapsuleUI',
  description: 'CapsuleUI - Modern unstyled web components in your project',
  ignoreDeadLinks: true,
  base: '/CapsuleUI/',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: 'https://raw.githubusercontent.com/ZiZiGY/CapsuleUI/master/public/favicon/favicon-32x32.png',
        type: 'image/png',
        sizes: '32x32',
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        href: 'https://raw.githubusercontent.com/ZiZiGY/CapsuleUI/master/public/favicon/favicon-16x16.png',
        type: 'image/png',
        sizes: '16x16',
      },
    ],
    [
      'link',
      {
        rel: 'apple-touch-icon',
        href: 'https://raw.githubusercontent.com/ZiZiGY/CapsuleUI/master/public/favicon/apple-touch-icon.png',
        sizes: '180x180',
      },
    ],
    [
      'link',
      {
        rel: 'manifest',
        href: 'https://raw.githubusercontent.com/ZiZiGY/CapsuleUI/master/public/favicon/site.webmanifest',
      },
    ],
  ],

  locales: {
    root: {
      label: 'English',
      lang: 'en',
      link: '/',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Philosophy', link: '/philosophy' },
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'Components', link: '/components/' },
          { text: 'CLI Commands', link: '/cli-commands' },
        ],

        sidebar: [
          {
            text: 'Introduction',
            items: [
              { text: 'Philosophy', link: '/philosophy' },
              { text: 'Getting Started', link: '/getting-started' },
              { text: 'CLI Commands', link: '/cli-commands' },
            ],
          },
          {
            text: 'Components',
            items: [
              { text: 'Overview', link: '/components/' },
              { text: 'Button', link: '/components/button' },
              { text: 'Button Group', link: '/components/button-group' },
              { text: 'Badge', link: '/components/badge' },
              { text: 'Chip', link: '/components/chip' },
              { text: 'Breadcrumb', link: '/components/breadcrumb' },
              { text: 'Skeleton', link: '/components/skeleton' },
              { text: 'Divider', link: '/components/divider' },
              { text: 'Alert', link: '/components/alert' },
              { text: 'Accordion', link: '/components/accordion' },
              { text: 'Calendar', link: '/components/calendar' },
              { text: 'Stepper', link: '/components/stepper' },
            ],
          },
        ],
      },
    },
    ru: {
      label: 'Русский',
      lang: 'ru',
      link: '/ru/',
      themeConfig: {
        nav: [
          { text: 'Главная', link: '/ru/' },
          { text: 'Философия', link: '/ru/philosophy' },
          { text: 'Начало работы', link: '/ru/getting-started' },
          { text: 'Компоненты', link: '/ru/components/' },
          { text: 'Команды CLI', link: '/ru/cli-commands' },
        ],

        sidebar: [
          {
            text: 'Введение',
            items: [
              { text: 'Философия', link: '/ru/philosophy' },
              { text: 'Начало работы', link: '/ru/getting-started' },
              { text: 'Команды CLI', link: '/ru/cli-commands' },
            ],
          },
          {
            text: 'Компоненты',
            items: [
              { text: 'Обзор', link: '/ru/components/' },
              { text: 'Button', link: '/ru/components/button' },
              { text: 'Button Group', link: '/ru/components/button-group' },
              { text: 'Badge', link: '/ru/components/badge' },
              { text: 'Chip', link: '/ru/components/chip' },
              { text: 'Breadcrumb', link: '/ru/components/breadcrumb' },
              { text: 'Skeleton', link: '/ru/components/skeleton' },
              { text: 'Divider', link: '/ru/components/divider' },
              { text: 'Alert', link: '/ru/components/alert' },
              { text: 'Accordion', link: '/ru/components/accordion' },
              { text: 'Calendar', link: '/ru/components/calendar' },
              { text: 'Stepper', link: '/ru/components/stepper' },
            ],
          },
        ],
      },
    },
  },

  themeConfig: {
    logo: 'https://raw.githubusercontent.com/ZiZiGY/CapsuleUI/master/public/logo.png',
    search: {
      provider: 'local',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ZiZIGY/CapsuleUI' },
    ],

    editLink: {
      pattern: 'https://github.com/ZiZIGY/CapsuleUI/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },

    lastUpdated: {
      text: 'Last updated',
    },
  },
});
