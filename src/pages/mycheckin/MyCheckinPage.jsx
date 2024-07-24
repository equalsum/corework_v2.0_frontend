import React, { useCallback, useEffect, useRef, useState } from 'react';
import { requestAxios } from '../../api/Axios';
import { Col, Row } from 'antd';

import CoinStatusCard from '../../components/myCheckin/CoinStatusCard';
import FeedbackStatusCard from '../../components/myCheckin/FeedbackStatusCard';
import MeetingListCard from '../../components/myCheckin/MeetingListCard';
import TodoListCard from '../../components/myCheckin/TodoListCard';
import FeedbackListCard from '../../components/myCheckin/FeedbackListCard';

const MyCheckinPage = () => {
  const [feedbackTargetList, setFeedbackTargetList] = useState([]);
  const [coreValuesList, setCoreValuesList] = useState([]);
  const [coinManagementInfo, setCoinManagementInfo] = useState({});
  const [receiveFeedbackRankingList, setReceiveFeedbackRankingList] = useState([]);
  const [sendFeedbackRankingList, setSendFeedbackRankingList] = useState([]);
  const [feedbackList, setFeedbackList] = useState([]);
  const [receiveCoinList, setReceiveCoinList] = useState([]);
  const [sendCoinList, setSendCoinList] = useState([]);
  const [myCheckInMeetingList, setMyCheckInMeetingList] = useState([]);
  const [myCheckInOkrTaskList, setMyCheckInOkrTaskList] = useState([]);
  const [bpList, setBpList] = useState([]);
  const [limitStart, setLimitStart] = useState(0);
  const [limitEnd] = useState(10);
  const [taskLimitStart] = useState(0);
  const [taskLimitEnd] = useState(10);
  const [searchType] = useState('default');
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const [cuId, setCuId] = useState('');

  const fetchData = useCallback(
    (newLimitStart) => {
      setLoading(true);
      requestAxios(
        '/mycheckin/list',
        {
          method: 'POST',
          data: {
            limit_start: newLimitStart || limitStart,
            limit_end: limitEnd,
            task_limit_start: taskLimitStart,
            task_limit_end: taskLimitEnd,
            search_type: searchType,
          },
        },
        (response) => {
          const data = response.data;
          if (data.feedbackList && data.feedbackList.length > 0) {
            if (limitStart === 0) {
              setFeedbackList(data.feedbackList || []);
            } else {
              setFeedbackList((prev) => [...prev, ...(data.feedbackList || [])]);
            }
          } else {
            setHasMore(false);
          }
          setFeedbackTargetList(data.feedbackTargetList || []);
          setCoreValuesList(data.coreValuesList || []);
          setCoinManagementInfo(data.coinManagementInfo || {});
          setReceiveFeedbackRankingList(data.receiveFeedbackRankingList || []);
          setSendFeedbackRankingList(data.sendFeedbackRankingList || []);
          setReceiveCoinList(data.receiveCoinList || []);
          setSendCoinList(data.sendCoinList || []);
          setMyCheckInMeetingList(data.myCheckInMeetingList || []);
          setMyCheckInOkrTaskList(data.myCheckInOkrTaskList || []);
          setBpList(data.bpList || []);
          setCuId(data.cu_id || '');
          setLoading(false);
        },
        (error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      );
    },
    [limitStart, limitEnd, taskLimitStart, taskLimitEnd, searchType]
  );

  useEffect(() => {
    if (hasMore) {
      fetchData(limitStart);
    }
  }, [fetchData, hasMore, limitStart]);

  const lastElementRef = useCallback(
    (node) => {
      if (loading || !hasMore || feedbackList.length < 10) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setLimitStart((prevLimitStart) => prevLimitStart + 10);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, feedbackList.length]
  );

  return (
    <Row gutter={[16, 16]} style={{ height: '100%' }}>
      <Col span={8} style={{ height: '100%' }}>
        <FeedbackListCard
          feedbackList={feedbackList}
          setFeedbackList={setFeedbackList}
          feedbackTargetList={feedbackTargetList}
          coreValuesList={coreValuesList}
          coinManagementInfo={coinManagementInfo}
          lastElementRef={lastElementRef}
          fetchData={fetchData}
          limitStart={limitStart}
          setLimitStart={setLimitStart}
          setHasMore={setHasMore}
        />
      </Col>
      <Col span={8}>
        <CoinStatusCard receiveCoinList={receiveCoinList} sendCoinList={sendCoinList} />
        <FeedbackStatusCard
          receiveFeedbackRankingList={receiveFeedbackRankingList}
          sendFeedbackRankingList={sendFeedbackRankingList}
          cuId={cuId}
        />
      </Col>
      <Col span={8}>
        <MeetingListCard myCheckInMeetingList={myCheckInMeetingList} cuId={cuId} />
        <TodoListCard initMyCheckInOkrTaskList={myCheckInOkrTaskList} bpList={bpList} />
      </Col>
    </Row>
  );
};

export default MyCheckinPage;
