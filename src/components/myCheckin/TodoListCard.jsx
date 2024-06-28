import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import axios from 'axios';
import {Avatar, Card, List, Select, Space, Tag} from 'antd';
import {formatDate, gfnGetOtStatColor, gfnGetOtStatNm} from '../common';
import StatusSelect from './StatusSelect';

const BpListSelect = ({bpList, handleBpChange}) => {
    const defaultBp = useMemo(() => bpList.find(bp => bp.bp_current === 'Y'), [bpList]);

    return (
        <Select
            key={defaultBp ? defaultBp.bp_no : ""}
            defaultValue={defaultBp ? defaultBp.bp_no : ""}
            style={{width: 200}}
            onChange={handleBpChange}
            options={bpList.map(bp => ({
                value: bp.bp_no,
                label: (
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <span>{bp.bp_nm}</span>
                        {bp.bp_current === 'Y' && <Tag color="blue">현재</Tag>}
                    </div>
                ),
            }))}
        />
    );
};

const TodoListCard = ({initMyCheckInOkrTaskList, bpList}) => {
    const [myCheckInOkrTaskList, setMyCheckInOkrTaskList] = useState(initMyCheckInOkrTaskList);
    const [selectedOtStat, setSelectedOtStat] = useState([]);
    const [bpNo, setBpNo] = useState('');
    const [setTaskLimitStart] = useState(0);
    const [taskLimitEnd] = useState(10);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef();

    useEffect(() => {
        setMyCheckInOkrTaskList(initMyCheckInOkrTaskList);
    }, [initMyCheckInOkrTaskList]);

    useEffect(() => {
        const defaultBp = bpList.find(bp => bp.bp_current === 'Y');
        if (defaultBp) {
            setBpNo(defaultBp.bp_no);
        }
    }, [bpList]);

    const fetchToDoList = (newLimitStart, otStats, bpNoValue) => {
        setLoading(true);
        axios.post('/mycheckin/search-to-do-list1', {
            task_limit_start: newLimitStart,
            task_limit_end: taskLimitEnd,
            ot_stats: otStats,
            bp_no: bpNoValue
        })
            .then(response => {
                const data = response.data;
                if (data.myCheckInOkrTaskList && data.myCheckInOkrTaskList.length > 0) {
                    if (newLimitStart === 0) {
                        setMyCheckInOkrTaskList(data.myCheckInOkrTaskList);
                    } else {
                        setMyCheckInOkrTaskList(prev => [...prev, ...data.myCheckInOkrTaskList]);
                    }
                } else {
                    setHasMore(false);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    };

    const handleStatusChange = (selectedStatuses) => {
        const otStats = selectedStatuses.includes('0') ? [] : selectedStatuses;
        setSelectedOtStat(otStats);
        setTaskLimitStart(0);
        setHasMore(true);
        fetchToDoList(0, otStats, bpNo);
    };

    const handleBpChange = (value) => {
        setBpNo(value);
        setTaskLimitStart(0);
        setHasMore(true);
        fetchToDoList(0, selectedOtStat, value);
    };

    const lastElementRef = useCallback(node => {
        if (loading || !hasMore) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setTaskLimitStart(prevTaskLimitStart => {
                    const newLimitStart = prevTaskLimitStart + 10;
                    fetchToDoList(newLimitStart, selectedOtStat, bpNo);
                    return newLimitStart;
                });
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore, selectedOtStat, bpNo, setTaskLimitStart]);

    return (
        <Card title="To-Do" style={{width: '100%', marginTop: 16, height: '50%'}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Space wrap>
                    <BpListSelect bpList={bpList} handleBpChange={handleBpChange}/>
                </Space>
                <StatusSelect onStatusChange={handleStatusChange}/>
            </div>
            {myCheckInOkrTaskList.length === 0 ? (
                <p>생성한 To-Do가 없습니다.</p>
            ) : (
                <List
                    itemLayout="vertical"
                    dataSource={myCheckInOkrTaskList}
                    style={{height: 400, overflowY: 'auto'}}
                    renderItem={(item, index) => (
                        <List.Item key={index} ref={index === myCheckInOkrTaskList.length - 1 ? lastElementRef : null}>
                            <Card>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <Avatar size={50} style={{backgroundColor: gfnGetOtStatColor(item.ot_stat)}}>
                                        {gfnGetOtStatNm(item.ot_stat)}
                                    </Avatar>
                                    <div style={{width: 'calc(100% - 48px)', display: 'flex', flexDirection: 'column'}}>
                                        <span>{item.ot_nm}</span>
                                        <span>{formatDate(item.ot_sdt) + "~" + formatDate(item.ot_edt)}</span>
                                        <span>{item.okr_nm}</span>
                                    </div>
                                </div>
                            </Card>
                        </List.Item>
                    )}
                />
            )}
        </Card>
    );
};

export default TodoListCard;