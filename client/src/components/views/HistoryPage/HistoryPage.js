import React from 'react'

function HistoryPage(props) {

    const renderHistory = () => (
        props.user.userData && props.user.userData.history &&
            props.user.userData.history.map((history) => (

                history.map(item => (
                    <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.dateOfPurchase}</td>
                </tr>
                )) 
            ))
    )
    return (
        <div style={{ width: '80%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h1>History</h1>
            </div>
            <br />

            <table>
                <thead>
                    <tr>
                        <th>Payment Id</th>
                        <th>Payment Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Date of Purchase</th>
                    </tr>
                </thead>

                <tbody>
                    {renderHistory()}
                </tbody>
            </table>
        </div>
    )
}

export default HistoryPage