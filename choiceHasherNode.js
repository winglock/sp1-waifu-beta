const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// 프론트엔드 JavaScript 코드 및 Rust 코드와 일관성을 유지해야 하는 상수
const GAME_ID_PREFIX = "MyVisualNovelV1_PathHash_";
const INITIAL_STATE_STRING = "INITIAL_STATE";

/**
 * 주어진 문자열의 SHA-256 해시를 계산하여 16진수 문자열로 반환합니다.
 * @param {string} data - 해시할 문자열입니다.
 * @returns {string} 16진수로 인코딩된 SHA-256 해시 값입니다.
 */
function sha256Hex(data) {
    const hash = crypto.createHash('sha256');
    hash.update(data);
    return hash.digest('hex');
}

/**
 * 게임의 초기 상태 해시 (H_0)를 계산합니다.
 * H_0 = SHA256(GAME_ID_PREFIX + INITIAL_STATE_STRING)
 * @returns {string} 초기 상태 해시의 16진수 문자열입니다.
 */
function calculateInitialHash() {
    const initialData = `${GAME_ID_PREFIX}${INITIAL_STATE_STRING}`;
    return sha256Hex(initialData);
}

/**
 * 이전 해시와 현재 선택지 ID를 기반으로 다음 해시 (H_n)를 계산합니다.
 * H_n = SHA256(H_{n-1} + choice_id)
 *
 * @param {string} previousHashHex - 이전 단계까지 누적된 해시의 16진수 문자열 (H_{n-1}).
 * @param {string} choiceId - 현재 선택한 선택지의 고유 식별자 문자열.
 * @returns {string} 새로 계산된 해시의 16진수 문자열 (H_n).
 */
function calculateNextHash(previousHashHex, choiceId) {
    const dataToHash = `${previousHashHex}${String(choiceId)}`; // choiceId를 명시적으로 문자열 변환
    return sha256Hex(dataToHash);
}

// 메인 로직 실행 (테스트 및 파일 저장용)
function runHashingTestAndSave() {
    console.log("--- Node.js SHA-256 해시 체인 테스트 ---");

    // 해시를 저장할 디렉토리 및 파일 경로 설정
    // const hashesDir = path.join(__dirname, 'hash'); // 현재 파일 기준 상대 경로 사용 시
    const hashesDir = "C:\\Users\\User\\Desktop\\my first waifu sp1\\backend\\hash"; // 사용자 요청 절대 경로
    const hashFilePath = path.join(hashesDir, "test_hashes_nodejs.txt");

    // 'hash' 디렉토리가 없으면 생성
    if (!fs.existsSync(hashesDir)) {
        try {
            fs.mkdirSync(hashesDir, { recursive: true });
            console.log(`'${hashesDir}' 디렉토리가 생성되었습니다.`);
        } catch (e) {
            console.error(`오류: '${hashesDir}' 디렉토리 생성 실패 - ${e.message}`);
            return;
        }
    }

    let fileContentToAppend = `--- 새로운 테스트 실행 (${new Date().toISOString()}) ---\n`;
    console.log(`해시 저장 경로: ${hashFilePath}`);

    // 1. 초기 해시 생성 (H_0)
    const h0 = calculateInitialHash();
    const logH0 = `H_0 (초기 상태 해시): ${h0}`;
    console.log(logH0);
    fileContentToAppend += `${logH0}\n`;

    // 2. 첫 번째 선택
    const choice1Id = "scene_start_choice_korean"; // 예시 선택지 ID
    const h1 = calculateNextHash(h0, choice1Id);
    const logH1 = `선택 1 ('${choice1Id}') -> H_1: ${h1}`;
    console.log(logH1);
    fileContentToAppend += `${logH1}\n`;

    // 3. 두 번째 선택
    const choice2Id = "korean_eat_talk";
    const h2 = calculateNextHash(h1, choice2Id);
    const logH2 = `선택 2 ('${choice2Id}') -> H_2: ${h2}`;
    console.log(logH2);
    fileContentToAppend += `${logH2}\n`;

    // 4. 세 번째 선택 (엔딩 도달 가정)
    const choice3Id = "ending_good_korean";
    const h3FinalEndingHash = calculateNextHash(h2, choice3Id);
    const logH3 = `선택 3 ('${choice3Id}') -> H_3 (최종 엔딩 해시): ${h3FinalEndingHash}`;
    console.log(logH3);
    fileContentToAppend += `${logH3}\n`;
    fileContentToAppend += `--- 테스트 종료 ---\n\n`;

    try {
        fs.appendFileSync(hashFilePath, fileContentToAppend);
        console.log(`해시가 '${hashFilePath}' 파일에 저장되었습니다.`);
    } catch (e) {
        console.error(`오류: '${hashFilePath}' 파일 쓰기 실패 - ${e.message}`);
    }
}

// 이 파일이 직접 실행될 때 runHashingTestAndSave 함수 호출
if (require.main === module) {
    runHashingTestAndSave();
}

// 다른 모듈에서 사용할 수 있도록 함수들을 export (선택 사항)
module.exports = {
    calculateInitialHash,
    calculateNextHash,
    sha256Hex,
    GAME_ID_PREFIX,
    INITIAL_STATE_STRING
}; 