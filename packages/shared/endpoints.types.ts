import { z } from 'zod';

interface Request {
    params: z.ZodTypeAny,
    response: z.ZodTypeAny
}

interface NoBodyRequest {
    method: "GET" | "DELETE"
}
interface BodyRequest {
    method: "POST" | "PUT"
    body: z.ZodTypeAny,
}

type ValidEndpoint = Request & (NoBodyRequest | BodyRequest);
type ValidSub = { readonly sub: readonly Endpoint[] };

export type Endpoint = {
    readonly path: string,
} & Partial<ValidSub> & Partial<ValidEndpoint>

// @ts-ignore
export type RootPath<T extends Endpoint> = T extends ValidEndpoint & ValidSub ? T["path"] | `${T["path"]}/${RootPath<T["sub"][number]>}` : T extends ValidEndpoint ? T["path"] : T extends ValidSub ? `${T["path"]}/${RootPath<T["sub"][number]>}` : "";

export type ValidEndpointFunction<T extends ValidEndpoint> = T extends BodyRequest ? (params: z.infer<T["params"]>, body: z.infer<T["body"]>) => z.infer<T["response"]> : (params: z.infer<T["params"]>) => z.infer<T["response"]>

export type ValidEndpointClient<T extends Endpoint & ValidEndpoint, P extends string> = {
    [key in `${Lowercase<T['method']>}${P}${Capitalize<T["path"]>}`]: ValidEndpointFunction<T>
}
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

export type APIClient<T extends Endpoint, P extends string> = T extends ValidEndpoint & ValidSub ? ValidEndpointClient<T, P> & UnionToIntersection<APIClient<T["sub"][number], `${P}${Capitalize<T["path"]>}`>> : T extends ValidEndpoint ? ValidEndpointClient<T, P> : T extends ValidSub ? UnionToIntersection<APIClient<T["sub"][number], `${P}${Capitalize<T["path"]>}`>> : {};
