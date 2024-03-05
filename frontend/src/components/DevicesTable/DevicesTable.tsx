import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import Device from '../../interfaces/Device';
import DeviceInfo from '../DeviceInfo/DeviceInfo';
import './DevicesTable.css'

interface DevicesListProps {
    devicesList: Device[],
}

const DevicesTable = ({devicesList}: DevicesListProps) => {
    const [devicesToShow, setDevicesToShow] = useState<Device[]>([]);
    const [percentageHealthy, setPercentageHealthy] = useState(0);
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

    useEffect(() => {
        setDevicesToShow(devicesList);
    
    }, [devicesList]);
    
    useEffect(() => {
        const healthyDevices = devicesToShow.filter(device =>{
            const { security } = device;
            return Object.values(security).every(param => param === true);
        });
        const calculatedPercentage = (healthyDevices.length / devicesToShow.length) * 100;
        setPercentageHealthy(isNaN(calculatedPercentage) ? 0 : calculatedPercentage);
    }, [devicesToShow]);

    useEffect(() => {
        applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFilters]);

    const applyFilters = () => {
        setDevicesToShow(devicesList.filter(device => {
            const { security, lastCheckInDate } = device
            const isOldCheckInDate = Date.now() - lastCheckInDate * 1000  > 30 * 24 * 60 * 60 * 1000
            
            if (selectedFilters.length === 0) {
                return true;
              }

            return selectedFilters.some(filter => {
                switch (filter) {
                    case 'old':
                        return isOldCheckInDate;
                    case 'healthy':
                        return !isOldCheckInDate && Object.values(security).every(param => param === true);
                    case 'firewallOff':
                        return !isOldCheckInDate && !security.firewall;
                    case 'antivirusOff':
                        return !isOldCheckInDate && !security.antivirus;
                    case 'encryptionOff':
                        return !isOldCheckInDate && !security.encryption;
                    default:
                        return false;
                }
                });
        }))
    };
    
    const handleCheckboxChange = (filter: string) => {
        setSelectedFilters((prevFilters) =>
          prevFilters.includes(filter)
            ? prevFilters.filter((prevFilter) => prevFilter !== filter)
            : [...prevFilters, filter]
        );
    };

    return (
        <div className='devices-container'>
            <div className="devices-info">
                <div className="devices-number">Total number of devices : {devicesList.length}</div>
                <div className="devices-shown">Number of devices shown : {devicesToShow.length}</div>
                <div className="devices-healthy-percentage">Healthy devices : {percentageHealthy.toFixed(0)}%</div>
            </div>
            <div className="devices-filters-selector">
                <div className="devices-filters-title">Filters: </div>
                <label>
                    <input
                    type="checkbox"
                    checked={selectedFilters.includes('healthy')}
                    onChange={() => handleCheckboxChange('healthy')}
                    />
                    <Icon icon="mdi:shield-check" /> Healthy Devices
                </label>
                <label>
                    <input
                    type="checkbox"
                    checked={selectedFilters.includes('firewallOff')}
                    onChange={() => handleCheckboxChange('firewallOff')}
                    />
                    <Icon icon="mdi:wall" /> Firewall Off
                </label>
                <label>
                    <input
                    type="checkbox"
                    checked={selectedFilters.includes('antivirusOff')}
                    onChange={() => handleCheckboxChange('antivirusOff')}
                    />
                    <Icon icon="mdi:antivirus" /> Antivirus Off
                </label>
                <label>
                    <input
                    type="checkbox"
                    checked={selectedFilters.includes('encryptionOff')}
                    onChange={() => handleCheckboxChange('encryptionOff')}
                    />
                    <Icon icon="mdi:lock-off" /> Encryption Off
                </label>
                <label>
                    <input
                    type="checkbox"
                    checked={selectedFilters.includes('old')}
                    onChange={() => handleCheckboxChange('old')}
                    />
                    <Icon icon="mdi:clock" /> Older than 30 days
                </label>
            </div>
            <table className='devices-table'>
                <thead>
                    <tr>
                        <th>Serial Number</th>
                        <th>Security Status</th>
                    </tr>
                </thead>
                <tbody>
                    {devicesToShow.map((device) => 
                        <DeviceInfo key={device.id} device={device} />
                    )}
                </tbody>
            </table>
        </div>
        
    );
};

export default DevicesTable;