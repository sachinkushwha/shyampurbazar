import { useParams } from "react-router-dom"

export const UpdateMenuItem=()=>{
    const {id}=useParams();
    return<>
    <h1>update id is {id}</h1>
    </>
}