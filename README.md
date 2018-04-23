# openapi-schema

A JSON Schema for OpenAPI Specification. Supports version [3.0.1](https://github.com/OAI/OpenAPI-Specification/blob/master//versions/3.0.1.md).

## Install via NPM

```shell
npm install --save openapi-schema
```

## Usage

Example of OpenAPI specification validation with "[ajv](https://www.npmjs.com/package/ajv)" NPM package:

```javascript
const Ajv = require('ajv');
const schema = require('openapi-schema');

const ajv = new Ajv();
ajv.validate(schema, {
  openapi: '3.0.1',
  info: {
    title: 'Test spec',
    version: '1.0.0'
  }
});
```

## Missing requirements
* [Parameter Object](https://github.com/OAI/OpenAPI-Specification/blob/master//versions/3.0.1.md#parameterObject):
  "explode" – When style is form, the default value is true.
* [Schema Object](https://github.com/OAI/OpenAPI-Specification/blob/master//versions/3.0.1.md#schemaObject):
  "items" – items MUST be present if the type is array.

## License

MIT
