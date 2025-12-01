# Stepper

Компонент многошаговой формы для разбиения сложных процессов на управляемые шаги. Компонент управляет состоянием и предоставляет программный API для навигации.

## Установка

```bash
npx @zizigy/capsule add Stepper
```

## Использование

### Базовый Stepper

Stepper предоставляет структуру и управление состоянием. Вам нужно будет добавить свои собственные визуальные стили для индикаторов шагов, линий и анимаций.

<div style="margin: 1rem 0; border-radius: 8px; padding: 1.5rem;">
  <capsule-stepper current-step="1" id="stepper-basic-ru">
    <capsule-stepper-steps>
      <capsule-stepper-step>Аккаунт</capsule-stepper-step>
      <capsule-stepper-step>Профиль</capsule-stepper-step>
      <capsule-stepper-step>Обзор</capsule-stepper-step>
    </capsule-stepper-steps>
    <capsule-stepper-panels>
      <capsule-stepper-panel>
        <div style="padding: 1rem 0;">
          <h3 style="margin: 0 0 0.5rem 0;">Информация об аккаунте</h3>
          <p style="margin: 0 0 1rem 0; color: #64748b;">Создайте аккаунт</p>
          <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
            <capsule-button onclick="document.getElementById('stepper-basic-ru').next()">Далее</capsule-button>
          </div>
        </div>
      </capsule-stepper-panel>
      <capsule-stepper-panel>
        <div style="padding: 1rem 0;">
          <h3 style="margin: 0 0 0.5rem 0;">Детали профиля</h3>
          <p style="margin: 0 0 1rem 0; color: #64748b;">Заполните профиль</p>
          <div style="display: flex; gap: 0.5rem; justify-content: space-between;">
            <capsule-button onclick="document.getElementById('stepper-basic-ru').previous()">Назад</capsule-button>
            <capsule-button onclick="document.getElementById('stepper-basic-ru').next()">Далее</capsule-button>
          </div>
        </div>
      </capsule-stepper-panel>
      <capsule-stepper-panel>
        <div style="padding: 1rem 0;">
          <h3 style="margin: 0 0 0.5rem 0;">Обзор</h3>
          <p style="margin: 0 0 1rem 0; color: #64748b;">Проверьте информацию</p>
          <div style="display: flex; gap: 0.5rem; justify-content: flex-start;">
            <capsule-button onclick="document.getElementById('stepper-basic-ru').previous()">Назад</capsule-button>
          </div>
        </div>
      </capsule-stepper-panel>
    </capsule-stepper-panels>
  </capsule-stepper>
</div>

```html
<capsule-stepper current-step="1">
  <capsule-stepper-steps>
    <capsule-stepper-step>Аккаунт</capsule-stepper-step>
    <capsule-stepper-step>Профиль</capsule-stepper-step>
    <capsule-stepper-step>Обзор</capsule-stepper-step>
  </capsule-stepper-steps>
  <capsule-stepper-panels>
    <capsule-stepper-panel>...</capsule-stepper-panel>
    <capsule-stepper-panel>...</capsule-stepper-panel>
    <capsule-stepper-panel>...</capsule-stepper-panel>
  </capsule-stepper-panels>
</capsule-stepper>
```

### Навигация

<div style="margin: 1rem 0; border-radius: 8px; padding: 1.5rem;">
  <capsule-stepper current-step="2" id="stepper-example-ru">
    <capsule-stepper-steps>
      <capsule-stepper-step>Шаг 1</capsule-stepper-step>
      <capsule-stepper-step>Шаг 2</capsule-stepper-step>
      <capsule-stepper-step>Шаг 3</capsule-stepper-step>
    </capsule-stepper-steps>
    <capsule-stepper-panels>
      <capsule-stepper-panel>
        <div style="padding: 1rem 0;">
          <h3 style="margin: 0 0 0.5rem 0;">Первый шаг</h3>
          <p style="margin: 0 0 1rem 0; color: #64748b;">Содержимое для шага 1</p>
          <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
            <capsule-button onclick="document.getElementById('stepper-example-ru').next()">Далее</capsule-button>
          </div>
        </div>
      </capsule-stepper-panel>
      <capsule-stepper-panel>
        <div style="padding: 1rem 0;">
          <h3 style="margin: 0 0 0.5rem 0;">Второй шаг</h3>
          <p style="margin: 0 0 1rem 0; color: #64748b;">Содержимое для шага 2</p>
          <div style="display: flex; gap: 0.5rem; justify-content: space-between;">
            <capsule-button onclick="document.getElementById('stepper-example-ru').previous()">Назад</capsule-button>
            <capsule-button onclick="document.getElementById('stepper-example-ru').next()">Далее</capsule-button>
          </div>
        </div>
      </capsule-stepper-panel>
      <capsule-stepper-panel>
        <div style="padding: 1rem 0;">
          <h3 style="margin: 0 0 0.5rem 0;">Третий шаг</h3>
          <p style="margin: 0 0 1rem 0; color: #64748b;">Содержимое для шага 3</p>
          <div style="display: flex; gap: 0.5rem; justify-content: flex-start;">
            <capsule-button onclick="document.getElementById('stepper-example-ru').previous()">Назад</capsule-button>
          </div>
        </div>
      </capsule-stepper-panel>
    </capsule-stepper-panels>
  </capsule-stepper>
</div>

```javascript
const stepper = document.querySelector('capsule-stepper');

// Навигация программно
stepper.next(); // Перейти к следующему шагу
stepper.previous(); // Перейти к предыдущему шагу
stepper.setStep(3); // Перейти к конкретному шагу
stepper.first(); // Перейти к первому шагу
stepper.last(); // Перейти к последнему шагу
stepper.reset(); // Сбросить к первому шагу
```

### Ориентация

<div style="margin: 1rem 0; border-radius: 8px; padding: 1.5rem;">
  <capsule-stepper current-step="1" orientation="vertical" id="stepper-vertical-ru">
    <capsule-stepper-steps>
      <capsule-stepper-step>Начало</capsule-stepper-step>
      <capsule-stepper-step>Прогресс</capsule-stepper-step>
      <capsule-stepper-step>Завершение</capsule-stepper-step>
    </capsule-stepper-steps>
    <capsule-stepper-panels animation="y">
      <capsule-stepper-panel>
        <div style="padding: 1rem 0;">
          <h3 style="margin: 0 0 0.5rem 0;">Начало</h3>
          <p style="margin: 0 0 1rem 0; color: #64748b;">Вертикальная компоновка шагов</p>
          <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
            <capsule-button onclick="document.getElementById('stepper-vertical-ru').next()">Далее</capsule-button>
          </div>
        </div>
      </capsule-stepper-panel>
      <capsule-stepper-panel>
        <div style="padding: 1rem 0;">
          <h3 style="margin: 0 0 0.5rem 0;">Прогресс</h3>
          <p style="margin: 0 0 1rem 0; color: #64748b;">Каждый шаг ниже предыдущего</p>
          <div style="display: flex; gap: 0.5rem; justify-content: space-between;">
            <capsule-button onclick="document.getElementById('stepper-vertical-ru').previous()">Назад</capsule-button>
            <capsule-button onclick="document.getElementById('stepper-vertical-ru').next()">Далее</capsule-button>
          </div>
        </div>
      </capsule-stepper-panel>
      <capsule-stepper-panel>
        <div style="padding: 1rem 0;">
          <h3 style="margin: 0 0 0.5rem 0;">Завершение</h3>
          <p style="margin: 0 0 1rem 0; color: #64748b;">Идеально для мобильных интерфейсов</p>
          <div style="display: flex; gap: 0.5rem; justify-content: flex-start;">
            <capsule-button onclick="document.getElementById('stepper-vertical-ru').previous()">Назад</capsule-button>
          </div>
        </div>
      </capsule-stepper-panel>
    </capsule-stepper-panels>
  </capsule-stepper>
</div>

```html
<capsule-stepper
  current-step="1"
  orientation="vertical"
>
  ...
</capsule-stepper>
```

### Анимация

<div style="margin: 1rem 0; border-radius: 8px; padding: 1.5rem;">
  <capsule-stepper current-step="2" id="stepper-anim-ru">
    <capsule-stepper-steps>
      <capsule-stepper-step>1</capsule-stepper-step>
      <capsule-stepper-step>2</capsule-stepper-step>
      <capsule-stepper-step>3</capsule-stepper-step>
    </capsule-stepper-steps>
    <capsule-stepper-panels animation="x">
      <capsule-stepper-panel>
        <div style="padding: 1rem 0;">
          <h3 style="margin: 0 0 0.5rem 0;">Слайд 1</h3>
          <p style="margin: 0 0 1rem 0; color: #64748b;">Слайд переход X</p>
          <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
            <capsule-button onclick="document.getElementById('stepper-anim-ru').next()">Далее</capsule-button>
          </div>
        </div>
      </capsule-stepper-panel>
      <capsule-stepper-panel>
        <div style="padding: 1rem 0;">
          <h3 style="margin: 0 0 0.5rem 0;">Слайд 2</h3>
          <p style="margin: 0 0 1rem 0; color: #64748b;">Горизонтальный эффект слайдинга</p>
          <div style="display: flex; gap: 0.5rem; justify-content: space-between;">
            <capsule-button onclick="document.getElementById('stepper-anim-ru').previous()">Назад</capsule-button>
            <capsule-button onclick="document.getElementById('stepper-anim-ru').next()">Далее</capsule-button>
          </div>
        </div>
      </capsule-stepper-panel>
      <capsule-stepper-panel>
        <div style="padding: 1rem 0;">
          <h3 style="margin: 0 0 0.5rem 0;">Слайд 3</h3>
          <p style="margin: 0 0 1rem 0; color: #64748b;">Панели скользят влево/вправо</p>
          <div style="display: flex; gap: 0.5rem; justify-content: flex-start;">
            <capsule-button onclick="document.getElementById('stepper-anim-ru').previous()">Назад</capsule-button>
          </div>
        </div>
      </capsule-stepper-panel>
    </capsule-stepper-panels>
  </capsule-stepper>
</div>

```html
<capsule-stepper-panels animation="x">
  <!-- Горизонтальная анимация слайда -->
</capsule-stepper-panels>

<capsule-stepper-panels animation="y">
  <!-- Вертикальная анимация слайда -->
</capsule-stepper-panels>
```

## Компоненты

Компонент Stepper состоит из нескольких подкомпонентов:

### `capsule-stepper`

Главный контейнер, управляющий текущим шагом и предоставляющий API навигации.

| Атрибут        | Тип    | По умолчанию | Описание                                    |
| -------------- | ------ | ------------ | ------------------------------------------- |
| `current-step` | number | 1            | Текущий активный шаг (начинается с 1)       |
| `orientation`  | string | -            | Ориентация шагов (`vertical`, `horizontal`) |

#### Значения `orientation`

- `vertical` — Шаги располагаются вертикально
- `horizontal` — Шаги располагаются горизонтально (по умолчанию)

### `capsule-stepper-steps`

Контейнер для шагов. Атрибутов нет.

### `capsule-stepper-step`

Одиночный индикатор шага.

| Атрибут  | Тип    | Описание                                        |
| -------- | ------ | ----------------------------------------------- |
| `status` | string | Статус шага (`active`, `completed`, `inactive`) |

#### Значения `status`

- `active` — Текущий активный шаг
- `completed` — Пройденный шаг
- `inactive` — Шаг еще не достигнут

### `capsule-stepper-panels`

Контейнер для панелей.

| Атрибут       | Тип    | По умолчанию | Описание                                      |
| ------------- | ------ | ------------ | --------------------------------------------- |
| `animation`   | string | -            | Тип анимации (`x`, `y`, `none`)               |
| `orientation` | string | -            | Ориентация панелей (`vertical`, `horizontal`) |

#### Значения `animation`

- `x` — Горизонтальная анимация слайда (по умолчанию для horizontal)
- `y` — Вертикальная анимация слайда (по умолчанию для vertical)
- `none` — Без анимации

#### Значения `orientation`

- `vertical` — Панели располагаются вертикально
- `horizontal` — Панели располагаются горизонтально

### `capsule-stepper-panel`

Одиночная панель шага.

| Атрибут  | Тип    | Описание                             |
| -------- | ------ | ------------------------------------ |
| `status` | string | Статус панели (`active`, `inactive`) |

#### Значения `status`

- `active` — Панель отображается
- `inactive` — Панель скрыта

## Атрибуты

Все атрибуты описаны в разделе Компоненты выше. Дополнительные детали:

### Значения атрибута `status`

Для `capsule-stepper-step`:

- `active` — Текущий активный шаг
- `completed` — Завершенный шаг
- `inactive` — Шаг, к которому еще не перешли

Для `capsule-stepper-panel`:

- `active` — Текущая видимая панель
- `inactive` — Скрытая панель

### Значения атрибута `animation`

Для `capsule-stepper-panels`:

- `x` — Горизонтальная анимация слайда
- `y` — Вертикальная анимация слайда
- `none` — Без анимации

### Значения атрибута `orientation`

Для `capsule-stepper`:

- `vertical` — Вертикальная компоновка

## API Методы

### Навигация

| Метод        | Возвращает | Описание                                 |
| ------------ | ---------- | ---------------------------------------- |
| `next()`     | boolean    | Перейти к следующему шагу                |
| `previous()` | boolean    | Перейти к предыдущему шагу               |
| `setStep(n)` | void       | Перейти к конкретному шагу (начиная с 1) |
| `first()`    | void       | Перейти к первому шагу                   |
| `last()`     | void       | Перейти к последнему шагу                |
| `reset()`    | void       | Сбросить к первому шагу                  |

### Проверка состояния

| Метод             | Возвращает | Описание                            |
| ----------------- | ---------- | ----------------------------------- |
| `canGoNext()`     | boolean    | Можно ли перейти к следующему шагу  |
| `canGoPrevious()` | boolean    | Можно ли перейти к предыдущему шагу |

### Свойства

| Свойство      | Возвращает | Описание                                    |
| ------------- | ---------- | ------------------------------------------- |
| `currentStep` | number     | Номер текущего шага (начиная с 1)           |
| `totalSteps`  | number     | Общее количество шагов                      |
| `status`      | object     | Объект статуса с информацией о текущем шаге |

## События

### `change`

Срабатывает при изменении текущего шага.

```javascript
stepper.addEventListener('change', (e) => {
  console.log(e.detail); // { current, total, isFirst, isLast, progress }
});
```

## Стилизация

Компонент предоставляет минимальный CSS только для компоновки. Вам нужно стилизовать:

- **Индикаторы шагов**: Круги, номера, иконки, галочки
- **Соединительные линии**: Линии между шагами
- **Переходы панелей**: Пользовательские анимации при необходимости
- **Варианты состояний**: Стили для активных, завершенных, неактивных состояний

Пример структуры CSS:

```css
/* Ваши пользовательские стили */
capsule-stepper-step[status='active'] {
  color: blue;
}

capsule-stepper-step[status='completed'] {
  color: green;
}

capsule-stepper-step[status='inactive'] {
  color: gray;
}
```

## Доступность

- ✅ Автоматические ARIA атрибуты для статуса шага
- ✅ Поддержка навигации с клавиатуры
- ✅ Управление фокусом
- ✅ Семантическая структура для screen readers
