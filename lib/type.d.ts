import { CSSProperties } from "vue";

export interface Config {
    /**
     * 定位模式
     */
    position: 'static' | 'relative' | 'absolute' | 'sticky' | 'fixed',
    /**
     * 自定义容器宽度
     */
    width: string | number,
    /**
     * 自定义容器高度
     */
    height: string | number,
    /**
     * v => 垂直方向 ， h => 水平方向
     */
    direction: 'v' | 'h',
    /**
     * 指示器
     */
    poi: {
        /**
         * 显示指示器
         */
        pointer: boolean,
        /**
         * 指示器位置
         */
        position: string,
        /**
         * 指示器类名
         */
        className: string
    },
    /**
     * 缓存页面
     */
    cache: boolean,
    /**
     * 页面背景数组
     */
    bgArr: {
        image?: any;
        color?: any;
    }[],
    /**
     * 背景图片属性配置
     */
    bgConfig: {
        /**
         * 图片展示状态
         */
        fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
    },
    /**
     * 过渡动画参数
     */
    transition: {
        duration: string, // 动画时长
        timingFun: string, // 动画速度曲线
        delay: string, // 动画延迟
    },
    /**
     * 自动播放
     */
    autoPlay: {
        /**
         * 开始播放
         */
        play: boolean
        /**
         * 切换间隔
         */
        interval: number,
    },
    /**
     * 循环播放
     */
    loop: boolean,

    /**
     * 翻页箭头
     */
    arrow: {
        // 上一页箭头
        last: boolean,
        // 下一页箭头
        next: boolean
    }
}