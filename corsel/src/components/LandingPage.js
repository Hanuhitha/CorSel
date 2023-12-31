import React from 'react'
import { Button } from 'react-bootstrap'
import NavBar from './NavBar'
import {Link} from 'react-router-dom'
import {Card} from './Card'
import './LandingPage.css'


export default function LandingPage() {
  return (
    <div>
      <NavBar></NavBar>
    <div style={{display:'flex',justifyContent:'center',flexDirection:'row'}}>
      <div style={{marginRight:'5%'}}> 
      <Link to ='/ClassSearch'>
      <Card 
      
      imgSrc='icons8-e-learning-90.png'
      imgAlt='Courses list will be provided here'
      title='Courses'
      description=''
      buttonText=''
      link='/ClassSearch'
      width='15rem'
      className='custom-card'
      />
      </Link>
  
      </div>
      <div>
      <Link to ='/Credits'>
      <Card 
      imgSrc='icons8-schedule-96.png'
      imgAlt='Courses list will be provided here'
      title='Schedule'
      description=''
      buttonText=''
      link='/Credits'
      width='15rem'
      />
      </Link>
      </div>
      <div style={{marginLeft:'5%'}}>
      <Link to ='/Forms'>
      <Card 
      imgSrc='icons8-documents-64.png'
      imgAlt='Courses list will be provided here'
      title='Forms'
      description=''
      buttonText=''
      link='/Forms'
      width='15rem'
      />
      </Link>
      </div>
    </div>
</div>
  )
}

