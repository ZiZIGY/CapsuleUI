# Alert

Компонент для отображения важных сообщений с разными вариантами (error, warning, success, info).

## Установка

```bash
npx capsule add Alert
```

## Использование

### Базовая alert

<div style="margin: 1rem 0;">
  <capsule-alert>
    <capsule-alert-title>Заголовок alert</capsule-alert-title>
    <capsule-alert-description>Это описание alert.</capsule-alert-description>
  </capsule-alert>
</div>

```html
<capsule-alert>
  <capsule-alert-title>Заголовок alert</capsule-alert-title>
  <capsule-alert-description>Это описание alert.</capsule-alert-description>
</capsule-alert>
```

### С иконкой

<div style="margin: 1rem 0;">
  <capsule-alert>
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 18.5q.625 0 1.063-.437T13.5 17h-3q0 .625.438 1.063T12 18.5M7 16h10v-2h-1v-2.6q0-1.525-.788-2.787T13 7v-.5q0-.425-.288-.712T12 5.5t-.712.288T11 6.5V7q-1.425.35-2.212 1.613T8 11.4V14H7zm5 6q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/></svg>
    <capsule-alert-title>Alert с иконкой</capsule-alert-title>
    <capsule-alert-description>Компонент Alert поддерживает SVG-иконки для лучшей визуальной коммуникации.</capsule-alert-description>
  </capsule-alert>
</div>

```html
<capsule-alert>
  <svg
    width="16"
    height="16"
  >
    ...
  </svg>
  <capsule-alert-title>Alert с иконкой</capsule-alert-title>
  <capsule-alert-description>Сообщение alert</capsule-alert-description>
</capsule-alert>
```

### Варианты

<div style="margin: 1rem 0;">
  <capsule-alert variant="error">
    <capsule-alert-title>Ошибка</capsule-alert-title>
    <capsule-alert-description>Что-то пошло не так</capsule-alert-description>
  </capsule-alert>
</div>

<div style="margin: 1rem 0;">
  <capsule-alert variant="warning">
    <capsule-alert-title>Предупреждение</capsule-alert-title>
    <capsule-alert-description>Проверьте ввод</capsule-alert-description>
  </capsule-alert>
</div>

<div style="margin: 1rem 0;">
  <capsule-alert variant="success">
    <capsule-alert-title>Успех</capsule-alert-title>
    <capsule-alert-description>Операция выполнена успешно</capsule-alert-description>
  </capsule-alert>
</div>

<div style="margin: 1rem 0;">
  <capsule-alert variant="info">
    <capsule-alert-title>Информация</capsule-alert-title>
    <capsule-alert-description>Информационное сообщение</capsule-alert-description>
  </capsule-alert>
</div>

```html
<capsule-alert variant="error">
  <capsule-alert-title>Ошибка</capsule-alert-title>
  <capsule-alert-description>Что-то пошло не так</capsule-alert-description>
</capsule-alert>
```

## Компоненты

Компонент Alert состоит из нескольких подкомпонентов:

### `capsule-alert`

Главный контейнер для alert сообщений.

### `capsule-alert-title`

Заголовок alert сообщения.

```html
<capsule-alert-title>Заголовок alert</capsule-alert-title>
```

### `capsule-alert-description`

Описание alert сообщения.

```html
<capsule-alert-description>Описание alert</capsule-alert-description>
```

## Атрибуты

| Атрибут   | Тип    | По умолчанию | Описание            |
| --------- | ------ | ------------ | ------------------- |
| `variant` | string | default      | Вариант стиля alert |

### Значения variant

- `default` — Alert по умолчанию
- `error` — Alert ошибки с красными цветами
- `warning` — Alert предупреждения с желтыми/оранжевыми цветами
- `success` — Alert успеха с зелеными цветами
- `info` — Alert информации с синими цветами

## Доступность

- ✅ ARIA role="alert" устанавливается автоматически
- ✅ Title имеет role="heading" с aria-level="2"
- ✅ Семантическая структура для screen readers
