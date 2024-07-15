import React, {useEffect, useState} from 'react';
import {Avatar, Col, Dropdown, Input, Row, Spin, Table} from 'antd';
import {DownOutlined, SearchOutlined} from '@ant-design/icons';
import {requestAxios} from "../../api/Axios";
import {getAvatarName, getAvatarStyle, gfnGetDutyPositionTxt, isNull} from '../../components/common';

const UserListPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        requestAxios('/user/list1'
            , {method: 'GET'}
            , (response) => {
                setData(response.data.userList);
                setLoading(false);
            }
            , (error) => {
                console.error("There was an error fetching the data!", error);
                setLoading(false);
            }
        );
    }, []);

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

    const filteredData = data.filter((item) => {
        const searchTerm = searchText.toLowerCase();
        const fullName = `${item.cu_last_nm}${item.cu_nm}`.toLowerCase();
        return (
            fullName.includes(searchTerm) ||
            item.ct_nm.toLowerCase().includes(searchTerm) ||
            item.cu_position.toLowerCase().includes(searchTerm) ||
            item.cu_duty.toLowerCase().includes(searchTerm)
        );
    });

    const renderDropdownMenu = (ct_nm) => {
        const ctNmArray = ct_nm.split('|');
        return ctNmArray.map((team, index) => ({
            key: index,
            label: (
                <div title={team} style={{
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    width: '350px'
                }}>{team}</div>
            ),
        }));
    };

    const columns = [
        {
            title: '이름',
            dataIndex: 'cu_nm',
            key: 'cu_nm',
            fixed: 'left',
            sorter: (a, b) => (`${a.cu_last_nm}${a.cu_nm}`).localeCompare(`${b.cu_last_nm}${b.cu_nm}`, undefined, {numeric: true}),
            defaultSortOrder: 'ascend',
            render: (text, record) => (
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Avatar size={40} style={{...getAvatarStyle(record.cu_img_path), marginRight: 8, fontSize: '20px'}}>
                        {!record.cu_img_path.includes('/') ? getAvatarName(record.cu_nm, record.cu_last_nm) : ''}
                    </Avatar>
                    <div style={{width: 'calc(100% - 48px)', display: 'flex', flexDirection: 'column'}}>
                        <span style={{
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis'
                        }}>{record.cu_last_nm}{record.cu_nm}</span>
                        <span style={{
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis'
                        }}>{record.cu_email}</span>
                    </div>
                </div>
            ),
            ellipsis: true,
        },
        {
            title: '전화번호',
            dataIndex: 'cu_hp',
            key: 'cu_hp',
            render: (text, record) => (
                isNull(record.cu_hp) ? '-' : record.cu_hp
            ),
        },
        {
            title: '관리자',
            dataIndex: 'cu_manager_nm',
            key: 'cu_manager_nm',
            sorter: (a, b) => (`${a.cu_manager_last_nm}${a.cu_manager_nm}`).localeCompare(`${b.cu_manager_last_nm}${b.cu_manager_nm}`, undefined, {numeric: true}),
            render: (text, record) => (
                record.cu_manager === '-' ?
                    record.cu_manager :
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <Avatar size={40} style={{
                            ...getAvatarStyle(record.cu_manager_img_path),
                            marginRight: 8,
                            fontSize: '20px'
                        }}>
                            {!record.cu_manager_img_path.includes('/') ? getAvatarName(record.cu_manager_nm, record.cu_manager_last_nm) : ''}
                        </Avatar>
                        <div style={{width: 'calc(100% - 48px)', display: 'flex', flexDirection: 'column'}}>
                            <span style={{
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis'
                            }}>{record.cu_manager_last_nm}{record.cu_manager_nm}</span>
                            <span style={{
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis'
                            }}>{gfnGetDutyPositionTxt(record.cu_manager_duty, record.cu_manager_position)}</span>
                        </div>
                    </div>
            ),
            ellipsis: true,
        },
        {
            title: '소속팀',
            dataIndex: 'ct_nm',
            key: 'ct_nm',
            sorter: (a, b) => a.ct_nm.localeCompare(b.ct_nm),
            render: (text, record) => {
                const ctNmArray = record.ct_nm.split('|');
                return ctNmArray.length > 1 ? (
                    <Dropdown menu={{ items: renderDropdownMenu(record.ct_nm) }}>
                        <div>
                            <span className="">{ctNmArray.length}개 팀 소속</span>
                            <DownOutlined style={{marginLeft: 8}}/>
                        </div>
                    </Dropdown>
                ) : (
                    <span className="m_number">{record.ct_nm}</span>
                );
            },
        },
        {
            title: '직책',
            dataIndex: 'cu_position',
            key: 'cu_position',
            sorter: (a, b) => a.cu_position.localeCompare(b.cu_position),
            ellipsis: true,
        },
        {
            title: '직무',
            dataIndex: 'cu_duty',
            key: 'cu_duty',
            ellipsis: true,
        },
    ];

    return (
        <div>
            <Row>
                <Col span={6}>
                    <Input
                        placeholder="이름, 소속팀, 직책, 직무 검색"
                        value={searchText}
                        onChange={handleSearch}
                        style={{marginBottom: 20}}
                        suffix={<SearchOutlined/>}
                    />
                </Col>
            </Row>
            {loading ? (
                <Spin size="large"/>
            ) : (
                <Table
                    dataSource={filteredData}
                    columns={columns}
                    rowKey="cu_id"
                    scroll={{x: 1300}}
                />
            )}
        </div>
    );
};

export default UserListPage;