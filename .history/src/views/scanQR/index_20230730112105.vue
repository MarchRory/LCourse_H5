<template>
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
</style>
  
  