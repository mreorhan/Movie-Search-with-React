import Api from '../util/Api'

export function fetchData(endpoint, type) {
    return function (dispatch) {
        try {
            Api.get(endpoint, function (response, error) {
                dispatch({
                    type: type,
                    payload: response
                });
            });
        } catch (e) {
            console.log(e);

        }


    }
}
