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
            expect(() => userService.addUser(testUser)).to.throw();
        });
    });

    describe('getUser', () => {
        it('should return undefined for non-existent user', () => {
            expect(userService.getUser(999)).to.be.undefined;
        });
    });

    describe('getAllUsers', () => {
        it('should return all users', () => {
            userService.addUser(testUser);
            const users = userService.getAllUsers();
            expect(users).to.have.lengthOf(1);
            expect(users[0]).to.deep.include(testUser);
        });
    });
});