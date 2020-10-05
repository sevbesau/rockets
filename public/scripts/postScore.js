/*
function postScore(points) {
  var data = new FormData();
  data.append('score', points);

  const url = window.location.href;

  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.onload = function(){
    console.log("Done");
    console.log(this.response);
  };
  xhr.send(data)
}

*/
async function postScore(points) {
  const data = { points };
  const res = await fetch(window.location.href, { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

