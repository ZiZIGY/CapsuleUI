# Модуль Form

Комплексный модуль валидации форм, который предоставляет управление полями, правила валидации и обработку ошибок для ваших форм.

## Установка

```bash
npx @zizigy/capsule module add form
```

Это добавит модуль Form в директорию `@capsule/modules/form` и автоматически импортирует его в главный файл `@capsule/index.js`.

## Быстрый старт

Модуль Form состоит из трех основных частей:

1. **CapsuleValidator** - Основной класс валидации
2. **CapsuleRules** - Предустановленные правила валидации
3. **Компоненты формы** - Веб-компоненты `form-field` и `form-message`

## Базовый пример

```html
<form id="myForm">
  <form-field>
    <label for="email">Email</label>
    <input
      type="email"
      id="email"
      name="email"
      required
    />
    <form-message></form-message>
  </form-field>

  <form-field>
    <label for="password">Пароль</label>
    <input
      type="password"
      id="password"
      name="password"
      required
    />
    <form-message></form-message>
  </form-field>

  <button type="submit">Отправить</button>
</form>

<script type="module">
  import {
    CapsuleValidator,
    CapsuleRules,
  } from '@capsule/modules/form/index.js';

  const validator = new CapsuleValidator('#myForm', {
    fields: {
      email: [CapsuleRules.required(), CapsuleRules.email()],
      password: [
        CapsuleRules.required(),
        CapsuleRules.min(8, 'Пароль должен быть не менее 8 символов'),
      ],
    },
    onSubmit: async (values) => {
      console.log('Форма отправлена со значениями:', values);
      // Обработка отправки формы
    },
  });
</script>
```

## Компоненты формы

### form-field

Компонент-обертка, который управляет состояниями ошибок для полей формы.

```html
<form-field>
  <label for="username">Имя пользователя</label>
  <input
    type="text"
    id="username"
    name="username"
  />
  <form-message></form-message>
</form-field>
```

**Атрибуты:**

- Автоматически получает класс ошибки при неудачной валидации

**Методы:**

- `setError(message)` - Установить сообщение об ошибке на поле
- Автоматически управляет классами состояния ошибки

### form-message

Компонент для отображения сообщений об ошибках валидации.

```html
<form-message></form-message>
```

**Методы:**

- `setMessage(message)` - Показать сообщение об ошибке
- `clearMessage()` - Очистить сообщение об ошибке

## Правила валидации

Класс `CapsuleRules` предоставляет множество предустановленных правил валидации:

### Базовые правила

```javascript
// Обязательное поле
CapsuleRules.required('Это поле обязательно');

// Валидация email
CapsuleRules.email('Пожалуйста, введите действительный email');

// Минимальная длина
CapsuleRules.min(8, 'Должно быть не менее 8 символов');

// Максимальная длина
CapsuleRules.max(100, 'Должно быть менее 100 символов');
```

### Правила для строк

```javascript
// Валидация URL
CapsuleRules.url('Пожалуйста, введите действительный URL');

// Номер телефона
CapsuleRules.phone('Пожалуйста, введите действительный номер телефона');

// Сила пароля
CapsuleRules.password(
  'Пароль должен содержать не менее 8 символов с буквами и цифрами'
);

// Сопоставление с паттерном
CapsuleRules.pattern(/^[А-Я]/, 'Должно начинаться с заглавной буквы');

// Только буквы и цифры
CapsuleRules.alphaNumeric('Разрешены только буквы и цифры');
```

### Правила для чисел

```javascript
// Минимальное значение
CapsuleRules.minValue(0, 'Должно быть не менее 0');

// Максимальное значение
CapsuleRules.maxValue(100, 'Должно быть не более 100');

// Между значениями
CapsuleRules.between(1, 100, 'Должно быть между 1 и 100');

// Целое число
CapsuleRules.integer('Должно быть целым числом');

// Положительное число
CapsuleRules.positive('Должно быть положительным числом');
```

### Пользовательские правила

```javascript
// Пользовательская функция валидации
const customRule = (value) => {
  if (value === 'forbidden') {
    return 'Это значение не разрешено';
  }
  return true; // Валидно
};

// Использование в валидаторе
fields: {
  customField: [customRule],
}
```

## Полный пример

```html
<!DOCTYPE html>
<html>
  <head>
    <link
      rel="stylesheet"
      href="@capsule/global.css"
    />
    <script
      type="module"
      src="@capsule/index.js"
    ></script>
  </head>
  <body>
    <form id="registrationForm">
      <form-field>
        <label for="name">Полное имя</label>
        <input
          type="text"
          id="name"
          name="name"
        />
        <form-message></form-message>
      </form-field>

      <form-field>
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
        />
        <form-message></form-message>
      </form-field>

      <form-field>
        <label for="password">Пароль</label>
        <input
          type="password"
          id="password"
          name="password"
        />
        <form-message></form-message>
      </form-field>

      <form-field>
        <label for="confirmPassword">Подтвердите пароль</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
        />
        <form-message></form-message>
      </form-field>

      <button type="submit">Зарегистрироваться</button>
    </form>

    <script type="module">
      import {
        CapsuleValidator,
        CapsuleRules,
      } from '@capsule/modules/form/index.js';

      const validator = new CapsuleValidator('#registrationForm', {
        fields: {
          name: [
            CapsuleRules.required('Имя обязательно'),
            CapsuleRules.min(2, 'Имя должно быть не менее 2 символов'),
          ],
          email: [
            CapsuleRules.required('Email обязателен'),
            CapsuleRules.email('Пожалуйста, введите действительный email'),
          ],
          password: [
            CapsuleRules.required('Пароль обязателен'),
            CapsuleRules.min(8, 'Пароль должен быть не менее 8 символов'),
            CapsuleRules.password('Пароль должен содержать буквы и цифры'),
          ],
          confirmPassword: [
            CapsuleRules.required('Пожалуйста, подтвердите пароль'),
            CapsuleRules.match('password', 'Пароли не совпадают'),
          ],
        },
        validateOnInput: true,
        onSubmit: async (values, { reset, setErrors, setFieldError }) => {
          try {
            const response = await fetch('/api/register', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(values),
            });

            if (!response.ok) {
              const errors = await response.json();
              setErrors(errors);
              return;
            }

            alert('Регистрация успешна!');
            reset();
          } catch (error) {
            setFieldError(
              'email',
              'Ошибка сети. Пожалуйста, попробуйте снова.'
            );
          }
        },
      });
    </script>
  </body>
</html>
```

## Справочник API

### CapsuleValidator

#### Конструктор

```javascript
new CapsuleValidator(formSelector, options);
```

- `formSelector` - CSS селектор для элемента формы
- `options` - Объект конфигурации

#### Методы

- `validate()` - Валидировать все поля, возвращает `Promise<{valid: boolean, values: object, errors: object}>`
- `validateField(fieldName)` - Валидировать одно поле
- `setFieldError(fieldName, message)` - Установить сообщение об ошибке для поля
- `clearError(fieldName)` - Очистить ошибку для поля
- `displayErrors(errors)` - Отобразить несколько ошибок сразу
- `setValues(values)` - Установить значения формы программно
- `getValues()` - Получить текущие значения формы
- `reset()` - Сбросить форму в начальное состояние

## Стилизация

Вы можете стилизовать состояния ошибок с помощью CSS:

```css
form-field.error input {
  border-color: var(--capsule-color-error);
}

form-message {
  color: var(--capsule-color-error);
  font-size: var(--capsule-font-size-sm);
  margin-top: 0.25rem;
}
```
