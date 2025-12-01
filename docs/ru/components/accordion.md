# Accordion

Складывающийся компонент для организации информации в раскрывающиеся панели. Идеально подходит для FAQ, категорий или секций.

## Установка

```bash
npx @zizigy/capsule add Accordion
```

## Использование

### Базовый Accordion

<div style="margin: 1rem 0; max-width: 400px;">
  <capsule-accordion>
    <capsule-accordion-panel>
      <capsule-accordion-trigger>
        Это доступно?
      </capsule-accordion-trigger>
      <capsule-accordion-content>
        Да. Соответствует паттерну дизайна WAI-ARIA.
      </capsule-accordion-content>
    </capsule-accordion-panel>
    <capsule-accordion-panel>
      <capsule-accordion-trigger>
        Как это работает?
      </capsule-accordion-trigger>
      <capsule-accordion-content>
        CapsuleAccordion использует CSS Grid transitions для плавной анимации.
      </capsule-accordion-content>
    </capsule-accordion-panel>
  </capsule-accordion>
</div>

```html
<capsule-accordion>
  <capsule-accordion-panel>
    <capsule-accordion-trigger> Это доступно? </capsule-accordion-trigger>
    <capsule-accordion-content>
      Да. Соответствует паттерну дизайна WAI-ARIA.
    </capsule-accordion-content>
  </capsule-accordion-panel>
</capsule-accordion>
```

### Тип: Single (по умолчанию)

<div style="margin: 1rem 0; max-width: 400px;">
  <capsule-accordion type="single">
    <capsule-accordion-panel open>
      <capsule-accordion-trigger>
        Элемент 1
      </capsule-accordion-trigger>
      <capsule-accordion-content>
        Контент для элемента 1
      </capsule-accordion-content>
    </capsule-accordion-panel>
    <capsule-accordion-panel>
      <capsule-accordion-trigger>
        Элемент 2
      </capsule-accordion-trigger>
      <capsule-accordion-content>
        Контент для элемента 2
      </capsule-accordion-content>
    </capsule-accordion-panel>
  </capsule-accordion>
</div>

```html
<capsule-accordion type="single">
  <capsule-accordion-panel open> ... </capsule-accordion-panel>
</capsule-accordion>
```

### Тип: Multiple

<div style="margin: 1rem 0; max-width: 400px;">
  <capsule-accordion type="multiple">
    <capsule-accordion-panel>
      <capsule-accordion-trigger>
        Секция 1
      </capsule-accordion-trigger>
      <capsule-accordion-content>
        Несколько панелей могут быть открыты одновременно.
      </capsule-accordion-content>
    </capsule-accordion-panel>
    <capsule-accordion-panel>
      <capsule-accordion-trigger>
        Секция 2
      </capsule-accordion-trigger>
      <capsule-accordion-content>
        Обе панели могут быть открыты одновременно.
      </capsule-accordion-content>
    </capsule-accordion-panel>
  </capsule-accordion>
</div>

```html
<capsule-accordion type="multiple">
  <capsule-accordion-panel>...</capsule-accordion-panel>
  <capsule-accordion-panel>...</capsule-accordion-panel>
</capsule-accordion>
```

### Collapsible

Когда установлен атрибут `collapsible`, можно закрыть все панели, включая первую.

<div style="margin: 1rem 0; max-width: 400px;">
  <capsule-accordion collapsible>
    <capsule-accordion-panel open>
      <capsule-accordion-trigger>
        Складываемая панель
      </capsule-accordion-trigger>
      <capsule-accordion-content>
        Эту панель можно закрыть, даже если она единственная открытая.
      </capsule-accordion-content>
    </capsule-accordion-panel>
  </capsule-accordion>
</div>

```html
<capsule-accordion collapsible>
  <capsule-accordion-panel open>...</capsule-accordion-panel>
</capsule-accordion>
```

### Кастомный контент триггера

Триггер может содержать любой контент, включая кнопки, иконки и другие интерактивные элементы.

<div style="margin: 1rem 0; max-width: 400px;">
  <capsule-accordion collapsible>
    <capsule-accordion-panel>
      <capsule-accordion-trigger exclude-self>
        <capsule-button size="sm">
          <div style="display: flex; align-items: center; gap: 8px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <span>Настройки</span>
          </div>
        </capsule-button>
      </capsule-accordion-trigger>
      <capsule-accordion-content>
        Вы можете разместить любой контент в триггере, включая кнопки, иконки или другие компоненты.
      </capsule-accordion-content>
    </capsule-accordion-panel>
  </capsule-accordion>
</div>

```html
<capsule-accordion>
  <capsule-accordion-panel>
    <capsule-accordion-trigger exclude-self>
      <capsule-button size="sm">
        <svg>...</svg>
        <span>Настройки</span>
      </capsule-button>
    </capsule-accordion-trigger>
    <capsule-accordion-content> ... </capsule-accordion-content>
  </capsule-accordion-panel>
</capsule-accordion>
```

## Компоненты

Компонент Accordion состоит из нескольких подкомпонентов:

### `capsule-accordion`

Главный контейнер для панелей accordion.

### `capsule-accordion-panel`

Отдельная панель accordion. Может иметь атрибут `open` для установки начального состояния.

```html
<capsule-accordion-panel open> ... </capsule-accordion-panel>
```

### `capsule-accordion-trigger`

Кликабельный заголовок, который переключает панель.

| Атрибут        | Тип     | По умолчанию | Описание                                                 |
| -------------- | ------- | ------------ | -------------------------------------------------------- |
| `exclude-self` | boolean | false        | Отключает переключение при клике на сам элемент триггера |

Когда установлен `exclude-self`, триггер срабатывает только при клике на его дочерние элементы (например, кнопки, иконки), а не на пустое место. Это полезно, когда у вас есть интерактивные элементы внутри триггера.

```html
<capsule-accordion-trigger exclude-self>
  <capsule-button>Редактировать</capsule-button>
</capsule-accordion-trigger>
```

### `capsule-accordion-content`

Область содержимого, которая складывается.

```html
<capsule-accordion-content> Содержимое панели здесь </capsule-accordion-content>
```

## Атрибуты

| Атрибут       | Тип     | По умолчанию | Описание                                        |
| ------------- | ------- | ------------ | ----------------------------------------------- |
| `type`        | string  | single       | Поведение accordion (single или multiple)       |
| `collapsible` | boolean | false        | Позволить закрытие всех панелей, включая первую |

### Значения type

- `single` — Только одна панель может быть открыта одновременно (по умолчанию)
- `multiple` — Несколько панелей могут быть открыты одновременно

## Доступность

- ✅ ARIA роли (role="region", role="button")
- ✅ Поддержка навигации с клавиатуры
- ✅ Правильное управление фокусом
- ✅ Семантическая структура для screen readers
