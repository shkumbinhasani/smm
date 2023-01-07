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
    readonly path: Lowercase<string>,
} & Partial<ValidSub> & Partial<ValidEndpoint>

// @ts-ignore
export type RootPath<T extends Endpoint> = T extends ValidEndpoint & ValidSub ? T["path"] | `${T["path"]}/${RootPath<T["sub"][number]>}` : T extends ValidEndpoint ? T["path"] : T extends ValidSub ? `${T["path"]}/${RootPath<T["sub"][number]>}` : "";

export type ValidEndpointFunction<T extends ValidEndpoint> = T extends BodyRequest ? (params: z.infer<T["params"]>, body: z.infer<T["body"]>) => z.infer<T["response"]> : (params: z.infer<T["params"]>) => z.infer<T["response"]>

export type ValidEndpointClient<T extends Endpoint & ValidEndpoint, P extends string> = {
    [key in `${Lowercase<T['method']>}${P}${Capitalize<T["path"]>}`]: ValidEndpointFunction<T>
}

export type APIClient<T extends Endpoint, P extends string> = T extends ValidEndpoint & ValidSub ? ValidEndpointClient<T, P> & APIClient<T["sub"][number], Capitalize<T["path"]>> : T extends ValidEndpoint ? ValidEndpointClient<T, P> : T extends ValidSub ? APIClient<T["sub"][number], Capitalize<T["path"]>> : {};


function capitalizeFirstChar(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function generateClient<T extends Endpoint>(router: T, base: string = ""): APIClient<T, ""> {
    let functions: Record<string, (...args: unknown[]) => unknown> = {};
    if (router["method"]) {
        const functionName = router["method"].toLowerCase() + "" + capitalizeFirstChar(base) + "" + capitalizeFirstChar(router["path"]);
        if (router["method"] === "GET" || router["method"] === "DELETE") {
            functions[functionName] = (params) => {
                const parsedParams = router["params"]?.parse(params);
            }
        } else if (router["method"] === "POST" || router["method"] === "PUT") {
            functions[functionName] = (params, body) => {
                const parsedParams = router["params"]?.parse(params);
                const parsedBody = router["body"]?.parse(params);
            }
        }
    }

    if (Array.isArray(router["sub"])) {
        router["sub"].forEach((endpoint) => {
            functions = { ...functions, ...endpoint }
        })
    }

    return functions as APIClient<T, "">;
}

const test = {
    path: "me",
    method: "GET",
    params: z.object({
        id: z.string(),
    }),
    response: z.string(),
    sub: [
        {
            path: "password",
            method: "POST",
            params: z.null(),
            body: z.object({
                oldPassword: z.string(),
                newPassword: z.string(),
                test: z.string(),
            }),
            response: z.string(),
        }
    ] as const
} as const;

const client = generateClient<typeof test>(test);

client.getMe({ id: "123" });
client.postMePassword(null, { oldPassword: "123", newPassword: "123", test: "123" });
