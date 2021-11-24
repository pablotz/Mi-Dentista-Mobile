export default class user_api {
    static editUserData = (token, user) => {
        let response = fetch(
            "http://oscarhendrix10.pythonanywhere.com/user/editme", {
                method: "POST",
                headers: new Headers({
                      "Content-Type": "application/json",
                      "token": token
                }),
                body: JSON.stringify({
                    name: user.name,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                }),
            }
        ).then(response => response.json())
         .catch(err => console.error(err));
 
         return response;
    }


}