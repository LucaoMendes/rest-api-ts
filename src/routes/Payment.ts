import { Request, Response, Router } from "express"

const router = Router()

const basePath = "/payment"

router.get(`${basePath}/check`, async (req:Request,res:Response) => {
    return res.json({
        msg: 'ok'
    })
})

export default {
    name: `rt-${basePath}`,
    description: `Realiza as operações da rota ${basePath}`,
    component: router,
    path: __filename
}
