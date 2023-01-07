import {Endpoint} from "./endpoints.types";

function generateClient<T extends Endpoint>(endpoint: T): T {
    return endpoint
}