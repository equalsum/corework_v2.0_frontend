import React, {useState} from 'react';
import {requestAxios} from "../../api/Axios";
import {Avatar, Badge, Button, Card, Form, Image, Input, List, Modal, Select} from 'antd';
import {decodeHTMLEntities, formatDate, getAvatarName, getAvatarStyle, gfnGetDutyPositionTxt} from '../common';

const {Option} = Select;
const {TextArea} = Input;

function FeedbackTargetList({feedbackTargetList, form}) {
    const handleChange = (value) => {
        form.setFieldsValue({target_id: value});
    };

    return (
        <Select
            placeholder="피드백을 보낼 대상을 선택해 주세요."
            optionLabelProp="label"
            onChange={handleChange}
        >
            {feedbackTargetList.map(target => (
                <Option
                    key={target.cu_id}
                    value={target.cu_id}
                    label={
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <Avatar size={24}
                                    style={{...getAvatarStyle(target.cu_img_path), marginRight: 8, fontSize: '15px'}}>
                                {!target.cu_img_path.includes('/') ? getAvatarName(target.cu_nm, target.cu_last_nm) : ''}
                            </Avatar>
                            <span style={{marginRight: '8px'}}>{target.cu_last_nm}{target.cu_nm}</span>
                            <span>{gfnGetDutyPositionTxt(target.cu_duty, target.cu_position)}</span>
                        </div>
                    }
                >
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <Avatar size={40}
                                style={{...getAvatarStyle(target.cu_img_path), marginLeft: 8, fontSize: '20px'}}>
                            {!target.cu_img_path.includes('/') ? getAvatarName(target.cu_nm, target.cu_last_nm) : ''}
                        </Avatar>
                        <div style={{width: 'calc(100% - 48px)', display: 'flex', flexDirection: 'column'}}>
                            <span>{target.cu_last_nm}{target.cu_nm}</span>
                            <span>{gfnGetDutyPositionTxt(target.cu_duty, target.cu_position)}</span>
                        </div>
                    </div>
                </Option>
            ))}
        </Select>
    );
}

function CoreValuesList({coreValuesList, form}) {
    const handleChange = (value) => {
        form.setFieldsValue({cv_no: value});
    };

    return (
        <Select placeholder="핵심 가치를 선택해 주세요." onChange={handleChange} allowClear>
            {coreValuesList.map(target => (
                <Option key={target.cv_no} value={target.cv_no}>
                    {decodeHTMLEntities(target.cv_nm)}
                </Option>
            ))}
        </Select>
    );
}

function NumericInput({form}) {
    const [chCount, setChCount] = useState(0);

    const handleChange = (e) => {
        const {value} = e.target;
        if (/^\d*$/.test(value)) {
            setChCount(value);
            form.setFieldsValue({fb_coin: value});
        }
    };

    return (
        <Input
            style={{width: '100%'}}
            placeholder="0"
            maxLength={3}
            onChange={handleChange}
            value={chCount}
        />
    );
}

const FeedbackListCard = ({
                              feedbackList,
                              setFeedbackList,
                              feedbackTargetList,
                              coreValuesList,
                              coinManagementInfo,
                              lastElementRef,
                              fetchData,
                              limitStart,
                              setLimitStart,
                              setHasMore
                          }) => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        form.resetFields();
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = (values) => {
        const {fb_coin} = values;
        const {cm_min_count, cm_max_count, cu_coin} = coinManagementInfo;

        if (fb_coin < cm_min_count || fb_coin > cm_max_count) {
            alert('전송 가능한 코인이 아닙니다.');
            return;
        }

        if (fb_coin > cu_coin) {
            alert('보유한 코인보다 큽니다.');
            return;
        }

        const finalValues = {
            ...values,
            fb_type: '1',
        };

        requestAxios('/feedback1'
            , {method: 'PUT', data: finalValues}
            , (response) => {
                console.log('Feedback sent successfully:', response.data);
                setIsModalOpen(false);

                setHasMore(true);
                let beforeLimitStart = limitStart;
                setLimitStart(0);
                if (beforeLimitStart === 0) {
                    fetchData(limitStart);
                }
            }
            , (error) => {
                console.error('Error sending feedback:', error);
            }
        );
    };

    return (
        <Card
            title="칭찬 피드"
            extra={
                <>
                    <Button onClick={showModal}>피드백 전송</Button>
                    <Modal
                        title="피드백 전송"
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        footer={[
                            <Button key="submit" type="primary" form="feedbackForm" htmlType="submit">
                                피드백 전송하기
                            </Button>,
                        ]}
                    >
                        <Form
                            id="feedbackForm"
                            layout="vertical"
                            form={form}
                            onFinish={onFinish}
                            initialValues={{
                                target_id: '',
                                fb_contents: '',
                                cv_no: '',
                                fb_coin: 0,
                            }}
                        >
                            <Form.Item
                                name="target_id"
                                rules={[{required: true, message: '대상을 선택해 주세요.'}]}
                            >
                                <FeedbackTargetList feedbackTargetList={feedbackTargetList} form={form}/>
                            </Form.Item>
                            <Form.Item
                                name="fb_contents"
                                rules={[{required: true, message: '칭찬 내용을 입력해 주세요.'}]}
                            >
                                <TextArea
                                    placeholder="칭찬 내용을 입력해 주세요."
                                    autoSize={{minRows: 2}}
                                    maxLength={1000}
                                />
                            </Form.Item>
                            <p>칭찬은 모든 멤버에게 공개됩니다.</p>
                            <Form.Item name="cv_no">
                                <CoreValuesList coreValuesList={coreValuesList} form={form}/>
                            </Form.Item>
                            <Form.Item
                                name="fb_coin"
                                label="보낼 피드백 코인"
                                rules={[{required: true, message: '코인을 입력해 주세요.'}]}
                            >
                                <NumericInput form={form}/>
                            </Form.Item>
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                <div>
                                    <Image src="/assets/images/coin.svg" preview={false}
                                           style={{width: '22px', height: '22px'}}/>
                                    <span>{coinManagementInfo.cu_coin}</span>
                                </div>
                                <div>
                                    <span> 전송 가능 코인: 최소 {coinManagementInfo.cm_min_count}개 최대 {coinManagementInfo.cm_max_count}개</span>
                                </div>
                            </div>
                        </Form>
                    </Modal>
                </>
            }
            style={{width: '100%', height: '100%'}}
            styles={{
                body: { height: '100%' }
            }}
        >
            <List
                itemLayout="vertical"
                dataSource={feedbackList}
                style={{height: '1050px', overflowY: 'auto'}}
                renderItem={(item, index) => (
                    <List.Item ref={index === feedbackList.length - 1 ? lastElementRef : null}>
                        <Card>
                            <div style={{marginBottom: 8}}>
                                <Avatar size={20} style={getAvatarStyle(item.target_img_path)}>
                                    {!item.target_img_path.includes('/') ? getAvatarName(item.target_nm, item.target_last_nm) : ''}
                                </Avatar>
                                <span style={{marginLeft: 8}}>{`${item.target_last_nm}${item.target_nm}님이`}</span>
                                <Avatar size={20} style={{...getAvatarStyle(item.cu_img_path), marginLeft: 8}}>
                                    {!item.cu_img_path.includes('/') ? getAvatarName(item.cu_nm, item.cu_last_nm) : ''}
                                </Avatar>
                                <span style={{marginLeft: 8}}>{`${item.cu_last_nm}${item.cu_nm}`}님으로부터 칭찬을 받았어요.</span>
                            </div>
                            <div
                                dangerouslySetInnerHTML={{__html: item.fb_contents ? item.fb_contents.replace(/\n/g, "<br>") : ""}}/>
                            {item.cv_no != null && item.cv_no !== 0 && (
                                <Badge count={item.cv_nm} color={item.cv_color} style={{color: '#000'}}/>
                            )}
                            <div>{formatDate(item.ca_dt)}</div>
                        </Card>
                    </List.Item>
                )}
            />
        </Card>
    );
};

export default FeedbackListCard;