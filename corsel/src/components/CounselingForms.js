import React from 'react'
import NavBar from './NavBar'
import {Card} from './Card'

export default function CounselingForms() {
  return (
    <><NavBar></NavBar>
    <div style={{justifyContent:'center'}}>
    <div style={{marginBottom:'50px',marginTop:'5rem',paddingLeft:'15rem'}}> 
      <Card
      imgSrc=''
      imgAlt='Courses list will be provided here'
      title='Upload'
      description='Counseler Email'
      link='/ClassSearch'
      width='70rem'

      />
      </div>

    <div style={{display:'flex',justifyContent:'center',flexDirection:'row'}}>

      <div style={{}}> 
      <Card
      title='Form Type'
      description=''
      width='15rem'
      height='31rem'
      />
      </div>
      <div>
      <Card 
      title='Form.pdf'
      description=''
      buttonText='Download'
      link='/LandingPage'
      width='45rem'
      height='31rem'
      />
      </div>
      <div style={{textAlign:'center'}}>
      <Card 
      title='Forms Uploaded'
      description=''
      width='16rem'
      height='31rem'
      />
      </div>
      </div>
    </div>

    </>
  )
}

