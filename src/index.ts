import { UserService } from './services/UserService';
import { User } from './models/User';

const userService = new UserService();

try {
    const user: User = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com'
    };

    userService.addUser(user);
    console.log('All users:', userService.getAllUsers());

    const foundUser = userService.getUser(1);
    console.log('Found user:', foundUser);
} catch (error) {
    console.error('Error:', error);
}
