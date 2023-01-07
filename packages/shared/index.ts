import { z } from "zod";
import {RootPath} from "./endpoints.types";
import { F } from "ts-toolbelt"

const profileObject = z.object({
    id: z.string().uuid(),
    fullName: z.string(),
    email: z.string().email(),
    profilePicture: z.string().url(),
})

const root = {
    path: "",
    sub: [
        {
            path: "profile",
            method: "GET",
            params: z.never(),
            response: z.never()
        },
        {
            path: "me",
            method: "GET",
            params: z.never(),
            response: z.never(),
            sub: [
                {
                    path: "account",
                    method: "GET",
                    params: z.never(),
                    response: z.never()
                },
            ]
        }
    ]
} as const

const url: RootPath<typeof root> = "/profile"


console.log(url)