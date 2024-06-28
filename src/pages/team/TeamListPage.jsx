import React, {useEffect, useState} from 'react';
import {Avatar, Col, Dropdown, Input, Row, Spin, Table} from 'antd';
import {DownOutlined, SearchOutlined} from '@ant-design/icons';
import {requestAxios} from "../../api/Axios";
import {getAvatarName, getAvatarStyle, gfnGetDutyPositionTxt, isNull} from '../../components/common';

const TeamListPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [expandedRowKeys, setExpandedRowKeys] = useState([]); // State for expanded row keys

    useEffect(() => {
        requestAxios('/team1'
            , {method: 'GET'}
            , (response) => {
                const transformedData = transformData(response.data.teamList, response.data.teamUserList);
                setData(transformedData);
                setFilteredData(transformedData);
                setLoading(false);
                setExpandedRowKeys(getAllKeys(transformedData)); // Set all keys as expanded
            }
            , (error) => {
                console.error("There was an error fetching the data!", error);
                setLoading(false);
            }
        );
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchText(value);
        const filtered = searchInData(data, value);
        setFilteredData(filtered);
        setExpandedRowKeys(getAllKeys(filtered)); // Update expanded keys on search
    };

    const searchInData = (data, searchText) => {
        const result = [];

        data.forEach(item => {
            if (item.ctg_ct_nm.toLowerCase().includes(searchText.toLowerCase())) {
                result.push(item);
            } else if (item.children) {
                const childrenResult = searchInData(item.children, searchText);
                if (childrenResult.length > 0) {
                    result.push(...childrenResult); // Flatten the result to include only matched children
                }
            }
        });

        return result;
    };

    const getAllKeys = (data) => {
        const keys = [];
        data.forEach(item => {
            keys.push(item.key);
            if (item.children) {
                keys.push(...getAllKeys(item.children));
            }
        });
        return keys;
    };

    const handleExpand = (expanded, record) => {
        const keys = expanded ? [...expandedRowKeys, record.key] : expandedRowKeys.filter(key => key !== record.key);
        setExpandedRowKeys(keys);
    };

    const columns = [
        {
            title: '팀',
            dataIndex: 'team',
            key: 'team',
        },
        {
            title: '팀장',
            dataIndex: 'team_leader',
            key: 'team_leader',
            render: (text, record) => (
                isNull(record.ct_leader_id) ?
                    '-' :
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <Avatar size={30} style={{
                            ...getAvatarStyle(record.ct_leader_img_path),
                            marginRight: 8,
                            fontSize: '12px'
                        }}>
                            {!record.ct_leader_img_path.includes('/') ? getAvatarName(record.ct_leader_nm, record.ct_leader_last_nm) : ''}
                        </Avatar>
                        <div style={{width: 'calc(100% - 48px)', display: 'flex', flexDirection: 'column'}}>
                            <span style={{
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis'
                            }}>{record.ct_leader_last_nm}{record.ct_leader_nm}</span>
                            <span style={{
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis'
                            }}>{gfnGetDutyPositionTxt(record.ct_leader_duty, record.ct_leader_position)}</span>
                        </div>
                    </div>
            ),
        },
        {
            title: '팀 멤버',
            dataIndex: 'team_user',
            key: 'team_user',
            render: (text, record) => {
                if (record.team_user_list.length === 0) {
                    return '';
                } else if (record.team_user_list.length === 1) {
                    return (
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <Avatar size={30} style={{
                                ...getAvatarStyle(record.team_user_list[0].cu_img_path),
                                marginRight: 8,
                                fontSize: '12px'
                            }}>
                                {!record.team_user_list[0].cu_img_path.includes('/') ? getAvatarName(record.team_user_list[0].cu_nm, record.team_user_list[0].cu_last_nm) : ''}
                            </Avatar>
                            <div style={{width: 'calc(100% - 48px)', display: 'flex', flexDirection: 'column'}}>
                                <span style={{
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis'
                                }}>{record.team_user_list[0].cu_last_nm}{record.team_user_list[0].cu_nm}</span>
                                <span style={{
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis'
                                }}>{gfnGetDutyPositionTxt(record.team_user_list[0].cu_duty, record.team_user_list[0].cu_position)}</span>
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <Dropdown menu={{ items: renderDropdownMenu(record.team_user_list) }}>
                            <div>
                                <span>총 {record.team_user_list.length}명의 멤버</span>
                                <DownOutlined style={{marginLeft: 8}}/>
                            </div>
                        </Dropdown>
                    );
                }
            },
        },
    ];

    const transformData = (teamList, teamUserList) => {
        const map = {};
        const roots = [];

        teamList.forEach(item => {
            let teamUserFilterList = teamUserList.filter(user => user.ct_cd === item.ct_cd);
            let ctList = teamList.filter(ct => item.ctg_path.split("-").includes(ct.ct_cd));
            let ctgCtNm = "";
            for (let k = 0; k < ctList.length; k++) {
                ctgCtNm += ctList[k].ct_nm + " ";
            }

            const newItem = {
                key: item.ct_cd,
                team: item.ct_nm,
                ct_leader_id: item.ct_leader_id,
                ct_leader_duty: item.ct_leader_duty,
                ct_leader_position: item.ct_leader_position,
                ct_leader_img_path: item.ct_leader_img_path,
                ct_leader_last_nm: item.ct_leader_last_nm,
                ct_leader_nm: item.ct_leader_nm,
                lower_count: item.lower_count,
                team_user_list: teamUserFilterList,
                ctg_ct_nm: ctgCtNm,
                children: item.lower_count > 0 ? [] : undefined
            };
            map[item.ct_cd] = newItem;

            const paths = item.ctg_path.split('-');
            if (paths.length > 1) {
                const parentKey = paths[paths.length - 2];
                if (!map[parentKey]) {
                    map[parentKey] = {children: []};
                }
                map[parentKey].children.push(newItem);
            } else {
                roots.push(newItem);
            }
        });

        return roots;
    };

    const renderDropdownMenu = (teamUserList) => {
        return teamUserList.map((user, index) => ({
            key: index,
            label: (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar size={30}
                            style={{ ...getAvatarStyle(user.cu_img_path), marginRight: 8, fontSize: '12px' }}>
                        {!user.cu_img_path.includes('/') ? getAvatarName(user.cu_nm, user.cu_last_nm) : ''}
                    </Avatar>
                    <div style={{ width: 'calc(100% - 48px)', display: 'flex', flexDirection: 'column' }}>
                        <span style={{
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis'
                        }}>{user.cu_last_nm}{user.cu_nm}</span>
                        <span style={{
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis'
                        }}>{gfnGetDutyPositionTxt(user.cu_duty, user.cu_position)}</span>
                    </div>
                </div>
            ),
        }));
    };

    return (
        <>
            <Row>
                <Col span={6}>
                    <Input
                        placeholder="팀 검색"
                        value={searchText}
                        onChange={handleSearch}
                        style={{marginBottom: 20}}
                        suffix={<SearchOutlined/>}
                    />
                </Col>
            </Row>
            <Spin spinning={loading}>
                <Table
                    columns={columns}
                    dataSource={filteredData}
                    rowKey="key"
                    pagination={false}
                    expandable={{
                        expandedRowKeys,
                        onExpand: handleExpand,
                    }}
                />
            </Spin>
        </>
    );
};

export default TeamListPage;