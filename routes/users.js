const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const yupValidation = require('../middleware/yupValidation');
const schemaValidation = require('../controllers/userValidator');
const basicAuth = require('../middleware/basicAuth');

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve all users
 *     description: Get a list of all users from the database.
 *     responses:
 *       '200':
 *         description: A successful response with an array of users.
 *         content:
 *           application/json:
 *             example:
 *               - user_id: 1234abcd-5678efgh-9012ijkl
 *                 username: john_doe
 *                 email: john@example.com
 *               - user_id: 5678efgh-9012ijkl-1234abcd
 *                 username: jane_doe
 *                 email: jane@example.com
 *       '500':
 *         description: Internal server error.
 */

/**
/* GET users listing. */
router.get('/', userController.getUsers);



/**
 * @swagger
 * /new:
 *   post:
 *     summary: Add a new user
 *     description: Create a new user with the provided information.
 *     requestBody:
 *       description: User information to be added.
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             username: new_user
 *             email: new_user@example.com
 *             password: securepassword
 *     responses:
 *       '201':
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             example:
 *               user_id: 9012ijkl-1234abcd-5678efgh
 *               username: new_user
 *               email: new_user@example.com
 *       '400':
 *         description: Bad request - Invalid data provided.
 *       '500':
 *         description: Internal server error.
 */

//creating a user
router.post('/new',yupValidation(schemaValidation.newUserSchema),userController.createUser);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Retrieve user by ID
 *     description: Get user information based on the provided user ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '200':
 *         description: A successful response with user information.
 *         content:
 *           application/json:
 *             example:
 *               user_id: 1234abcd-5678efgh-9012ijkl
 *               username: john_doe
 *               email: john@example.com
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: Internal server error.
 */
//get one user
router.get('/:id',/*yupValidation(schemaValidation.idValidationSchema),*/ userController.getOneUser);


/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update user by ID
 *     description: Update the username and email of a user based on the provided user ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *           format: uuid
  *     security:
 *       - basicAuth: []
 *     requestBody:
 *       description: Updated user information.
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             username: updated_user
 *             email: updated_user@example.com
 *     responses:
 *       '200':
 *         description: A successful response with updated user information.
 *         content:
 *           application/json:
 *             example:
 *               user_id: 1234abcd-5678efgh-9012ijkl
 *               username: updated_user
 *               email: updated_user@example.com
 *       '400':
 *         description: Bad request - Invalid data provided.
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: Internal server error.
 */
//updateUser
router.put('/update/:id', basicAuth, yupValidation(schemaValidation.updateUserSchema), userController.updateUser);

/**
 * @swagger
 * /delete/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Delete a user based on the provided user ID. Requires basic authentication.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID to be deleted
 *         schema:
 *           type: string
 *           format: uuid
 *     security:
 *       - basicAuth: []
 *     responses:
 *       '204':
 *         description: User deleted successfully.
 *       '401':
 *         description: Unauthorized - Missing or invalid authentication credentials.
 *       '403':
 *         description: Forbidden - The authenticated user does not have permission to perform the operation.
 *       '404':
 *         description: User not found.
 *       '500':
 *         description: Internal server error.
 *     securitySchemes:
 *       basicAuth:
 *         type: http
 *         scheme: basic
 */

//deleteUser
router.delete('/delete/:id', basicAuth, yupValidation(schemaValidation.idValidationSchema), userController.deleteUser);



module.exports = router;
