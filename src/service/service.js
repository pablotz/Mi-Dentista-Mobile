export default class service_api {
    static getService = (usuario) => {
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
                 role: 'customer'
             }),
            }
        ).then(response => response.json())
         .catch(err => console.error(err));
 
         return response;
    }
}