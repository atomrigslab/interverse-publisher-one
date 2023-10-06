# interverse-publisher

## 시작
```
$ yarn

# en과 kr 디렉토리에 렌더링된 html 파일들이 생성됩니다.
$ node renderer.js

# 브라우저에서
# http://localhost:5555
```

## 작업
- `src` 디렉토리의 html들과 `css`, `js` 디렉토리들의 css, js 파일들을 수정하시면 됩니다.
- `html`` 파일들을 수정&저장 하면 en/kr 디렉토리에 재렌더링된 html 파일들이 저장됩니다.
- `css`와 `js` 파일들은 수정&저장 하고 브라우저에서 '강력 새로 고침'을 하셔야 수정된 버전이 적용됩니다.
- `assets` 디렉토리의 `texts.json`은 언어별 텍스트들을 담고 있습니다. 이 파일의 내용을 변경시에는 renderer.js 프로그램을 재시작 해주셔야 합니다.

## 문구
texts.json 에 있는 값들을 html 내에서 사용하는 방법
<span><%= json.프로퍼티.이름 %></span>

## 배포
`main` 브랜치에 커밋&푸시 하시면 바로 배포됩니다. (github page로 웹사이트 만듬)
