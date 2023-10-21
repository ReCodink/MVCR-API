class UserController {
    constructor(userService) {
        this.userService = userService;
    }

    getAllUsers = async (request, response) => {
        try {
            const users = await this.userService.getAllUser(args);
            return response.status(200).json({
                message: 'Get All Users Succesfully',
                data: users
            });
        } catch (err) {
            console.error(err);
            return response.status(500).json({
                message: 'Get All Users Failed'
            });
        }
    }

    getUserById = async (request, response) => {
        try {
            const user = await this.userService.getUserById(id);
            if (!user) {
                return response.status(404).json({
                    message: 'User Not Found'
                });
            }
            return response.status(200).json({
                message: `Get User Successfully at id: ${id}`,
                data: user
            });
        } catch (err) {
            console.error(err);
            return response.status(500).json({
                message: `Get User Failed at id: ${id}`
            });
        }
    }

    createNewUser = async (request, response) => {
        try {
            if (
                !request.body.email || 
                !request.body.gender || 
                !request.body.password || 
                !request.body.role
                ) {
                return response.status(400).json({ message: 'All fields are required' }); // Perbaiki pesan error
            }

            const email = request.body.email;
            const gender = request.body.gender;
            const role = request.body.role;
            const hashedPassword = bcrypt.hashSync(request.body.password, 10);
            const user = await this.userService.createUser({
                email: email,
                gender: gender,
                role: role,
                password: hashedPassword
            });

            return response.status(200).json({
                status: 'success',
                message: 'User Created Successfully',
                data: user
            });
        } catch (err) {
            console.error(err);
            return response.status(500).json({
                message: 'User Created Failed',
                error: err.message
            });
        }
    };

    updateUserById = async (request, response) => {
        const id = request.params.id;
        try {
            const user = await this.userService.getUserById(id);
            if (!user) {
                return response.status(404).json({
                    message: 'User Not Found'
                });
            }
            const updateUser = await this.userService.updateUser(id, request.body);
            return response.status(200).json({
                message: `User Updated Successfully at ID: ${id}`,
                data: updateUser
            });
        } catch (err) {
            console.error(err);
            return response.status(500).json({
                message: `User Updated Failed at ID: ${id}`
            })
        }
    };

    deleteUserById = async (request, response) => {
        const id = request.params.id;
        try {
            const user = await this.userService.getUserById(id);
            if (!user) {
                return response.status(404).json({
                    message: 'User Not Found'
                });
            }
            await this.userService.deleteUser(id);
            return response.status(200).json({
                message: `User Deleted Successfully at ID: ${id}`
            });
        } catch (err) {
            console.error(err);
            return response.status(500).json({
                message: `User Deleted Failed at ID: ${id}`
            });
        }
    }
}

module.exports = UserController;