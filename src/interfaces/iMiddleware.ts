import {Router} from "express"

export interface iMiddleware {
    name: string
    description: string
    component: Router
    path: string
}