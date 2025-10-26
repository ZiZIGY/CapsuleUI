import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "CapsuleUI",
  description: "CapsuleUI - Modern unstyled web components in your project",
  
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      link: '/',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'Components', link: '/components/' },
          { text: 'CLI Commands', link: '/cli-commands' }
        ],

        sidebar: [
          {
            text: 'Introduction',
            items: [
              { text: 'Getting Started', link: '/getting-started' },
              { text: 'CLI Commands', link: '/cli-commands' }
            ]
          },
          {
            text: 'Components',
            items: [
              { text: 'Overview', link: '/components/' },
              { text: 'Button', link: '/components/button' },
              { text: 'Button Group', link: '/components/button-group' }
            ]
          }
        ]
      }
    },
    ru: {
      label: 'Русский',
      lang: 'ru',
      link: '/ru/',
      themeConfig: {
        nav: [
          { text: 'Главная', link: '/ru/' },
          { text: 'Начало работы', link: '/ru/getting-started' },
          { text: 'Компоненты', link: '/ru/components/' },
          { text: 'Команды CLI', link: '/ru/cli-commands' }
        ],

        sidebar: [
          {
            text: 'Введение',
            items: [
              { text: 'Начало работы', link: '/ru/getting-started' },
              { text: 'Команды CLI', link: '/ru/cli-commands' }
            ]
          },
          {
            text: 'Компоненты',
            items: [
              { text: 'Обзор', link: '/ru/components/' },
              { text: 'Button', link: '/ru/components/button' },
              { text: 'Button Group', link: '/ru/components/button-group' }
            ]
          }
        ]
      }
    }
  },
  
  themeConfig: {
    search: {
      provider: 'local'
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/capsule-ui' }
    ],
    
    editLink: {
      pattern: 'https://github.com/capsule-ui/capsule-ui/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },
    
    lastUpdated: {
      text: 'Last updated'
    }
  }
})
