# Pinterest Image Downloader &nbsp;![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?logo=javascript&logoColor=black)

핀터레스트(Pinterest)에서 보고 있는 **단일 이미지**를 원클릭으로 저장하는 크롬 확장 프로그램입니다.  
`manifest_version: 3` 기반으로 제작되었습니다.


## 📌 기능
| 기능 | 설명 |
| --- | --- |
| **원클릭 다운로드** | 확장 아이콘 클릭하여 이미지를 다운로드합니다. |
| **자동 파일명 생성** | 핀 제목을 파일명으로 사용하고, Windows 또는 macOS에서 사용 불가한 문자를 자동으로 제거합니다. |
| **확장자 유지** | 이미지 URL의 확장자로 다운로드합니다. |
| **cors 우회 다운로드** | `fetch` + `blob` 조합으로 교차 출처 제한 없이 리소스를 가져옵니다. |


## 📌 사용 방법
핀터레스트에서 저장하고 싶은 단일 이미지 상세 페이지에서 확장 프로그램 아이콘 클릭
