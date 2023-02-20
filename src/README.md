## Use cases / Interactors 

From there to ViewModel we only return validations or submission errors.

## Error handling

Ts does not support custom error types in Promise.reject, so we use classes to adjust errors for every layer 