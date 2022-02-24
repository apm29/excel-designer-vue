import remote from ".";
import { getToken } from "@/local-storage";
import router from "@/router";
import { LOGIN_PATH } from "@/const"
import { ElLoading, ElNotification } from "element-plus";
import { ref, unref } from "vue";
const JAVA_SUCCESS_CODE = "1";
remote.init({
  //缓存获取相关
  onCacheRetrieve(option) {
    return null;
  },

  //设置token
  onInterceptRequest(axiosRequest, option) {
    axiosRequest.headers.Authorization = option.token || getToken();
    return axiosRequest;
  },
  //响应处理
  onInterceptResponse(axiosResponse, option) {
    return new Promise((resolve, reject) => {
      if (axiosResponse.status === 200) {
        //在此处进行响应拦截
        if (axiosResponse.data.status === JAVA_SUCCESS_CODE) {
          if (option.showSuccessMessage) {
            ElNotification({
              message:
                axiosResponse.data.msg || axiosResponse.data.text || "操作成功",
              type: "success",
              duration: 5000,
            });
          }
          resolve(axiosResponse.data);
        } else {
          ElNotification({
            message: axiosResponse.data.msg || axiosResponse.data.text,
            type: "error",
          });
          reject(axiosResponse.data.msg);
        }
      } else {
        //Token 过期
        if (axiosResponse.status === 401) {
          router
            .replace({
              path: LOGIN_PATH,
              query: {
                redirect: router.currentRoute.value.fullPath,
              },
            })
            .then((res) => {
              console.log(res);
            });
        }
        ElNotification({
          message: axiosResponse.data.msg || axiosResponse.statusText,
          type: "error",
        });
        reject(axiosResponse);
      }
    });
  },

  onInterceptRejectedRequest(error, option) {
    if (option.showErrorMessage && error) {
      ElNotification({
        message: error.message || String(error),
        type: "error",
      });
    }
    return error;
  },
  onInterceptRejectedResponse(error, option) {
    if (option.showErrorMessage && error) {
      ElNotification({
        message: error.message || String(error),
        type: "error",
      });
    }
    return error;
  },

  startLoading(option) {
    if (!option.silent) {
      loadingCount.value += 1;
      if (unref(loadingCount) > 0) {
        loadingInstance.value = ElLoading.service({
          fullscreen: true,
          background: "rgba(0, 0, 0, 0.5)",
          text: "拼命加载中",
        });
      }
    }
  },
  stopLoading(option) {
    if (!option.silent) {
      loadingCount.value -= 1;
      if (unref(loadingCount) <= 0) {
        unref(loadingInstance).close();
      }
    }
  },
});

const loadingInstance = ref(null);
const loadingCount = ref(0);
