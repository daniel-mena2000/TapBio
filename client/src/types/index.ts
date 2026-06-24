export type UserDataT = {
    name: string
    email: string
    handle: string
    _id: string
    description: string
    image: string
    links: string
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


export type SocialNetwork = {
    id: number
    name: string
    url: string
    enabled: boolean
}

export type TapBioLinks = Pick<SocialNetwork, 'name' | 'url' | 'enabled'>
