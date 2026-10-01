# Amaranth 10 랜딩 페이지

더존비즈온 **Amaranth 10** 소개 페이지의 정적 사이트입니다.

원본: <https://innovationlab.co.kr/project/douzone2025-3/>

## 배포

GitHub Pages로 서비스합니다. 저장소 루트가 곧 사이트 루트입니다.

- **Settings → Pages → Source**: `Deploy from a branch`
- **Branch**: `main` / `/ (root)`
- 배포 주소: <https://dwww9292-collab.github.io/duzonmall/>

`.nojekyll` 파일이 있어 Jekyll 빌드를 건너뛰고 파일을 그대로 서빙합니다.

## 구조

```
index.html              메인 페이지 (반응형)
css/                    메인 · 서브 페이지 스타일
js/                     jQuery, GSAP, ScrollMagic, Swiper 연동, marquee3k
img/                    이미지 323개 (webp / svg / png / jpg)
link/                   PC 서브 페이지 19개 (스크롤 중 열리는 상세 레이어)
mobile/                 모바일 서브 페이지 19개 및 전용 이미지
common/                 사이트 공통 CSS · JS · 이미지
images/favicon/         파비콘 및 앱 아이콘
```

총 616개 파일 / 약 54MB.

## 경로 정책

원본은 모든 자산을 `https://innovationlab.co.kr/...` 절대경로로 참조합니다.
이 저장소에서는 전부 **상대경로로 변환**해 원본 서버 없이도 단독으로 동작합니다.

다만 다음 메타 태그는 절대경로를 그대로 두었습니다. 카카오톡·페이스북 공유
시 미리보기 이미지가 정상적으로 뜨게 하기 위해서입니다.

`canonical`, `og:url`, `og:image`, `kakao:image`, `twitter:image`

## 아이원소프트뱅크 커스터마이징

원본을 그대로 미러링한 뒤, 아이원소프트뱅크용으로 아래를 수정했습니다.

- **헤더 로고** — 사용자가 제공한 2084×754px 투명 PNG 원본을 참고해
  윤곽을 보정한 고해상도 투명 PNG `img/logo-ione-smooth.png`를 적용했습니다.
  내장 image_gen 도구를 사용했으며 제작 조건은 `img/logo-restoration-prompt.txt`에
  저장했습니다. 원본은 `img/logo-ione-hd.png`로 보존합니다. 검정 글자와 파란색 O, 하단 파트너
  문구를 유지합니다. 공통 스타일 `common/css/brand-header.css`가 메인 및
  PC·모바일 상세 페이지 39곳의 헤더를 100px 높이로 통일하고, 로고를 왼쪽에
  280px 너비로 배치합니다. 800px 이하에서는 240px, 560px 이하에서는
  180px로 조정하고 로고·SNS를 두 줄로 배치해 겹침을 방지합니다.
- **아웃트로 버튼** — `공식 홈페이지 바로가기`(amaranth10.com)를
  `아이원소프트뱅크 홈페이지 바로가기`(duzon119.co.kr)로 바꿨습니다.
  글자가 길어져 기존 고정 너비를 넘치므로, 버튼을 글자 길이에 맞춰 늘어나는
  방식(`width:auto` + `min-width`)으로 바꿨습니다. 오른쪽 여백은 화살표
  아이콘 자리를 확보하도록 잡아, 어떤 폰트로 렌더링되든 겹치지 않습니다.
- **푸터 로고 링크** — Amaranth10 · OmniEsol · WEHAGO 세 로고를 각각
  아이원소프트뱅크의 해당 제품 페이지로 연결했습니다.
- **마퀴 섹션 제거** — 히어로 바로 아래에 있던 검은 배경의 `sec2` 섹션(제목
  "데이터와 AI가 연결된 새로운 업무 표준"과 흐르는 말풍선 3줄)을 통째로
  없앴습니다. 마크업과 함께 `js/marquee3k.js` 로드, `functions.min.js` 안의
  Marquee3k 초기화·ScrollMagic 애니메이션도 지웠습니다. 이걸 남겨두면
  Marquee3k가 정의되지 않아 그 뒤 스크립트가 전부 중단됩니다.
  `img/avatar_1~9.min.webp`와 `js/marquee3k.js`는 참조가 사라졌지만 파일은
  그대로 두었습니다.
- **소셜 채널 아이콘** — 네이버 카페 · 네이버 블로그 · 인스타그램 · 카카오톡
  채널 · 유튜브를 컬러 2D SVG 일러스트로 제작했습니다.
  `common/img/sns-*-color.svg` 5개 파일로 각각 관리하며 기본 상태부터
  채널 색상이 표시됩니다. 각 링크의 클릭 영역은 44×44px이며, 키보드 포커스와
  모션 감소 설정을 지원합니다. 기존 채널 주소와 새 창 열기는 유지합니다.
- **innovation Lab 로고 제거** — 좌측 상단 로고와 innovationlab.co.kr 링크를
  40곳에서 지웠습니다.
- **중앙일보 GNB 제거** — 상단에 붙던 "The JoongAng" 바를 없앴습니다.
  `layout.gnb.renderHtml()` 호출을 20개 페이지에서 제거하고, 그 바에만
  쓰이던 외부 스타일시트(`static.joins.com`) `@import`도 함께 지웠습니다.
  (리셋 CSS는 `common.css`가 자체적으로 갖고 있어 영향 없습니다.)
  공통 헤더 스타일에서 `.rooftop` 높이를 100px로 지정하고 본문 상단에
  같은 높이의 여백을 확보해 고정 헤더가 콘텐츠를 가리지 않게 했습니다.
- **도입상담 버튼** — 서브페이지 하단의 `Amaranth 10 도입상담 신청하기`를
  더존 구매문의(douzone.com)에서 아이원소프트뱅크 도입상담 페이지로
  바꿨습니다. 이 버튼은 `link/outro.html`과 `mobile/link/outro.html` 두
  조각 파일에만 있고, JS가 이를 38개 서브페이지 전체에 주입합니다.

## 2026-10-01 디자인 업데이트

- 임직원 업무관리, 내부통제강화, 그룹웨어, 회계관리, 물류관리(유통)의
  실사 이미지를 `img/features/*-clay.png`의 클레이 3D 이미지 5개로 교체했습니다.
  기존 인사관리 이미지(`img/block_4.min.webp`)를 스타일 참고로 사용했으며,
  내장 image_gen 도구의 제작 프롬프트는 `img/features/generation-prompts.json`에
  저장했습니다. 기존 4개 클레이 이미지와 함께 카드 비율을 424:307로 통일했습니다.
- `css/design-enhancements.css`는 플랫폼 소개를 자연스럽게 스크롤되는
  레이아웃으로 배치합니다. `js/design-enhancements.js`가 내용 전체가 헤더 아래
  화면에 들어갈 때만 고정 표시를 활성화합니다. 작은 창, 모바일, 글자 확대에서는
  내용 높이에 따라 페이지가 늘어나므로 소개문 끝까지 스크롤할 수 있습니다.
- 서비스 섹션은 메인 비주얼의 `img/intro_bg.min.webp` 패턴을 재사용합니다.
  두 배너는 반투명 배경, 배경 블러, 밝은 테두리, 흰 글자를 조합한
  글래스모피즘 스타일이며 모바일에서도 상세 문구를 표시합니다.

## 원본과 다른 점

원본 사이트에서 가져올 수 없었던 두 파일이 있습니다.

- `mobile/` — 원본은 403을 돌려줍니다. 카카오 공유의 `mobileWebUrl`이 이 주소를
  가리키므로, 404 대신 루트로 보내는 리다이렉트 페이지를 새로 넣었습니다.
- `images/pc/article/i_noimg_journalist.jpg` — 원본에도 없는 파일(404)입니다.
  공통 CSS의 기자 프로필 기본 이미지로, 이 페이지에서는 쓰이지 않습니다.

## 외부 의존성

아래는 저장소에 포함하지 않고 원격에서 불러옵니다.

| 대상 | 용도 |
| --- | --- |
| cdn.jsdelivr.net | Pretendard 폰트, Swiper 11 |
| cdnjs.cloudflare.com | GSAP ScrollTrigger |
| api.joongang.co.kr | 섹션 영상 12개 |
| googletagmanager.com | GTM (`GTM-WN6D36V`) |
| developers.kakao.com | 카카오 공유 SDK |

## 라이선스

페이지 디자인과 콘텐츠의 권리는 더존비즈온에 있습니다.
