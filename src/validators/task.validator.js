import Joi from "joi";
export const addTaskValidator=Joi.object({
    title:Joi.string().min(3).required(),
    description:Joi.string().min(5).optional(),
    status:Joi.string().optional().valid("pending","in-progress","completed"),
    priority:Joi.string().optional().valid('low','high','medium'),
    dueDate:Joi.date().min("now").iso().optional(),
})
export const updateTaskValidator=Joi.object({
    title:Joi.string().min(3).optional(),
    description:Joi.string().trim().min(5).max(200),
    status:Joi.valid("pending","in-progress","completed"),
    priority:Joi.valid('low','high','medium'),
    dueDate:Joi.date().min("now").iso().optional(),
}).min(1)

export const getAllTasksValidator=Joi.object({
    status:Joi.string().optional().valid("pending","in-progress","completed"),
    priority:Joi.string().optional().valid('low','high','medium'),
    page:Joi.number().min(1).integer().default(1),
    limit:Joi.number().min(1).integer().optional().default(5),
    search:Joi.string().trim().max(200).optional(),
    sortBy:Joi.string().trim().valid('createdAt','updatedAt','title','priority','dueDate').default('createdAt'),
    order:Joi.string().trim().valid('asc','desc').default('desc'),
})

export const taskIdValidator = Joi.object({
    id: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)   
        .required()
        .messages({
            "string.pattern.base": "Invalid task ID"
        })
});