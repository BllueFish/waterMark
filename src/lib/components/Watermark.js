import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// default options
const defaultOptions = {
    rotate: 30,
    backgroundColor: "#fff",
    color: "rgba(0, 0, 0, 0.1)",
    width: "100%",
    height: "auto",
    fontSize: 12,
    fontFamily: "serif",
    fontAjust: 1.2,
    offsetX: 0,
    offsetY: 0
};

const propTypes = {
    text: PropTypes.string.isRequired,
    subtext: PropTypes.string,
    options: PropTypes.object
};

const Watermark = (props) => {
    const { text, subtext = "", options = defaultOptions } = props;
    let [url, setUrl] = useState("");

    useEffect(() => {
        drawerWatermark(props);
    }, [props.text, props.subtext, props.options])

    // 获取字符串长度，汉字记为1.3个字符，大写字母记为1个字符，其它记为0.5个字符
    const getStrLen = (str) => {
        let len = 0;
        for (let i = 0; i < str.length; i++) {
            let a = str.charAt(i);
            if (a.match(/[\u4e00-\u9fa5]/g) !== null) {
                len += 1.3;
            } else if (a.match(/[A-Z]/g) !== null) {
                len += 1;
            } else {
                len += 0.5;
            }
        }
        return parseInt(len);
    }

    const drawerWatermark = () => {
        if (!text) {
            console.log("text value is undefined");
            return;
        }
        const canvas = document.createElement("canvas");
        if (!canvas.getContext) {
            //你的浏览器不支持canvas!
            return;
        }

        const {
            rotate = defaultOptions.rotate,
            color = defaultOptions.color,
            fontSize = defaultOptions.fontSize,
            fontFamily = defaultOptions.fontFamily,
            fontAjust = defaultOptions.fontAjust,
            offsetX = defaultOptions.offsetX,
            offsetY = defaultOptions.offsetY
        } = options;
        const ctx = canvas.getContext("2d");
        const textLength = getStrLen(text) * fontSize * fontAjust;
        const rotatePI = (Number(rotate) / 180) * Math.PI;
        const calcWidth = parseInt(textLength * Math.cos(rotatePI)) + offsetX;
        const calcHeight = parseInt(textLength * Math.sin(rotatePI)) + offsetY;

        if (subtext && subtext !== "") {
            const subtextLength = getStrLen(subtext) * fontSize * fontAjust;
            const subCalcWidth = parseInt(subtextLength * Math.cos(rotatePI)) + offsetX;
            const subCalcHeight = parseInt(subtextLength * Math.cos(rotatePI)) + offsetY;
            console.log("subtextLength", getStrLen(subtext));
            console.log("textLength", getStrLen(text));

            const subtextAlign = {
                x: calcWidth > subCalcWidth ? (calcWidth / 2 - subCalcWidth / 2) : 0,
                y: calcHeight + fontSize + 8
            };
            const textAlign = {
                x: subCalcWidth > calcWidth ? (subCalcWidth / 2 - calcWidth / 2) : 0,
                y: calcHeight
            };
            console.log("subtextAlign", subtextAlign);
            console.log("textAlign", textAlign);

            canvas.width = Math.max(calcWidth, subCalcWidth);
            canvas.height = calcHeight + subCalcHeight;
            ctx.font = `${fontSize}px ${fontFamily}`;
            ctx.rotate((-`${rotate}` * Math.PI) / 180); // 逆时针方向
            ctx.fillStyle = color;
            ctx.fillText(`${text}`, textAlign.x, textAlign.y);
            ctx.fillText(`${subtext}`, subtextAlign.x, subtextAlign.y);
        } else {
            const textAlign = {
                x: 0,
                y: calcHeight
            };
            canvas.width = calcWidth;
            canvas.height = calcHeight;
            ctx.font = `${fontSize}px ${fontFamily}`;
            ctx.rotate((-`${rotate}` * Math.PI) / 180); // 逆时针方向
            ctx.fillStyle = color;
            ctx.fillText(`${text}`, textAlign.x, textAlign.y);
        }

        const url = ctx.canvas.toDataURL();
        setUrl(url);
    }

    const { width = defaultOptions.width, height = defaultOptions.height, backgroundColor = defaultOptions.backgroundColor } = options;
    return (
        React.cloneElement(
            props.children, {
            ...props,
            style: Object.assign({}, props.style, {
                width,
                height,
                backgroundColor,
                backgroundImage: `url(${url})`,
                backgroundRepeat: "repeat"
            })
        })
    );
};

Watermark.propTypes = propTypes;

export default Watermark;