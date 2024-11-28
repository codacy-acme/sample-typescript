import { User } from '../models/User';

export class UserService {
    private users: Map<number, User> = new Map();

    addUser(user: User): void {
        if (this.users.has(user.id)) {
            throw new Error(`User with id ${user.id} already exists`);
        }
        user.createdAt = new Date();
        this.users.set(user.id, user);
    }

    getUser(id: number): User | undefined {
        return this.users.get(id);
    }

    getAllUsers(): User[] {
        return Array.from(this.users.values());
    }

    updateUser(user: User): void {
        if (!this.users.has(user.id)) {
            throw new Error(`User with id ${user.id} not found`);
        }
        this.users.set(user.id, user);
    }

    deleteUser(id: number): boolean {
        return this.users.delete(id);
    }
}