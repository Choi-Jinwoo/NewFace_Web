const server = 'http://localhost:8080';

const writeBtn = document.getElementById('write');

async function addList() {
  const tc = [];
  let html = '';

  const posts = await $.ajax({
    beforeSend: function (xhr) {
      xhr.setRequestHeader("x-access-token", localStorage.getItem('token'));
    },
    type: "GET",
    url: `${server}/post`,
    dataType: 'json',
    success: (data, status) => {
      const { posts } = data.data;
      const tableData = [];
      for (let i = 0; i < posts.length; i++) {
        html += `<div class="form">
        <div class="title">
          <h3>${posts[i].title}</h3>
          </div>
          <div class="unit">
          <b>@${posts[i].memberId}</b></br></br></br></br>
          ${posts[i].content}
          `
        posts[i].files[0] ? html += `<img src="http://${posts[i].files[0]}" alt="사진" width="640" height="390" style="margin-top: 2%;"></img></div></div>` : html += `</div></div>`
      }

      $(".container").append(html);

    },
    error: (xhr, status, error) => {
      alert("다시 확인해 주세요.");
    }
  });
}

writeBtn.addEventListener('click', () => {
  const content = document.getElementById('content').value;
  const title = document.getElementById('title').value;

  $.ajax({
    type: 'POST',
    url: `${server}/post`,
    beforeSend: function (xhr) {
      xhr.setRequestHeader("x-access-token", localStorage.getItem('token'));
    },
    dataType: 'json',
    data: {
      content,
      title,
    },
    success: (data, status) => {
      alert('업로드 성공!');
      location.href = "./";
    },
    error: (xhr, status, error) => {
      alert('업로드에 실패하였습니다.');
    }
  });
});