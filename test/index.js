const Ajv = require('ajv');
const path = require('path');
const fs = require('fs');
const parser = require('json-schema-ref-parser');
const schema = require('../schema.json');

const ajv = new Ajv({
  allErrors: true,
  verbose: true,
});

const getSpecs = () => {
  const dir = path.join(__dirname, 'specs');
  return fs.readdirSync(dir).map(spec => path.join(dir, spec));
};

const valiadateSpec = spec => {
  return parser.bundle(spec).then(specData => {
    const isValid = ajv.validate(schema, specData);

    if (isValid) {
      console.log(`"${path.basename(spec)}" is valid OpenAPI document.\n`);
    } else {
      let error = `Validation errors for "${path.basename(spec)}":\n`;

      ajv.errors.forEach(({ keyword, dataPath, message, data }) => {
        error += `[keyword] ${keyword}: ${message}\n[data] ${JSON.stringify(data)}\n[path] ${dataPath}\n\n`;
      });

      throw new Error(error);
    }
  });
};

const main = () => {
  return Promise
    .all(getSpecs().map(valiadateSpec))
    .catch(error => {
      console.error(error.message || error);
    });
};

main();
