import axios from 'axios'
import VueCookies from 'vue-cookies'

export async function callApi(method, url, parameter = null, header = null, body = null) {
    return await axios({
            method,
            headers: header == null ? {} : header,
            data: body == null ? {} : body,
            url,
            params: parameter == null ? {} : parameter
        })
        .then(function(response) {
            let data = response.data
                // if (VueCookies.get('token')) {
                //   VueCookies.remove("token");
                //   // VueCookies.remove("shortProfile");
                //   // alert(data.detail)
                //   window.location.href = "/";
                // }
            return data;
        })
        .catch(error => {
            console.log(error)
            if (error.response.status === 401) {
                VueCookies.remove("admin-token");
                alert("Login Timeout")
                window.location.href = "/login";
            }
        })
}