import { AbstractControl } from "@angular/forms";

export function ExistsInArrayValidator(originalValue: string, controlName: string, values: Array<string>) {
    return (group: AbstractControl) => {
        const control = group.get(controlName);

        if (!control) {
            return null;
        }

        if (control.value.toLocaleUpperCase() === originalValue.toLocaleUpperCase()) {
            if (values.includes(control.value.toLocaleUpperCase())) {
                control.setErrors({ exists: true })
            } else {
                control.setErrors(null);
            }
        } else {
            if (values.includes(control.value.toLocaleUpperCase())) {
                control.setErrors({ exists: true })
            } else {
                control.setErrors(null);
            }
        }

        return null;
    }
}