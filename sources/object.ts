import { Types } from "@nikonov-alex/functional-library";

export type NonEmptyArray<T> = [ T, ...T[] ];

export const hasProp = <O extends { [p: string]: any }, P extends string>( obj: O, prop: P ): obj is O & Record<P, any>  =>
    prop in obj && obj[prop] !== undefined;

export const hasArray = <O extends { [p: string]: any }, R>( obj: O, name: string, callback: { ( array: NonEmptyArray<unknown> ): R } ): Types.Maybe<R> =>
    !hasProp( obj, name ) || !Array.isArray( obj[name] ) || 0 === obj[name].length
        ? false
        : callback( obj[name] as NonEmptyArray<unknown> );

export const isObject = ( value: unknown ): value is { [k: string]: any } =>
    typeof value === "object" && value !== null;

export const append = <A extends { [k: string]: any }, B extends { [k: string]: any }>( a: A, b: B ): A & B =>
    Object.keys( b ).reduce(
        ( a, prop ) =>
            a[prop] === b[prop]
                ? a
                : { ... a, [prop]: b[prop] },
        a
    ) as A & B;