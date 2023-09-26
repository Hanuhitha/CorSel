import React from 'react'
import NavBar from './NavBar'
import {Card} from './Card'

export default function ClassSearch() {
  return (
    <><NavBar></NavBar>
    <div style={{justifyContent:'center'}}>
    <div style={{marginBottom:'50px',marginTop:'5rem',paddingLeft:'15rem',boxShadow:''}}> 
      <Card
      imgSrc=''
      imgAlt='Courses list will be provided here'
      title='Total Credits per year'
      description='.'
      link='/ClassSearch'
      width='70rem'

      />
      </div>

    <div style={{display:'flex',justifyContent:'center',flexDirection:'row'}}>

      <div style={{}}> 
      <Card
      title='Search/Filter'
      description=''
      width='15rem'
      height='31rem'
      />
      </div>
      <div>
      <Card 
      title='Filtered Courses'
      description=''
      width='45rem'
      height='31rem'
      />
      </div>
      <div style={{textAlign:'center'}}>
      <Card 
      title='Course Description'
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
