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
    price: bookFormData.get("price").trim(),
    publishDate: bookFormData.get("publishDate").trim(),
    description: bookFormData.get("description").trim(),
    language: bookFormData.get("language").trim(),
    pageCount: bookFormData.get("pageCount").trim(),
    coverImageUrl: bookFormData.get("coverImageUrl").trim(),
    edition: bookFormData.get("edition").trim()
}

  if(!validateBook(bookData)) {
        // 검증체크 실패하면 리턴하기기
        return;
    }

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
    if (!book.publishDate) {
        alert("출판일을 입력해주세요.");
        return false;
    }   
    if (!book.description) {
        alert("설명을 입력해주세요.");
        return false;
    }  
    if (!book.language) {
        alert("언어를 입력해주세요.");
        return false;
    }
    if (!book.pageCount) {
        alert("페이지 수를 입력해주세요.");
        return false;
    }
    if (!book.publisher) {
        alert("발행지를 입력해주세요.");
        return false;
    }
    if (!book.coverImageUrl) {
        alert("표지 이미지를 입력해주세요.");
        return false;
    }
    if (!book.edition) {
        alert("판을 입력해주세요.");
        return false;
    }


    // ISBN 형식 검사 (예: 0000000000(13자리))
    const isbnPattern = /^(97(8|9))?\d{9}(\d|X)$/;
    if (!isbnPattern.test(book.isbn)) {
        alert("올바른 ISBN 형식이 아닙니다.");
        return false;
    }
    // 가격 형식 검사 (숫자만 허용)
    const pricePattern = /^\d+$/;
    if (!pricePattern.test(book.price)) {
        alert("가격은 숫자만 입력 가능합니다.");
        return false;
    }
    // 페이지 수 형식 검사 (숫자만 허용)
    const pageCountPattern = /^\d+$/;
    if (!pageCountPattern.test(book.pageCount)) {
        alert("페이지 수는 숫자만 입력 가능합니다.");
        return false;
    }
    // url 형식 검사
    const urlPattern = /^(https?:\/\/[^\s$.?#].[^\s]*)$/;
    if (!urlPattern.test(book.coverImageUrl)) {
        alert("올바른 URL 형식이 아닙니다.");
        return false;
    }

    return true;
}//validateBook


//학생목록 로드하는 함수
function loadBooks() {
  console.log("학생 목록 로드 중.....");
}
