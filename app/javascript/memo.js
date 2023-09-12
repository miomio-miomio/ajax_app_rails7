// buildHTML関数を定義
// 投稿したメモのHTMLを生成する部分を関数buildHTMLとして、外に切り出し
const buildHTML = (XHR) => {
  const item = XHR.response.post;
  const html = `
    <div class="post">
      <div class="post-date">
        投稿日時：${item.created_at}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`;

  // 関数buildHTMLの返り値にhtmlを指定
  // ここでいうhtmlとは、const htmlで定義した変数htmlのこと
  return html;

};




function post (){
  const form = document.getElementById("form");
  
  // form.addEventListener("submit", () => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const XHR = new XMLHttpRequest();

    XHR.open("POST", "/posts", true);

    XHR.responseType = "json";
    XHR.send(formData);

    // レスポンスの受信に成功したときの処理
    XHR.onload = () => {

      // レスポンスに何らかの問題があった場合の処理
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      };

      const list = document.getElementById("list");

      // リセットの対象となるフォームの要素contentを取得して、変数formTextに格納
      const formText = document.getElementById("content");
      // console.log(formText.value);

      // レスポンスの内容を確認
      // console.log(XHR.response);

      // // 新たに投稿されたメモのHTMLを生成→切り出し
      // const item = XHR.response.post;
      // const html = `
      //   <div class="post">
      //     <div class="post-date">
      //       投稿日時：${item.created_at}
      //     </div>
      //     <div class="post-content">
      //       ${item.content}
      //     </div>
      //   </div>`;

      // list.insertAdjacentHTML("afterend", html);

      
      list.insertAdjacentHTML("afterend", buildHTML(XHR));

      // フォームの値をリセット
      formText.value = "";


    };

  });
};

window.addEventListener('turbo:load', post);