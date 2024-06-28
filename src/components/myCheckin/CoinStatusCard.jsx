import React, {useState} from 'react';
import {Card, Flex, Image, Radio} from 'antd';

function renderReceiveCoinInfo(receiveCoinList) {
    if (!receiveCoinList || receiveCoinList.length === 0) return <p>No data available</p>;

    const firstItem = receiveCoinList[0];
    let trophySrc = "/assets/images/default_trophy.svg";
    let receiveCoinPercentText = "칭찬을 기대해 볼까요?";
    let receiveCoinPercent = firstItem.receive_coin_percent;

    if (receiveCoinPercent < 5) {
        trophySrc = "/assets/images/gold_trophy.svg";
        receiveCoinPercentText = "훌륭해요!";
    } else if (receiveCoinPercent < 15) {
        trophySrc = "/assets/images/silver_trophy.svg";
        receiveCoinPercentText = "너무 잘하고 있어요!";
    } else if (receiveCoinPercent < 25) {
        trophySrc = "/assets/images/bronze_trophy.svg";
        receiveCoinPercentText = "상위권이 코앞이에요!";
    }

    return (
        <div style={{textAlign: 'center'}}>
            <div className="text-center">
                <p className="coinname">{firstItem.cm_nm} 코인</p>
                <Image src={trophySrc} preview={false}/>
                <h2 className="coinFontSize">
          <span className="ellipsis d-inline-block" style={{width: '130px'}} title={`${firstItem.cu_receive_coin}개`}>
            {firstItem.cu_receive_coin}개
          </span>
                </h2>
                <span>
          전체 구성원 중 상위 {receiveCoinPercent}%입니다. {receiveCoinPercentText}
        </span>
            </div>
        </div>
    );
}

function renderSendCoinInfo(sendCoinList) {
    if (!sendCoinList || sendCoinList.length === 0) return <p>No data available</p>;

    const firstItem = sendCoinList[0];
    let trophySrc = "/assets/images/default_trophy.svg";
    let sendCoinPercentText = "코인을 기다리고 있어요!";
    let sendCoinPercent = firstItem.send_coin_percent;

    if (sendCoinPercent < 5) {
        trophySrc = "/assets/images/gold_trophy.svg";
        sendCoinPercentText = "훌륭해요!";
    } else if (sendCoinPercent < 15) {
        trophySrc = "/assets/images/silver_trophy.svg";
        sendCoinPercentText = "너무 잘하고 있어요!";
    } else if (sendCoinPercent < 25) {
        trophySrc = "/assets/images/bronze_trophy.svg";
        sendCoinPercentText = "조금만 더 노력해 보세요!";
    }

    return (
        <div style={{textAlign: 'center'}}>
            <div className="text-center">
                <p className="coinname">{firstItem.cm_nm} 코인</p>
                <Image src={trophySrc} preview={false}/>
                <h2 className="coinFontSize">
          <span className="ellipsis d-inline-block" style={{width: '130px'}} title={`${firstItem.send_coin_percent}개`}>
            {firstItem.send_coin_percent}개
          </span>
                </h2>
                <span>
          전체 구성원 중 상위 {sendCoinPercent}%입니다. {sendCoinPercentText}
        </span>
            </div>
        </div>
    );
}

const CoinStatusCard = ({receiveCoinList, sendCoinList}) => {
    const [activeCoinStatusTab, setActiveCoinStatusTab] = useState("1");

    const onChangeCoinStatus = (e) => {
        setActiveCoinStatusTab(e.target.value); // 탭 변경
    };

    return (
        <Card
            title="코인 현황"
            style={{width: '100%', height: '30%'}}
            extra={
                <Flex vertical gap="middle">
                    <Radio.Group onChange={onChangeCoinStatus} defaultValue="1">
                        <Radio.Button value="1">받은</Radio.Button>
                        <Radio.Button value="2">보낸</Radio.Button>
                    </Radio.Group>
                </Flex>
            }
        >
            {activeCoinStatusTab === "1" ? renderReceiveCoinInfo(receiveCoinList) : renderSendCoinInfo(sendCoinList)}
        </Card>
    );
};

export default CoinStatusCard;