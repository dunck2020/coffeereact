import api from "./api"

export const ACTION_TYPES = {
    CREATE : 'CREATE',
    UPDATE : 'UPDATE',
    DELETE : 'DELETE',
    FETCH_ALL : 'FETCH_ALL'
}

const formatData = data => ({
    ...data,

})
export const fetchAll = () => dispatch => {
    api.Customer().fetchAll()
    .then(response =>{
        console.log(response)
        dispatch({
                type:ACTION_TYPES.FETCH_ALL,
                payload: response.data
        })
    }
    )
    .catch(err => console.log(err))
}

export const create = (data, onSuccess) => dispatch => {
    //data = formatData(data)
    api.Customer().create()
    .then(res => {
        dispatch({
            type : ACTION_TYPES.CREATE,
            payload : res.data
        })
        onSuccess(err => console.log(err))
    })

}
export const update = (id, data, onSuccess) => dispatch => {
    api.Customer().update(id, data)
    .then(res => {
        dispatch({
            type : ACTION_TYPES.UPDATE,
            payload : {id: id, ...data}
        })
        onSuccess(err => console.log(err))
    })

}
export const Delete = (id, onSuccess) => dispatch => {
    api.Customer().delete(id)
    .then(res => {
        dispatch({
            type : ACTION_TYPES.DELETE,
            payload : id
        })
        onSuccess(err => console.log(err))
    })

}