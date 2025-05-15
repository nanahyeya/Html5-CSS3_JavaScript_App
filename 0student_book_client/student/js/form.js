const API_BASE_URL = "http://localhost:8080";

//DOM 엘리먼트 가져오기
const bookForm = document.getElementById("bookForm");
const bookTableBody = document.getElementById("bookTableBody");

//Document Load 이벤트 처리하기
document.addEventListener("DOMContentLoaded",function(){
    loadBooks();
});

// Form Submit 이벤트 처리하기
bookForm.addEventListener("submit", function (event) {

    event.preventDefault(); // 기본 동작 방지, 기본으로 설정된 event가 동작하지 않도록 하기 위함
    console.log("Form이 제출 되었음.....");

    //FormData 객체생성 <form> 엘리먼트를 객체로 변환환
    const bookFormData = new FormData(bookForm);
        bookFormData.forEach((value, key) => {
        console.log(key + ' = ' +  value);
    });

    // 사용자 정의 객체 생성
    const bookData = {
        // 공백을 제거
        title: bookFormData.get("title").trim(),
        author: bookFormData.get("author").trim(),
        isbn: bookFormData.get("isbn").trim(), 
        price: bookFormData.get("price").trim() || null,
        publishDate: bookFormData.get("publishDate").trim() || null,
        detailRequset: {
            description: bookFormData.get("description").trim(),
            language: bookFormData.get("language").trim(),
            pageCount: bookFormData.get("pageCount").trim(),
            coverImageUrl: bookFormData.get("coverImageUrl").trim(),
            edition: bookFormData.get("edition").trim()
        }
    }

    if(!validateBook(bookData)) {
        // 검증체크 실패하면 리턴하기기
        return;
    }

    console.log('유효한 데이터:', bookData);

});

//데이터 유효성을 체크하는 함수
function validateBook(book) {// 필수 필드 검사
    if (!book.title) {
        alert("제목을 입력해주세요.");
        return false;
    }
    if (!book.author) {
        alert("저자명을 입력해주세요.");
        return false;
    }
    if (!book.isbn) {
        alert("ISBN을 입력해주세요.");
        return false;
    }
    if (!book.price) {
        alert("가격을 입력해주세요.");
        return false;
    }


    // ISBN 형식 검사 (기본적인 영숫자 조합)
    const isbnPattern = /^[0-9X-]+$/;
    if (!isbnPattern.test(book.isbn)) {
        alert('올바른 ISBN 형식이 아닙니다. (숫자와 X, -만 허용)');
        return false;
    }

    // 가격 유효성 검사
    if (book.price !== null && book.price < 0) {
        alert('가격은 0 이상이어야 합니다.');
        return false;
    }

    // 페이지 수 유효성 검사
    if (book.bookDetail.pageCount !== null && book.bookDetail.pageCount < 0) {
        alert('페이지 수는 0 이상이어야 합니다.');
        return false;
    }
    
    // URL 형식 검사 (입력된 경우에만)
    if (book.bookDetail.coverImageUrl && !isValidUrl(book.bookDetail.coverImageUrl)) {
        alert('올바른 이미지 URL 형식이 아닙니다.');
        return false;
    }

    return true;
}//validateBook


//학생목록 로드하는 함수
function loadBooks() {
  console.log("학생 목록 로드 중.....");
}
// URL 유효성 검사
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}
