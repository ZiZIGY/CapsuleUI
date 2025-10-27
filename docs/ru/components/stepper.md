# Stepper

Компонент многошаговой формы для разбиения сложных процессов на управляемые шаги. Компонент управляет состоянием и предоставляет программный API для навигации.

## Установка

```bash
npx capsule add Stepper
```

## Использование

### Базовый Stepper

Stepper предоставляет структуру и управление состоянием. Вам нужно будет добавить свои собственные визуальные стили для индикаторов шагов, линий и анимаций.

<div style="margin: 1rem 0; max-width: 500px;">
  <capsule-stepper current-step="1">
    <capsule-stepper-steps>
      <capsule-stepper-step>Аккаунт</capsule-stepper-step>
      <capsule-stepper-step>Профиль</capsule-stepper-step>
      <capsule-stepper-step>Обзор</capsule-stepper-step>
    </capsule-stepper-steps>
    <capsule-stepper-panels>
      <capsule-stepper-panel>
        <h3>Информация об аккаунте</h3>
        <p>Создайте аккаунт</p>
      </capsule-stepper-panel>
      <capsule-stepper-panel>
        <h3>Детали профиля</h3>
        <p>Заполните профиль</p>
      </capsule-stepper-panel>
      <capsule-stepper-panel>
        <h3>Обзор</h3>
        <p>Проверьте информацию</p>
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

<div style="margin: 1rem 0; max-width: 500px;">
  <capsule-stepper current-step="2" id="stepper-example-ru">
    <capsule-stepper-steps>
      <capsule-stepper-step>Шаг 1</capsule-stepper-step>
      <capsule-stepper-step>Шаг 2</capsule-stepper-step>
      <capsule-stepper-step>Шаг 3</capsule-stepper-step>
    </capsule-stepper-steps>
    <capsule-stepper-panels>
      <capsule-stepper-panel>Содержимое для шага 1</capsule-stepper-panel>
      <capsule-stepper-panel>
        <div style="margin-bottom: 1rem;">
          <capsule-button onclick="document.getElementById('stepper-example-ru').previous()">
            Назад
          </capsule-button>
          <capsule-button onclick="document.getElementById('stepper-example-ru').next()">
            Далее
          </capsule-button>
        </div>
      </capsule-stepper-panel>
      <capsule-stepper-panel>Содержимое для шага 3</capsule-stepper-panel>
    </capsule-stepper-panels>
  </capsule-stepper>
</div>

```javascript
const stepper = document.querySelector('capsule-stepper');

// Навигация программно
stepper.next();        // Перейти к следующему шагу
stepper.previous();    // Перейти к предыдущему шагу
stepper.setStep(3);    // Перейти к конкретному шагу
stepper.first();       // Перейти к первому шагу
stepper.last();        // Перейти к последнему шагу
stepper.reset();       // Сбросить к первому шагу
```

### Ориентация

<div style="margin: 1rem 0;">
  <capsule-stepper current-step="1" orientation="vertical">
    <capsule-stepper-steps>
      <capsule-stepper-step>Начало</capsule-stepper-step>
      <capsule-stepper-step>Прогресс</capsule-stepper-step>
      <capsule-stepper-step>Завершение</capsule-stepper-step>
    </capsule-stepper-steps>
    <capsule-stepper-panels>
      <capsule-stepper-panel>Вертикальная компоновка шагов</capsule-stepper-panel>
      <capsule-stepper-panel>Каждый шаг ниже предыдущего</capsule-stepper-panel>
      <capsule-stepper-panel>Идеально для мобильных интерфейсов</capsule-stepper-panel>
    </capsule-stepper-panels>
  </capsule-stepper>
</div>

```html
<capsule-stepper current-step="1" orientation="vertical">
  ...
</capsule-stepper>
```

### Анимация

<div style="margin: 1rem 0; max-width: 500px;">
  <capsule-stepper current-step="2" id="stepper-anim-ru">
    <capsule-stepper-steps>
      <capsule-stepper-step>1</capsule-stepper-step>
      <capsule-stepper-step>2</capsule-stepper-step>
      <capsule-stepper-step>3</capsule-stepper-step>
    </capsule-stepper-steps>
    <capsule-stepper-panels animation="x">
      <capsule-stepper-panel>Слайд переход X</capsule-stepper-panel>
      <capsule-stepper-panel>Горизонтальный эффект слайдинга</capsule-stepper-panel>
      <capsule-stepper-panel>Панели скользят влево/вправо</capsule-stepper-panel>
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

Главный контейнер, который управляет текущим шагом и предоставляет API навигации.

### `capsule-stepper-steps`

Контейнер для индикаторов шагов. Автоматически применяет атрибуты статуса к каждому шагу.

### `capsule-stepper-step`

Отдельный индикатор шага. Получает атрибут `status` (`active`, `completed`, `inactive`).

```html
<capsule-stepper-step>Название шага</capsule-stepper-step>
```

### `capsule-stepper-panels`

Контейнер для содержимого панелей. Управляет видимостью панелей в зависимости от текущего шага.

### `capsule-stepper-panel`

Отдельная панель контента. Получает атрибут `status` (`active`, `inactive`).

```html
<capsule-stepper-panel>
  Ваш контент здесь
</capsule-stepper-panel>
```

## Атрибуты

### `capsule-stepper`

| Атрибут        | Тип    | По умолчанию | Описание                                     |
| -------------- | ------ | ------------ | -------------------------------------------- |
| `current-step` | number | 1            | Текущий активный шаг (начинается с 1)         |
| `orientation`  | string | -            | Направление компоновки (vertical)            |

### `capsule-stepper-steps`

Атрибутов нет.

### `capsule-stepper-step`

Шаг автоматически получает атрибут `status` со значениями:
- `active` — Текущий активный шаг
- `completed` — Завершенный шаг
- `inactive` — Шаг, к которому еще не перешли

### `capsule-stepper-panels`

| Атрибут    | Тип    | По умолчанию | Описание                    |
| ---------- | ------ | ------------ | --------------------------- |
| `animation`| string | -            | Тип анимации (x, y)         |

### `capsule-stepper-panel`

Панель автоматически получает атрибут `status` со значениями:
- `active` — Текущая видимая панель
- `inactive` — Скрытая панель

## API Методы

### Навигация

| Метод         | Возвращает | Описание                              |
| ------------- | ---------- | ------------------------------------- |
| `next()`      | boolean    | Перейти к следующему шагу              |
| `previous()`  | boolean    | Перейти к предыдущему шагу             |
| `setStep(n)`  | void       | Перейти к конкретному шагу (начиная с 1)|
| `first()`     | void       | Перейти к первому шагу                 |
| `last()`      | void       | Перейти к последнему шагу              |
| `reset()`     | void       | Сбросить к первому шагу                |

### Проверка состояния

| Метод           | Возвращает | Описание                         |
| --------------- | ---------- | -------------------------------- |
| `canGoNext()`    | boolean    | Можно ли перейти к следующему шагу|
| `canGoPrevious()`| boolean    | Можно ли перейти к предыдущему шагу|

### Свойства

| Свойство     | Возвращает | Описание                              |
| ------------ | ---------- | ------------------------------------- |
| `currentStep`| number     | Номер текущего шага (начиная с 1)     |
| `totalSteps` | number     | Общее количество шагов                |
| `status`     | object     | Объект статуса с информацией о текущем шаге|

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
capsule-stepper-step[status="active"] {
  color: blue;
}

capsule-stepper-step[status="completed"] {
  color: green;
}

capsule-stepper-step[status="inactive"] {
  color: gray;
}
```

## Доступность

- ✅ Автоматические ARIA атрибуты для статуса шага
- ✅ Поддержка навигации с клавиатуры
- ✅ Управление фокусом
- ✅ Семантическая структура для screen readers

