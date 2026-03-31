import { User } from "@mytypes/users";

export const users: Record<string, User> = {
    standard: {
        username: 'standard_user',
        password: 'secret_sauce'
    },
    wrong: {
        username: 'problem_userss',
        password: 'secret_sauce'
    }
};

export const loginScenarios: Array<{
    label: string;
    user: User;
    shouldPass: boolean;
    errorText?: string;
}> = [
        {
            label: 'standard user',
            user: users.standard,
            shouldPass: true,
        },
        {
            label: 'wrong user',
            user: users.wrong,
            shouldPass: false,
            errorText: "Epic sadface: Username and password do not match any user in this service"
        }
    ];