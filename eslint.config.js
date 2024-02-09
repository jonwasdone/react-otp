import sheriff from 'eslint-config-sheriff';
import { defineFlatConfig } from 'eslint-define-config';

const sheriffOptions = {
  "react": true,
  "lodash": false,
  "next": false,
  "playwright": false,
  "jest": false,
  "vitest": false
};

export default defineFlatConfig([...sheriff(sheriffOptions)]);