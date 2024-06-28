import React, {useState} from 'react';
import {Avatar, Card, Image, List, Radio, Tooltip} from 'antd';
import {getAvatarName, getAvatarStyle, gfnGetDutyPositionTxt} from '../common';

function renderReceiveFeedbackRankingInfo(receiveFeedbackRankingList, cuId) {
    if (!Array.isArray(receiveFeedbackRankingList) || receiveFeedbackRankingList.length == 0) {
        return (
            <p>
                아직 순위를 볼 수 있는 피드백이 없네요.<br/>
                피드백이 쌓이면 받은 피드백 순위를 확인할 수 있어요.
            </p>
        );
    }

    let myReceiveFeedbackRankingList = receiveFeedbackRankingList.filter(feedback => feedback.cu_id == cuId);
    let myReceiveFeedbackRank = myReceiveFeedbackRankingList[0]?.feedback_rank ?? -1;
    let includeReceiveRankYn = "N";
    let receiveRankCnt = 5;
    if (myReceiveFeedbackRank > 5) {
        receiveRankCnt = 4;
    }

    const topReceiveFeedbackRankingList = receiveFeedbackRankingList.slice(0, receiveRankCnt);
    if (topReceiveFeedbackRankingList.some(feedback => feedback.cu_id == cuId)) {
        includeReceiveRankYn = "Y";
    }

    const dataSource = [
        ...topReceiveFeedbackRankingList,
        ...(myReceiveFeedbackRank > 5 || includeReceiveRankYn == "N" ? myReceiveFeedbackRankingList : [])
    ];

    return (
        <List
            itemLayout="vertical"
            dataSource={dataSource}
            renderItem={(element, i) => {
                let rankSrc = "";
                let feedbackRank = element.feedback_rank;
                if (feedbackRank == 1) {
                    rankSrc = "/assets/images/rank_gold.svg";
                } else if (feedbackRank == 2) {
                    rankSrc = "/assets/images/rank_silver.svg";
                } else if (feedbackRank == 3) {
                    rankSrc = "/assets/images/rank_bronze.svg";
                }

                let feedbackReceiveCountTxt = element.feedback_receive_count;
                if (feedbackReceiveCountTxt > 999) {
                    feedbackReceiveCountTxt = "999+";
                }

                return (
                    <List.Item key={i}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            {feedbackRank <= 3 ? (
                                <Image src={rankSrc} preview={false}/>
                            ) : (
                                feedbackRank > 999 ? (
                                    <Tooltip title={`${feedbackRank}등`}>
                                        <Avatar size={26}>
                                            {feedbackRank > 999 ? "999+" : feedbackRank}
                                        </Avatar>
                                    </Tooltip>
                                ) : (
                                    <Avatar size={26}>
                                        {feedbackRank}
                                    </Avatar>
                                )
                            )}
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <Avatar size={40} style={{
                                    ...getAvatarStyle(element.cu_img_path),
                                    marginLeft: 8,
                                    fontSize: '20px'
                                }}>
                                    {!element.cu_img_path.includes('/') ? getAvatarName(element.cu_nm, element.cu_last_nm) : ''}
                                </Avatar>
                                <div style={{width: 'calc(100% - 48px)', display: 'flex', flexDirection: 'column'}}>
                                    <span>{element.cu_last_nm}{element.cu_nm}</span>
                                    <span>{gfnGetDutyPositionTxt(element.cu_duty, element.cu_position)}</span>
                                </div>
                            </div>
                            {
                                element.feedback_receive_count > 999 ? (
                                    <Tooltip title={`${element.feedback_receive_count}등`}>
                                        <span style={{marginLeft: 'auto'}}>{feedbackReceiveCountTxt}회</span>
                                    </Tooltip>
                                ) : (
                                    <span style={{marginLeft: 'auto'}}>{feedbackReceiveCountTxt}회</span>
                                )
                            }
                        </div>
                    </List.Item>
                );
            }}
        />
    );
}

function renderSendFeedbackRankingInfo(sendFeedbackRankingList, cuId) {
    if (!Array.isArray(sendFeedbackRankingList) || sendFeedbackRankingList.length == 0) {
        return (
            <p>
                아직 순위를 볼 수 있는 피드백이 없네요.<br/>
                피드백이 쌓이면 보낸 피드백 순위를 확인할 수 있어요.
            </p>
        );
    }

    let mySendFeedbackRankingList = sendFeedbackRankingList.filter(feedback => feedback.cu_id == cuId);
    let mySendFeedbackRank = mySendFeedbackRankingList[0]?.feedback_rank ?? -1;
    let includeSendRankYn = "N";
    let sendRankCnt = 5;
    if (mySendFeedbackRank > 5) {
        sendRankCnt = 4;
    }

    const topSendFeedbackRankingList = sendFeedbackRankingList.slice(0, sendRankCnt);
    if (topSendFeedbackRankingList.some(feedback => feedback.cu_id == cuId)) {
        includeSendRankYn = "Y";
    }

    const dataSource = [
        ...topSendFeedbackRankingList,
        ...(mySendFeedbackRank > 5 || includeSendRankYn == "N" ? mySendFeedbackRankingList : [])
    ];

    return (
        <List
            itemLayout="vertical"
            dataSource={dataSource}
            renderItem={(element, i) => {
                let rankSrc = "";
                let feedbackRank = element.feedback_rank;
                if (feedbackRank == 1) {
                    rankSrc = "/assets/images/rank_gold.svg";
                } else if (feedbackRank == 2) {
                    rankSrc = "/assets/images/rank_silver.svg";
                } else if (feedbackRank == 3) {
                    rankSrc = "/assets/images/rank_bronze.svg";
                }

                let feedbackSendCountTxt = element.feedback_send_count;
                if (feedbackSendCountTxt > 999) {
                    feedbackSendCountTxt = "999+";
                }

                return (
                    <List.Item key={i}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            {feedbackRank <= 3 ? (
                                <Image src={rankSrc} preview={false}/>
                            ) : (
                                feedbackRank > 999 ? (
                                    <Tooltip title={`${feedbackRank}등`}>
                                        <Avatar size={26}>
                                            {feedbackRank > 999 ? "999+" : feedbackRank}
                                        </Avatar>
                                    </Tooltip>
                                ) : (
                                    <Avatar size={26}>
                                        {feedbackRank}
                                    </Avatar>
                                )
                            )}
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <Avatar size={40} style={{
                                    ...getAvatarStyle(element.cu_img_path),
                                    marginLeft: 8,
                                    fontSize: '20px'
                                }}>
                                    {!element.cu_img_path.includes('/') ? getAvatarName(element.cu_nm, element.cu_last_nm) : ''}
                                </Avatar>
                                <div style={{width: 'calc(100% - 48px)', display: 'flex', flexDirection: 'column'}}>
                                    <span>{element.cu_last_nm}{element.cu_nm}</span>
                                    <span>{gfnGetDutyPositionTxt(element.cu_duty, element.cu_position)}</span>
                                </div>
                            </div>
                            {
                                element.feedback_send_count > 999 ? (
                                    <Tooltip title={`${element.feedback_send_count}등`}>
                                        <span style={{marginLeft: 'auto'}}>{feedbackSendCountTxt}회</span>
                                    </Tooltip>
                                ) : (
                                    <span style={{marginLeft: 'auto'}}>{feedbackSendCountTxt}회</span>
                                )
                            }
                        </div>
                    </List.Item>
                );
            }}
        />
    );
}

const FeedbackStatusCard = ({receiveFeedbackRankingList, sendFeedbackRankingList, cuId}) => {
    const [activeFeedbackRankingStatusTab, setActiveFeedbackRankingStatusTab] = useState("1");

    const onChangeFeedbackRankingStatus = (e) => {
        setActiveFeedbackRankingStatusTab(e.target.value); // 탭 변경
    };

    return (
        <Card
            title="칭찬 순위"
            style={{width: '100%', marginTop: 16, height: '70%'}}
            extra={
                <div>
                    <Radio.Group onChange={onChangeFeedbackRankingStatus} defaultValue="1">
                        <Radio.Button value="1">받은</Radio.Button>
                        <Radio.Button value="2">보낸</Radio.Button>
                    </Radio.Group>
                </div>
            }
        >
            {activeFeedbackRankingStatusTab == "1"
                ? renderReceiveFeedbackRankingInfo(receiveFeedbackRankingList, cuId)
                : renderSendFeedbackRankingInfo(sendFeedbackRankingList, cuId)}
        </Card>
    );
};

export default FeedbackStatusCard;