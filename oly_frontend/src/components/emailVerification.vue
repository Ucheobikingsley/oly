<template>
  <div class="component entry emailverification">
    <div class="header">
      <h1>Hello! Welcome to Oly!</h1>
      <p>Please check your email to verify your account</p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { api } from "@/utils/requests";
import { useToast } from "vue-toastification";

const toast = useToast();
const toastId = ref("login");
onMounted(async () => {
  const response = await api.post("email/verification-notification");

  if (response.status === 200) {
    const data = (await response.json()) as Record<string, unknown>;
    if (data.status === "verification-link-sent") {
      return toast.success("Email Notification Sent", {
        id: toastId.value,
        timeout: 2000,
      });
    }
  } else {
    return toast.error("Could not send email notification", {
      id: toastId.value,
      timeout: 2000,
    });
  }
});
</script>

<style lang="scss" scoped>
@use "@/assets/scss/colors.scss" as color;
@use "sass:color" as sasscolor;
@use "@/assets/scss/_breakpoints.scss" as breakpoint;

.component.entry.emailverification {
  > .header {
    > h1 {
      font-weight: bolder;
    }
  }
}
</style>
