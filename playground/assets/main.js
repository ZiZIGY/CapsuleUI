import { CapsuleValidator } from '../@capsule/modules/form/validator.js';
import { CapsuleRules } from '../@capsule/modules/form/rules.js';
import '../@capsule/modules/form/components/FormField/form-field.js';
import '../@capsule/modules/form/components/FormMessage/form-message.js';

new CapsuleValidator('#form', {
  fields: {
    name: [CapsuleRules.required()],
  },
});
