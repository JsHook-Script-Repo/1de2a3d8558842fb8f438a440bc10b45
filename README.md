# Unity il2cpp游戏的Mod脚本例子
一个 Unity il2cpp游戏的Mod脚本例子 脚本未加密 给各位想制作Unity游戏Mod脚本的作参考  
  
此脚本以明日方舟为例 后续不更新维护 支持官服 B服 其他渠道服兼容性未知 免ROOT模式兼容性未知   
  
简单描述制作流程：  
1.Dump cs文件 (使用脚本仓库里的Unity Dump脚本)  
2.寻找要Hook的方法 记下地址偏移  
3.对方法进行Hook 修参数或返回值以达到无敌,伤害翻倍和你需要的效果  

当你弄懂这种基地偏移的修改方法 可以尝试使用 [frida-il2cpp-bridge](https://github.com/vfsfitvnm/frida-il2cpp-bridge)

[frida文档](https://frida.re/docs/javascript-api/) --- [jshook说明](https://github.com/Xposed-Modules-Repo/me.jsonet.jshook#%E9%80%9A%E7%94%A8)

## 功能
* 无敌
* 99Cost
* 99阻挡
* 增加2k双抗
* 倍攻

## 交流群
https://t.me/FlxSNXMod
