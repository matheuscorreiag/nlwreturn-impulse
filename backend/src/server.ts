import express from 'express'
import cors from 'cors'
import { NodemailerMailAdapter } from './adapters/nodemailer.ts/nodemailer-mail-adapter'
import { prisma } from './prisma'
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository'
import { SubmitFeedbackUseCase } from './repositories/useCases/submit-feedback-use-case'

const app = express()


app.use(express.json({limit: '50mb'}))
app.use(cors())

app.post("/feedbacks", async (req, res) => {
    const {type, comment, screenshot} = req.body


    const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
    const nodemailerMailAdapter = new NodemailerMailAdapter()

    const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbacksRepository, nodemailerMailAdapter) 

    await submitFeedbackUseCase.execute({
        type,comment,screenshot
    })



   return res.status(201).send({status: 201, data: {type, comment, screenshot}})
})

app.listen(3333, () => {
    console.log("Server started on port 3333")
})