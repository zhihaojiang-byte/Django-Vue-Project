
// Axios is a JavaScript library used to make HTTP request. In this project, all request are asynchronous.
import axios from "axios";


// global setting for HTTP requests
export const ajax = axios.create({
    //setting for header
    headers: {
        // source: 'h5',   //???
        // icode: 'acbd',  //???
        "Content-Type": "application/x-www-form-urlencoded",    //???
    },
    //request with cookies, essential User Authentication
    withCredentials: true,
})

//get csrftoken from cookie , set X-CSRFToken to header
ajax.defaults.xsrfCookieName = 'csrftoken'
ajax.defaults.xsrfHeaderName = "X-CSRFToken"

// before asynchronous request
ajax.interceptors.request.use(function (config) {
    // things to do before sending a request
    return config
}, function (error) {
    // things to do if there is a request error
    return Promise.reject(error)
})


// after asynchronous response
ajax.interceptors.response.use(function (config) {
    // things to do after revive a response
    return config
}, function (error) {
    // things to do if there is response error
    console.log(error)
    let error_message =""
    let status_code = 0

    // based on the different kinds of error, obtain the error message. See documents form backend for error information.
    if (error.response){
        status_code = error.response.status
        if (status_code === 401){   //401: user is not login
            error_message = error.response.data.error_message
        } else if (status_code === 500){    //500: server is busy or server is down
            error_message = error.response.statusText
        } else if (status_code === 400){    //400: parameter send to the server is wrong
            if(error.response.data.error_list){     // multiple parameter error
                for(const key in error.response.data.error_list)
                {
                    error_message += (error.response.data.error_list[key][0].message + '\n')
                }
            }else if (error.response.data.error_message){   // single parameter error
                error_message = error.response.data.error_message
            } else {
                error_message = error.response.statusText   // other cases
            }
        }
    }else {
        error_message = error.message   // other cases
    }

    // raise the error with the error message and status_code
    return Promise.reject({
        status_code: status_code,
        error_message: error_message,
    })
})



