import React, {useEffect, useState} from 'react';
import {Select, Tag} from 'antd';

const {Option} = Select;

const statusOptions = [
    {value: '0', label: '전체'},
    {value: '1', label: '준비', color: '#A1A5B7'},
    {value: '2', label: '진행중', color: '#50CD89'},
    {value: '3', label: '완료', color: '#009EF7'},
];

const StatusSelect = ({onStatusChange}) => {
    const [selectedValues, setSelectedValues] = useState(['0']);

    const handleChange = (values) => {
        if (values.length === 0) {
            setSelectedValues(['0']);
            onStatusChange(['0']);
        } else {
            if (values.includes('1') && values.includes('2') && values.includes('3')) {
                setSelectedValues(['0']);
                onStatusChange(['0']);
            } else {
                if (values.includes('0') && values.length > 1) {
                    if (values[values.length - 1] === '0') {
                        setSelectedValues(['0']);
                        onStatusChange(['0']);
                    } else {
                        let filterValue = values.filter(val => val !== '0');
                        setSelectedValues(filterValue);
                        onStatusChange(filterValue);
                    }
                } else if (!values.includes('0') && values.length < 4) {
                    setSelectedValues(values);
                    onStatusChange(values);
                } else {
                    setSelectedValues(['0']);
                    onStatusChange(['0']);
                }
            }
        }
    };

    useEffect(() => {
        if (selectedValues.includes('0') && selectedValues.length > 1) {
            setSelectedValues(['0']);
            onStatusChange(['0']);
        }
    }, [selectedValues, onStatusChange]);

    const tagRender = ({label, value}) => (
        <Tag
            color={statusOptions.find(option => option.value === value)?.color || 'default'}
            style={{marginRight: 3}}
        >
            {label}
        </Tag>
    );

    return (
        <Select
            mode="multiple"
            value={selectedValues}
            style={{width: 200}}
            onChange={handleChange}
            tagRender={tagRender}
        >
            {statusOptions.map(option => (
                <Option key={option.value} value={option.value}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        {option.value !== '0' && (
                            <div
                                style={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    backgroundColor: option.color,
                                    marginRight: 8,
                                }}
                            />
                        )}
                        <span>{option.label}</span>
                    </div>
                </Option>
            ))}
        </Select>
    );
};

export default StatusSelect;