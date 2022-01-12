
import "../Style/img.css";


const clicked = () =>{
    document.getElementById("default-btn").click();
}


const Img  = (props) =>{
    // const hide = () =>{
    //     if(check){
    //         setstate("");
    //         document.getElementsByClassName("wrapper")[0].classList.remove("hide");
    //         setcheck(false);
    //     } else {
    //         setcheck(true);
    //     }
    // }

    return(
        <div className="container">
            <div className="wrapper">
                <div className="image">
                    {props.check?<img src={props.state} alt={props.name} 
                    className="divimage" />:null}
                </div>
                <div className="content">
                    <div className="image-icon">
                        <i className="fa fa-file-image-o" aria-hidden="true"></i>
                    </div>
                    <div className="divtext">No File chosen, yet.</div>
                </div>
                {props.check?<div className="cancel-btn"><i  className="fa fa-times" aria-hidden="true"></i></div>: null}
            </div>
            <input onChange={props.onchange} type="file" id="default-btn" hidden/>
            <button onClick={clicked} id="btn">chose file</button>
        </div>
    )
}

export default Img;