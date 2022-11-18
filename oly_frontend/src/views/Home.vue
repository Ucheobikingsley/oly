<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { templateRef } from "@vueuse/core";
import { useRoute } from "vue-router";
import therapyCard from "@/components/Card/card.vue";
import therapistCard from "@/components/Card/therapistCard.vue";
import solidEye from "@/components/icons/solidEye.vue";
import solidEyeWhite from "@/components/icons/solidEyeWhite.vue";
// import scroller from "vue-scrollto";
import { debounce, get, pick } from "lodash-es";
import scrollIntoView from "scroll-into-view";

const scrollDisease = templateRef("scrollDisease");
const therapistsEl = templateRef("therapistsEl");
const therapiesEl = templateRef("therapiesEl");
const route = useRoute();
const routeName = computed(() => route.name);
const container = templateRef("container");
watch(
  routeName,
  debounce(
    (value) => {
      if (value === "disease") {
        if (scrollDisease.value) {
          scrollIntoView(scrollDisease.value as HTMLElement, {
            time: 500,
            align: {
              top: 0.5,
              topOffset: 150,
            },

            cancellable: false,
          });
        }
      } else if (value === "therapists") {
        if (therapistsEl.value) {
          scrollIntoView(therapistsEl.value as HTMLElement, {
            time: 500,
            align: {
              top: 0.1,
              topOffset: 150,
            },

            cancellable: false,
          });
        }
      } else if (value === "therapies") {
        if (therapiesEl.value) {
          scrollIntoView(therapiesEl.value as HTMLElement, {
            time: 500,
            align: {
              top: 0.1,
              topOffset: 150,
            },

            cancellable: false,
          });
        }
      }
    },
    200,
    {
      maxWait: 500,
    }
  )
);

const activeClass = ref<"air" | "water" | "earth" | "fire">("air");
</script>
<template>
  <div ref="container" class="view entry home">
    <div class="hero_section">
      <div class="image_container">
        <img src="@/assets/images/pngs/sfondo.webp" alt="" />
      </div>
      <div class="wrapper">
        <div class="img_container"></div>
      </div>
      <div class="main_body_text">
        Welcome <br />
        On OLY
      </div>
    </div>
    <div
      ref="scrollDisease"
      id="scrollDisease"
      class="uploaded_diseases_section"
    >
      <div class="section">
        <p class="title">Last Uploaded Diseases</p>
        <div class="action_button">
          <button class="defined">Defined Diseases</button>
          <button class="not_defined">Not Defined Diseases</button>
        </div>

        <p class="hint">
          Defined diseases are created by OLY or authorized professional users,
          search here to find how you are feeling and discover purposed
          therapies
        </p>

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
              <li>Author</li>
              <li>Disease Name</li>
              <li>Date</li>
              <li>Therapies</li>
            </ul>
          </div>
          <div class="table_body">
            <div class="list">
              <ul>
                <li><img src="@/assets/images/pngs/pImage.png" alt="" /></li>
                <li>james brown</li>
                <li>12/12/2022</li>
                <li>32</li>
              </ul>
              <button class="table-body_btn">
                <solidEye /> <span>more</span>
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
    <div class="last-uploaded">
      <p class="title">Last uploaded items</p>
      <div class="uploaded-item">
        <therapyCard />
        <therapyCard />
        <therapyCard />
        <therapyCard />
      </div>

      <button class="uploaded-item_btn">
        <solidEyeWhite class="icon" /> <span>See more</span>
      </button>
    </div>
    <div ref="therapistsEl" class="therapists">
      <p class="title">Recent Therapists</p>
      <div class="therapists-items">
        <therapistCard />
        <therapistCard />
        <therapistCard />
        <therapistCard />
      </div>
    </div>
    <div class="hui_image">
      <img src="@/assets/images/jpeg/hui.jpeg" alt="" />
    </div>
    <div ref="therapiesEl" class="uploaded_diseases_section recent_therapies">
      <div class="section">
        <p class="title">Recent Therapies</p>

        <div class="element_action_button">
          <button
            @click="activeClass = 'air'"
            :class="{ active: activeClass === 'air' }"
          >
            Air
          </button>
          <button
            @click="activeClass = 'water'"
            :class="{ active: activeClass === 'water' }"
          >
            Water
          </button>
          <button
            @click="activeClass = 'earth'"
            :class="{ active: activeClass === 'earth' }"
          >
            Earth
          </button>
          <button
            @click="activeClass = 'fire'"
            :class="{ active: activeClass === 'fire' }"
          >
            Fire
          </button>
        </div>
        <div class="table">
          <div class="table_header">
            <ul>
              <li>Author</li>
              <li>Disease Name</li>
              <li>Date</li>
              <li>Therapies</li>
            </ul>
          </div>
          <div class="table_body">
            <div class="list">
              <ul>
                <li><img src="@/assets/images/pngs/pImage.png" alt="" /></li>
                <li>james brown</li>
                <li>12/12/2022</li>
                <li>32</li>
              </ul>
              <button class="table-body_btn">See more</button>
            </div>
            <div class="list">
              <ul>
                <li><img src="@/assets/images/pngs/pImage.png" alt="" /></li>
                <li>james brown</li>
                <li>12/12/2022</li>
                <li>32</li>
              </ul>
              <button class="table-body_btn">See more</button>
            </div>
            <div class="list">
              <ul>
                <li><img src="@/assets/images/pngs/pImage.png" alt="" /></li>
                <li>james brown</li>
                <li>12/12/2022</li>
                <li>32</li>
              </ul>
              <button class="table-body_btn">See more</button>
            </div>
            <div class="list">
              <ul>
                <li><img src="@/assets/images/pngs/pImage.png" alt="" /></li>
                <li>james brown</li>
                <li>12/12/2022</li>
                <li>32</li>
              </ul>
              <button class="table-body_btn">See more</button>
            </div>
            <div class="list">
              <ul>
                <li><img src="@/assets/images/pngs/pImage.png" alt="" /></li>
                <li>james brown</li>
                <li>12/12/2022</li>
                <li>32</li>
              </ul>
              <button class="table-body_btn">See more</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="hui_image_">
      <img src="@/assets/images/pngs/hui_1.webp" alt="" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use "@/assets/scss/colors.scss" as color;
@use "sass:color" as sasscolor;
.view.entry.home {
  width: 100%;
  > .hero_section {
    height: 100%;
    position: relative;
    > .image_container {
      height: 994px;
      > img {
        object-fit: cover;
        width: 100%;
        height: 100%;
        object-position: 50% 89%;
      }
    }
    > .wrapper {
      height: 821px;
      width: 470px;
      position: absolute;
      top: 2%;
      left: 18%;
      > .img_container {
        padding: 3px;
        background-color: color.$white-1;
        border-radius: 6px;
        width: inherit;
        height: inherit;

        background-color: color.$white-1;
        background: url("../assets/images/jpeg/teaserImage.jpeg");
        background-repeat: no-repeat;
        background-size: contain;
      }
    }
    > .main_body_text {
      font-weight: bold;
      color: color.$white-1;
      font-size: 95px;
      position: absolute;
      top: 20%;
      right: 6%;
    }
  }
  > .uploaded_diseases_section {
    overflow: hidden;
    width: 100%;
    > .section {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      > .title {
        font-size: 30px;
        color: color.$thick-black;
        font-weight: bold;
      }

      > .action_button {
        display: flex;
        align-items: center;
        margin-top: 45px;

        > * {
          outline: none;
          padding: 12px 186px;
          border-radius: 6px;
          border-style: none;
          box-shadow: 0px 3px 6px color.$shadow-color;
          background-color: color.$ash-0;
          color: color.$text-black-0;
          text-transform: uppercase;
          transition: 0.3s ease-in-out;
          cursor: pointer;
          &:first-child {
            margin-right: 6px;
            background-color: color.$main-green;
            color: color.$white-1;
          }

          &:hover {
            box-shadow: 3px 3px 6px 0
              sasscolor.adjust(color.$ash-3, $lightness: -10%);
          }
        }
      }
      > .hint {
        width: 35%;
        font-size: 12px;
        margin-top: 42px;
        text-align: center;
        line-height: 1.5;
      }

      > .element_action_button {
        width: 70%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 42px;

        > * {
          border-radius: 6px;
          box-shadow: 0px 3px 6px color.$shadow-color;
          padding: 12px 64px;
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
        width: 70%;
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
                margin-right: 49px;
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
  > .last-uploaded {
    width: 100%;
    background: color.$navy-blue;
    height: auto;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    margin-top: 70px;
    align-items: center;
    padding: 40px 0 40px 0;

    > .title {
      color: color.$white-1;
      font-weight: bold;
      font-size: 30px;
    }

    > .uploaded-item {
      width: 70%;
      display: flex;
      justify-content: space-between;
      margin-top: 46px;
    }
    > .uploaded-item_btn {
      outline: none;
      border-style: none;
      border: 1px solid color.$border-color;
      border-radius: 6px;
      padding: 10px 20px;
      cursor: pointer;
      color: color.$white-1;
      font-size: 14px;
      font-weight: 600;
      background-color: transparent;
      margin-top: 20px;
      display: flex;
      align-items: center;

      > * {
        &:first-child {
          margin-right: 6px;
          color: color.$white-1;
        }
      }
    }
  }
  > .therapists {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 57px;

    > .title {
      color: color.$thick-black;
      font-size: 30px;
      font-weight: bold;
      margin-bottom: 30px;
    }

    > .therapists-items {
      display: flex;
      justify-content: space-between;
      width: 70%;
    }
  }

  > .hui_image {
    margin: 0 auto;
    width: 74%;
    height: 250px;

    > * {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  > .recent_therapies {
    margin-top: 80px;
  }

  > .hui_image_ {
    margin: 0 auto;
    width: 74%;
    margin-top: 57px;

    > * {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
