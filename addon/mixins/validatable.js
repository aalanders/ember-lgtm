import Ember from 'ember';

const reValidate = function (sender, key) {
    // Revalidate if *any* property has errors
    // We only revalidate if there're errors already for the property
    // var errors = this.getWithDefault('errors', {}),
    //     errorProperties = Object.keys(errors),
    //     errorValues = errorProperties.map(function (property) {
    //         return errors[property];
    //     }),
    //     hasErrors = errorValues.any(function (value) {
    //         return !!value;
    //     });
    // if (hasErrors) {

    // Revalidate if *this* key/property has errors
    const errors = this.get('errors') || {};
    if (errors[key]) {
        this.validate(key);
    }
    // consider leaving this responsibility to the component and do it on lostFocus
};

/***
 * Returns a base implementaiton for validation
 * When mixed into a class, you have to build a `validator` like
 * ```
 * validator: LGTM.validator()
 *     .validates('transmissionRegistryId')
 *         .required('You must select a state to register for electronic transmission')
 *     .build()
 * ```
 * We're using LGTM, but the validator could be anything that implements the
 * [validate signature](https://github.com/square/lgtm/wiki/ObjectValidator#validator)
 * returning a Promise
 */
export default Ember.Mixin.create({
    init() {
        this._super();
        const propertiesToValidate = this.validator.attributes();
        this.set('errors', Ember.Object.create());
        propertiesToValidate.forEach(property => {
            this.addObserver(property, this, reValidate);
        });
    },

    validator: null,
    /***
     * Validates based on the rules defined by the validator and sets the errors (if any) into a
     * `errors` hash in the current object.
     * Classes mixing this in, need to implement a `validator` property like:
     * ```
     * validator: LGTM.validator()
     *     .validates('transmissionRegistryId')
     *         .required('You must select a state to register for electronic transmission')
     *     .build()
     * ```
     * @param optionalKey (optional) specify a single key to validate. Otherwise it does a full validation.
     */
    validate(optionalKey) {
        let errors = this.get('errors');
        if (optionalKey) {
            // NOTE: we might need to this for optionalKey's dependents props with validations
            errors.set(optionalKey, undefined);
        } else {
            errors = Ember.Object.create();
        }
        this.set('errors', errors);
        return this.validator.validate(this, optionalKey).then(result => {
            const newErrors = result.errors;
            if (!result.valid) {
                Object.keys(newErrors).forEach(function (errorKey) {
                    const newError = newErrors[errorKey][0];
                    errors.set(errorKey, newError);
                });
            }
            return result.valid;
        });
    }
});
