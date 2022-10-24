import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Button, Input, Label } from "reactstrap";


function ImageDoctor() {
    var inputData;
    const ref = useRef(null);
    const [disease, setDisease] = useState(['']);
    const [image, setImage] = useState('');
    return (
        <div className="d-flex flex-row">
        <div className="d-flex flex-column gap-y-4 px-4 ">
                <b> Upload X-Ray/MRI/CT-Scan</b>
                {image != '' ? <div><img className="h-20 w-20"  src= {image} /></div>:null}
                <Input accept="image/*" id="upload" innerRef={ref} onChange={e => {

                    var reader = new FileReader();

                    reader.onloadend = e => setImage(e.target.result);
                    reader.readAsDataURL(ref.current.files[0]);
                }} type="file" />
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bol1.,d py-2 px-4 rounded" onClick={async (e) => {

                const formData = new FormData();
                console.log(ref.current.files[0]);
                formData.append("file", ref.current.files[0]);
                console.log(formData.get('files'));

                axios.post('api/doctor/getdiseasefromimage', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }).then(res => { setDisease(res.data); console.log(res.data) }).catch(err => console.log(err.request));



            }} color="primary">Submit</button>
            
        
            </div>
            {disease[0] != '' ?
                <div className="d-flex flex-column gap-y-3">
                    <b>Disease Report with Confidence:</b>
                    <div className=" "><div className="font-bold ">Disease: </div>{disease[1]}<a href={"https://en.wikipedia.org/wiki/Special:Search?search=" + disease[1]} title="Click here to know more about the disease" target="_blank" class="link-secondary">ℹ️</a></div>
                    <div className=" "><div className="font-bold ">Confidence:</div><div>{disease[0]}</div></div>
                </div> : null }
        </div>);

}

export default ImageDoctor;