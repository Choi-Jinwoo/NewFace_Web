const server = 'http://localhost:8080';

const [next_btn] = document.getElementsByClassName('button');

next_btn.addEventListener('click', () => {
  let id = document.getElementById("id").value;
  let pw = document.getElementById("pw").value;

  $.ajax({
    type: "POST",
    url: `${server}/auth/login`,
    data: { id, pw },
    dataType: "json",
    success: (data, status) => {
      alert("로그인에 성공하였습니다.");
      localStorage.setItem('token', data.data["x-access-token"]);
      // main과 redirect
      location.href = "../posts"
    },
    error: (xhr, status, error) => {
      alert("다시 확인해 주세요.");
    }
  });
});