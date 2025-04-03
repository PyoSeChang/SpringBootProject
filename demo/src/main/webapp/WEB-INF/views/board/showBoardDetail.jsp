<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../includes/header.jsp" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<div class="container mt-5">
	<h2>Board VIEW</h2>
	<input type="hidden" name="num" id="num" value="${board.num }">
	<table class="table table-hover">
		<tr>
			<th>글번호</th>
			<td>${board.num }</td>
		</tr>
		<tr>
			<th>작성자</th>
			<td>${board.userid }</td>
			<th>작성일</th>
			<td>  <c:choose>
				<c:when test="${not empty board.updatedate}">
					${board.updatedate} <span class="text-muted">(수정됨)</span>
				</c:when>
				<c:otherwise>
					${board.regdate}
				</c:otherwise>
			</c:choose></td>
		</tr>
		<tr>
			<th>글제목</th>
			<td colspan="3">${board.subject }</td>
		</tr>
		<tr>
			<th>내용</th>
		<td colspan="3">${board.content }</td>
		</tr>
	</table>
	<!-- 수정 버튼 및 폼 -->
	<form id="updateBoardForm" action="/board/verifyUpdate" method="post" style="display:inline;">
		<input type="hidden" name="num" value="${board.num}" />
		<input type="hidden" name="password" id="boardUpdatePassword" />
		<button type="button" class="btn btn-primary" onclick="requestBoardUpdate(${board.num})">수정</button>
	</form>
	<form id="deleteBoardForm" action="/board/deleteBoard" method="post" style="display:inline;">
		<input type="hidden" name="num" value="${board.num}" />
		<input type="hidden" name="password" id="boardDeletePassword" />
		<button type="button" class="btn btn-secondary" id="deleteBoard">삭제</button>
	</form>

</div>

<div class="container mt-3">
	<label for="userid">작성자:</label>
	<input type="text" class="form-control" id="userid" name="userid" placeholder="이름 입력" required />
	<label for="password">비밀번호</label>
	<input type="password" class="form-control" id="password" name="password" required />
	<label for="message" class="mt-3">내용:</label>
	<textarea class="form-control" id="message" name="message" placeholder="댓글 내용" rows="5" required></textarea>

	<input type="hidden" id="bnum" name="bnum" value="${board.num}" />

	<button class="btn btn-success btn-sm mt-3" id="btnComment">댓글 달기</button>
</div>

<div class="mt-5">
	<h5>댓글 목록 (<span class="cntSpan">${commentList.size()}</span>)</h5>
	<table class="table table-hover">
		<thead>
		<tr>
			<th>작성자</th>
			<th>내용</th>
			<th>작성일</th>
		</tr>
		</thead>
		<tbody>
		<c:forEach var="c" items="${commentList}">
			<tr class="comment-row">
				<td>${c.userid}<c:if test="${fn:trim(c.userid) == fn:trim(board.userid)
           and fn:trim(c.password) == fn:trim(board.password)}">
					<span class="badge bg-primary">작성자</span>
					</c:if></td>
				<td>${c.message}</td>
				<td><c:choose>
					<c:when test="${not empty c.updatedate}">
						${c.updatedate} <span class="text-muted">(수정됨)</span>
					</c:when>
					<c:otherwise>
						${c.regdate}
					</c:otherwise>
				</c:choose></td>
				<td>
					<form id="updateCommentForm_${c.cnum}" action="/comment/verifyUpdate" method="post" style="display:inline;">
						<input type="hidden" name="cnum" value="${c.cnum}" />
						<input type="hidden" name="bnum" value="${board.num}" />
						<input type="hidden" name="password" id="commentUpdatePassword_${c.cnum}" />

						<button type="button" class="btn btn-outline-secondary btn-sm"
								onclick="requestCommentUpdate(${c.cnum}, ${board.num})">
							수정
						</button>
					</form>
					<form id="deleteCommentForm_${c.cnum}" action="/comment/deleteComment" method="post" style="display:inline;">
						<input type="hidden" name="cnum" value="${c.cnum}" />
						<input type="hidden" name="bnum" value="${board.num}" />
						<input type="hidden" name="password" id="commentDeletePassword_${c.cnum}" />

						<button type="button" class="btn btn-outline-danger btn-sm"
								onclick="deleteComment(${c.cnum}, ${board.num})">
							삭제
						</button>
					</form>
				</td>
			</tr>
		</c:forEach>
		</tbody>
	</table>
</div>
<div style="margin-bottom: 200px;"></div>
<script>
function requestBoardUpdate(num) {
	const password = prompt("수정을 위해 비밀번호를 입력하세요:");
	if (password !== null && password.trim() !== "") {
		document.getElementById("boardUpdatePassword").value = password;
		document.getElementById("updateBoardForm").submit();
	}
}
$("#deleteBoard").click(function () {
	if (confirm("정말 삭제할까요?")) {
		const password = prompt("비밀번호를 입력하세요:");
		if (password !== null && password.trim() !== "") {
			$("#boardDeletePassword").val(password);
			$("#deleteBoardForm").submit();
		}
	}
});

$("#btnComment").click(function () {
	if ($("#message").val().trim() === "") {
		alert("메세지를 입력하세요");
		return;
	}
	if ($("#userid").val().trim() === "") {
		alert("작성자를 입력하세요");
		return;
	}

	$.ajax({
		type: "post",
		url: "/comment/insertComment",
		data: {
			message: $("#message").val(),
			bnum: $("#bnum").val(),
			userid: $("#userid").val(),
			password: $("#password").val()
		}
	})
			.done(function (resp) {
				alert("등록 완료");
				$("#message").val("");
				$("#userid").val("");
				localStorage.setItem("scrollToComments", "true");
				window.location.replace = resp;
				location.reload();
			})
			.fail(function (e) {
				alert("에러: " + e);
				alert("에러: " + JSON.stringify(e));
			});

})
function deleteComment(cnum, bnum) {
	if (confirm("정말 삭제하시겠습니까?")) {
		const password = prompt("비밀번호를 입력하세요:");
		if (password !== null && password.trim() !== "") {
			$("#commentDeletePassword_" + cnum).val(password);
			$("#deleteCommentForm_" + cnum).submit();
		}
	}
}
function requestCommentUpdate(cnum, bnum) {
	const password = prompt("수정하려면 비밀번호를 입력하세요:");
	if (password !== null && password.trim() !== "") {
		$("#commentUpdatePassword_" + cnum).val(password);
		$("#updateCommentForm_" + cnum).submit();
	}
}
window.onload = function () {
	if (localStorage.getItem("scrollToComments") === "true") {
		localStorage.removeItem("scrollToComments");
		const commentRows = document.querySelectorAll(".comment-row");
		if (commentRows.length > 0) {
			const lastComment = commentRows[commentRows.length - 1];
			lastComment.scrollIntoView({ behavior: "smooth" });
		}
	}
};
</script>

</body>
</html>




