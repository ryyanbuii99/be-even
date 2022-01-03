import express, { Application, Request, Response } from "express";
import dotenv from 'dotenv'
import http from 'http'
import cors from 'cors'

export const main = async () => {
    dotenv.config()
    
    const app = express()
    const server = http.createServer(app)

    app.use(cors())
    app.use(express.json())

    server.listen(process.env.PORT, () => {
        console.log(`Server running at port ${process.env.PORT}`)
        console.log(`Press Ctrl-C to terminate...`)
    })
}

main().catch(console.error)