export function getAvatarName(convertedNm, convertedLastNm) {
    let strImageUerName; // 기본값
    if (convertedNm.length >= 3) { // 이름 글자수가 3개 이상이면
        if (convertedLastNm == null) {
            strImageUerName = convertedNm.slice(-2);
        } else {
            if (convertedLastNm.length >= 3) { // 성 글자수가 3개 이상이면
                strImageUerName = convertedLastNm.slice(-2);
            } else {
                strImageUerName = convertedLastNm.slice(0, 1);
            }
        }
    } else {
        strImageUerName = convertedNm;
    }
    return strImageUerName;
}

export function getAvatarStyle(cuImgPath) {
    if (cuImgPath && !cuImgPath.includes('/')) {
        return {backgroundColor: cuImgPath, fontSize: '8px'};
    } else if (cuImgPath) {
        return {backgroundImage: `url(${cuImgPath})`, backgroundSize: 'cover'};
    }
    return {};
}

export function formatDate(dateString) {
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    return new Date(dateString).toLocaleDateString('ko-KR', options);
}

export function gfnGetDutyPositionTxt(duty, position) {
    let dutyPositionTxt = duty;
    if (!isNull(position) && position !== "-") {
        dutyPositionTxt += ' · ' + position;
    }

    return dutyPositionTxt;
}

export function isNull(val) {
    return typeof val === undefined || val == null || val.toString().replace(/(^\s*)|(\s*$)/g, "").length === 0;
}

export function gfnGetOtStatNm(ot_stat) {
    let otStatNm = "";
    if (ot_stat === "1") {
        otStatNm = "준비"
    } else if (ot_stat === "2") {
        otStatNm = "진행 중"
    } else if (ot_stat === "3") {
        otStatNm = "완료"
    }
    return otStatNm;
}

export function gfnGetOtStatColor(ot_stat) {
    let otStatColor = "";
    if (ot_stat === "1") {
        otStatColor = "#A1A5B7"
    } else if (ot_stat === "2") {
        otStatColor = "#50CD89"
    } else if (ot_stat === "3") {
        otStatColor = "#009EF7"
    }
    return otStatColor;
}

export function decodeHTMLEntities(text) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
}