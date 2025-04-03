<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
 <%@ taglib prefix="c" uri="jakarta.tags.core" %>   
 <%@ include file ="../includes/header.jsp" %>   
 <script>
 $(function(){
	 $("#btnWrite").click(function(){
		 if(${empty sessionScope.suser}){
			 alert("로그인하세요")
			 location.href = "/member/login.do"
			 return false;
		 }
		 location.href="/board/write.do"
	 })
 })
 </script>
<div class="container mt-5">
	<h2>Board LIST(${count})</h2>
	<div class="mt-5 mb-3">
		<button class="btn btn-secondary" id="btnWrite">글쓰기</button>
	</div>
	
	<table class="table table-hover">
		  <thead>
		        <tr>
		        <th>번호</th>
		        <th>제목</th>
		        <th>작성자</th>
		         <th>작성일</th>
		      </tr>
		  </thead>
		  <tbody>
		  
		  <c:forEach items="${boardList}" var="board" varStatus="st">
		  
		  	<tr>
		  			<td>${board.bno}</td>
		  			<td><a href="showBoardDetail?num=${board.bno}">${board.title}</a></td>
		  			<td>${board.author}</td>
		  			<td>${board.postdate}</td>
		  	</tr>
		  	
		</c:forEach>
  </tbody>
  </table>
  <div class = "d-flex justify-content-between mt-3">
		  <ul class="pagination">
			   <!-- 이전 -->
			   <c:if test="${p.startPage >  p. blockPage}">
			    	<li class="page-item"><a class="page-link" href="list.do?pageNum=${p.startPage- p. blockPage}&searchField=${p.searchField}&searchWord=${p.searchWord}">Previous</a></li>
			   </c:if>
			   <!-- 페이지번호 -->
			   <c:forEach begin="${p.startPage }" end="${p.endPage }"  var="i">
				   <c:if test="${p.currentPage != i  }">
				        <li class="page-item"><a class="page-link" href="list.do?pageNum=${i }&searchField=${p.searchField}&searchWord=${p.searchWord}">${i }</a></li>
				   </c:if>
				   <c:if test="${p.currentPage == i  }">
				    <li class="page-item active"><a class="page-link" href="#">${i }</a></li>
				   </c:if>
			   </c:forEach>
				  <!-- 다음 -->  
				 <c:if test="${p.endPage < p.totPage}">
					    <li class="page-item"><a class="page-link" href="list.do?pageNum=${p.endPage+1 }&searchField=${p.searchField}&searchWord=${p.searchWord}">Next</a></li>
				 </c:if>
		  </ul>
		  <form class="d-inline-flex" action="showBoards" method="get">
		    <select class="form-select" id="searchField" name ="searchField">
				    <option value="subject">제목</option>
				     <option value="content">내용</option>
				<option value="userid">작성자</option>
		    </select>
		    <input type="text" class="form-control" id="searchWord" name="searchWord">
		    <button type="submit" class="btn btn-success btn-sm">Search</button>
		 </form>
  </div>
</div>
</body>
</html>