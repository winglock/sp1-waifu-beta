// Basic Express server setup
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

// 해시 생성 함수 가져오기
const { calculateInitialHash, calculateNextHash } = require('./choiceHasherNode');

// Middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '..', 'frontend', 'HowToMeaLWithNayeon')));

console.log('Frontend directory path:', path.join(__dirname, '..', 'frontend', 'HowToMeaLWithNayeon'));

// Define routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'HowToMeaLWithNayeon', 'index.html'));
});

// API routes can be added here
app.get('/api/status', (req, res) => {
  res.json({ status: 'Server is running' });
});

// 선택지 기록 API 엔드포인트
app.post('/record-choice', (req, res) => {
  try {
    console.log('[서버] 선택지 기록 API 호출됨');
    console.log('[서버] 요청 본문:', JSON.stringify(req.body));
    
    const { choiceId, previousPathHash, choicePath } = req.body;
    
    if (!choiceId || !previousPathHash) {
      console.error('[서버] 필수 파라미터 누락:', { choiceId, previousPathHash });
      return res.status(400).json({ 
        success: false, 
        message: '선택지 ID와 이전 해시가 필요합니다.' 
      });
    }
    
    console.log(`[서버] 선택지 기록 요청 수신: ${choiceId}`);
    console.log(`[서버] 이전 해시: ${previousPathHash}`);
    console.log(`[서버] 현재 선택 경로: ${JSON.stringify(choicePath)}`);
    
    // 새 해시 계산
    const newHash = calculateNextHash(previousPathHash, choiceId);
    console.log(`[서버] 새 해시 생성됨: ${newHash}`);
    
    // 해시 저장 디렉토리 확인 및 생성
    const hashesDir = path.join(__dirname, 'hash');
    console.log(`[서버] 해시 저장 디렉토리 경로: ${hashesDir}`);
    
    if (!fs.existsSync(hashesDir)) {
      try {
        fs.mkdirSync(hashesDir, { recursive: true });
        console.log(`[서버] '${hashesDir}' 디렉토리가 생성되었습니다.`);
      } catch (dirError) {
        console.error(`[서버] 디렉토리 생성 오류: ${dirError.message}`);
        throw new Error(`해시 디렉토리 생성 실패: ${dirError.message}`);
      }
    }
    
    // 해시 기록을 파일에 저장
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] 선택: ${choiceId} | 이전 해시: ${previousPathHash} | 계산된 다음 해시: ${newHash}\n`;
    const hashFilePath = path.join(hashesDir, 'live_interaction_hashes.txt');
    
    try {
      fs.appendFileSync(hashFilePath, logEntry, 'utf8');
      console.log(`[서버] ✅ 해시가 성공적으로 생성되었습니다!`);
      console.log(`[서버] ✅ 해시가 성공적으로 저장됨: ${hashFilePath}`);
    } catch (fileError) {
      console.error(`[서버] ❌ 해시 파일 쓰기 실패: ${fileError.message}`);
      throw new Error(`해시 파일 쓰기 실패: ${fileError.message}`);
    }
    
    // 클라이언트에 응답
    console.log('[서버] 클라이언트에 성공 응답 전송');
    res.json({ 
      success: true, 
      newHash: newHash,
      message: '선택지가 성공적으로 기록되었습니다.'
    });
    
  } catch (error) {
    console.error('[서버] ❌ 선택지 기록 중 오류 발생:', error);
    console.error('[서버] ❌ 해시 생성 실패!');
    res.status(500).json({ 
      success: false, 
      message: '서버 오류가 발생했습니다.', 
      error: error.message 
    });
  }
});

// 초기 해시 API 엔드포인트 추가
app.get('/api/initial-hash', (req, res) => {
  try {
    const initialHash = calculateInitialHash();
    console.log(`[서버] 초기 해시 요청 - 생성된 해시: ${initialHash}`);
    res.json({ success: true, initialHash: initialHash });
  } catch (error) {
    console.error('[서버] 초기 해시 생성 오류:', error);
    res.status(500).json({ success: false, message: '초기 해시 생성 실패', error: error.message });
  }
});

// 서버 시작 시 해시 디렉토리 초기화
const hashesDir = path.join(__dirname, 'hash');
if (!fs.existsSync(hashesDir)) {
  try {
    fs.mkdirSync(hashesDir, { recursive: true });
    console.log(`[서버] '${hashesDir}' 디렉토리가 생성되었습니다.`);
  } catch (dirError) {
    console.error(`[서버] 디렉토리 생성 오류: ${dirError.message}`);
  }
}

// 초기 해시 파일 생성 확인
const hashFilePath = path.join(hashesDir, 'live_interaction_hashes.txt');
if (!fs.existsSync(hashFilePath)) {
  try {
    const initialHash = calculateInitialHash();
    const timestamp = new Date().toISOString();
    const initialEntry = `[${timestamp}] 서버 시작 | 초기 해시: ${initialHash}\n`;
    fs.writeFileSync(hashFilePath, initialEntry, 'utf8');
    console.log(`[서버] 초기 해시 파일이 생성되었습니다: ${hashFilePath}`);
  } catch (fileError) {
    console.error(`[서버] 초기 해시 파일 생성 오류: ${fileError.message}`);
  }
}

// Start the server
app.listen(port, () => {
  console.log(`[서버] 서버가 포트 ${port}에서 실행 중입니다`);
  console.log(`[서버] 브라우저에서 http://localhost:${port} 를 열어주세요`);
  console.log('[서버] 서버를 중지하려면 Ctrl+C를 누르세요');
  console.log('[서버] 해시 생성 및 저장 기능이 활성화되었습니다');
});