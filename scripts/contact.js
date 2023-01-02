function onFocusin(ring) {
    ring.classList.add('text-input--focus-ring--active');
}

function onFocusout(ring) {
    ring.classList.remove('text-input--focus-ring--active');
}

function validateInput(field) {
    field.ring.classList.remove('text-input--focus-ring--error');
    let valid = true;
    let errorMessage = null;

    field.validators.forEach((validatorCheck) => {
        if (!validatorCheck.fn(field.input.value)) {
            errorMessage = validatorCheck.error;
            valid = false;
        }
    });

    if (!valid) {
        // Show error to user
        field.ring.classList.add('text-input--focus-ring--error');
    }
    return valid;
}

function clearInputValue(field) {
    field.input.value = '';
}

function onChangeInput(field) {
    return () => {
        field.ring.classList.remove('text-input--focus-ring--error');
    };
}

document.addEventListener('DOMContentLoaded', () => {
    // Find text-inputs
    const inputFocusRingContainers = document.querySelectorAll('.text-input--focus-ring-container');    

    inputFocusRingContainers.forEach((ringContainer) => {
        const ring = document.createElement('div');
        ring.classList.add('text-input--focus-ring');

        ringContainer.appendChild(ring);

        ringContainer.addEventListener('focusin', () => onFocusin(ring));
        ringContainer.addEventListener('focusout', () => onFocusout(ring));
    });

    const contactFormName = document.querySelector('#edit-name');
    const contactFormPhone = document.querySelector('#edit-phone-number');
    const contactFormEmail = document.querySelector('#edit-email');
    const contactFormTopic = document.querySelector('#edit-topic');
    const contactFormComment = document.querySelector('#edit-comment');

    const contactFieldsState = {
        name: {
            init() {
                this.input.addEventListener('change', onChangeInput(this));
                this.input.addEventListener('keyup', onChangeInput(this));
            },
            input: contactFormName,
            ring: contactFormName.parentNode.querySelector('.text-input--focus-ring'),
            validate() {
                return validateInput(this);
            },
            validators: [
                {fn: (value) => !validator.isEmpty(value), error: 'required'},
                {fn: (value) => validator.isLength(value.trim(), {min:2}), error: 'minLength2'},
            ],
            clearInput() {
                return clearInputValue(this);
            },
            errorMessages: {
                required: 'Requerido',
                minLength2: 'Longitud mínima 2',
            },
        },
        phone: {
            init() {
                this.input.addEventListener('change', onChangeInput(this));
                this.input.addEventListener('keyup', onChangeInput(this));
            },
            input: contactFormPhone,
            ring: contactFormPhone.parentNode.querySelector('.text-input--focus-ring'),
            validate() {
                return validateInput(this);
            },
            validators: [
                {fn: (value) => !validator.isEmpty(value), error: 'required'},
                {fn: (value) => validator.isMobilePhone(value), error: 'phone'},
            ],
            clearInput() {
                return clearInputValue(this);
            },
            errorMessages: {
                required: 'Requerido',
                phone: 'Teléfono inválido',
            },
        },
        email: {
            init() {
                this.input.addEventListener('change', onChangeInput(this));
                this.input.addEventListener('keyup', onChangeInput(this));
            },
            input: contactFormEmail,
            ring: contactFormEmail.parentNode.querySelector('.text-input--focus-ring'),
            validate() {
                return validateInput(this);
            },
            validators: [
                {fn: (value) => !validator.isEmpty(value), error: 'required'},
                {fn: (value) => validator.isEmail(value), error: 'email'},
            ],
            clearInput() {
                return clearInputValue(this);
            },
            errorMessages: {
                required: 'Requerido',
                email: 'Email inválido',
            },
        },
        topic: {
            init() {
                this.input.addEventListener('change', onChangeInput(this));
            },
            input: contactFormTopic,
            ring: contactFormTopic.parentNode.querySelector('.text-input--focus-ring'),
            validate() {
                return validateInput(this);
            },
            validators: [
                {fn: (value) => !validator.isEmpty(value), error: 'required'},
            ],
            clearInput() {
                return clearInputValue(this);
            },
            errorMessages: {
                required: 'Requerido',
            },
        },
        comment: {
            init() {
                this.input.addEventListener('change', onChangeInput(this));
                this.input.addEventListener('keyup', onChangeInput(this));
            },
            input: contactFormComment,
            ring: contactFormComment.parentNode.querySelector('.text-input--focus-ring'),
            validate() {
                return validateInput(this);
            },
            validators: [
                {fn: (value) => !validator.isEmpty(value), error: 'required'},
            ],
            clearInput() {
                return clearInputValue(this);
            },
            errorMessages: {
                required: 'Requerido',
            },
        },
    };

    const contactForm = document.querySelector('#contact-form');
    if (contactForm !== null) {
        Object.keys(contactFieldsState).forEach(fieldKey => {
            contactFieldsState[fieldKey].init();
        });
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let validForm = true;

            Object.keys(contactFieldsState).forEach(fieldKey => {
                const validField = contactFieldsState[fieldKey].validate();
                validForm = validForm && validField;
            });

            if (validForm) {
                // Loading feedback to user
                Swal.fire({
                    text: 'Estamos enviando tu información...',
                    backdrop: true,
                    showConfirmButton: false,
                    allowOutsideClick: false,
                });
                
                emailjs.sendForm('service_kams2b9', 'template_tdmhlia', '#contact-form')
                .then(() => {
                    // Success feedback to user
                    Object.keys(contactFieldsState).forEach(fieldKey => {
                        contactFieldsState[fieldKey].clearInput();
                    });
                    Swal.close();

                    Swal.fire({
                        title: '¡Éxito!',
                        text: 'Tu información se ha enviado correctamente.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                })
                .catch(() => {
                    // Failure feedback to user
                    Swal.fire({
                        title: '¡Oops!',
                        text: 'Intenta de nuevo.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                });
            }
        });
    }
});
