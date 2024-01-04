import React, { useState } from 'react';

function Dropdown(){
    const [selects1,setSelects1]= useState();
    const [selects2,setSelects2]= useState();
    return(
        <><div>
            {/* <h1>{selects1}</h1> */}
            <h6>Filter by Difficulty</h6>
            <select value={selects1} onChange={e => setSelects1(e.target.value)}>
                <option>Select Value</option>
                <option>Regular </option>
                <option>API </option>
                <option>Honors </option>
            </select>
        </div>
        {/* <h1>{selects2}</h1> */}
        <h6>Filter by category</h6>
            <select value={selects2} onChange={e => setSelects2(e.target.value)}>
                <option>Select Value</option>
                <option>Math </option>
                <option>English </option>
                <option>Social </option>
                <option>Science </option>
                <option>Foriegn language</option>
                <option>Art</option>
                <option>Misc</option>
            </select>
        <div>

            </div></>
    )
}


export default Dropdown;
