import React, {useState, useEffect} from "react";
import axios from "axios";
import ProfilPictureF from '../../assets/ProfilPictureF.png';
import ProfilPictureM from '../../assets/ProfilPictureM.png';

function Header(props){
  
  const { selectedDoctorId } = props;
  const [Doctor, setDoctor] = useState("");

  useEffect(() => {
      axios.post(`/doctors/id=${selectedDoctorId}`).then(res => {
        const newData = res.data;
        setDoctor(newData);
      });
  }, [selectedDoctorId]);
        
  return (
    <div>
       {Doctor.gender === 'F' ? (
        <img src={ProfilPictureF} alt="Profil Female" />  /*<a href="https://www.freepik.com/free-vector/profile-icons-pack-hand-drawn-style_18156023.htm#query=profile%20avatar&position=5&from_view=keyword&track=ais">Image by pikisuperstar</a> on Freepik*/
       ) : Doctor.gender === 'M' ? (
        <img src={ProfilPictureM} alt="Profil Male" />
      ) : null}
      {Doctor.gender!==undefined && Doctor.lastName!==undefined && Doctor.speciality!==undefined ? (
        <p>Dr. {Doctor.firstName} {Doctor.lastName}, {Doctor.speciality}.</p>
      ) : null}
    </div>
    );
}
export default Header;