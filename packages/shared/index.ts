import { z } from "zod";
import generateClient from "./generateClient";

const userObject = z.object({
    id: z.number(),
    fullName: z.string().min(2).max(50),
    profilePicture: z.string().url(),
    country: z.string().length(2)
})

const usersApi = {
    path: "users",
    sub: [
        {
            path: "",
            method: "POST",
            params: z.null(),
            body: userObject.omit({
                id: true
            }),
            response: userObject
        },
        {
            path: "",
            method: "PUT",
            params: z.null(),
            body: userObject.omit({
                id: true
            }).partial(),
            response: userObject
        },
        {
            path: "",
            method: "GET",
            params: z.null(),
            response: userObject
        }
    ]
} as const

const root = {
    path: "api",
    sub: [
        usersApi
    ]
} as const

export const apiClient = generateClient<typeof root>(root)

export const variables = {
    siteName: "SocialMediaManager"
}