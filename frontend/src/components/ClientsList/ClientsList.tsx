import React from 'react';
import './ClientsList.css'

interface ClientsListProps {
    clientsList: string[],
    setSelectedClient: React.Dispatch<React.SetStateAction<string>>
}

const ClientsList = ({clientsList, setSelectedClient}: ClientsListProps) => {
    return (
        <div className='clients-list-container'>
            <label htmlFor="clientSelect">Select a Client : </label>
            <select name="clientSelect" id="clientSelect" 
                onChange={(e) => setSelectedClient(e.target.value)}>
                    {clientsList.map((client) => (
                        <option key={client} value={client}>
                            {client.charAt(0).toUpperCase() + client.slice(1)}
                        </option>
                    ))}
            </select>
        </div>
    );
};

export default ClientsList;