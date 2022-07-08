 
import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { CardSubtitle } from 'reactstrap';
import AddCar from './AddCar';
function CarList() {
   
    const [cars, setCars] = useState([]);
    const [isLoaded, setIsLoaded]= useState(false);
    const getCars = () => {
        axios.get('http://127.0.0.1:8000/api/cars')
            .then(function (response) {
                console.log(response.data.data);
                setCars(response.data.data)
                setIsLoaded(true)
            })
            .catch(function (error) {
                // handle error
            })
            .then(function () {
            });
    }
    useEffect(() => {
        if(!isLoaded) getCars();
       
    }, [isLoaded])
    return (
        <div className='container fluid'>
            <h2>Danh sách xe</h2>
            <AddCar onAdded={setIsLoaded}/>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Model</th>
                        <th>Description</th>
                        <th>Products_on</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {!!cars
                    ?
                    cars.map((cars, index) =>
                        <tr key={index}>
                            <td scope="row">{cars.id}</td>
                            <td>{cars.model}</td>
                            <td>{cars.description}</td>
                            <td>{cars.produced_on}</td>
                            <td>
                                <img src={`http://localhost:8000/image/${cars.image}`} style={{ width: '100px' }}></img>
                            </td>
                        </tr>
                    )
                    :
                    <tr><td>No Data in API</td></tr>}
                </tbody>
            </table>
        </div>
    )
}
export default CarList;
 

