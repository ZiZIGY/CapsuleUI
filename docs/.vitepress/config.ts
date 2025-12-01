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
          {
            text: 'Guide',
            items: [
              { text: 'Philosophy', link: '/philosophy' },
              { text: 'Getting Started', link: '/getting-started' },
              { text: 'Theming', link: '/theming' },
              { text: 'CLI Commands', link: '/cli-commands' },
            ],
          },
          { text: 'Components', link: '/components/' },
          { text: 'Modules', link: '/modules/' },
        ],

        sidebar: [
          {
            text: 'Getting Started',
            items: [
              { text: 'Philosophy', link: '/philosophy' },
              { text: 'Quick Start', link: '/getting-started' },
              { text: 'Theming', link: '/theming' },
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
              { text: 'Kbd', link: '/components/kbd' },
              { text: 'Breadcrumb', link: '/components/breadcrumb' },
              { text: 'Skeleton', link: '/components/skeleton' },
              { text: 'Divider', link: '/components/divider' },
              { text: 'Alert', link: '/components/alert' },
              { text: 'AspectRatio', link: '/components/aspect-ratio' },
              { text: 'Accordion', link: '/components/accordion' },
              { text: 'Tabs', link: '/components/tabs' },
              { text: 'Calendar', link: '/components/calendar' },
              { text: 'Stepper', link: '/components/stepper' },
              { text: 'Switch', link: '/components/switch' },
              { text: 'Range', link: '/components/range' },
              { text: 'Rating', link: '/components/rating' },
              { text: 'Progress', link: '/components/progress' },
              { text: 'Tooltip', link: '/components/tooltip' },
            ],
          },
          {
            text: 'Modules',
            items: [
              { text: 'Overview', link: '/modules/' },
              { text: 'Form', link: '/modules/form' },
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
          {
            text: 'Руководство',
            items: [
              { text: 'Философия', link: '/ru/philosophy' },
              { text: 'Начало работы', link: '/ru/getting-started' },
              { text: 'Темизация', link: '/ru/theming' },
              { text: 'Команды CLI', link: '/ru/cli-commands' },
            ],
          },
          { text: 'Компоненты', link: '/ru/components/' },
          { text: 'Модули', link: '/ru/modules/' },
        ],

        sidebar: [
          {
            text: 'Начало работы',
            items: [
              { text: 'Философия', link: '/ru/philosophy' },
              { text: 'Быстрый старт', link: '/ru/getting-started' },
              { text: 'Темизация', link: '/ru/theming' },
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
              { text: 'Kbd', link: '/ru/components/kbd' },
              { text: 'Breadcrumb', link: '/ru/components/breadcrumb' },
              { text: 'Skeleton', link: '/ru/components/skeleton' },
              { text: 'Divider', link: '/ru/components/divider' },
              { text: 'Alert', link: '/ru/components/alert' },
              { text: 'AspectRatio', link: '/ru/components/aspect-ratio' },
              { text: 'Accordion', link: '/ru/components/accordion' },
              { text: 'Tabs', link: '/ru/components/tabs' },
              { text: 'Calendar', link: '/ru/components/calendar' },
              { text: 'Stepper', link: '/ru/components/stepper' },
              { text: 'Switch', link: '/ru/components/switch' },
              { text: 'Range', link: '/ru/components/range' },
              { text: 'Rating', link: '/ru/components/rating' },
              { text: 'Progress', link: '/ru/components/progress' },
              { text: 'Tooltip', link: '/ru/components/tooltip' },
            ],
          },
          {
            text: 'Модули',
            items: [
              { text: 'Обзор', link: '/ru/modules/' },
              { text: 'Form', link: '/ru/modules/form' },
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

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025-present Alexander Zhukov',
    },
  },
});
