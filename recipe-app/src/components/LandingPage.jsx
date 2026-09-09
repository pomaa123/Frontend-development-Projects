import React from 'react'
import '../App.css'
import grilledMeat from '../assets/grilled-meat.jpg'
import spaghetti from '../assets/spaghetti.jpg'
import sushi from '../assets/sushi.jpg'
import Button from '@mui/material/Button'
import pizza from '../assets/pizza.jpeg'
import rolls from '../assets/rolls.jpg'
import friedRice from '../assets/fried-rice.jpg'
import salad from '../assets/avocado-salad.jpg'
import { useNavigate } from 'react-router-dom'


function LandingPage() {

    const navigate = useNavigate()

    const images = [grilledMeat, sushi, spaghetti, rolls, friedRice, pizza]


    return(
    <div>
    <h1>KitRecips</h1>
    <div className='front-page'>
      <div className='img-container'>
        
        <div className='center'><img src={salad} /></div>
        {images.map((image, index) => {
          const angle = (360 / images.length)* index;
          return (<div key={index} className={`card card${index}`} 
            style={{
            transform: `
              translate(-50%, -50%)
              rotate(${angle}deg)
              translateY(-240px)
              rotate(-${angle}deg)
            `
          }} >
            <img src={image} alt=''/>
          </div>)
        })}
      </div>
      <div className='big-shape'></div>
      <div className='buttons'>
        <h2>Welcome to KitRecips!</h2>
        <p>Enjoy healthy and delicious foods from over 100 recipes. Let's help you find Your next favorite bite.</p>
        
        
        <Button variant='contained' size='medium' color='primary' onClick={()=> navigate('/home')}>Login</Button>
        <Button variant='contained' size='medium'>Sign up</Button>
        
      </div>
  </div>
  </div>
  
)

}

export default LandingPage;