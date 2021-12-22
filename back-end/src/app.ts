import { PrismaClient } from "@prisma/client";
import express from 'express'
import config from 'dotenv'
import cors from 'cors'
import Schema, { Type, string, number } from "computed-types";

const prisma = new PrismaClient()
const app = express()

config.config()

app.use(express.json())
app.use(cors())

// Antique Schema for strict types
const AntiqueSchema = Schema({
    name: string,
    description: string,
    worth: number.gt(0).integer()
})

type Antique = Type<typeof AntiqueSchema>

const validator = AntiqueSchema.destruct()

// Get all antiques
app.get('/all-antiques',async (req, res) => {
    const antiques = await prisma.antique.findMany()

    res.json({
        success: true,
        payload: antiques,
        message: "Operation Successful"
    })
})

// Get one antique
app.get('/antique-detail/:id',async (req, res) => {
    
    const { id } = req.params
    const antique = await prisma.antique.findUnique({    
        where:{
            id: parseInt(id)
        }
    })
    if(!antique){
        res.status(404)
        return res.json({
            success: false,
            payload: null,
            message: `Antique with id "${req.params.id}" Not Found`
        })    
    }
    res.json({
        success: true,
        payload: antique,
        message: "Operation Successful"
    })
})

// Create an antique
app.post('/create-antique',async (req, res) => {
    const [err, antiqueItem] = validator({
        name:req.body.name,
        description:req.body.description,
        worth: req.body.worth
    })

    if(!err){
        const newAntique = await prisma.antique.create({
            data: {...req.body}
        })
        
        res.json({
            success: true,
            payload: newAntique
        })
    }else{
        res.status(400)
        
        res.json({
            success: false,
            payload: err
        })
    }
})

// Update an antique
app.put('/edit-antique/:id', async (req, res) => {
    const { id } = req.params
    
    const antique = await prisma.antique.findUnique({    
        where:{
            id: parseInt(id)
        }
    })
    if(!antique){
        res.status(404)
        return res.json({
            success: false,
            payload: null,
            message: `Antique with id "${req.params.id}" Not Found`
        })    
    }
    
    if(req.body.hasOwnProperty('name')){
        antique.name = req.body.name
    }
    if(req.body.hasOwnProperty('description')){
        antique.description = req.body.description
    }
    if(req.body.hasOwnProperty('worth')){
        antique.worth = parseInt(req.body.worth)
    }
    const [err, antiqueItem] = validator({
        name:req.body.name,
        description:req.body.description,
        worth: req.body.worth
    })

    if(!err){
        const updatedAntique = await prisma.antique.update({
            where:{
                id: parseInt(id)
            },
            data:{
                ...antique
            }
        })

        res.json({
            success: true,
            payload: updatedAntique
        })
    }else{
        res.status(400)
        
        res.json({
            success: false,
            payload: err
        })
    }

})


app.delete('/delete-antique/:id', async (req, res) => {
    const { id } = req.params
    try{

        const antique = await prisma.antique.delete({
            where:{
                id: parseInt(id) 
            }
        })

        res.json({
            success: true,
            payload: antique,
            message: "Deleted successfully"
        })
    }catch{
        
        res.status(404)
        return res.json({
            success: false,
            payload: null,
            message: `Antique with id "${req.params.id}" Not Found`
        })   
    }
})


app.use((req, res, next) => {
    res.status(404)
    return res.json({
        success: false,
        payload: null,
        message: `Endpoint Not Found ${req.path}`
    })
})

const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Server running at ${PORT}`))

