import cors from 'cors'
import morgan from 'morgan'
import express from 'express'
import bodyParser from 'body-parser'

import { version } from '../package.json'
import { DEFAULT_FILE_UPLOAD_SIZE } from './v1/config/constants'

const port = process.env.PORT || 3000
const app = express()

const dateOfBirth = new Date()

app.use(bodyParser.urlencoded({ extended: true, limit: DEFAULT_FILE_UPLOAD_SIZE }))
app.use(bodyParser.json({ limit: DEFAULT_FILE_UPLOAD_SIZE }))
app.use(cors())
app.use(morgan('dev'))
app.use('/health', (req, res) => res.status(200).json({ version, dateOfBirth }))
app.listen(port, () => { })

export default app
