export const baseUrl = "http://localhost:5050"

export const PostRequest = async(url , body) =>{
    const response  = await fetch(url , {
        method : "POST",
        mode: 'cors',
        headers : {
            "Content-Type" : "application/json",
        },
        body,
    });

    const data = await response.json(); 

    if(!response.ok){
        let message

        if(data?.message){
            message = data.message
        }else{
            message = data;
        }

        return {error : true , message};
    }
    return data;
}

export const getRequest = async(url) =>{ 
    const response = await fetch(url)
    const data = await response.json();

    if(!response.ok){
        let message = "an error has occured";
        if(data?.message) message = data.message;

        return {error : true , message};
    }

    return data;
}
