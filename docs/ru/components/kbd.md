# Kbd

Визуальный компонент для отображения клавиш клавиатуры. Идеально подходит для показа горячих клавиш, комбинаций клавиш или подсказок в документации и интерфейсе.

## Установка

```bash
npx capsule add Kbd
```

## Использование

### Базовый Kbd

<div style="margin: 1rem 0;">
  <capsule-kbd>Ctrl</capsule-kbd>
</div>

```html
<capsule-kbd>Ctrl</capsule-kbd>
```

### Комбинации клавиш

Отображайте горячие клавиши, комбинируя несколько клавиш:

<div style="margin: 1rem 0; display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
  Нажмите <capsule-kbd>Ctrl</capsule-kbd> + <capsule-kbd>C</capsule-kbd> для копирования
</div>

```html
Нажмите <capsule-kbd>Ctrl</capsule-kbd> + <capsule-kbd>C</capsule-kbd> для копирования
```

### Разные размеры

<div style="margin: 1rem 0; display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
  <capsule-kbd size="xs">XS</capsule-kbd>
  <capsule-kbd size="sm">SM</capsule-kbd>
  <capsule-kbd size="md">MD</capsule-kbd>
  <capsule-kbd size="lg">LG</capsule-kbd>
  <capsule-kbd size="xl">XL</capsule-kbd>
</div>

```html
<capsule-kbd size="xs">XS</capsule-kbd>
<capsule-kbd size="sm">SM</capsule-kbd>
<capsule-kbd size="md">MD</capsule-kbd>
<capsule-kbd size="lg">LG</capsule-kbd>
<capsule-kbd size="xl">XL</capsule-kbd>
```

### Распространённые горячие клавиши

<div style="margin: 1rem 0; display: flex; flex-direction: column; gap: 0.5rem;">
  <div>Сохранить: <capsule-kbd>Ctrl</capsule-kbd> + <capsule-kbd>S</capsule-kbd></div>
  <div>Копировать: <capsule-kbd>Ctrl</capsule-kbd> + <capsule-kbd>C</capsule-kbd></div>
  <div>Вставить: <capsule-kbd>Ctrl</capsule-kbd> + <capsule-kbd>V</capsule-kbd></div>
  <div>Отменить: <capsule-kbd>Ctrl</capsule-kbd> + <capsule-kbd>Z</capsule-kbd></div>
  <div>Поиск: <capsule-kbd>Ctrl</capsule-kbd> + <capsule-kbd>F</capsule-kbd></div>
</div>

```html
<div>Сохранить: <capsule-kbd>Ctrl</capsule-kbd> + <capsule-kbd>S</capsule-kbd></div>
<div>Копировать: <capsule-kbd>Ctrl</capsule-kbd> + <capsule-kbd>C</capsule-kbd></div>
```

### Клавиши стрелок

<div style="margin: 1rem 0; display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
  Используйте <capsule-kbd>↑</capsule-kbd> <capsule-kbd>↓</capsule-kbd> <capsule-kbd>←</capsule-kbd> <capsule-kbd>→</capsule-kbd> для навигации
</div>

```html
Используйте <capsule-kbd>↑</capsule-kbd> <capsule-kbd>↓</capsule-kbd> <capsule-kbd>←</capsule-kbd> <capsule-kbd>→</capsule-kbd> для навигации
```

### Функциональные клавиши

<div style="margin: 1rem 0; display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
  <capsule-kbd>F1</capsule-kbd>
  <capsule-kbd>F2</capsule-kbd>
  <capsule-kbd>F3</capsule-kbd>
  <capsule-kbd>F12</capsule-kbd>
</div>

```html
<capsule-kbd>F1</capsule-kbd>
<capsule-kbd>F2</capsule-kbd>
<capsule-kbd>F3</capsule-kbd>
```

## API

### Свойства

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Размер клавиши клавиатуры |

## Стилизация

Вы можете настроить внешний вид с помощью CSS:

```css
capsule-kbd {
  background: #f0f0f0;
  border-color: #ccc;
  font-size: 14px;
}
```
