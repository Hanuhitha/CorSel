import React, { useState } from 'react';
import NavBar from './NavBar';
import { Card } from './Card';

import './Forms.css'; // Import your CSS file for styling (if not already done)

export default function Forms() {
  const [studentSignature, setStudentSignature] = useState('');
  const [parentSignature, setParentSignature] = useState('');
  const [counselorEmail, setCounselorEmail] = useState('');
  const [studentName, setStudentName] = useState('');
  const [gradeNumber, setGradeNumber] = useState('');
  const [originalClassName, setOriginalClassName] = useState('');
  const [currentClass, setCurrentClass] = useState('');
  const [currentGrade, setCurrentGrade] = useState('');
  const [newClassName, setNewClassName] = useState('');
  const [completedForms, setCompletedForms] = useState([]);

  const handleStudentSignatureChange = (event) => {
    setStudentSignature(event.target.value);
  };

  const handleParentSignatureChange = (event) => {
    setParentSignature(event.target.value);
  };

  const handleEmailSignatureChange = (event) => {
    setCounselorEmail(event.target.value);
  };

  const handleStudentNameChange = (event) => {
    setStudentName(event.target.value);
  };

  const handleGradeNumberChange = (event) => {
    setGradeNumber(event.target.value);
  };

  const handleOriginalClassNameChange = (event) => {
    setOriginalClassName(event.target.value);
  };

  const handleCurrentClassChange = (event) => {
    setCurrentClass(event.target.value);
  };

  const handleCurrentGradeChange = (event) => {
    setCurrentGrade(event.target.value);
  };

  const handleNewClassNameChange = (event) => {
    setNewClassName(event.target.value);
  };

  const handleSubmit = () => {
    if (
      studentSignature === '' ||
      parentSignature === '' ||
      counselorEmail === '' ||
      studentName === '' ||
      gradeNumber === '' ||
      originalClassName === '' ||
      currentClass === '' ||
      currentGrade === '' ||
      newClassName === ''
    ) {
      alert('Please fill out all fields before submitting the form.');
      return; // Do not proceed with submission if any field is empty
    }
    
    const formData = {
      studentSignature,
      parentSignature,
      counselorEmail,
      studentName,
      gradeNumber,
      originalClassName,
      currentClass,
      currentGrade,
      newClassName,
    };

    setCompletedForms([...completedForms, formData]);

    setStudentSignature('');
    setParentSignature('');
    setCounselorEmail('');
    setStudentName('');
    setGradeNumber('');
    setOriginalClassName('');
    setCurrentClass('');
    setCurrentGrade('');
    setNewClassName('');

    console.log('Completed Forms:', completedForms);
  };

  return (
    <>
      <NavBar />
      <div style={{ justifyContent: 'center' }}>
        <div style={{ marginBottom: '50px', marginTop: '5rem', paddingLeft: '15rem' }}>
          {/* Removed the Upload Card */}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
          <div>
            <Card title='Form Type' description='' buttonText='Override Form' link='/Forms' width='15rem' height='35rem' />
          </div>
          <div>
            <Card
              title='Form'
              description={
                <div className="form-container">
                  I, parent of{' '}
                  <input type="text" className="underline-input" value={studentName} onChange={handleStudentNameChange} />{' '}
                  in grade{' '}
                  <input type="text" className="smaller-underline-input" value={gradeNumber} onChange={handleGradeNumberChange} />, understand that my child has been recommended for{' '}
                  <input type="text" className="underline-input" value={originalClassName} onChange={handleOriginalClassNameChange} />.
                  My child is currently in{' '}
                  <input type="text" className="underline-input" value={currentClass} onChange={handleCurrentClassChange} />{' '}
                  and received a grade of{' '}
                  <input type="text" className="smaller-underline-input" value={currentGrade} onChange={handleCurrentGradeChange} />{' '}
                  for the semester. I am choosing, however, to override this professional recommendation and wish to sign him/her up for{' '}
                  <input type="text" className="underline-input" value={newClassName} onChange={handleNewClassNameChange} />.
                  I am aware of the pre-requisites for entry into this course as a result of having had email conversations regarding this requirement with my student's teacher, and I understand that my student has not adequately met these requirements. I also understand that next year's teacher will not be teaching pre-requisite concepts concurrent with the material required for the completion of this course. I also understand that my student will be required to stay in the course for a minimum of one semester, and that there is not a guaranteed space for my student in an alternative course.
                  <br />
                  <br/>
                  <label>Student Signature:</label>
                  <input type="text" value={studentSignature} onChange={handleStudentSignatureChange} />

                  <br />

                  <label>Parent Signature:</label>
                  <input type="text" value={parentSignature} onChange={handleParentSignatureChange} />

                  <br/>

                  <label>Counselor Email:</label>
                  <input type="text" value={counselorEmail} onChange={handleEmailSignatureChange}/>

                  <br/>
                  <button onClick={handleSubmit} style={{ margin: '20px auto 0', display: 'block' }}>Submit</button>
                </div>
              }
              width='45rem'
              height='35rem'
            />
          </div>
          <div style={{ textAlign: 'center' }}>
          <Card
  title='Forms Completed'
  description={
    <div>
      <ul>
        {completedForms.map((form, index) => (
          <li key={index}>
            <strong>Form #{index + 1}</strong>
            <br />
            <span><strong>Original Class:</strong> {form.originalClassName}</span>
            <br />
            <span><strong>Requested Class:</strong> {form.newClassName}</span>
            <br />
            {/* Add more fields as needed */}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  }
  width='16rem'
  height='35rem'
/>

          </div>
        </div>
      </div>
    </>
  );
}
