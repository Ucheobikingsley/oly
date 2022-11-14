import { get } from "lodash-es";
import { FormContext } from "vee-validate";

export const createChangeHandler =
  <T extends Record<string, any>>(form: FormContext<T>) =>
  (e: Event): void => {
    const target = e.target as HTMLElement;
    const name = target.getAttribute("name");

    if (name && get(form, `values.${name}`)) {
      form.validateField(name as keyof T);
    }
  };
