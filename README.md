
# 프로젝트 이름: My Movie Web

## 프로젝트 기본 정보
**My Movie Web**은 영화 정보를 검색하고 위시리스트를 관리할 수 있는 웹 애플리케이션입니다.  
사용자는 TMDb API를 활용하여 인기 영화, 특정 검색어에 따른 영화 정보를 확인하고 위시리스트를 구성할 수 있습니다.  
검색, 필터링, 정렬 기능을 통해 다양한 영화 데이터를 효과적으로 탐색할 수 있습니다.

---

## 기술 스택 명시
### **Frontend**
- **React**: 사용자 인터페이스 구성
- **React Router**: 클라이언트 사이드 라우팅
- **React Icons**: 아이콘 사용 (ex. 좋아요 아이콘)
- **React Toastify**: 알림 메시지 구현
- **CSS**: 스타일링 및 반응형 디자인

### **Backend**
- **TMDb API**: 영화 데이터 가져오기

---

## 설치 및 실행 가이드
### 1. 프로젝트 클론
```bash
git clone https://github.com/eecczz/my-movie-web.git
cd my-movie-web
```

### 2. 의존성 설치
```bash
위 프로젝트 폴더 경로에서 아래 명령어 실행
npm install

```

### 3. 환경 변수 설정
프로젝트 루트 디렉토리에 `.env.production`,`.env.development`  파일을 생성하세요.

### 4. 개발 서버 실행
```bash
npm start
```
- 브라우저에서 [http://localhost:3001/my-movie-web](http://localhost:3001/my-movie-web)을 열어 애플리케이션을 실행합니다.

---

## 프로젝트 (폴더) 구조 설명
```
src/
├── components/                   # 주요 컴포넌트 폴더
│   ├── Auth.css                  # 로그인 및 회원가입 관련 스타일
│   ├── Header.css                # 헤더 스타일
│   ├── Header.js                 # 헤더 컴포넌트
│   ├── HomeMain.css              # 홈 페이지 스타일
│   ├── HomeMain.js               # 홈 페이지 메인 컴포넌트
│   ├── Loading.css               # 로딩 화면 스타일
│   ├── Loading.js                # 로딩 화면 컴포넌트
│   ├── Popular.css               # 인기 콘텐츠 스타일
│   ├── Popular.js                # 인기 콘텐츠 컴포넌트
│   ├── SearchResults.css         # 검색 결과 페이지 스타일
│   ├── SearchResults.js          # 검색 결과 페이지 컴포넌트
│   ├── SignIn.js                 # 로그인 페이지 컴포넌트
│   ├── SignUp.js                 # 회원가입 페이지 컴포넌트
│   ├── Table.css                 # 테이블 관련 스타일
│   ├── useRecommendations.js     # 추천 로직 관련 커스텀 훅
│   ├── Wishlist.css              # 위시리스트 스타일
│   ├── Wishlist.js               # 위시리스트 컴포넌트
│
├── services/                     # 서비스 로직 폴더
│   ├── Authentication.js         # 인증 관련 API 로직
│   ├── URL.js                    # API URL 관련 파일
│   ├── useWishlist.js            # 위시리스트 관련 커스텀 훅
│
├── App.css                       # 글로벌 스타일링
├── App.js                        # 앱 엔트리 포인트

```

---

### 주요 기능
1. **영화 탐색**: TMDb API를 통해 인기 영화와 검색된 영화를 확인.
2. **필터 및 정렬**: 장르, 평점, 정렬 기준을 선택하여 데이터 탐색.
3. **위시리스트 관리**: 영화를 위시리스트에 추가하거나 제거.
4. **사용자 경험**: 부드러운 애니메이션과 맨 위로 버튼을 통해 향상된 UI 제공.
5. **카카오 로그인**: KakaoAPI를 사용한 카카오 로그인.