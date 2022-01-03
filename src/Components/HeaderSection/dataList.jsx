import React from 'react'

const DataList = () => {
    return (
        <>
            <input type="list" className="datalist" placeholder="Nagpur" list="cities" name="" />
            <datalist id="cities">
                <option value="Nagpur" />
                <option value="Bhanadra" />
                <option value="Jaipur" />
                <option value="Balasore" />
                <option value="Bhubaneshwar" />
                <option value="Pune" />
                <option value="wardha" />
                <option value="Akola" />
            </datalist>
        </>
    )
}

export default DataList;
