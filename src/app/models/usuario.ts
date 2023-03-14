

export interface Usuario {
    idusuario: number;
    user_name: string;
    user_lastname: string;
    user_email: string;
    user_password: string;
    user_status: boolean;
    fecha_creacion: string;
 
}


/* user_name: user_name,
user_lastname: user_lastname,
user_email: user_email,
user_password: bcrypGenerateEncript(user_password) */


export class Usuario implements Usuario{
}