window.onload = function () {
  var child = document.getElementsByClassName('content')[0].children; // 获得所有的老鼠出现地点
  var time1; /* 老鼠出现定时器 */
  var scoreNum = 0; /* 分数 */
  var gameTime = 0; /* 游戏时间 */
  //  添加开始游戏后老鼠出现事件
  document.getElementById('start').onclick = function () {
    gameTime = 0; /* 游戏时间 */
    scoreNum = 0; /* 分数 */
    clearInterval(time1);
    time1 = setInterval(function () {
      var mouseNum = Math.floor(Math.random() * 25);
      child[mouseNum].setAttribute('style',
        'background: url(./IMG/diglett01.jpg) no-repeat center;background-size: cover;');
      setTimeout(function () {
        // 老鼠出现后消失
        child[mouseNum].setAttribute('style',
          'background:url(./IMG/diglett00.jpg) no-repeat center;background-size: cover;'
        );
      }, 1500);
      setInterval((gameTime += 1), 1000);
      document.getElementById('time').innerHTML = gameTime + ' ';
    }, 1000);
    // 禁用开始游戏按钮
    document.getElementById("start").disabled = true;
  };

  // 添加点击老鼠后改变老鼠状态
  for (let index = 0; index < child.length; index++) {
    child[index].onclick = function () {
      if (judgeOnclick(child[index], 'diglett01')) {
        // 判断是否是老鼠
        child[index].setAttribute(
          // 设置老鼠出现
          'style',
          'background:url(./IMG/diglett02.jpg) no-repeat center;background-size: cover;'
        );
        setTimeout(function () {
          // 设置老鼠消失时间
          child[index].setAttribute('style',
            'background:url(./IMG/diglett00.jpg) no-repeat center;background-size: cover;');
        }, 800);
        document.getElementById('score').innerHTML = (scoreNum += 1) + ' ';
      }
    };
  }

  // 判断图片是否为预期图片
  function judgeOnclick(onclickObj, judgeObj) {
    var url = getComputedStyle(onclickObj).getPropertyValue('background-image').split('/'); // 获取图片名称
    var img = url[url.length - 1].replace('.jpg")', '');
    if (img == judgeObj) {
      return true;
    } else {
      return false;
    }
  }
  // 设置结束按钮事件属性
  var popUp = document.getElementById("popUp"); /* 获取弹窗 */
  document.getElementById('end').onclick = function () {
    popUp.style.display = "inline-block";
    popUp.children[0].innerHTML = scoreNum;
    popUp.children[1].innerHTML = gameTime;
    clearInterval(time1);
    document.getElementsByClassName("main")[0].setAttribute("style", "pointer-events: none;")
    document.getElementById("wrap").setAttribute("style", "background: rgba(14, 52, 57, 0.6)");
    // 启用开始游戏按钮
    document.getElementById("start").disabled = false;
    // 老鼠立马全部消失
    for (let index = 0; index < 25; index++) {
      child[index].setAttribute('style', 'background:url(./IMG/diglett00.jpg) no-repeat center;background-size: cover;');
    }
  };

  // 关闭弹窗
  document.getElementById("close").onclick = function () {
    document.getElementById('time').innerHTML = 0 + ' ';
    document.getElementById('score').innerHTML = 0 + ' ';
    scoreNum = 0; /* 分数 */
    document.getElementsByClassName("main")[0].setAttribute("style", "pointer-events: auto;")
    popUp.style.display = "none";
    document.getElementById("wrap").setAttribute("style", "background: rgba(8, 198, 228, 0.2)");
  };

}