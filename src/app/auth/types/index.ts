export type User = {
    pk: number,
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    is_email_verified: boolean,
    is_active: boolean,
    is_staff:  boolean,
    is_superuser: boolean,
    date_joined: string
}