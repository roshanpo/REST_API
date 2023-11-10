const yup = require('yup');
const schemaValidation = {};


schemaValidation.newUserSchema = yup.object({
    body: yup.object({
        username: yup.string().required('Username is required'),
        password: yup.string().required('Password is required'),
        email: yup.string().email('Invalid email').required('Email is required'),
    }),
})

schemaValidation.updateUserSchema = yup.object({
    params: yup.object({
        id: yup.string().uuid('Invalid Id').required('Id is required'),
    }),
    body: yup.object({
        username: yup.string().optional('Username is required'),
        email: yup.string().optional('Email is required'),
    }),
});

schemaValidation.idValidationSchema = yup.object({
    params: yup.object({
        id: yup.string().uuid('Invalid Id').required('Id is required'),
    })
});


module.exports = schemaValidation;