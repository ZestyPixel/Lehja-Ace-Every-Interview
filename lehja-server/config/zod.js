const z = require('zod');

const check = z.object({
    name: z.string().trim().min(2, "Name must be at least 3 characters long !!"),
    email: z.string().trim().email("Invalid email format"),
    password: z.string().trim().min(5, "Password must be at least 6 characters long"),
})

module.exports = check;