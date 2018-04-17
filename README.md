[![Build Status](https://travis-ci.org/practicefusion/ember-lgtm.svg)](https://travis-ci.org/practicefusion/ember-lgtm)

# Ember-lgtm

This ember-cli addon provides a Mixin around [Square's LGTM Validation library](https://github.com/square/lgtm). The mixin follows [recommended validation patterns](http://alistapart.com/article/inline-validation-in-web-forms). This addon also adds a few LGTM helpers to add support for [nested validation](#nested-validation) and registers LGTM to use Ember's [RSVP](http://emberjs.com/api/classes/RSVP.Promise.html)

## Installation in your app

```
ember install ember-lgtm
```

### Usage

In your component or model class, where you will add your validation, simply include the Validatable Mixin and provide a validator object. See the example below:

```
import LGTM from 'lgtm';
import Validatable from 'ember-lgtm/mixins/validatable';

Ember.Component.extend(Validatable, {
    validator: LGTM.validator()
        .validates('email')     // Name of your property
        .required('Email address is required')
        .email('Enter a valid email')
        .build(),
    actions: {
        save() {
            this.validate().then(isValid => {
                if (isValid) {
                    // Perform the actual save
                }
            })
        }
    }
    // Other code...
});
```

Then in your template, you have access to an errors array for each validated property.

```
<label>Email:</label>
{{input value=email class=(if errors.email "error")}}
<span class="error">{{errors.email}}</span>
<button onclick={{action "save"}}>Save</button>
```

### Behavior

When the properties are in an valid state (initial), the validation won't be triggered. This leads to a better UX since the user doesn't want to see errors while he's in the middle of typing something that will likely turn something from invalid to valid. However, if a property is already in an invalid state, it will be re-validated when the property changes. This is also known as inline validation and is useful to provide immediate feedback when somethings goes from invalid to valid.

### <a name="nested-validation"></a> Nested validation

ember-lgtm also adds two LGTM helpers to add support for nested validations for objects and arrays.

#### isValid
Validates a validatable object. A validatable object is anything with a `validate` function returning a boolean promise (like the mixin mixin/validatable)

In this example, the property `billingAddress` contains an address object that implements a `validate` function to validate the individual properties of the address. The parent object only checks the overall validity of the object, rather than each individual field.

```
validator: LGTM.validator()
    .validates('fullName')
        .required('Full name is required')
    .validates('billingAddress')
        .isValid()
    .build()
```

#### allAreValid
Validates all validatable objects in the array are valid. A validatable object is anything with a `validate` function returning a boolean promise (like the mixin mixin/validatable).

This functions like `isValid`, except that the validated property should be an array of validatable objects, which must all be valid in order for this validator function to return true.

```
validator: LGTM.validator()
    .validates('arrayOfAddresses')
        .allAreValid()
    .build()
```

You can create your own [Custom Helpers](https://github.com/square/lgtm/wiki/Custom-Helpers) by using `LGTM.helpers.register` directly.

### Server side validation

LGTM uses Promises and this addon configures it to use the same RSVP library that Ember uses. When doing server side validation, the `validate` function returns a Promise and each validation registered either return immediately or return a promise. LGTM will execute all the promises in parallel and wait for all the validation logic to complete before returning the validation information.

### LGTM

LGTM is a simple JavaScript library for validating objects and collecting error messages. It leaves the display, behavior, and error messages in your hands, focusing on letting you describe your validations cleanly and concisely for whatever environment you're using.

You can find more about it on the [LGTM Wiki](https://github.com/square/lgtm/wiki) that includes an [API Reference](https://github.com/square/lgtm/wiki/API-Reference) and information about how to create [Custom Helpers](https://github.com/square/lgtm/wiki/Custom-Helpers)

## Samples

### Running samples locally

* `git clone https://github.com/practicefusion/ember-lgtm`
* `yarn`
* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200) will show the demo app.

## Running tests

* `ember test`
* `ember test --server`

## More

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
