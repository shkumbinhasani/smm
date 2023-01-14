import { z } from "zod";
import generateClient from "./generateClient";

const root = {
    path: "",
    sub: [
        {
            path: "profile",
            method: "GET",
            params: z.null(),
            response: z.void()
        },
        {
            path: "me",
            method: "GET",
            params: z.null(),
            response: z.void(),
            sub: [
                {
                    path: "account",
                    method: "GET",
                    params: z.null(),
                    response: z.null()
                },
            ]
        }
    ]
} as const


const apiClient = generateClient<typeof root>(root)

apiClient.getMe(null)
