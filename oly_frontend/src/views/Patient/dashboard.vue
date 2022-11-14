<template>
  <div class="view entry dashboard">
    <header>
      <h3>Wall</h3>
      <p class="greeting">
        Hello <span class="highlight">{{ fullName }}</span
        >!
      </p>
      <p class="info">
        This is your recap page. Here you can see your activities on OLY
      </p>
    </header>

    <div class="element_list_card">
      <div class="list">
        <div class="element_desc">
          <AirBtn element="air" /><AirBtn element="hot" />
        </div>
        <div class="therapies_result">
          <font-awesome-icon icon="fa-solid fa-file-medical" />
          <h2>74%</h2>
          <p>Therapies</p>
        </div>
        <div class="diseases_result">
          <font-awesome-icon icon="fa-solid fa-disease" />
          <h2>74%</h2>
          <p>Diseases</p>
        </div>
      </div>
      <div class="list">
        <div class="element_desc">
          <AirBtn element="air" /><AirBtn element="hot" />
        </div>
        <div class="therapies_result">
          <font-awesome-icon icon="fa-solid fa-file-medical" />
          <h2>74%</h2>
          <p>Therapies</p>
        </div>
        <div class="diseases_result">
          <font-awesome-icon icon="fa-solid fa-disease" />
          <h2>74%</h2>
          <p>Diseases</p>
        </div>
      </div>
      <div class="list">
        <div class="element_desc">
          <AirBtn element="air" /><AirBtn element="hot" />
        </div>
        <div class="therapies_result">
          <font-awesome-icon icon="fa-solid fa-file-medical" />
          <h2>74%</h2>
          <p>Therapies</p>
        </div>
        <div class="diseases_result">
          <font-awesome-icon icon="fa-solid fa-disease" />
          <h2>74%</h2>
          <p>Diseases</p>
        </div>
      </div>
      <div class="list">
        <div class="element_desc">
          <AirBtn element="air" /><AirBtn element="hot" />
        </div>
        <div class="therapies_result">
          <font-awesome-icon icon="fa-solid fa-file-medical" />
          <h2>74%</h2>
          <p>Therapies</p>
        </div>
        <div class="diseases_result">
          <font-awesome-icon icon="fa-solid fa-disease" />
          <h2>74%</h2>
          <p>Diseases</p>
        </div>
      </div>
    </div>
    <div class="created_section">
      <div class="list">
        <div class="title">
          <font-awesome-icon icon="fa-solid fa-disease" />
          <h3>Created diseases</h3>
        </div>
        <div class="count">
          <h3>15</h3>
          <p>Disease</p>
        </div>
        <p class="created_disease">Last Created disease</p>
      </div>
      <div class="list">
        <div class="title">
          <font-awesome-icon icon="fa-solid fa-disease" />
          <h3>Created therapies</h3>
        </div>
        <div class="count">
          <h3>15</h3>
          <p>Disease</p>
        </div>
        <p class="created_disease">Last Created disease</p>
      </div>
      <div class="list">
        <div class="title">
          <font-awesome-icon icon="fa-solid fa-disease" />
          <h3>Purchased</h3>
          therapies
        </div>
        <div class="count">
          <h3>15</h3>
          <p>Disease</p>
        </div>
        <p class="created_disease">Last Created disease</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { getModule } from "vuex-module-decorators";
import User from "@/store/modules/User";
import { store } from "@/store";
import AirBtn from "@/components/ElementButton/airBtn.vue";

const user = getModule(User, store);
console.log("log", user);
const userDetails = computed(() => user.userData);
const fullName = computed(
  () => `${userDetails.value?.firstName} ${userDetails.value?.lastName}`
);
</script>

<style lang="scss" scoped>
@use "@/assets/scss/colors.scss" as color;
@use "sass:color" as sasscolor;
.view.entry.dashboard {
  padding-left: 50px;
  width: 100%;
  > header {
    > h3 {
      font-weight: bolder;
    }
    > .greeting {
      font-weight: 700;
      font-size: 18px;

      > .highlight {
        color: color.$main-green;
      }
    }

    > .info {
      margin-top: 10px;
      font-size: 14px;
    }
  }
  > .element_list_card {
    width: 100%;
    display: flex;
    margin-top: 20px;

    > * {
      max-width: 200px;
    }
    > .list {
      &:first-child {
        background: transparent
          linear-gradient(122deg, #f9ddfc 0%, #767fcf 100%) 0% 0% no-repeat
          padding-box;
      }
      width: 100%;
      margin-right: 10px;
      padding: 8px;
      border: 1px solid color.$ash-7;
      border-radius: 6px;
      box-shadow: 0px 3px 6px color.$shadow-color;

      > .element_desc {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
      }

      > .therapies_result {
        display: flex;
        align-items: center;

        > h2 {
          font-size: 18px;
          margin: 0;
          padding: 0;
          font-weight: 900;
          margin: 0 6px 0 6px;
        }
      }
      > .diseases_result {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        > h2 {
          font-size: 18px;
          margin: 0;
          padding: 0;
          font-weight: 900;
          margin: 0 6px 0 6px;
        }
      }
    }
  }
  > .created_section {
    width: 100%;
    display: flex;
    align-items: flex-start;
    margin-top: 10px;

    > * {
      max-width: 250px;
    }

    > .list {
      width: 100%;
      margin-right: 10px;
      padding: 8px;
      border: 1px solid color.$ash-7;
      border-radius: 6px;
      box-shadow: 0px 3px 6px color.$shadow-color;

      > .title {
        display: flex;
        align-items: center;

        > h3 {
          margin: 0;
          padding: 0;
          font-size: 15px;
          font-weight: bolder;
          margin-left: 10px;
        }
      }
      > .count {
        display: flex;
        align-items: center;

        > h3 {
          margin: 0;
          padding: 0;
          font-weight: bolder;
        }

        > p {
          margin-left: 10px;
        }
      }
      > .created_disease {
        font-weight: bolder;
        font-size: 15px;
        margin-top: 6px;
      }
    }
  }
}
</style>
