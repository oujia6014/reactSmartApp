// function mergeParamsToString(params) {

//     return props;
// }
export default function HttpRequest(apiPath, fromData) {
    let props = "";
    for (let p in fromData) {
        props = props + p + '=' + fromData[p] + "&";
    }
    const API_ADDRESS_USER = "https://rubyapi.vanward.com/api"
    const option = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: props
    }
    return fetch(API_ADDRESS_USER + apiPath, option)
        .then((response) => {
            return response['_bodyInit']
        })
}
