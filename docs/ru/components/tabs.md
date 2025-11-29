# Tabs

Компонент вкладок для организации контента в несколько секций, между которыми можно переключаться. Идеально подходит для панелей настроек, разделов документации или любого сгруппированного контента.

## Установка

```bash
npx capsule add Tabs
```

## Использование

### Базовые вкладки

<div style="margin: 1rem 0; max-width: 600px;">
  <capsule-tabs>
    <capsule-tabs-list>
      <capsule-tabs-trigger value="account">Аккаунт</capsule-tabs-trigger>
      <capsule-tabs-trigger value="password">Пароль</capsule-tabs-trigger>
      <capsule-tabs-trigger value="settings">Настройки</capsule-tabs-trigger>
    </capsule-tabs-list>
    <capsule-tabs-panels>
      <capsule-tabs-panel value="account">
        <p>Управляйте настройками и предпочтениями вашего аккаунта.</p>
      </capsule-tabs-panel>
      <capsule-tabs-panel value="password">
        <p>Измените пароль и настройки безопасности.</p>
      </capsule-tabs-panel>
      <capsule-tabs-panel value="settings">
        <p>Настройте предпочтения приложения.</p>
      </capsule-tabs-panel>
    </capsule-tabs-panels>
  </capsule-tabs>
</div>

```html
<capsule-tabs>
  <capsule-tabs-list>
    <capsule-tabs-trigger value="account">Аккаунт</capsule-tabs-trigger>
    <capsule-tabs-trigger value="password">Пароль</capsule-tabs-trigger>
    <capsule-tabs-trigger value="settings">Настройки</capsule-tabs-trigger>
  </capsule-tabs-list>
  <capsule-tabs-panels>
    <capsule-tabs-panel value="account">
      Контент аккаунта здесь
    </capsule-tabs-panel>
    <capsule-tabs-panel value="password">
      Контент пароля здесь
    </capsule-tabs-panel>
    <capsule-tabs-panel value="settings">
      Контент настроек здесь
    </capsule-tabs-panel>
  </capsule-tabs-panels>
</capsule-tabs>
```

### Активная вкладка по умолчанию

Вы можете установить активную вкладку по умолчанию, используя атрибут `value` на основном компоненте `capsule-tabs`. Если `value` не указан, первая вкладка будет активирована автоматически.

<div style="margin: 1rem 0; max-width: 600px;">
  <capsule-tabs value="password">
    <capsule-tabs-list>
      <capsule-tabs-trigger value="account">Аккаунт</capsule-tabs-trigger>
      <capsule-tabs-trigger value="password">Пароль</capsule-tabs-trigger>
      <capsule-tabs-trigger value="settings">Настройки</capsule-tabs-trigger>
    </capsule-tabs-list>
    <capsule-tabs-panels>
      <capsule-tabs-panel value="account">
        <p>Контент аккаунта (не активен по умолчанию)</p>
      </capsule-tabs-panel>
      <capsule-tabs-panel value="password">
        <p>Контент пароля (активен по умолчанию)</p>
      </capsule-tabs-panel>
      <capsule-tabs-panel value="settings">
        <p>Контент настроек (не активен по умолчанию)</p>
      </capsule-tabs-panel>
    </capsule-tabs-panels>
  </capsule-tabs>
</div>

```html
<capsule-tabs value="password">
  <capsule-tabs-list>
    <capsule-tabs-trigger value="account">Аккаунт</capsule-tabs-trigger>
    <capsule-tabs-trigger value="password">Пароль</capsule-tabs-trigger>
  </capsule-tabs-list>
  <capsule-tabs-panels>
    <capsule-tabs-panel value="account">...</capsule-tabs-panel>
    <capsule-tabs-panel value="password">...</capsule-tabs-panel>
  </capsule-tabs-panels>
</capsule-tabs>
```

### Анимации

Компонент вкладок поддерживает различные типы анимации для переходов между панелями.

#### Горизонтальный слайд (x)

<div style="margin: 1rem 0; max-width: 600px;">
  <capsule-tabs>
    <capsule-tabs-list>
      <capsule-tabs-trigger value="tab1">Вкладка 1</capsule-tabs-trigger>
      <capsule-tabs-trigger value="tab2">Вкладка 2</capsule-tabs-trigger>
      <capsule-tabs-trigger value="tab3">Вкладка 3</capsule-tabs-trigger>
    </capsule-tabs-list>
    <capsule-tabs-panels animation="x">
      <capsule-tabs-panel value="tab1">
        <p>Контент скользит горизонтально между вкладками.</p>
      </capsule-tabs-panel>
      <capsule-tabs-panel value="tab2">
        <p>Это вторая вкладка с горизонтальной анимацией слайда.</p>
      </capsule-tabs-panel>
      <capsule-tabs-panel value="tab3">
        <p>Контент третьей вкладки с плавными переходами.</p>
      </capsule-tabs-panel>
    </capsule-tabs-panels>
  </capsule-tabs>
</div>

```html
<capsule-tabs-panels animation="x">
  <capsule-tabs-panel value="tab1">...</capsule-tabs-panel>
  <capsule-tabs-panel value="tab2">...</capsule-tabs-panel>
</capsule-tabs-panels>
```

#### Вертикальный слайд (y)

<div style="margin: 1rem 0; max-width: 600px;">
  <capsule-tabs>
    <capsule-tabs-list>
      <capsule-tabs-trigger value="tab1">Вкладка 1</capsule-tabs-trigger>
      <capsule-tabs-trigger value="tab2">Вкладка 2</capsule-tabs-trigger>
    </capsule-tabs-list>
    <capsule-tabs-panels animation="y">
      <capsule-tabs-panel value="tab1">
        <p>Контент скользит вертикально между вкладками.</p>
      </capsule-tabs-panel>
      <capsule-tabs-panel value="tab2">
        <p>Это вторая вкладка с вертикальной анимацией слайда.</p>
      </capsule-tabs-panel>
    </capsule-tabs-panels>
  </capsule-tabs>
</div>

```html
<capsule-tabs-panels animation="y">
  <capsule-tabs-panel value="tab1">...</capsule-tabs-panel>
  <capsule-tabs-panel value="tab2">...</capsule-tabs-panel>
</capsule-tabs-panels>
```

#### Исчезновение (fade)

<div style="margin: 1rem 0; max-width: 600px;">
  <capsule-tabs>
    <capsule-tabs-list>
      <capsule-tabs-trigger value="tab1">Вкладка 1</capsule-tabs-trigger>
      <capsule-tabs-trigger value="tab2">Вкладка 2</capsule-tabs-trigger>
    </capsule-tabs-list>
    <capsule-tabs-panels animation="fade">
      <capsule-tabs-panel value="tab1">
        <p>Контент плавно появляется и исчезает между вкладками.</p>
      </capsule-tabs-panel>
      <capsule-tabs-panel value="tab2">
        <p>Это вторая вкладка с анимацией исчезновения.</p>
      </capsule-tabs-panel>
    </capsule-tabs-panels>
  </capsule-tabs>
</div>

```html
<capsule-tabs-panels animation="fade">
  <capsule-tabs-panel value="tab1">...</capsule-tabs-panel>
  <capsule-tabs-panel value="tab2">...</capsule-tabs-panel>
</capsule-tabs-panels>
```

## Компоненты

Компонент Tabs состоит из нескольких подкомпонентов:

### `capsule-tabs`

Основной контейнер для вкладок. Управляет состоянием активной вкладки.

### `capsule-tabs-list`

Контейнер для триггеров вкладок. Должен оборачивать все элементы `capsule-tabs-trigger`.

```html
<capsule-tabs-list>
  <capsule-tabs-trigger value="tab1">Вкладка 1</capsule-tabs-trigger>
  <capsule-tabs-trigger value="tab2">Вкладка 2</capsule-tabs-trigger>
</capsule-tabs-list>
```

### `capsule-tabs-trigger`

Кликабельная кнопка вкладки. Атрибут `value` должен соответствовать `value` соответствующей панели.

| Атрибут | Тип     | По умолчанию | Описание                        |
| ------- | ------- | ------------ | ------------------------------- |
| `value` | string  | —            | Уникальный идентификатор вкладки|
| `active`| boolean | false        | Указывает, активна ли вкладка   |

```html
<capsule-tabs-trigger value="account">Аккаунт</capsule-tabs-trigger>
```

### `capsule-tabs-panels`

Контейнер для панелей вкладок. Должен оборачивать все элементы `capsule-tabs-panel`.

| Атрибут    | Тип    | По умолчанию | Описание                      |
| ---------- | ------ | ------------ | ----------------------------- |
| `animation`| string | —            | Тип анимации (x, y или fade)  |

```html
<capsule-tabs-panels animation="x">
  <capsule-tabs-panel value="tab1">...</capsule-tabs-panel>
</capsule-tabs-panels>
```

### `capsule-tabs-panel`

Отдельная панель вкладки. Атрибут `value` должен соответствовать `value` соответствующего триггера.

| Атрибут | Тип     | По умолчанию | Описание                       |
| ------- | ------- | ------------ | ------------------------------ |
| `value` | string  | —            | Уникальный идентификатор панели|
| `active`| boolean | false        | Указывает, активна ли панель   |

```html
<capsule-tabs-panel value="account">
  Контент панели здесь
</capsule-tabs-panel>
```

## Атрибуты

### `capsule-tabs`

| Атрибут | Тип    | По умолчанию | Описание                          |
| ------- | ------ | ------------ | --------------------------------- |
| `value` | string | —            | Значение currently активной вкладки|

## API Reference

### Методы

#### `setActiveTab(value)`

Устанавливает активную вкладку программно.

```javascript
const tabs = document.querySelector('capsule-tabs');
tabs.setActiveTab('password'); // Переключиться на вкладку пароля
```

#### `getActiveTab()`

Возвращает значение текущей активной вкладки.

```javascript
const tabs = document.querySelector('capsule-tabs');
const activeTab = tabs.getActiveTab(); // Возвращает 'account', 'password' и т.д.
```

#### `getTabsCount()`

Возвращает общее количество вкладок.

```javascript
const tabs = document.querySelector('capsule-tabs');
const count = tabs.getTabsCount(); // Возвращает 3, 4 и т.д.
```

#### `getTabsValues()`

Возвращает массив всех значений вкладок.

```javascript
const tabs = document.querySelector('capsule-tabs');
const values = tabs.getTabsValues(); // Возвращает ['account', 'password', 'settings']
```

### Свойства

#### `value`

Получает или устанавливает значение активной вкладки.

```javascript
const tabs = document.querySelector('capsule-tabs');

// Получить активную вкладку
console.log(tabs.value); // 'account'

// Установить активную вкладку
tabs.value = 'password'; // Переключиться на вкладку пароля
```

### События

Компонент вкладок использует внутреннюю систему пользовательских событий. Вы можете отслеживать изменения вкладок, наблюдая за атрибутом `value`:

```javascript
const tabs = document.querySelector('capsule-tabs');

// Отслеживание изменений значения с помощью MutationObserver
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'attributes' && mutation.attributeName === 'value') {
      console.log('Активная вкладка изменилась на:', tabs.value);
    }
  });
});

observer.observe(tabs, {
  attributes: true,
  attributeFilter: ['value']
});
```

## Доступность

- ✅ ARIA роли (role="tablist", role="tab", role="tabpanel")
- ✅ Поддержка навигации с клавиатуры (стрелки, Home, End)
- ✅ Правильное управление фокусом
- ✅ Атрибуты `aria-selected` и `aria-hidden`
- ✅ `aria-controls` и `aria-labelledby` для правильных связей
- ✅ Семантическая структура для скринридеров

## Пример: Программное управление

<div style="margin: 1rem 0; max-width: 600px;">
  <capsule-tabs id="programmatic-tabs-ru">
    <capsule-tabs-list>
      <capsule-tabs-trigger value="tab1">Вкладка 1</capsule-tabs-trigger>
      <capsule-tabs-trigger value="tab2">Вкладка 2</capsule-tabs-trigger>
      <capsule-tabs-trigger value="tab3">Вкладка 3</capsule-tabs-trigger>
    </capsule-tabs-list>
    <capsule-tabs-panels>
      <capsule-tabs-panel value="tab1">
        <p>Контент первой вкладки. Используйте кнопки ниже для программного переключения вкладок.</p>
      </capsule-tabs-panel>
      <capsule-tabs-panel value="tab2">
        <p>Контент второй вкладки.</p>
      </capsule-tabs-panel>
      <capsule-tabs-panel value="tab3">
        <p>Контент третьей вкладки.</p>
      </capsule-tabs-panel>
    </capsule-tabs-panels>
  </capsule-tabs>
  <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
    <button onclick="document.querySelector('#programmatic-tabs-ru').setActiveTab('tab1')">Перейти на вкладку 1</button>
    <button onclick="document.querySelector('#programmatic-tabs-ru').setActiveTab('tab2')">Перейти на вкладку 2</button>
    <button onclick="document.querySelector('#programmatic-tabs-ru').setActiveTab('tab3')">Перейти на вкладку 3</button>
  </div>
</div>

```html
<capsule-tabs id="my-tabs">
  <capsule-tabs-list>
    <capsule-tabs-trigger value="tab1">Вкладка 1</capsule-tabs-trigger>
    <capsule-tabs-trigger value="tab2">Вкладка 2</capsule-tabs-trigger>
  </capsule-tabs-list>
  <capsule-tabs-panels>
    <capsule-tabs-panel value="tab1">...</capsule-tabs-panel>
    <capsule-tabs-panel value="tab2">...</capsule-tabs-panel>
  </capsule-tabs-panels>
</capsule-tabs>

<script>
  const tabs = document.querySelector('#my-tabs');
  tabs.setActiveTab('tab2'); // Переключиться на вторую вкладку
</script>
```
