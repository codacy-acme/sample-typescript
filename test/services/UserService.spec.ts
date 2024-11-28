// test/services/UserService.spec.ts
import { expect } from 'chai';
import { UserService } from '../../src/services/UserService';
import { User } from '../../src/models/User';

describe('UserService', () => {
    let userService: UserService;
    let testUser: User;

    beforeEach(() => {
        userService = new UserService();
        testUser = { id: 1, name: 'Test User', email: 'test@example.com' };
    });

    describe('addUser', () => {
        it('should add a user successfully', () => {
            userService.addUser(testUser);
            const result = userService.getUser(testUser.id);
            expect(result).to.deep.include(testUser);
            expect(result?.createdAt).to.be.instanceOf(Date);
        });

        it('should throw error when adding duplicate user', () => {
            userService.addUser(testUser);
            expect(() => userService.addUser(testUser)).to.throw(`User with id ${testUser.id} already exists`);
        });
    });

    describe('getUser', () => {
        it('should return undefined for non-existent user', () => {
            expect(userService.getUser(999)).to.be.undefined;
        });

        it('should return user when exists', () => {
            userService.addUser(testUser);
            const user = userService.getUser(testUser.id);
            expect(user).to.deep.include(testUser);
        });
    });

    describe('getAllUsers', () => {
        it('should return empty array when no users exist', () => {
            expect(userService.getAllUsers()).to.be.empty;
        });

        it('should return all users when users exist', () => {
            const user2 = { id: 2, name: 'Test User 2', email: 'test2@example.com' };
            userService.addUser(testUser);
            userService.addUser(user2);
            const users = userService.getAllUsers();
            expect(users).to.have.lengthOf(2);
            expect(users).to.deep.include(testUser);
            expect(users).to.deep.include(user2);
        });
    });

    describe('updateUser', () => {
        it('should update existing user', () => {
            userService.addUser(testUser);
            const updatedUser = { ...testUser, name: 'Updated Name' };
            userService.updateUser(updatedUser);
            expect(userService.getUser(testUser.id)).to.deep.include(updatedUser);
        });

        it('should throw error when updating non-existent user', () => {
            expect(() => userService.updateUser(testUser)).to.throw(`User with id ${testUser.id} not found`);
        });
    });

    describe('deleteUser', () => {
        it('should return true when user deleted successfully', () => {
            userService.addUser(testUser);
            expect(userService.deleteUser(testUser.id)).to.be.true;
            expect(userService.getUser(testUser.id)).to.be.undefined;
        });

        it('should return false when deleting non-existent user', () => {
            expect(userService.deleteUser(999)).to.be.false;
        });
    });
});