import { AbstractControl } from "@angular/forms";

export function ExistsInArrayValidator(controlName: string, values: Array<string>) {
    return (group: AbstractControl) => {
        const control = group.get(controlName);

        if (!control) {
            return null;
        }

        if (values.includes(control.value)) {
            control.setErrors({ exists: true })
        } else {
            control.setErrors(null);
        }

        return null;
    }
}