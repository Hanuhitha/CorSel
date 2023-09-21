import React from 'react'
import { Button } from 'react-bootstrap'
import NavBar from './NavBar'
import {Link} from 'react-router-dom'

export default function LandingPage() {
  return (
    <div>
      <NavBar></NavBar>
    <div class="container text-center">
  <div class="row align-items-center">
   
    <div className="col">  <div class="card">
  <div class="card-body">
    <h5 class="card-title">Courses</h5>
    <p class="card-text">The.</p>
    <Link to='/ClassSearch'><Button>Click Here</Button></Link>
  </div>
</div></div>
    <div className="col">  <div class="card">
  <div class="card-body">
    <h5 class="card-title">Schedule</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <Link to='/Credits'><Button>Click Here</Button></Link>
  </div>
</div> </div>
    <div className="col">  <div class="card">
  <div class="card-body">
    <h5 class="card-title">Counseling Forms</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <Link to='/CounselingForms'><Button>Click Here</Button></Link>
  </div>
</div> </div>
  </div>
</div>
</div>
  )
}
