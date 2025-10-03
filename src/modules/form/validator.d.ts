export type CapsuleValidatorValues = Record<string, any>;
export type CapsuleValidatorErrors = Record<string, string>;

export type CapsuleValidatorRule = (
  value: any,
  allValues: CapsuleValidatorValues
) => string | void | Promise<string | void>;

export interface CapsuleValidatorFieldConfig {
  rules?: CapsuleValidatorRule[];
  group?: string;
}

export type CapsuleValidatorFields = Record<
  string,
  CapsuleValidatorFieldConfig | CapsuleValidatorRule[]
>;

export interface CapsuleValidatorOnSubmitHelpers {
  setErrors: (errors: CapsuleValidatorErrors) => void;
  setFieldError: (field: string, error: string) => void;
  reset: () => void;
}

export interface CapsuleValidatorOnErrorHelpers {
  setErrors: (errors: CapsuleValidatorErrors) => void;
  setFieldError: (field: string, error: string) => void;
}

export interface CapsuleValidatorOptions {
  fields?: CapsuleValidatorFields;
  validateOnInput?: boolean;
  validateOnChange?: boolean;
  bails?: boolean;
  initialValues?: CapsuleValidatorValues;
  formFieldSelector?: string;
  formMessageSelector?: string;
  onSubmit?: (
    values: CapsuleValidatorValues,
    helpers: CapsuleValidatorOnSubmitHelpers
  ) => any | Promise<any>;
  onValidate?: (result: CapsuleValidatorValidationResult) => any | Promise<any>;
  onError?: (
    errors: CapsuleValidatorErrors,
    helpers: CapsuleValidatorOnErrorHelpers
  ) => any | Promise<any>;
  onFieldValidate?: (
    field: string,
    result: CapsuleValidatorFieldValidationResult
  ) => any | Promise<any>;
}

export interface CapsuleValidatorFieldValidationResult {
  valid: boolean;
  errors: string[];
}

export interface CapsuleValidatorValidationResult {
  valid: boolean;
  errors: CapsuleValidatorErrors;
  values: CapsuleValidatorValues;
}

export declare class CapsuleValidator {
  constructor(formSelector: string, options?: CapsuleValidatorOptions);

  form: HTMLFormElement;
  fields: CapsuleValidatorFields;
  options: Required<
    Pick<
      CapsuleValidatorOptions,
      | 'validateOnInput'
      | 'validateOnChange'
      | 'bails'
      | 'initialValues'
      | 'formFieldSelector'
      | 'formMessageSelector'
    >
  > &
    Pick<
      CapsuleValidatorOptions,
      'fields' | 'onSubmit' | 'onValidate' | 'onError' | 'onFieldValidate'
    >;

  setupEventListeners(): void;
  handleSubmit(): Promise<void>;

  validate(): Promise<CapsuleValidatorValidationResult>;

  validateField(
    fieldName: string,
    allValues?: CapsuleValidatorValues | null
  ): Promise<CapsuleValidatorFieldValidationResult>;

  getFieldRules(fieldName: string): CapsuleValidatorRule[];

  validateFields(
    ...fieldNames: string[]
  ): Promise<CapsuleValidatorValidationResult>;

  validateGroup(groupName: string): Promise<CapsuleValidatorValidationResult>;

  getFieldName(fieldElement: Element): string | null;

  displayErrors(errors: CapsuleValidatorErrors): void;
  setFieldError(fieldName: string, error: string): void;
  findFieldByName(fieldName: string): Element | null;
  clearError(fieldName: string): void;

  setValues(values: CapsuleValidatorValues): void;
  reset(): void;
  getFormData(): CapsuleValidatorValues;
  submit(): Promise<void>;
}
