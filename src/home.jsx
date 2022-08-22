import React,{useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Route } from 'react-router-dom';
import {Router } from 'react-router-dom';


const Home = () =>{
  const [show, setShow] = useState(false);
  const[posts,setPosts] = useState([]);
  const [degree,setDegree] = useState(273.15);
  const [name,setName] = useState('');
  const [followers,setFollowers] = useState(0);
  const [followings,setFollowings] = useState(0);
  const [bio, setBio] = useState('');
  const [temp,setTemp] = useState(274);
  const [desc,setDesc] = useState('');
  const[country,setCountry] = useState('');
  const [message,setMessage] = useState('');
  const [city,setCity] = useState('');
  const [flag, setFlag] =  useState();
  const [tempDegree,settempDegree] = useState();
  const [degreeSymbol,setDegreeSymbol] = useState(<span>&#8451;</span>)



  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

  const onChange = (event) =>{
    var valueOf = event.target.value;
    setMessage(valueOf)
  }

  const selectUnit = (event) =>{
    if(event.target.value == 'kelvin'){
      setDegree(0)
      setDegreeSymbol(<span>&#8490;</span>)
    }
    if(event.target.value == 'farenheit'){
      setDegree(227)
     setDegreeSymbol(<span>&#8457;</span>)
    }
    if(event.target.value == 'celcius'){
      setDegree(273.15)
      setDegreeSymbol(<span>&#8451;</span>)
    }

  }
  
 
  const onSubmit = (event) =>{
    

   fetch(`https://api.openweathermap.org/data/2.5/weather?q=${message}&appid=0c017430e8f5a73b6c783a2d01cfb982`)
   .then(res => res.json())

   .then( data => { 
   
    setDesc(data.weather[0].description)
    setTemp(data.main.temp)
    setCountry(data.sys.country)
    setCity(data.name)
    event.preventDefault();
    setMessage(message);

    
  }
   )
        

 .catch(err =>{console.log(err.message) ,handleShow()}
 
 )

  }
  


  // axios('https://api.github.com/users/MasihMuhammadi').
  //   then(res =>{
  //     console.log(res.data)
  //     setName(res.data.login)
  //     setFollowers(res.data.followers)
  //     setFollowings(res.data.following)
  //     setBio(res.data.bio);
  //   })
  //   .catch(err =>{console.log(err.message)})



  

  return (
    <>
    <div className="container">
    
   <input type="text" className='me-0 ms-4 mt-5' autoFocus={true} placeholder="Enter a city Name..." onChange={onChange}/>
   <button type="submit" className="btn btn-light text-success btn-sm ms-1"  onClick={onSubmit} >ok</button>
   <div className="">
<select value={tempDegree}  className="drop m-5 text-success bg-white" onChange={selectUnit}>
  <option  >celcius</option>
  <option  >farenheit</option>
  <option >kelvin</option>
</select>
</div>

      <div className="d-flex flex-lg-row flex-column description mt-5">
        <div className="p-2 mx-4">Country: <b>{country}</b></div>
        <div className="p-2 mx-4">City: <b>{city}</b></div>

        <div className="p-2 mx-4 d-block">weather Tempreture: <b> {Math.floor(temp - degree)}{degreeSymbol}</b></div>
      </div>
      <div className="description mx-4 p-2">Weather Status: <b>{desc}</b></div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="bg-light" >
          <Modal.Title  className="text-success bg-light">Spelling warning</Modal.Title>
        </Modal.Header >
        <Modal.Body className="bg-light text-success" >Woohoo,  {message} is not a real city name!!!</Modal.Body>
        <Modal.Footer className="bg-light" >
          <Button variant="success" onClick={handleClose}>
            Close
          </Button>
        
        </Modal.Footer>
      </Modal>
    

  
</div>

    </>

  )
      
}
export default Home; 
