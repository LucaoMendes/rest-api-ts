import {Router} from "express"

export interface iRouter {
    name: string
    description: string
    component: Router
    path: string
}