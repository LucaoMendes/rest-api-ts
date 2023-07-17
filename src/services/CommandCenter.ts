import { iMiddleware } from "../interfaces/iMiddleware"
import express from "express"
import compression from "compression"
import Logger, { LogType } from "../utils/Logger"
import * as dotenv from 'dotenv'
import cors from 'cors'
import { iRouter } from "../interfaces/iRouter"

export class CommandCenter {
    private static middlewares:iMiddleware[] = []
    private static routes:iRouter[] = []
    private static expressApp = express()

    static status: 'stopped' | 'running' = 'stopped'


    public static init(){
        dotenv.config()
        const port = process.env.PORT || 3000

        this.expressApp.use(express.json())
        this.expressApp.use(compression())
        this.expressApp.use(cors({
            origin: process.env.CORS_ORIGIN || '*',
        }))

        this.recognizeComponents()

        this.expressApp
            .listen(port, () => Logger.send('Iniciando API'))
            .on('error', (err) => Logger.send(`Erro ao inicializar API: ${err}`, LogType.ERROR))
            .on('listening', () =>{
                this.status = 'running'
                Logger.send(`API inicializado na porta ${port}`)
            })
    }

    private static recognizeComponents(){

        if(!this.middlewares.length) throw new Error('No middlewares registered')
        if(!this.routes.length) throw new Error('No routes registered')

        this.middlewares.forEach(middleware => {
            Logger.send(`Middleware ${middleware.name} registrado`)
            this.expressApp.use(middleware.component)
        })

        this.routes.forEach(route => {
            Logger.send(`Rota ${route.name} registrada`)
            this.expressApp.use(route.component)
        })

    }

    public static registerMiddleware(middleware:iMiddleware){

        if(!middleware.name) throw new Error('Middleware name not defined')
        if(!middleware.description) throw new Error('Middleware description not defined')
        if(!middleware.component) throw new Error('Middleware component not defined')

        this.middlewares.push(middleware)
    }

    public static registerRoute(route:iRouter){

        if(!route.name) throw new Error('Route name not defined')
        if(!route.description) throw new Error('Route description not defined')
        if(!route.component) throw new Error('Route component not defined')

        this.routes.push(route)
    }
}