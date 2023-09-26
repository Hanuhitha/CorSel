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
      <Card
      imgSrc='edviselogo.jpeg'
      imgAlt='Courses list will be provided here'
      title='Courses'
      description=''
      buttonText='Click Here'
      link='/ClassSearch'
      width='15rem'
      />
      </div>
      <div>
      <Card 
      imgSrc='edviselogo.jpeg'
      imgAlt='Courses list will be provided here'
      title='Schedule'
      description=''
      buttonText='Click Here'
      link='/Credits'
      width='15rem'
      />
      </div>
      <div style={{marginLeft:'5%'}}>
      <Card 
      imgSrc='edviselogo.jpeg'
      imgAlt='Courses list will be provided here'
      title='CouncellingForms'
      description=''
      buttonText='Click Here'
      link='/CouncellingForms'
      width='15rem'
      />
      </div>
    </div>
</div>
  )
}

