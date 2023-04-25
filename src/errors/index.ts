export class UserAlreadyExistsError extends Error {
    constructor() {
        super('E-mail already exists.');
    };
};

export class UserNotFoundError extends Error {
    constructor() {
        super('User not found.');
    };
};

export class UserPasswordNotMatchError extends Error {
    constructor() {
        super('User password does not match.');
    };
};

export class GymNotCreatedError extends Error {
    constructor() {
        super('Gym not created.');
    };
};

export class GymNotFoundError extends Error {
    constructor() {
        super('Gym not found.');
    };
};