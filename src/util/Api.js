import axios from 'axios'
import moment from 'moment'

export const ROOT_URL = process.env.REACT_APP_API_URL;

export function setHeaders() {
    const token = localStorage.getItem('token') || null
    axios.defaults.headers.get['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers.post['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers.delete['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers.put['Authorization'] = `Bearer ${token}`;
}

const Api = {
    postArrayBuffer(endpoint, params, next){
        setHeaders();
        axios({
            method: 'post',
            url: ROOT_URL + endpoint,
            responseType: 'arraybuffer',
            data: params
        })
            .then(response => {
                next(response.data, false)

            })
            .catch((error) => {
                if (error.response) next(false, error.response.data)
            })
    },
    get(endpoint, next){
        setHeaders();
        axios.get(ROOT_URL + endpoint)
            .then(response => {
                next(response.data, false)
            })
            .catch(function (error) {
                console.log(error);
                if (error.response) next(false, error.response.data)
            });
    },
    post(endpoint, params, next){
        setHeaders();
        axios.post(ROOT_URL + endpoint, params)
            .then(response => {
                next(response.data, false)
            })
            .catch((error) => {
                if (error.response) next(false, error.response.data);
            })
    }, put(endpoint, params, next){
        setHeaders();
        axios.put(ROOT_URL + endpoint, params)
            .then(response => {
                next(response.data, false)
            })
            .catch((error) => {
                if (error.response) next(false, error.response.data);
            })
    },
    delete (endpoint, next){
        setHeaders();
        axios.delete(ROOT_URL + endpoint).then(function (response) {
            console.log(response);
            next(response.data, false)
        })
            .catch(function (error) {
                if (error.response)  next(false, error.response.data)
            });
    },
    validate(endpoint, params, next){
        setHeaders();
        axios.post(ROOT_URL + endpoint, params)
            .then(response => {
                next(true)
            })
            .catch((error) => {
                if (error.response) next(error.response.data);
            })
    },
    paralel (endpoints, next) {
        setHeaders();
        let promises = [];
        endpoints.forEach(function (endpoint) {
            promises.push(axios.get(ROOT_URL + endpoint));
        })
        let responses = [];
        axios.all(promises).then(axios.spread((...args) => {
            for (let i = 0; i < args.length; i++) {
                responses.push(args[i].data);
            }
            next(responses);
        }))
    }, paralelPost(endpointWithParams, next){
        setHeaders();
        let promises = [];
        endpointWithParams.forEach(function (endpointWithParam) {
            promises.push(axios.post(ROOT_URL + endpointWithParam.endpoint, endpointWithParam.params));
        })
        let responses = [];
        axios.all(promises).then(axios.spread((...args) => {
            for (let i = 0; i < args.length; i++) {
                responses.push(args[i].data);
            }
            next(responses, false);
        })).catch(function (error) {
            next(false, error.response.data);
        });
    },
    serialGet(endpoints, next){
        setHeaders();
        let promiseCount = endpoints.length;
        let errorCount = 0;
        let responseCount = 0;
        let responses = [];
        let errors = [];
        let i = 0;
        endpoints.forEach(function (endpoint) {
            let index = i++;
            axios.get(ROOT_URL + endpoint, index)
                .then(response => {
                    responses[index] = response.data;
                    responseCount++;
                    if (responseCount + errorCount === promiseCount) {
                        next(responses, errors)
                    }
                })
                .catch((error) => {
                    errors[index] = error.response.data
                    errorCount++;
                    if (responseCount + errorCount === promiseCount) {
                        next(responses, errors)
                    }
                })
        })
    },
    serialPutPost(endpointWithParams, next){
        setHeaders();
        let promiseCount = endpointWithParams.length;
        let errorCount = 0;
        let responseCount = 0;
        let responses = [];
        let errors = [];
        let i = 0;
        endpointWithParams.forEach(function (endpointWithParam) {
            let index = i++;
            axios[endpointWithParam.method](ROOT_URL + endpointWithParam.endpoint, endpointWithParam.params, index)
                .then(response => {
                    responses[index] = response.data;
                    responseCount++;
                    if (responseCount + errorCount === promiseCount) {
                        next(responses, errors)
                    }
                })
                .catch((error) => {
                    console.log(error);
                    errors[index] = error.response.data
                    errorCount++;
                    if (responseCount + errorCount === promiseCount) {
                        next(responses, errors)
                    }
                })
        })
    }, paralelPut(endpointWithParams, next){
        setHeaders();
        let promises = [];

        endpointWithParams.forEach(function (endpointWithParam) {
            promises.push(axios.put(ROOT_URL + endpointWithParam.endpoint, endpointWithParam.params));
        })
        let responses = [];
        axios.all(promises).then(axios.spread((...args) => {
            for (let i = 0; i < args.length; i++) {
                responses.push(args[i].data);
            }
            next(responses, false);
        })).catch(function (error) {
            next(false, error.response.data);
        });
    }, paralelAll(endpointWithParams, next){
        setHeaders();
        let promises = [];
        endpointWithParams.forEach(function (endpointWithParam) {
            if (endpointWithParam.method === "delete" || endpointWithParam.method === "get") {
                promises.push(axios[endpointWithParam.method](ROOT_URL + endpointWithParam.endpoint));
            } else
                promises.push(axios[endpointWithParam.method](ROOT_URL + endpointWithParam.endpoint, endpointWithParam.params));
        })
        let responses = [];
        axios.all(promises).then(axios.spread((...args) => {
            for (let i = 0; i < args.length; i++) {
                responses.push(args[i].data);
            }
            next(responses, false);
        })).catch(function (error) {
            console.log(error);
            next(false, error.response.data);
        });
    },
    getCurrencyRate(currency, date, next){
        let now = moment().format('YYYY-MM-DD');
        if (currency === "TRY") return next("1", false)
        let url = "/exchangeRate/" + currency + "/" + now;
        if (date && date < now)
            url = "/exchangeRate/" + currency + "/" + date;
        Api.get(url, (response, error) => {
            if (response) next(response.response.selling_forex, false)
            else next(false, error)
        })
    }
}

export default Api
