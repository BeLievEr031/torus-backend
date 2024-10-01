import { checkSchema } from 'express-validator';

const addTaskValidator = checkSchema({
    title: {
        in: ['body'],
        isString: {
            errorMessage: 'Title must be a string',
        },
        isLength: {
            options: { min: 1 },
            errorMessage: 'Title is required',
        },
        trim: true,
    },
    description: {
        in: ['body'],
        isString: {
            errorMessage: 'Description must be a string',
        },
        isLength: {
            options: { min: 1 },
            errorMessage: 'Description is required',
        },
        trim: true,
    },
    dueDate: {
        in: ['body'],
        isISO8601: {
            errorMessage: 'Due date must be a valid date',
        },
        toDate: true,
        custom: {
            options: (value: string) => {
                if (new Date(value) < new Date()) {
                    throw new Error('Due date must be in the future');
                }
                return true;
            },
        },
    },
    status: {
        in: ['body'],
        isIn: {
            options: [['To Do', 'In Progress', 'Completed']],
            errorMessage: 'Status must be one of "To Do", "In Progress", or "Completed"',
        },
        optional: true
    },
    priority: {
        in: ['body'],
        isIn: {
            options: [['Low', 'Medium', 'High']],
            errorMessage: 'Priority must be one of "Low", "Medium", or "High"',
        },
        optional: true
    },
});

const assignTaskValidator = checkSchema({
    userid: {
        in: ['query'],
        isString: {
            errorMessage: 'Title must be a string',
        },
        isLength: {
            options: { min: 1 },
            errorMessage: 'Title is required',
        },
        trim: true,
    },
    title: {
        in: ['body'],
        isString: {
            errorMessage: 'Title must be a string',
        },
        isLength: {
            options: { min: 1 },
            errorMessage: 'Title is required',
        },
        trim: true,
    },
    description: {
        in: ['body'],
        isString: {
            errorMessage: 'Description must be a string',
        },
        isLength: {
            options: { min: 1 },
            errorMessage: 'Description is required',
        },
        trim: true,
    },
    dueDate: {
        in: ['body'],
        isISO8601: {
            errorMessage: 'Due date must be a valid date',
        },
        toDate: true,
        custom: {
            options: (value: string) => {
                if (new Date(value) < new Date()) {
                    throw new Error('Due date must be in the future');
                }
                return true;
            },
        },
    },
    status: {
        in: ['body'],
        isIn: {
            options: [['To Do', 'In Progress', 'Completed']],
            errorMessage: 'Status must be one of "To Do", "In Progress", or "Completed"',
        },
    },
    priority: {
        in: ['body'],
        isIn: {
            options: [['Low', 'Medium', 'High']],
            errorMessage: 'Priority must be one of "Low", "Medium", or "High"',
        },
    },
});

const paginationValidator = checkSchema({
    // Validate and sanitize page number
    page: {
        in: ['query'],
        isInt: {
            errorMessage: 'Page must be an integer',
        },
        toInt: true, // Convert to integer
        custom: {
            options: (value) => {
                if (value < 1) {
                    throw new Error('Page must be greater than 0');
                }
                return true;
            },
        },
    },

    // Validate and sanitize limit
    limit: {
        in: ['query'],
        isInt: {
            errorMessage: 'Limit must be an integer',
        },
        toInt: true, // Convert to integer
        custom: {
            options: (value) => {
                if (value < 1) {
                    throw new Error('Limit must be greater than 0');
                }
                return true;
            },
        },
    },

    // Validate and sanitize orderBy
    orderBy: {
        in: ['query'],
        isIn: {
            options: [['asc', 'desc']],
            errorMessage: 'Sort direction must be "asc" or "desc"',
        },
        trim: true, // Remove whitespace
    },
});

const updateTaskValidator = checkSchema({
    id: {
        in: ['params'],
        isString: {
            errorMessage: 'Task id must be a string',
        },
        trim: true,
    },

    title: {
        in: ['body'],
        isString: {
            errorMessage: 'Title must be a string',
        },
        isLength: {
            options: { min: 1 },
            errorMessage: 'Title is required',
        },
        trim: true,
    },
    description: {
        in: ['body'],
        isString: {
            errorMessage: 'Description must be a string',
        },
        isLength: {
            options: { min: 1 },
            errorMessage: 'Description is required',
        },
        trim: true,
    },
    dueDate: {
        in: ['body'],
        isISO8601: {
            errorMessage: 'Due date must be a valid date',
        },
        toDate: true,
        custom: {
            options: (value: string) => {
                if (new Date(value) < new Date()) {
                    throw new Error('Due date must be in the future');
                }
                return true;
            },
        },
    },
    status: {
        in: ['body'],
        isIn: {
            options: [['To Do', 'In Progress', 'Completed']],
            errorMessage: 'Status must be one of "To Do", "In Progress", or "Completed"',
        },
        optional: true
    },
    priority: {
        in: ['body'],
        isIn: {
            options: [['Low', 'Medium', 'High']],
            errorMessage: 'Priority must be one of "Low", "Medium", or "High"',
        },
        optional: true
    },
})

const deleteTaskValidator = checkSchema({
    id: {
        in: ['params'],
        isString: {
            errorMessage: 'Task id must be a string',
        },
        trim: true,
    },
})

export { addTaskValidator, paginationValidator, assignTaskValidator, updateTaskValidator, deleteTaskValidator };