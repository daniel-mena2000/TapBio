export type UserDataT = {
    name: string
    email: string
    handle: string
    _id: string
    description: string
}

export type RegisterForm = Pick<UserDataT, 'name' | 'email' | 'handle'> & {
        password: string
        confirmPassword: string
}

export type UserDataLogin = {
    email: string
    password: string
}

export type ProfileForm = Pick<UserDataT, 'handle' | 'description'>
