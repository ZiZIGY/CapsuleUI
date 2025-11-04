---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 'CapsuleUI'
  text: 'Copy. Paste. Rule.'
  image:
    src: https://raw.githubusercontent.com/ZiZiGY/CapsuleUI/master/public/capsule.gif
    alt: Capsule
  tagline: |
    Web components you truly control.
    Full source access, complete customization freedom.
  actions:
    - theme: brand
      text: Getting Started
      link: /getting-started
    - theme: alt
      text: Components
      link: /components/

features:
  - icon: 🧩
    title: 'VSCode Autocomplete'
    details: VSCode instantly suggests components and attributes with built-in HTML Data.
  - icon: ⚡
    title: 'No Build Steps'
    details: Works directly in browser. Bundle only if you want to optimize.
  - icon: 🎨
    title: 'CSS Themes Included'
    details: Light/dark themes via CSS color-scheme. Customize colors with CSS variables.
  - icon: 🔧
    title: 'Full Customization'
    details: Change CSS, logic, behavior - any component can be completely rewritten.
  - icon: 📦
    title: 'Lit + Web Components'
    details: Lit power in native standards. Work in any framework.
  - icon: 🚫
    title: 'No Dependencies'
    details: No npm, no node_modules. Each component is self-contained.
  - icon: ♿
    title: 'Accessibility Built-in'
    details: ARIA, keyboard navigation, and screen readers support out-of-the-box.
  - icon: 🎯
    title: 'Production Ready'
    details: Responsive, performant, cross-browser - everything considered.
  - icon: 🚀
    title: 'Development CLI'
    details: Add and update components with a single command.
---

## Every Component You Need, Ready for Production

<script setup>
  import HeroLiveDemo from './.vitepress/components/HeroLiveDemo.vue'
</script>

<HeroLiveDemo/>
