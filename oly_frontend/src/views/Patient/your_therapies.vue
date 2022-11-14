<template>
  <div class="view entry yourtherapies">
    <div class="section">
      <p class="title">
        Your therapies list <span class="highlight">Patient </span
        ><font-awesome-icon icon="fa-solid fa-user-doctor" class="icon" />
      </p>

      <p class="hint">Here you can find your purchased therapies</p>

      <div class="element_action_button">
        <button
          @click="activeClass = 'air'"
          :class="{ active: activeClass === 'air' }"
        >
          Air
        </button>
        <button
          @click="activeClass = 'water'"
          :class="{ active_water: activeClass === 'water' }"
        >
          Water
        </button>
        <button
          @click="activeClass = 'earth'"
          :class="{ active_earth: activeClass === 'earth' }"
        >
          Earth
        </button>
        <button
          @click="activeClass = 'fire'"
          :class="{ active_fire: activeClass === 'fire' }"
        >
          Fire
        </button>
      </div>
      <div class="table">
        <div class="table_header">
          <ul>
            <li>Therapist</li>
            <li>Therapy Name</li>
            <li>Disease</li>
            <li>Date</li>
            <li>Element</li>
            <li>Price</li>
          </ul>
        </div>
        <div class="table_body">
          <div class="list">
            <ul>
              <li><img src="@/assets/images/pngs/pImage.png" alt="" /></li>
              <li>james brown</li>
              <li>Johnsens</li>
              <li>12/12/2022</li>
            </ul>
            <button class="table-body_btn">
              <solidEye /> <span>See more</span>
            </button>
          </div>
          <div class="list">
            <ul>
              <li><img src="@/assets/images/pngs/pImage.png" alt="" /></li>
              <li>james brown</li>
              <li>12/12/2022</li>
              <li>32</li>
            </ul>
            <button class="table-body_btn">
              <solidEye /> <span>See more</span>
            </button>
          </div>
          <div class="list">
            <ul>
              <li><img src="@/assets/images/pngs/pImage.png" alt="" /></li>
              <li>james brown</li>
              <li>12/12/2022</li>
              <li>32</li>
            </ul>
            <button class="table-body_btn">
              <solidEye /> <span>See more</span>
            </button>
          </div>
          <div class="list">
            <ul>
              <li><img src="@/assets/images/pngs/pImage.png" alt="" /></li>
              <li>james brown</li>
              <li>12/12/2022</li>
              <li>32</li>
            </ul>
            <button class="table-body_btn">
              <solidEye /> <span>See more</span>
            </button>
          </div>
          <div class="list">
            <ul>
              <li><img src="@/assets/images/pngs/pImage.png" alt="" /></li>
              <li>james brown</li>
              <li>12/12/2022</li>
              <li>32</li>
            </ul>
            <button class="table-body_btn">
              <solidEye /> <span>See more</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const activeClass = ref("air");
</script>
<style lang="scss" scoped>
@use "@/assets/scss/colors.scss" as color;
@use "sass:color" as sasscolor;
.view.entry.yourtherapies {
  width: 100%;
  padding-left: 100px;
  > .section {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    > .title {
      font-size: 27px;
      color: color.$thick-black;
      font-weight: bolder;

      .highlight {
        color: color.$main-green;
      }

      .icon {
        color: color.$main-green;
      }
    }

    // > .action_button {
    //   display: flex;
    //   align-items: center;
    //   margin-top: 45px;

    //   > * {
    //     outline: none;
    //     padding: 12px 186px;
    //     border-radius: 6px;
    //     border-style: none;
    //     box-shadow: 0px 3px 6px color.$shadow-color;
    //     background-color: color.$ash-0;
    //     color: color.$text-black-0;
    //     text-transform: uppercase;
    //     transition: 0.3s ease-in-out;
    //     cursor: pointer;
    //     &:first-child {
    //       margin-right: 6px;
    //       background-color: color.$main-green;
    //       color: color.$white-1;
    //     }

    //     &:hover {
    //       box-shadow: 3px 3px 6px 0
    //         sasscolor.adjust(color.$ash-3, $lightness: -10%);
    //     }
    //   }
    // }
    > .hint {
      width: 100%;
      font-size: 12px;
      margin-top: 42px;
      line-height: 0.5;
    }

    > .element_action_button {
      width: 100%;
      display: flex;
      align-items: center;
      margin-top: 42px;

      > * {
        border-radius: 6px;
        box-shadow: 0px 3px 6px color.$shadow-color;
        padding: 10px 60px;
        outline: none;
        border-style: none;
        background-color: color.$ash-0;
        margin-right: 22px;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          box-shadow: 3px 3px 6px 0
            sasscolor.adjust(color.$ash-3, $lightness: -10%);
        }
        &.active {
          background: transparent
            linear-gradient(122deg, #ffbb09 0%, #ff6633 100%) 0% 0% no-repeat
            padding-box;
          color: color.$white-1;
        }
        &.active_water {
          background: transparent
            linear-gradient(122deg, #00ccff 0%, #2680b3 100%) 0% 0% no-repeat
            padding-box;
          color: color.$white-1;
        }
        &.active_earth {
          background: transparent
            linear-gradient(122deg, #66ffcc 0%, #1fb862 100%) 0% 0% no-repeat
            padding-box;
          color: color.$white-1;
        }
        &.active_fire {
          background: transparent
            linear-gradient(122deg, #ff3f3f 0%, #d90c0c 100%) 0% 0% no-repeat
            padding-box;
          color: color.$white-1;
        }
      }
    }

    > .table {
      width: 100%;
      margin-top: 45px;
      > .table_header {
        width: 100%;
        padding: 0px 0px 15px 0px;
        border-bottom: 1px solid color.$row-line;
        margin-bottom: 10px;

        > ul {
          display: flex;
          list-style: none;
          align-items: center;

          > * {
            font-size: 13px;
            margin-right: 49px;
            color: color.$text-black-0;
          }
        }
      }

      > .table_body {
        width: 100%;

        > .list {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0px 0px 20px 0px;
          border-bottom: 1px solid color.$row-line;
          margin-bottom: 10px;
          > ul {
            display: flex;
            list-style: none;
            align-items: center;
            > * {
              font-size: 13px;
              margin-right: 55px;
              color: color.$text-black-0;
            }
          }
          .table-body_btn {
            outline: none;
            border-style: none;
            border: 1px solid color.$border-color;
            border-radius: 6px;
            padding: 10px;
            cursor: pointer;
            color: color.$text-black-0;
            font-size: 13px;
            font-weight: 600;
            display: flex;
            align-items: center;
            > * {
              &:first-child {
                margin-right: 6px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
