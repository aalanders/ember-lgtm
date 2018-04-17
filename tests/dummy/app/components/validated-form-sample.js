import Component from '@ember/component';
import LGTM from 'lgtm';
import Validatable from 'ember-lgtm/mixins/validatable';

export default Component.extend(Validatable, {
    resultMessage: null,
    validator: LGTM.validator()
        .validates('email')     // Name of your property
        .required('Email address is required')
        .email('Enter a valid email')
        .build(),
    actions: {
        save() {
            this.set('resultMessage', null);
            this.validate().then(isValid => {
                if (isValid) {
                    // Perform the actual save
                    this.set('resultMessage', 'Form saved');
                }
            });
        }
    }
    // Other code...
});
