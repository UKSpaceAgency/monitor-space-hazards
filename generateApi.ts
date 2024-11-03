import path from 'node:path';

import { generateApi } from 'swagger-typescript-api';

/* NOTE: all fields are optional expect one of `input`, `url`, `spec` */
try {
  await generateApi({
    name: 'mshService',
    typePrefix: 'Type',
    output: path.resolve(process.cwd(), './src/__generated__'),
    templates: path.resolve(process.cwd(), './api-templates'),
    url: `${process.env.NEXT_PUBLIC_API_URL}/openapi.json`,
    modular: true,
    apiClassName: 'MshService',
    extractRequestParams: true,
    generateUnionEnums: true,
  });
} catch (e) {
  console.error(e);
}
