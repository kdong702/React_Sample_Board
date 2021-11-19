
const Button = ({title,cName,event}) =>{

    return(
        <a className={cName} onClick={event} style={{cursor : "pointer"}}> {title} </a>
    );

}
export default Button;