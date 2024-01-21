import React from 'react';
import './ClassCart.css';

const ClassCart = ({ classesInCart, onRemoveClass, onAddCourses }) => {
  return (
    <div className="class-cart card" style={{ width: '100%', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#f4f4f4', minHeight: '200px', marginBottom: '20px' }}>
    <h5 className="card-title">Class Cart</h5>
      {classesInCart.length === 0 ? (
        <p>No classes added to the cart</p>
      ) : (
        <div>
          {classesInCart.map((classData, index) => (
            <div key={index} className="class-cart-item">
              <p>Course Name: {classData.courseInfo_courseName}</p>
              {/* Add more details if needed */}
              <div className="remove-button-container">
                <button className="btn btn-danger remove-button" onClick={() => onRemoveClass(classData)}>
                  Remove from Cart
                </button>
              </div>
            </div>
          ))}
          <button className="btn btn-primary" onClick={() => onAddCourses(classesInCart)}>
            Add Courses
          </button>
        </div>
      )}
    </div>
  );
};

export default ClassCart;
