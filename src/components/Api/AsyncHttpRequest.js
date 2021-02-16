export const getData = async (url, setData) => {
    try {
        fetch(`${url}`)
            .then(response => response.json())
            .then(json => setData(json))
    } catch (error) {
        console.log(error.message);
    }

};

export const post = async (url, formData = null, callback = null) => {

    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            title: formData.title,
            body: formData.post,
            userId: 2,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => callback(json));

};

export function put(url, params = null, config = null) {
    console.log(params);
    fetch(url, {
        method: 'PUT',
        body: JSON.stringify({
            id: params.id,
            title: params.title,
            body: params.post,
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => console.log(json));
}

export function remove(url, params = null) {
    fetch(url, {
        method: 'DELETE',
    });

}
