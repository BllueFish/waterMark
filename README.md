## 水印插件

配置babel，编译react为es5。

### 安装
```
npm install @tntd/react-watermark --save
```

### 使用

```
import Watermark from "@tntd/react-watermark";

 <Watermark
    text="Hello World"
    subtext="xiaoming"
    options={{
      color: "#ddd",
      rotate: 30,
      fontSize: 16,
      fontWeight: 300,
      fontFamily: "黑体",
      fontAjust: 1,
      offsetX: 100,
      offsetY: 50
    }}
  >
    <div className="content">
      text
    </div>
 </Watermark>
```
 
### 参数说明

- text 主文本，为必传参数
- subtext 副文本，非必传参数
- options 设有默认值，可根据自己的需求配置一个或多个项
```
const defaultOptions = {
    rotate: 30,
    backgroundColor: "#fff",
    color: "rgba(0, 0, 0, 0.1)",
    width: "100%",
    height: "auto",
    fontSize: 12,
    fontWeight: 300,
    fontFamily: "黑体",
    fontAjust: 1.2,
    offsetX: 0,
    offsetY: 0
};
```
