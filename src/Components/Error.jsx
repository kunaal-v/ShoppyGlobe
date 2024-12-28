import { useRouteError } from "react-router-dom"

function Error()
{
    // This component is used to display the error page 
    const err=useRouteError();
    return(<>
    <div className="Error_page">
        <h1>{err.status} {err.statusText}</h1>
        <h1>{err.data}</h1>
    </div>
    </>)
}
export default Error