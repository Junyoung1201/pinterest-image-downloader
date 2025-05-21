chrome.action.onClicked.addListener(tab => {

    if (!tab.id) {
        return;
    }

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {

            function getExt(str) {
                const i = str.lastIndexOf('.');
                return i > -1 ? str.slice(i) : '';
            }

            function getFileName() {
                const el = document.querySelector('div[data-test-id="pinTitle"] h1');
                return el && el.textContent ? el.textContent.trim() : '제목없음';
            }

            function stripUrl(url) {
                const q = url.indexOf('?');
                const h = url.indexOf('#');
                const ends = [q, h].filter(i => i > -1);
                const end = ends.length ? Math.min(...ends) : url.length;
                return url.slice(0, end);
            }

            function toSafeString(str) {
                const forbidden = new Set(['\\', '/', ':', '*', '?', '"', '<', '>', '|']);
                return [...str].filter(ch => !forbidden.has(ch)).join('');
            }

            function fetchBlob(url) {
                return new Promise((resolve, reject) => {
                    fetch(url, { mode: 'cors' })
                        .then(res => {
                            if (!res.ok) {
                                reject(new Error(`HTTP ${res.status}`));
                            }

                            return resolve(res.blob());
                        });
                })
            }

            function createBlobUrl(blob) {
                return URL.createObjectURL(blob);
            }

            function downloadFile(blobUrl, fileName) {
                const a = document.createElement('a');
                a.href = blobUrl;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                a.remove();
                URL.revokeObjectURL(blobUrl);
            }

            async function process() {
                const img = document.querySelector('div[data-test-id="pin-closeup-image"] img');

                if (!img) {
                    alert('이미지를 찾을 수 없습니다.');
                    return;
                }

                const cleanUrl = stripUrl(img.src);
                const ext = getExt(cleanUrl);
                const title = toSafeString(getFileName());
                const filename = title + ext;

                try {
                    const blob = await fetchBlob(cleanUrl);
                    const blobUrl = createBlobUrl(blob);
                    downloadFile(blobUrl, filename);
                } catch (err) {
                    console.error('다운로드 실패:', err);
                    alert('이미지 다운로드에 실패했습니다.');
                }
            }

            process();
        }
    }).catch(err => console.error('스크립트 주입 실패:', err));
});
