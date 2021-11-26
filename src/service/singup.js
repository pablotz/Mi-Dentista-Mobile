export default class Signup_user {
   
    static addUser = (usuario) => {
       let response = fetch(
           "http://oscarhendrix10.pythonanywhere.com/user/add", {
               method: "POST",
               headers: new Headers({
                     "Content-Type": "application/json"
               }),
               body: JSON.stringify({
                name: usuario.name,
                lastName: usuario.lastName,
                email: usuario.email,
                password: usuario.password,
                access_code: usuario.accessCode,
                phone: usuario.phone,
                role: 'Customer'
            }),
           }
       ).then(response => response.json())
        .catch(err => console.error(err));

        return response;
   }

    static login = (usuario) => {
       let response = fetch(
           "http://oscarhendrix10.pythonanywhere.com/login", {
               method: "POST",
               headers: new Headers({
                     "Content-Type": "application/json"
               }),
               body: JSON.stringify({
                email: usuario.email,
                user_password: usuario.password
            }),
           }
       ).then(response => response.json())
        .catch(err => console.error(err));

        return response;
   }
}