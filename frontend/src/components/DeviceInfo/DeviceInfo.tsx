import React from 'react';
import Device from '../../interfaces/Device';
import { Icon } from '@iconify/react';

interface DeviceInfoProps {
    device: Device,
}

const DeviceInfo = ({device}: DeviceInfoProps) => {
    const { security, lastCheckInDate } = device
    const isSecurityOn = Object.values(security).every(value => value === true)
    const isOldCheckInDate = Date.now() - lastCheckInDate * 1000  > 30 * 24 * 60 * 60 * 1000
    return (
        <tr>
            <td>{device.serialNumber}</td>
            <td>
                {isOldCheckInDate 
                    ? <Icon icon="mdi:clock" /> 
                    : isSecurityOn 
                        ? <Icon icon="mdi:shield-check" />
                        : Object.entries(security).map(([key, value]) => (
                            value ? null : 
                            <Icon key={key} icon={
                                key === 'firewall' ? 'mdi:wall'
                                : key === 'antivirus' ? 'mdi:antivirus'
                                : 'mdi:lock-off'
                            } />
                        ))
                }
            </td>
        </tr>
    );
};

export default DeviceInfo;