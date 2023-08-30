<template>
  <div>
    <van-config-provider :theme-vars="themeVars">
      <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft">
        <template #title><span style="color: #e1562a">个人信息修改</span></template></van-nav-bar>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field name="uploader" label="头像">
            <template #input>
              <van-uploader v-model="files" :after-read="afterRead" :before-read="beforeRead" :max-count="1">
                <van-image width="60" height="60" :src="avatar" />
              </van-uploader>
            </template>
          </van-field>
          <van-field v-model="nickname" name="昵称" label="昵称" placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]" />
          <van-field v-model="sex" readonly name="picker" label="性别" placeholder="选择性别" @click="showSexPicker = true" />
          <van-field v-model="year" readonly name="picker" label="年级" placeholder="选择年级" @click="showYearPicker = true" />
          <van-field v-model="myDepartmentName" readonly name="picker" label="学院" placeholder="选择学院"
            @click="handleShowDepartment" />
        </van-cell-group>

        <van-popup v-model:show="showDepartmentPicker" position="bottom">
          <van-picker :columns="departmentColumns" :loading="departmentLoading" @confirm="onDepartmentConfirm"
            @cancel="showDepartmentPicker = false" />
        </van-popup>
        <van-popup v-model:show="showYearPicker" position="bottom">
          <van-picker :columns="yearColumns" @confirm="onYearConfirm" @cancel="showYearPicker = false" />
        </van-popup>
        <van-popup v-model:show="showSexPicker" position="bottom">
          <van-picker :columns="sexColumns" @confirm="onSexConfirm" @cancel="showSexPicker = false" />
        </van-popup>

        <div style="margin: 16px">
          <van-button round block type="warning" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </van-config-provider>
  </div>
</template>

<script setup>
import { useUserStore } from "@/store/modules/user";
import { debounce } from "@/utils/freqCtrl/freqCtrl";
import upload from "@/api/upload/upload.ts";
import userApi from "@/api/user/user.ts";
import { getDepartments } from '@/api/department/department'
import { listProps, showFailToast, showSuccessToast, showToast, Toast } from "vant";
const themeVars = reactive({
  navBarTextColor: "#e1562a",
  navBarIconColor: "#e1562a",
});
const router = useRouter();
const userStore = useUserStore();
const files = ref([]);
const nickname = ref(userStore.name);
const avatar = ref(userStore.avatar);
const sex = ref(userStore.sex == 0 ? '女' : userStore.sex == 1 ? '男' : '')
const myDepartmentId = ref(null)
const myDepartmentName = ref(null)
const contact = ref({
  '电话': null,
  'QQ': null,
  '微信': null,
  '邮箱': null
})
const year = ref('')
const enrollmentYear = ref(userStore.enrollmentYear)
const sexColumns = [
  { text: '男', value: 0 },
  { text: '女', value: 1 }
]
const showSexPicker = ref(false)
const showYearPicker = ref(false)
const showDepartmentPicker = ref(false)
const departmentLoading = ref(false)
const yearColumns = ref([])
{
  let nowYear = new Date().getFullYear()
  for (let i = nowYear; i >= nowYear - 3; i--) {
    yearColumns.value.push({
      text: `${i}级`,
      value: `${i}-09-01`
    })
  }
  if (userStore.enrollmentYear && userStore.enrollmentYear != '') {
    year.value = userStore.enrollmentYear.substring(0, 4) + '级'
  } else {
    year.value = ''
  }
}
const departmentColumns = ref([])

const afterRead = (file) => {
  upload.setAvatar(file.file).then((res) => {
    avatar.value = res.data;
  });
};
const beforeRead = (file) => {
  if (file.type !== "image/jpeg") {
    Toast("请上传 jpg 格式图片");
    return false;
  }
  return true;
};
const onSexConfirm = ({ selectedOptions }) => {
  sex.value = selectedOptions[0].text
  showSexPicker.value = false
}

const onYearConfirm = ({ selectedOptions }) => {
  year.value = selectedOptions[0].text
  enrollmentYear.value = selectedOptions[0].value
  showYearPicker.value = false
}
const handleShowDepartment = () => {
  if (!departmentColumns.value.length) {
    departmentLoading.value = true
    getDepartments()
      .then(res => {
        if (res.code == 200) {
          const { list } = res
          list.forEach((item) => {
            departmentColumns.push({
              text: '',
              value: id
            })
          })
        }
      })
      .finally(() => {
        departmentLoading.value = false
      })
  }
  showDepartmentPicker.value = true
}
const onDepartmentConfirm = ({ selectedOptions }) => {
  myDepartmentName.value = selectedOptions[0].text
  myDepartmentId.value = selectedOptions[0].value
  showDepartmentPicker.value = false
}

const onSubmit = debounce(() => {
  userApi
    .updateUser({
      id: userStore.uid,
      nickname: nickname.value,
      avatar: avatar.value,
    })
    .then((res) => {
      if (res.code == 200) {
        userStore.avatar = avatar.value;
        userStore.name = nickname.value
        showSuccessToast("信息已更新");
        router.go(-1);
      } else {
        showFailToast(res.message);
      }
    });
}, 300)

const onClickLeft = () => {
  router.back();
};
</script>

<style scoped></style>
