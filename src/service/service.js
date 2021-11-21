export default class service_api {
    static getService = (token) => {
        let response = fetch(
            "http://oscarhendrix10.pythonanywhere.com/services/get", {
                method: "GET",
                headers: new Headers({
                      "Content-Type": "application/json",
                      "token": token
                }),
            }
        ).then(response => response.json())
         .catch(err => console.error(err));
 
         return response;
    }
}