import '../@capsule/modules/form/components/FormField/form-field.js';
import '../@capsule/modules/form/components/FormMessage/form-message.js';

import { CapsuleRules } from '../@capsule/modules/form/rules.js';
import { CapsuleValidator } from '../@capsule/modules/form/validator.js';

const test = CapsuleValidator('#form', {
  fields: {
    name: [CapsuleRules.required()],
  },
});
