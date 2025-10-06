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

type InferFields<T> = T extends Record<
  string,
  CapsuleValidatorFieldConfig | CapsuleValidatorRule[]
>
  ? { [K in keyof T]: any }
  : CapsuleValidatorValues;

export interface CapsuleValidatorOnSubmitHelpers {
  setErrors: (errors: CapsuleValidatorErrors) => void;
  setFieldError: (field: string, error: string) => void;
  reset: () => void;
}

export interface CapsuleValidatorOnErrorHelpers {
  setErrors: (errors: CapsuleValidatorErrors) => void;
  setFieldError: (field: string, error: string) => void;
}

type InferValues<T> = T extends { fields?: infer F }
  ? F extends Record<string, any>
    ? { [K in keyof F]: any }
    : CapsuleValidatorValues
  : CapsuleValidatorValues;

export interface CapsuleValidatorOptions<T = CapsuleValidatorValues> {
  fields?: Record<
    keyof T,
    CapsuleValidatorFieldConfig | CapsuleValidatorRule[]
  >;
  validateOnInput?: boolean;
  validateOnChange?: boolean;
  bails?: boolean;
  initialValues?: Partial<T>;
  formFieldSelector?: string;
  formMessageSelector?: string;
  onSubmit?: (
    values: T,
    helpers: CapsuleValidatorOnSubmitHelpers
  ) => any | Promise<any>;
  onValidate?: (
    result: CapsuleValidatorValidationResult<T>
  ) => any | Promise<any>;
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

export interface CapsuleValidatorValidationResult<T = CapsuleValidatorValues> {
  valid: boolean;
  errors: CapsuleValidatorErrors;
  values: T;
}

export declare class CapsuleValidator<T = CapsuleValidatorValues> {
  constructor(formSelector: string, options?: CapsuleValidatorOptions<T>);

  form: HTMLFormElement;
  fields: Record<keyof T, CapsuleValidatorFieldConfig | CapsuleValidatorRule[]>;
  options: Required<
    Pick<
      CapsuleValidatorOptions<T>,
      | 'validateOnInput'
      | 'validateOnChange'
      | 'bails'
      | 'initialValues'
      | 'formFieldSelector'
      | 'formMessageSelector'
    >
  > &
    Pick<
      CapsuleValidatorOptions<T>,
      'fields' | 'onSubmit' | 'onValidate' | 'onError' | 'onFieldValidate'
    >;

  setupEventListeners(): void;
  handleSubmit(): Promise<void>;

  validate(): Promise<CapsuleValidatorValidationResult<T>>;

  validateField(
    fieldName: keyof T,
    allValues?: T | null
  ): Promise<CapsuleValidatorFieldValidationResult>;

  getFieldRules(fieldName: keyof T): CapsuleValidatorRule[];

  validateFields(
    ...fieldNames: (keyof T)[]
  ): Promise<CapsuleValidatorValidationResult<T>>;

  validateGroup(
    groupName: string
  ): Promise<CapsuleValidatorValidationResult<T>>;

  getFieldName(fieldElement: Element): keyof T | null;

  displayErrors(errors: CapsuleValidatorErrors): void;
  setFieldError(fieldName: keyof T, error: string): void;
  findFieldByName(fieldName: keyof T): Element | null;
  clearError(fieldName: keyof T): void;

  setValues(values: Partial<T>): void;
  reset(): void;
  getFormData(): T;
  submit(): Promise<void>;
}
