const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class AuthController {
    constructor(authService) {
        this.authService = authService;
    }

    registerUser = async (request, response) => {
        try {
            if (
                !request.body.email ||
                !request.body.gender ||
                !request.body.password ||
                !request.body.role
            ) {
                return response.status(400).json({ message: 'All fields are required' });
            }

            const { email, gender, role } = request.body; // Destrukturisasi data
            const hashedPassword = bcrypt.hashSync(request.body.password, 10);
            const user = await this.authService.create({ // Perbaiki pemanggilan create
                email: email,
                gender: gender,
                role: role,
                password: hashedPassword
            });

            return response.status(200).json({
                status: 'success',
                message: 'User Registered Successfully',
                data: user
            });
        } catch (err) {
            console.error(err);
            return response.status(500).json({
                message: 'User Registration Failed',
                error: err.message
            });
        }
    };

    loginUser = async (request, response) => {

        try {
            if (
                !request.body.email ||
                !request.body.password
            ) {
                return response.status(400).json({
                    message: 'Email and Password are required'
                });
            }

            const email = request.body.email;
            const user = await this.authService.loginUser(email);

            if (!user) {
                return response.status(404).json({
                    message: 'User Not Found'
                });
            }

            const password = request.body.password;
            const isPasswordValid = bcrypt.compareSync(password, user.password);

            if (!isPasswordValid) {
                return response.status(401).json({
                    accessToken: null,
                    message: 'Invalid Password'
                });
            }

            const token = jwt.sign({
                id: user.id
            }, process.env.API_SECRET, {
                expiresIn: '24h'
            });

            return response.status(200).json({
                user: {
                    id: user.id,
                    email: user.email,
                    gender: user.gender,
                    role: user.role,
                },
                message: 'Login Successful',
                accessToken: token
            });
        } catch (err) {
            console.error(err);
            return response.status(500).json({
                message: 'Login Failed'
            });
        }
    }
}

module.exports = AuthController;
