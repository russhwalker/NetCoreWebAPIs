import React, { Component } from 'react';

export class Customers extends Component {
    static renderTable(customers) {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th>CustomerId</th>
                        <th>CustomerName</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(cust =>
                        (<tr key={cust.CustomerId}>
                            <td>{cust.CustomerId}</td>
                            <td>{cust.CustomerName}</td>
                        </tr>)
                    )}
                </tbody>
            </table>
        );
    }

    displayName = Customers.name

    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            loading: true
        };

        //https://localhost:44360/api/customer
        fetch('https://localhost:44359/api/Customer', {
            'mode': 'no-cors'
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    customers: data,
                    loading: false
                });
            })
            .catch(err => {
                alert('fail');
            });
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Customers.renderTable(this.state.customers);

        return (
            <div>
                <h1>Customers</h1>
                {contents}
            </div>
        );
    }
}