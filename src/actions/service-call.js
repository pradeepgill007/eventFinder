import axios from "axios";

export function serviceCall(requestData) {
  return new Promise((resolve, reject) => {
    let baseUrl = "https://rest.bandsintown.com";
    let targetUrl = requestData.parms
      ? `${baseUrl}/${requestData.parms}`
      : baseUrl;
    const request = {
      url: `${targetUrl}?app_id='jhg45hj4j5hgvh67j54'`,
      method: requestData.method || "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData.body || {})
    };
    axios(request)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error.response ? error.response : error);
      });
  });
}
