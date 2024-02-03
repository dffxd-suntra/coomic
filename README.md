> 2024正在开发

# coomic 后端

very cool comic site  
虽然叫coomic,但是支持小说和其他媒体  
  
技术细节：  
前端：  
vite + lithtml + socketio  
无路由，single page.  

后端：  
nodejs + koajs + socketio + sqlite3  

## 特性：
- 简单
- 支持文字和媒体（图片，视频，音频）
- 支持可扩展多方式登陆（oauth。。。）
- 前后端分离

## 介绍：
借鉴了exhentai,以及NoyAcg!  
定位为个人媒体浏览器，主要考虑的是舒适性，不会为了性能而在舒适性上作出妥协，故对防盗没有限制  
开源软件安全性有保证，不会盗取私人信息，所有密码都为哈希加盐，网站的漏洞我已经尽我所能的避免  
  
网站我在设计时遵守的的主旨就是安装简单，设置简单，无副作用，电脑上需要配置的仅有nodejs和npm，删除时一齐删除即可，后续会尝试使用pkg打包继续简化安装。

## TODO ~~(大饼)~~ :
- [ ] user
  - [x] login
  - [x] register
  - [ ] update
- [ ] tags
  - [ ] add
  - [ ] update
- [ ] gallery
  - [ ] media
    - [ ] add
    - [ ] delete
  - [ ] add
  - [ ] update
  - [ ] delete
- [ ] novel (这个和漫画等完全不是一个东西，和媒体系统是分开的，最后做)
  - [ ] online editor
  - [ ] add
  - [ ] update
  - [ ] delete
- [ ] comments
  - [ ] add
  - [ ] update
  - [ ] delete
- [ ] favorites
  - [ ] add favorites
  - [ ] delete favorites
  - [ ] update favorites
  - [ ] add gallery
  - [ ] delete gallery
- [ ] history
  - [ ] add
- [ ] vote
  - [ ] gallery
  - [ ] comments
- [ ] rank
  - [ ] click(day,week,month,year,total)
  - [ ] favorite(day,week,month,year,total)
- [ ] search
- [ ] pkg
- [ ] extension：参考userscript，支持typescript
  - [ ] parse
  - [ ] api
  - [ ] support typescript
- [ ] recommended system(for your page)