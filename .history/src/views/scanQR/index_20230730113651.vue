<template>
    <div class="code-reader-content">
        <div class="page">
            <video ref="video" autoplay id="video"></video>
            <p v-if="videoInputDevicesArray.length == 0">{{ textContent }}</p>
        </div>
        <div class="scan-box">
            <div class="frame upper-left"></div>
            <div class="frame upper-right"></div>
            <div class="frame lower-right"></div>
            <div class="frame lower-left"></div>
            <div class="pointer-box">
                <div class="pointer"></div>
            </div>
            <div v-show="tipShow" class="tip">{{ tipMsg }}</div>
            <div class="btn-switch" @click="toggle"></div>
        </div>
    </div>
</template>

<script>
// 引入插件
import { BrowserMultiFormatReader } from '@zxing/library';

export default {
    name: 'httpsCodeReader',
    data() {
        return {
            codeReader: null,
            tipMsg: '正在尝试识别....',
            tipShow: true,
            textContent: undefined,
            videoInputDevicesArray: [],
            deviceId: '',
            isEswitch: false,
            timer: null
        };
    },

    created() {
        this.openScan();

    },

    destroyed() {
        this.codeReader.stopContinuousDecode();
        this.codeReader.reset();
    },

    methods: {
        // 打开扫码
        async openScan() {
            this.codeReader = await new BrowserMultiFormatReader();
            this.codeReader
                .getVideoInputDevices()
                .then(async videoInputDevices => {
                    this.tipShow = true;
                    this.tipMsg = '正在尝试识别....';
                    this.videoInputDevicesArray = videoInputDevices;
                    //
                    console.log('获取到的摄像头', this.videoInputDevicesArray)
                    if (this.videoInputDevicesArray.length > 1) {
                        this.deviceId = this.videoInputDevicesArray[1].deviceId;
                    } else {
                        this.deviceId = this.videoInputDevicesArray[0].deviceId;
                    }
                    this.decodeFromInputVideoFunc();
                })
                .catch(() => {
                    this.tipShow = false;
                });
        },

        // 开始解码
        decodeFromInputVideoFunc() {
            if (this.videoInputDevicesArray.length == 0) {
                this.textContent = '初始化摄像头失败';
                document.getElementById('video').style.display = 'none';
                return;
            }
            this.codeReader.reset();
            this.codeReader.decodeFromInputVideoDeviceContinuously(this.deviceId, 'video', result => {
                this.tipMsg = '正在扫描';
                if (result) {
                    if (result.text) {
                        console.log('扫描成功', result)
                        this.tipMsg = '扫描成功';
                        this.tipShow = true;
                        window && window.getResultEvent(result)
                        window?.parent?.Gikam?.toast("扫码成功");
                        // 关闭扫码功能
                        this.codeReader.reset();
                        this.codeReader.stopContinuousDecode();

                    }
                }
            });
        },

        cutover() {
            if (this.videoInputDevicesArray && this.videoInputDevicesArray.length > 1) {
                if (this.deviceId === this.videoInputDevicesArray[0].deviceId) {
                    return (this.deviceId = this.videoInputDevicesArray[1].deviceId);
                } else {
                    return (this.deviceId = this.videoInputDevicesArray[0].deviceId);
                }
            }
            this.codeReader.stopStreams();
            return;
        },

        // 切换摄像头
        async toggle() {
            this.codeReader.stopStreams();
            this.timer = setTimeout(() => {
                this.timer = null;
            }, 2000);
            if (this.timer) {
                await this.codeReader.tryPlayVideo('video');
                this.cutover();
                this.decodeFromInputVideoFunc();
            }
        }
    }
};
</script>
 
 
<style lang="less" scoped>
.code-reader-content {
    .page {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;

        #video {
            height: 100%;
            width: 100%;
            object-fit: fill;
        }
    }

    .scan-box {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -90%);
        height: 20%;
        width: 70%;

        .frame {
            position: absolute;
            width: 15px;
            height: 15px;
            border: 3px solid transparent;
        }

        .upper-left {
            top: 0;
            left: 0;
            border-left-color: rgba(66, 133, 244, 1);
            border-top-color: rgba(66, 133, 244, 1);
        }

        .upper-right {
            top: 0;
            right: 0;
            border-right-color: rgba(66, 133, 244, 1);
            border-top-color: rgba(66, 133, 244, 1);
        }

        .lower-right {
            bottom: 0;
            right: 0;
            border-bottom-color: rgba(66, 133, 244, 1);
            border-right-color: rgba(66, 133, 244, 1);
        }

        .lower-left {
            bottom: 0;
            left: 0;
            border-left-color: rgba(66, 133, 244, 1);
            border-bottom-color: rgba(66, 133, 244, 1);
        }

        .pointer-box {
            position: absolute;
            top: 0;
            left: 0;
            width: 98%;
            height: 100%;
            overflow: hidden;

            .pointer {
                height: 3px;
                background-image: linear-gradient(to right,
                        transparent 0%,
                        rgba(66, 133, 244, 1) 50%,
                        transparent 100%);
                transform: translateY(-3px);
                animation: move 2s linear infinite;
            }

            @keyframes move {
                0% {
                    transform: translateY(-3px);
                }

                100% {
                    transform: translateY(calc(20vh - 3px));
                }
            }
        }

        .tip {
            position: absolute;
            left: 50%;
            top: 120%;
            transform: translate(-50%, 0);
            white-space: nowrap;
            color: rgb(85, 209, 28);
            font-size: 16px;
        }

        .btn-switch {
            position: absolute;
            left: 50%;
            top: 140%;
            width: 20px;
            height: 20px;
            transform: translate(-50%, 0);
            background-color: green;
            // background: url('../../../img/icon/switch.svg') no-repeat center;
        }
    }
}
</style>





<!-- <template>
    <div class="qrcode">
        <video ref="video" id="video" class="scan-video" v-show="scanTextData.showScanBoxInfo" autoplay></video>
        <div class="scan-img" v-show="scanTextData.showScanBoxInfo">
            <div class="scan-frame">
                <span class="left-t"></span>
                <span class="right-t"></span>
                <span class="left-b"></span>
                <span class="right-b"></span>
                <span class="cross-line"></span>
            </div>
        </div>
        <div class="scan-tip" v-show="scanTextData.showScanBoxInfo">
            {{ scanTextData.tipMsg }}
        </div>
    </div>
</template>
  
<script>
import { BrowserMultiFormatReader } from "@zxing/library";
export default {
    name: "scanCodePage",
    data() {
        return {
            scanTextData: {
                loadingShow: false,
                codeReader: null,
                scanText: "",
                vin: null,
                tipMsg: "将二维码置于屏幕中，即可识别",
                tipShow: false,

                showScanBox: false,
                showScanBoxInfo: false,
            },
            hasBind: false,
            dataObj: { qrCodeId: undefined },
        };
    },
    components: {},
    created() {
        this.toScanCode();
    },
    beforeUnmount() {
        //this.stop();
    },

    methods: {
        toScanCode() {
            console.log("识别二维码", this.dataObj);
            this.scanTextData.codeReader = new BrowserMultiFormatReader();
            this.scanTextData.showScanBox = true;
            this.openScan();
        },
        cancelScan() {
            //识别完停止使用摄像头
            let Video = document.getElementById("video");
            Video.srcObject.getTracks()[0].stop();
            this.scanTextData.codeReader.reset(); // 重置
            this.scanTextData.showScanBox = false;
            setTimeout(() => {
                this.scanTextData.showScanBoxInfo = false;
            }, 1000);
        },

        async openScan() {
            this.scanTextData.codeReader
                .getVideoInputDevices()
                .then((videoInputDevices) => {
                    this.scanTextData.tipShow = true;
                    this.scanTextData.tipMsg = "正在调用摄像头...";
                    console.log("videoInputDevices", videoInputDevices);
                    // 默认获取第一个摄像头设备id
                    let firstDeviceId = videoInputDevices[0].deviceId;
                    // 获取第一个摄像头设备的名称
                    const videoInputDeviceslablestr = JSON.stringify(
                        videoInputDevices[0].label
                    );
                    if (videoInputDevices.length > 1) {
                        // 判断是否后置摄像头
                        if (videoInputDeviceslablestr.indexOf("back") > -1) {
                            firstDeviceId = videoInputDevices[0].deviceId;
                        } else {
                            firstDeviceId = videoInputDevices[1].deviceId;
                        }
                    }
                    this.decodeFromInputVideoFunc(firstDeviceId);
                })
                .catch((err) => {
                    this.scanTextData.tipShow = false;
                    console.error(err);
                });
        },
        decodeFromInputVideoFunc(firstDeviceId) {
            this.scanTextData.codeReader.reset(); // 重置
            this.scanTextData.scanText = "";
            this.scanTextData.codeReader.decodeFromInputVideoDeviceContinuously(
                firstDeviceId,
                "video",
                (result, err) => {
                    this.scanTextData.tipMsg = "将二维码置于屏幕中，即可识别";
                    this.scanTextData.scanText = "";
                    setTimeout(() => {
                        this.scanTextData.showScanBoxInfo = true;
                    }, 1000);
                    if (result) {
                        // console.log('扫描结果', result.text);
                        if (result.text) {
                            // console.log('扫描结果11', result.text);
                            // this.scanTextData.showScanBox = false
                            // this.scanTextData.showScanBoxInfo = false
                            // this.scanTextData.scanText = result.text
                            // //这里扫描出结果可以调用你想要的方法
                            // //识别完停止使用摄像头
                            // let Video = document.getElementById("video");
                            // Video.srcObject.getTracks()[0].stop()
                            // this.scanTextData.codeReader.reset(); // 重置
                            let decodedText = result.text;
                            console.log('scanRes: ', decodedText)
                            //this.$emit("ok", decodedText);
                        }
                    } else {
                        // console.log('没出来？',result,err)
                    }
                    if (err && !err) {
                        this.scanTextData.tipMsg = "识别失败";
                        setTimeout(() => {
                            this.scanTextData.tipShow = false;
                        }, 2000);
                        console.error(err);
                    }
                }
            );
        },
    },
};
</script>
  
<style scoped lang="less">
body {
    margin: 0;
    background-color: rgb(133, 133, 133);
}

.qrcode {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
}

.scan-index-bar {
    background-image: linear-gradient(-45deg, #42a5ff, #59cfff);
}

.van-nav-bar__title {
    color: #fff !important;
}

.scan-box {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    height: 100%;
    width: 100vw;

    .scan-cacel {
        position: absolute;
        top: 30px;
        left: 30px;
        z-index: 9;
        color: #fff;
        font-size: 35px;
    }
}

.scan-video {
    height: 100vh;
    width: 100vw;
    object-fit: cover;
}

.scan-img {
    width: 300px;
    height: 300px;
    position: fixed;
    top: 55%;
    left: 77%;
    margin-top: -200px;
    margin-left: -250px;
    z-index: 6;

    .scan-frame {
        width: 100%;
        height: 100%;
        position: relative;

        .left-t,
        .right-t,
        .left-b,
        .right-b {
            position: absolute;
            width: 80px;
            height: 80px;
        }

        .left-t {
            top: 0;
            left: 0;
            border-top: 2px solid #17b1b7;
            border-left: 2px solid #17b1b7;
        }

        .right-t {
            top: 0;
            right: 0;
            border-top: 2px solid #17b1b7;
            border-right: 2px solid #17b1b7;
        }

        .left-b {
            bottom: 0;
            left: 0;
            border-bottom: 2px solid #17b1b7;
            border-left: 2px solid #17b1b7;
        }

        .right-b {
            bottom: 0;
            right: 0;
            border-bottom: 2px solid #17b1b7;
            border-right: 2px solid #17b1b7;
        }

        .cross-line {
            width: 300px;
            height: 5px;
            background: linear-gradient(to right,
                    rgba(255, 255, 255, 0),
                    #5dddd3,
                    rgba(255, 255, 255, 0));
            position: absolute;
            top: 0;
            left: 0;
            animation: identifier_p 5s infinite;
        }

        @keyframes identifier_p {
            0% {
                top: 0%;
            }

            50% {
                top: 100%;
            }

            100% {
                top: 0;
            }
        }
    }
}

.scan-tip {
    width: 100vw;
    text-align: center;
    margin-bottom: 10vh;
    color: white;
    font-size: 5vw;
    position: absolute;
    bottom: 50px;
    left: 0;
    color: #fff;
}

.page-scan {
    overflow-y: hidden;
}
</style> -->
  
<!-- <template>
    <div class="v-body">
        {{ textContent }}
        <video ref="video" id="video" width="300" height="200" style="border: 1px solid gray"></video>
    </div>
</template>
  
<script>
// eslint-disable-next-line no-unused-vars
import adapter from 'webrtc-adapter';
// WebRTC适配器 只需要引入就ok
import { BrowserMultiFormatReader } from '@zxing/library';
/**
 * zxing demo
 */
export default {
    data: () => ({
        codeReader: new BrowserMultiFormatReader(),
        textContent: undefined
    }),
    async created() {
        this.codeReader.getVideoInputDevices()
            .then((videoInputDevices) => {
                const selectedDeviceId = videoInputDevices[0].deviceId;

                this.codeReader.decodeFromInputVideoDeviceContinuously(selectedDeviceId, 'video', (result, err) => {
                    if (result) {
                        console.log(result);
                        this.textContent = result.text;
                    }
                    if (err && !(err)) {
                        console.error(err);
                    }
                });
                console.log(`Started continous decode from camera with id ${selectedDeviceId}`);
            })
            .catch((err) => {
                console.error(err);
            });
    },
    methods: {
    }
};
</script>
  
<style lang="scss" scoped></style> -->
  
  