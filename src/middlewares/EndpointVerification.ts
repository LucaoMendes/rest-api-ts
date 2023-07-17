import { NextFunction, Request, Response, Router } from "express"
import Logger from "../utils/Logger"

const router = Router()

router.get('*', (req:Request,res:Response,next:NextFunction) => {
    
    res.header("Access-Control-Allow-Origin", "*")
    const address = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
    Logger.send(`${req.url} - IP: ${address}`)

    next()
})

export default {
    name: 'md-endpoint-verification',
    description: 'Verifica restrições do endpoint solicitado',
    component: router,
    path: __filename
}
