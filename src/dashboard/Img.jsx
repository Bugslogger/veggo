
import "./admin.css";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';

const Img  = (props) =>{
  
const clickInput = () =>{
    document.getElementById("default-btn").click();
}

    return(
        <div className="container">
            <div onClick={clickInput} style={{"border": props.name ? "none" : null}} className="wrapper">
                <div className="image">
                    {props.name?<img src={props.name} alt={props.name} 
                    className="divimage" />:<div className="content">
                    <div className="image-icon">
                        <AddPhotoAlternateIcon style={{fontSize: "2em", color: "inherit"}}/>
                    </div>
                    <div className="divtext">No File chosen, yet.</div>
                </div>}
                </div>
                
                {props.check?<div className="cancel-btn">
                    <CloseIcon/>
                </div>: null}
            </div>
            <input onChange={props.onchange} type="file" id="default-btn" hidden/>
            {/* <button onClick={clicked} id="btn">chose file</button> */}
        </div>
    )
}

export default Img;