> 2024年7月后将继续开发  
> 状态：未开发完成  
> 将会将数据库再次重构，以使用最简便的方法实现全部功能  

# coomic 后端

## 前言
起名的哲学：comic + cool = coomic  
定义：是一个私密的媒体(image,audio,video)服务器，可以用于中小规模本地媒体共享  
主要就是在融入新技术、新想法的同时，保证用户安装方便，易于管理，用户端界面响应快、占用小。
代码易读性与简洁性向Typecho看齐。  
不会以任何方式在网站里添加积分，等级以及收费功能。  

## 技术细节
前端：  
- 框架：vite + lithtml

后端：  
- 运行时：nodejs
- 框架：koajs
- 数据库：sqlite3

使用http与socketio双通讯方式，数据格式使用google发布的protobuf。

## 特点：
- 配置简单*
- 响应迅速
- 用户端数据实时同步（socketio）
- 反爬（学过protobuf的人少 + socketio用户状态监控）
- 可扩展多方式登陆（oauth,phone number,email,username）
- 前后端分离
- 可设置私密媒体，密码保护
  
## TODO ~~(大饼)~~ :
- [ ] 后台 单独的api接口与单独的前端，与所有TODO并列执行
- [ ] user 用户
  - [x] role 用户组（权限管理
    - [x] add
    - [x] update
    - [x] delete
  - [x] auth 用户验证方式
    - [x] add
    - [x] update
    - [x] delete
  - [x] login
  - [x] register
  - [ ] update
- [ ] tags 标签
  - [ ] add
  - [ ] update
- [ ] gallery 画廊
  - [ ] media
    - [ ] add
    - [ ] delete
  - [ ] add
  - [ ] update
  - [ ] delete
- [ ] comments 评论
  - [ ] add
  - [ ] update
  - [ ] delete
- [ ] history 历史记录
  - [ ] add
  - [ ] remove
  - [ ] clear
- [ ] collect 合集，默认收藏夹合集不可删除
  - [ ] add collect
  - [ ] delete collect
  - [ ] update collect
    - [ ] change name
    - [ ] add gallery
    - [ ] delete gallery
- [ ] vote 投票，模仿stackoverflow
  - [ ] gallery
  - [ ] comments
- [ ] rank 排行榜
  - [ ] click(day,week,month,year,total)
  - [ ] favorite(day,week,month,year,total)
- [ ] search 搜索功能 对标知网
- [ ] recommended system 推荐系统 对标twitter
- [ ] extension 参考userscript 可以对网站一小部分底层逻辑作出修改
  - [ ] parse
  - [ ] api
  - [ ] support typescript
- [ ] pkg 多平台打包 无需依赖 大概率不做


小笔记：
用户状态：
0：正常（活跃）
1：不活跃（不访问网站3天，主页变灰色，有悼词，有特效，再次登陆可返回活跃状态）
2：封禁（政治立场不正确，显示封禁，不可登陆）
3：注销中（用户手动注销，主页无任何变化，不可登陆，但是网站保留个人信息40天啊，可联系管理员撤回）
4：归档（只读，显示已注销，不可登陆）
