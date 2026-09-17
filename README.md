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

- **헤더 로고** — 더존 워드마크(`img/logo.svg`)를 아이원소프트뱅크 로고
  (`img/logo_ione.png`)로 교체했습니다. 로고 가로세로비가 7:1에서 4.2:1로
  바뀌어 헤더 슬롯 너비를 120px에서 125px로 조정했습니다. 45px 헤더 바 안에서
  로고가 30px로 렌더링되어 위아래 여백이 균형을 이룹니다. 메인, PC 서브페이지,
  모바일 서브페이지 세 곳의 CSS에 모두 반영했습니다.
- **아웃트로 버튼** — `공식 홈페이지 바로가기`(amaranth10.com)를
  `아이원소프트뱅크 홈페이지 바로가기`(duzon119.co.kr)로 바꿨습니다.
  글자가 길어져 기존 고정 너비를 넘치므로, 버튼을 글자 길이에 맞춰 늘어나는
  방식(`width:auto` + `min-width`)으로 바꿨습니다. 오른쪽 여백은 화살표
  아이콘 자리를 확보하도록 잡아, 어떤 폰트로 렌더링되든 겹치지 않습니다.
- **푸터 로고 링크** — Amaranth10 · OmniEsol · WEHAGO 세 로고를 각각
  아이원소프트뱅크의 해당 제품 페이지로 연결했습니다.
- **도입상담 버튼** — 서브페이지 하단의 `Amaranth 10 도입상담 신청하기`를
  더존 구매문의(douzone.com)에서 아이원소프트뱅크 도입상담 페이지로
  바꿨습니다. 이 버튼은 `link/outro.html`과 `mobile/link/outro.html` 두
  조각 파일에만 있고, JS가 이를 38개 서브페이지 전체에 주입합니다.

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
