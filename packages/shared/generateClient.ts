import { APIClient, Endpoint } from "./endpoints.types";

function capitalizeFirstChar(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function generateClient<T extends Endpoint>(router: Endpoint, base: string = ""): APIClient<T, ""> {
    let functions: APIClient<T, ""> = {} as APIClient<T, "">;
    if (router["method"]) {
        const functionName = router["method"].toLowerCase() + "" + capitalizeFirstChar(base) + "" + capitalizeFirstChar(router["path"]);
        if (router["method"] === "GET" || router["method"] === "DELETE") {
            functions = {
                ...functions,
                [functionName]: (params: unknown) => {
                    const parsedParams = router["params"]?.parse(params);
                    console.log(parsedParams);
                }
            }
        } else if (router["method"] === "POST" || router["method"] === "PUT") {
            functions = {
                ...functions,
                [functionName]: (params: unknown, body: unknown) => {
                    const parsedParams = router["params"]?.parse(params);
                    const parsedBody = router["body"]?.parse(body);
                    console.log(parsedParams, parsedBody);
                }
            }
        }
    }

    if (Array.isArray(router["sub"])) {
        router["sub"].forEach((endpoint) => {
            // @ts-ignore
            functions = { ...functions, ...generateClient(endpoint, router["path"]) }
        })
    }

    return functions;
}
