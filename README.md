![image](https://user-images.githubusercontent.com/66008508/236441351-7053b345-d5a7-4040-858a-52990b4b97a3.png)

# 원티드 프리온보딩 프론트엔드 - 1팀

휴먼 스케이프 기업 과제 수행

#### [과제 목표](#📜과제-목표)

[한국 임상정보 사이트](https://clinicaltrialskorea.com/)의 검색 영역 클론 코딩

---

#### 배포링크 : https://main--pre-onboarding-2-1.netlify.app/

#### 팀 노션 : [page link](https://iamdooddi.notion.site/T1-8d53ec6136ce454e95de6cd5c0e0ed9b)

#### 협업 방식 : [page link](https://iamdooddi.notion.site/d4d24d73a2e9441597ca69da749fd8a1)

## 팀 소개

| 이름          | github                          |
| ------------- | ------------------------------- |
| 엄성현 (팀장) | https://github.com/eomsteve     |
| 전하준        | https://github.com/Majesty-jun  |
| 차동엽        | https://github.com/dongyeopca   |
| 노지원        | https://github.com/no-support   |
| 손유정        | https://github.com/yuj1818      |
| 김다현        | https://github.com/Plu457       |
| 정승덕        | https://github.com/seungdeok    |
| 최승주        | https://github.com/VictoryJu    |
| 박우현        | https://github.com/woohyun-park |
| 갈미현        | https://github.com/Kal-MH       |

## 프로젝트 구조

```
📦src
 ┣ 📂api
 ┃ ┣ 📜api.ts
 ┃ ┣ 📜keyword.ts
 ┃ ┗ 📜localStorage.ts
 ┣ 📂assets
 ┃ ┣ 📜IllustPersonOne.tsx
 ┃ ┣ 📜IllustPersonThree.tsx
 ┃ ┣ 📜IllustPersonTwo.tsx
 ┃ ┗ 📜index.ts
 ┣ 📂components
 ┃ ┣ 📂common
 ┃ ┃ ┣ 📜CMContainer.tsx
 ┃ ┃ ┗ 📜CMNoticeLIne.tsx
 ┃ ┣ 📂keyword
 ┃ ┃ ┣ 📜KeywordInput.tsx
 ┃ ┃ ┣ 📜KeywordList.tsx
 ┃ ┃ ┣ 📜KeywordMain.tsx
 ┃ ┃ ┗ 📜KeywordRecent.tsx
 ┃ ┗ 📂main
 ┃ ┃ ┣ 📜Background.tsx
 ┃ ┃ ┗ 📜Main.tsx
 ┣ 📂hooks
 ┃ ┣ 📜useDebounce.ts
 ┃ ┣ 📜useForwardRef.ts
 ┃ ┗ 📜useOutsideClick.ts
 ┣ 📂pages
 ┃ ┗ 📂main
 ┃ ┃ ┗ 📜MainPage.tsx
 ┣ 📂routes
 ┃ ┗ 📜Router.tsx
 ┣ 📂styles
 ┃ ┗ 📜global.ts
 ┣ 📂types
 ┃ ┗ 📜keyword.ts
 ┣ 📂utils
 ┃ ┣ 📂const
 ┃ ┃ ┣ 📜keyboard.ts
 ┃ ┃ ┗ 📜keyword.ts
 ┃ ┣ 📜debounce.ts
 ┃ ┣ 📜handleSliceData.ts
 ┃ ┣ 📜highlight.ts
 ┃ ┗ 📜isExpired.ts
 ┣ 📜App.tsx
 ┣ 📜index.css
 ┣ 📜index.tsx
```

---

#### local실행시

```shell
npm install && npm run start
```

# 📜과제 목표

- [검색창 구현](##🔍검색창)
- [검색어 추천 기능 구현](##🔍검색어-추천-기능)
- [캐싱 기능 구현](##💽캐싱)

## 🔍검색창

임상 시험을 검색하는 검색창을 구현했습니다.
검색창을 클릭했을 경우 outline ring으로 focus 해주고, 추천검색어와 최근검색어를 확인할 수 있습니다. 입력창에 검색어를 입력할 경우 검색어에 따른 추천 검색어 리스트를 확인할 수 있습니다.

![녹화_2023_05_05_20_09_50_259](https://user-images.githubusercontent.com/66008508/236443228-d1e152c2-a968-4091-ab07-ecda1e303048.gif)

### 검색창 클릭

- 검색창 클릭시 focus ring활성화
- 추천검색어, 최근검색어 창 활성화

![image](https://user-images.githubusercontent.com/66008508/236441582-ed7a0630-8ec7-4dbe-beb8-4932e17913ae.png)

### 검색창 바깥 클릭

- 검색창에서 벗어났으므로 focus ring 비활성화
- 추천 검색어 창 비활성화

```ts
import { useEffect, RefObject } from 'react';

const useOutsideClick = (ref: RefObject<any>, callback: Function) => {
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
};

export default useOutsideClick;
```

### [최근 검색어](https://github.com/wanted-intern-1/pre-onboarding-10th-2-1/blob/main/src/api/localStorage.ts)

로컬스토리지에 최근에 검색했던 기록을 저장하여 검색창을 이용할때 가장 처음으로 나타날수 있게 구현했습니다.

```ts
...
export const getRecentKeywords = () => {
  return JSON.parse(localStorage.getItem(CSKeyword.RECENT_KEY) || '[]');
};

export const addRecentKeyword = (recent: string) => {
  const recents = getRecentKeywords();
  const jsonRecents = JSON.stringify(
    handleSliceData([recent, ...recents.filter((e: string) => e !== recent)])
  );
  localStorage.setItem(CSKeyword.RECENT_KEY, jsonRecents);
};
```

### 키보드만으로 추천 검색어들로 이동

#### [키보드 동작](https://github.com/wanted-intern-1/pre-onboarding-10th-2-1/blob/main/src/components/keyword/KeywordInput.tsx)

- 키보드 UP/DOWN을 사용하여 최근/추천 검색어 선택
- 돋보기를 눌러 검색 (선택된 검색어를 최근 검색어에 추가)
- 선택된 검색어가 있다면, 엔터를 눌러 검색
- 선택된 검색어가 없고 keyword(사용자 입력값)가 존재하면 엔터를 눌러 검색
- 검색시 keyword를 알맞게 변경

  | e.g. keyword는 ""인 상태이고, 최근 검색어 중 "비만"을 선택 후 검색하였다면 keyword를 "비만"으로 변경

```typescript
const handleSearchKeyword = () => {
  handleEnterPress(keyword, getRecentKeywords());
};

const handleEnterPress = (keyword: string, recents: string[]) => {
  refLocal.current.blur();
  setIsClick(false);
  setSelectIndex(-1);
  let recent;
  // 엔터키 입력시, 선택된 검색어가 있다면 검색
  if (keyword) {
    handleSearch(keyword);
    recent = selectIndex === -1 || selectIndex === 0 ? keyword : keywords[selectIndex - 1].name;
  } else {
    if (selectIndex === -1) return;
    recent = recents[selectIndex - 1];
  }
  addRecentKeyword(recent);
  setKeyword(recent);
};

const moveRecentUp = (recents: string[]) => {
  setSelectIndex((prev) => (prev <= 1 ? recents.length : prev - 1));
};

const moveKeywordUp = (keywords: IKeyword[]) => {
  setSelectIndex((prev) => (prev <= 0 ? keywords.length : prev - 1));
};

const moveRecentDown = (recents: string[]) => {
  setSelectIndex((prev) => (selectIndex === -1 ? 1 : prev >= recents.length ? 1 : prev + 1));
};

const moveKeywordDown = (keywords: IKeyword[]) => {
  setSelectIndex((prev) => (prev >= keywords.length - 1 ? 0 : prev + 1));
};

const handleKeyPress = (e: React.KeyboardEvent) => {
  if (e.nativeEvent.isComposing) return;
  // 최근검색어가 있다면 키보드 이벤트를 통해서 이동가능
  const recents = JSON.parse(localStorage.getItem(CSKeyword.RECENT_KEY) || '[]');
  const moveUp = keyword ? moveKeywordUp : moveRecentUp;
  const moveDown = keyword ? moveKeywordDown : moveRecentDown;

  switch (e.key) {
    case keyboards.ESCAPE:
      setKeyword('');
      break;
    case keyboards.ENTER:
      handleEnterPress(keyword, recents);
      break;
    case keyboards.DOWN:
      e.preventDefault();
      moveDown(keyword ? keywords : recents);
      break;
    case keyboards.UP:
      e.preventDefault();
      moveUp(keyword ? keywords : recents);
      break;
    default:
      break;
  }
};
```

### 검색창 입력

입력마다 API 호출하지 않도록 API **호출 횟수를 줄이는 전략** 수립

### [useDebounce](https://github.com/wanted-intern-1/pre-onboarding-10th-2-1/blob/main/src/hooks/useDebounce.ts)

input의 `onChange`이벤트가 호출될때 사용자의 입력을 감지하고 200ms 이내에 추가 입력이 없다면 입력이 끝난것으로 판단, 입력이 끝났을때만 API호출 전략을 사용했습니다.

```typescript
import { useState, useEffect } from 'react';

export function useDebounce(value: string) {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  return debouncedValue;
}
```

### 검색된 문자 강조

검색창에 검색어 입력시, 추천 키워드에 입력한검색어가 하이라이트 되도록 구현했습니다.

```ts
export const highlight = (name: string, keyword: string) => {
  if (!name) return '';
  const index = name.toLowerCase().indexOf(keyword.toLowerCase());
  if (index !== -1) {
    return name.replace(new RegExp(`(${keyword})`, 'giu'), '<strong>$1</strong>');
  }
  return name;
};
```

## 🔍검색어 추천 기능

검색창에 입력된 값을 통해 API를 호출하여 추천 검색어 리스트를 확인 할 수 있습니다.

![녹화_2023_05_05_20_22_33_587](https://user-images.githubusercontent.com/66008508/236445121-96446072-3682-4d2a-b4de-0ef23f2d503f.gif)

- API를 호출할 때 마다 console.info("calling api") 출력을 통해 콘솔창에서 API 호출 횟수 확인
- 캐싱된 값을 이용해 API를 매번 호출하지 않고, 한번 호출 되었던 API일 경우 캐싱된 값 이용

### 검색어 결과값 길이 제한

검색 결과가 많을경우 결과값 상위5개의 결과값만 노출했습니다.

```ts
export const handleSliceData = (data: [] | any) => {
  return data.slice(0, CSKeyword.MAX_LEN);
};
```

## 💽캐싱

web API의 CachingStorage를 활용하여 url요청에 대한 캐시값을 저장하기 위해 fetchAPI를 이용해 구현했습니다. 이미 입력했던 키워드일 경우 캐싱된 데이터를 사용하며 API 호출을 보내지 않습니다. 만약 시간이 지나 캐시된 데이터가 사라졌거나, 처음 검색하는 키워드일 경우 API 통신후 CacheStorage에 캐싱합니다.

[CacheAPI 공식문서](https://developer.mozilla.org/en-US/docs/Web/API/Cache)

### 브라우저에 저장된 캐시데이터

![image](https://user-images.githubusercontent.com/66008508/236444391-4e325512-880c-451e-a1d4-2267312079bf.png)

```typescript
// utils/isExpired
export const isExpired = (cachedAt: string | null) => {
  if (!cachedAt) return true;
  return new Date(cachedAt).getTime() + CSKeyword.EXPIRE_TIME < new Date().getTime();
};

// api/keyword
const BASE_URL = '/api/v1/search-conditions';

const needFetch = async (keyword: string) => {
  const url = `${BASE_URL}/?name=${keyword}`;
  const cache = await caches.open('keywords');
  const cachedData = await cache.match(url);

  if (!cachedData || isExpired(cachedData.headers.get('date'))) {
    return true;
  }
  return false;
};

const formatCache = async (cacheData: Response | undefined) => {
  return await cacheData?.json();
};

const fetchData = async (keyword: string) => {
  if (!keyword) return [];

  const url = `${BASE_URL}/?name=${keyword}`;
  const cache = await caches.open('keywords');

  if (await needFetch(keyword)) {
    //api 호출 후 정상 호출되면 caching
    console.info('calling api');
    await cache.add(url);
  }

  const cachedData = await cache.match(url);
  return formatCache(cachedData);
};

const keywordApi = {
  fetchData,
};

export default keywordApi;
```

### LocalStorage vs CacheAPI

localStorage로 검색 결과를 캐싱하는 전략을 사용하는 방법을 고려했으나 캐싱데이터의 생명주기를 expiredTime 으로 관리해야 했습니다. expiredTime이 지날경우 데이터를 삭제 하는 기능을 구현하기 위해선 특정 시점에서 localStorage를 탐색하고, 제거해주어야 하는 기능이 필요했습니다. 이 기능을 구현하기 보다는, expiredTime으로 캐시 데이터를 잘 활용할 수 있는 `CacheStorage`, `CacheAPI`를 적용했습니다. `CacheAPI`는 url요청시 `fetch`문법을 사용 해서 API 통신을 시도하게 되는데 기존의 `axios`와는 호환이 안되는문제가 있어 전체 프로젝트의 API통신 부분을 `axios` 에서 `fetch` 로 수정하여 구현했습니다.
