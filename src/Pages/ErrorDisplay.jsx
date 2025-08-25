import { Header } from "../components/Header";
import './ErrorDisplay.css';

export function ErrorDisplay({cart}){
    return(
        <>
        <title>404 Page not found</title>
        <link rel="icon" href="home-favicon.png" />
     <Header cart={cart}/>
     <div className="error">Page Not Found(404)</div>
        </>
    )
}