import React from 'react';
import {Avatar, Card, List} from 'antd';
import {getAvatarName, getAvatarStyle} from '../common'

const MeetingListCard = ({myCheckInMeetingList, cuId}) => {
    return (
        <Card title="1:1 미팅" style={{width: '100%', height: '50%'}}>
            {
                myCheckInMeetingList != null && myCheckInMeetingList.length === 0 ? (
                    <p>예정된 미팅이 없습니다.</p>
                ) : (
                    <List
                        itemLayout="vertical"
                        dataSource={myCheckInMeetingList}
                        style={{height: 250, overflowY: 'auto'}}
                        renderItem={item => {

                            let cu_img_path;
                            let cu_last_nm;
                            let cu_nm;
                            if (cuId === item.cu_id) {
                                cu_img_path = item.meet_target_img_path;
                                cu_last_nm = item.meet_target_last_nm;
                                cu_nm = item.meet_target_nm;
                            } else {
                                cu_img_path = item.cu_img_path;
                                cu_last_nm = item.cu_last_nm;
                                cu_nm = item.cu_nm;
                            }

                            return (
                                <List.Item>
                                    <Card>
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <Avatar size={50} style={{...getAvatarStyle(cu_img_path), marginLeft: 8}}>
                                                {!cu_img_path.includes('/') ? getAvatarName(cu_nm, cu_last_nm) : ''}
                                            </Avatar>
                                            <div style={{
                                                width: 'calc(100% - 48px)',
                                                display: 'flex',
                                                flexDirection: 'column'
                                            }}>
                                                <span>{cu_last_nm}{cu_nm}</span>
                                                <span>{item.meet_dt_view + ' ' + item.meet_time}</span>
                                            </div>
                                        </div>
                                    </Card>
                                </List.Item>
                            )
                        }}
                    />
                )
            }

        </Card>
    );
};

export default MeetingListCard;