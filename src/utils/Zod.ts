import { z } from 'zod';

export const transformZodErrors = (error: z.ZodError) => {
  return error.issues.map(issue => ({
    path: issue.path.join('.'),
    message: issue.message,
  }));
};

export function getZodEnumFromObjectKeys<TI extends Record<string, any>, R extends string = TI extends Record<infer R, any> ? R : never>(input: TI, params: z.RawCreateParams): z.ZodEnum<[R, ...R[]]> {
  const [firstKey, ...otherKeys] = Object.keys(input) as [R, ...R[]];
  return z.enum([firstKey, ...otherKeys], params);
}
