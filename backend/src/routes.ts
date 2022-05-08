import { Router } from "express";
import { NodemailerMailAdapter } from './adapters/nodemailer.ts/nodemailer-mail-adapter'
import { prisma } from './prisma'
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository'
import { SubmitFeedbackUseCase } from './repositories/useCases/submit-feedback-use-case'

const routes = Router();

routes.post("/feedbacks", async (req, res) => {
    const {type, comment, screenshot} = req.body

    try{


    const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
    const nodemailerMailAdapter = new NodemailerMailAdapter()

    const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbacksRepository, nodemailerMailAdapter) 

    await submitFeedbackUseCase.execute({
        type,comment,screenshot
    })



   return res.status(201).send({status: 201, data: {type, comment, screenshot}})
}catch(err){
    console.log(err)
}
})
export default routes;