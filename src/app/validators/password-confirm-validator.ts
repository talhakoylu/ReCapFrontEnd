import { AbstractControl } from "@angular/forms";

export class PasswordConfirmValidator {
    static confirmed = (controlName: string, matchingControlName: string) => {
        return (control: AbstractControl) => {
            const input = control.get(controlName);
            const matchingInput = control.get(matchingControlName);

            if (input === null || matchingInput === null) {
                return null;
            }

            if (matchingInput?.errors && !matchingInput.errors.confirmedValidator) {
                return null;
            }

            if (input.value !== matchingInput.value) {
                matchingInput.setErrors({ confirmedValidator: true });
                return ({ confirmedValidator: true });
            } else {
                matchingInput.setErrors(null);
                return null;
            }
        };
    }
}