import Joi from "joi";
export const addTaskValidator=Joi.object({
    title:Joi.string().min(3).required(),
    description:Joi.string().min(5).optional(),
    status:Joi.string().optional().valid("pending","in-progress","completed"),
    priority:Joi.string().optional().valid('low','high','medium'),
    dueDate:Joi.date().min("now").optional(),
})