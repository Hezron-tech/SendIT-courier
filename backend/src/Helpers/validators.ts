
import Joi from 'joi'

export const UserSchema= Joi.object({
    username:Joi.string().required(),
    email:Joi.string().required().email(),
    password:Joi.string().required().min(8),
   
})

export  const loginSchemas=Joi.object({
    
    email:Joi.string().required().email(),
    password:Joi.string().required().min(8),
})

export const ParcelSchema= Joi.object({
    
    PackageName:Joi.string().required(),
    senderEmail:Joi.string().required(),
    receiverEmail:Joi.string().required(),
    destination:Joi.string().required(),
    lat:Joi.string().required(),
    long:Joi.string().required(),
    weight:Joi.number().required(),
    price:Joi.number().required(),
    date:Joi.string().required()
})

