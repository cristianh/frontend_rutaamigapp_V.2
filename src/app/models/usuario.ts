

export interface Usuario {
    user_id: number;
    user_name: string;
    user_lastname: string;
    user_email: string;
    user_password: string;
    user_status: boolean;
    create_date: string;
 
}


/* user_name: user_name,
user_lastname: user_lastname,
user_email: user_email,
user_password: bcrypGenerateEncript(user_password) */


export class Usuario implements Usuario{
}