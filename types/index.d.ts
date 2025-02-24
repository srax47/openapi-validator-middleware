// TypeScript Version: 3.2

/**
 * Initialize the input validation middleware by
 * providing it with the swagger file path and
 * configuration options. This function should be called
 * before using `validate` middleware.
 */
declare function init(schemaPath: string, options?: ajvValidatorOptions): void;
declare function init(jsonSchema: Record<string, any>, options?: ajvValidatorOptions): void;
export { init };
export { initAsync };
export { validate };
export { getNewMiddleware };

/**
 * Initialize the input validation middleware by
 * providing it with the swagger file path and
 * configuration options. This function should be called
 * and awaited before using `validate` middleware.
 * This init variant support loading of external references.
 */
declare function initAsync(schemaPath: string, options?: ajvValidatorOptions): Promise<void>;
declare function initAsync(jsonSchema: Record<string, any>, options?: ajvValidatorOptions): Promise<void>;

/**
 * Middleware that validates the request against the swagger
 * file, according to the request method and route
 */
declare function validate(ctx: LambdaOptions): Promise<void>; // lambda
declare function validate(ctx: Record<string, any>, next: Function): Promise<void>; // koa
declare function validate(req: Record<string, any>, res: Record<string, any>, next: Function): void; // express

export class InputValidationError extends Error {
    errors: Array<ErrorDetails | string>;

    constructor(errors: Array<ErrorDetails>, options?: inputValidationOptions)
}

export interface ErrorDetails {
    dataPath: string;
    keyword: string;
    message: string;
    params: Record<string, any>;
    schemaPath: string;
}

export type frameworks = 'koa' | 'express' | 'lambda';

export interface format {
    name: string;
    pattern: RegExp | string;
}

export interface LambdaOptions {
    httpMethod: 'get' | 'put' | 'post' | 'delete'
    query?: Record<string, unknown>
    body?: Record<string, unknown>
    params?: Record<string, unknown>
    headers?: Record<string, string>
}

export interface ajvValidatorOptions {
    ajvConfigBody?: Record<string, any>;
    ajvConfigParams?: Record<string, any>;
    beautifyErrors?: boolean;
    contentTypeValidation?: boolean;
    errorFormatter?: (errors: Array<ErrorDetails>, options: ajvValidatorOptions) => Error;
    expectFormFieldsInBody?: boolean;
    firstError?: boolean;
    framework?: frameworks;
    formats?: Array<format>;
    keywords?: any;
    makeOptionalAttributesNullable?: boolean;
    skipOAIValidation?: boolean
    dereferenced?: boolean
    allowQueryAdditionalProperties?: boolean
}

export interface inputValidationOptions {
    beautifyErrors?: boolean;
    firstError?: boolean;
}

// eslint-disable-next-line no-unused-vars
declare class MiddlewareClass {
    InputValidationError: InputValidationError;

    init(schemaPath: string, options?: ajvValidatorOptions): void;
    // eslint-disable-next-line no-dupe-class-members
    init(jsonSchema: Record<string, any>, options?: ajvValidatorOptions): void;
    initAsync(schemaPath: string, options?: ajvValidatorOptions): Promise<void>;
    // eslint-disable-next-line no-dupe-class-members
    initAsync(jsonSchema: Record<string, any>, options?: ajvValidatorOptions): Promise<void>;

    validate(ctx: LambdaOptions): void; // lambda
    // eslint-disable-next-line no-dupe-class-members
    validate(ctx: Record<string, any>, next: Function): void; // koa
    // eslint-disable-next-line no-dupe-class-members
    validate(req: Record<string, any>, res: Record<string, any>, next: Function): void; // express
}

declare function getNewMiddleware(schemaPath: string, options?: ajvValidatorOptions): MiddlewareClass;
