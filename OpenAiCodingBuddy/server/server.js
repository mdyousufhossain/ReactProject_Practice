import  express  from "express";
import * as dotenv from 'dotenv';
import cors from "cors";
import {Configuration , OpenAIApi} from 'openai';

dotenv.config();

const configuration = new Configuration({

    apiKey:process.env.OPEN_API_KEY,
})

const openi = new OpenAIApi(configuration);

const app = express();

app.use(cors())
app.use(express.json());

app.get('/',async(req,res) => {
    res.status(200).send({
        message: 'bla bla ',
    })
})

app.post('/', async (req,res) => {
    try {
        const prompt = req.body.prompt
        const response = await openi.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0.9,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.3,
            presence_penalty: 0,
        })
        res.status(200).send({
            bot:response.data.choices[0].text
        })
    } catch (err){
        console.log(err)
        res.status(500).send({err})

    }
})

app.listen(5000, () => console.log('server started on http://localhost:5000'))
