<script setup lang="ts">
import { ref } from "vue";
import vue3starRatings from "vue3-star-ratings";
const rating = ref();
</script>
<template>
  <div class="component entry therapistcard">
    <div class="card">
      <div class="card-img">
        <img src="@/assets/images/pngs/post_1.webp" alt="" />
      </div>
      <div class="info">
        <div class="row">
          <div class="column_">
            <div class="element">Earth</div>
            <p class="item_name">Item name</p>
          </div>
          <div class="column">
            <div class="date">12/12/2022</div>
          </div>
        </div>
        <div class="rating">
          <div class="rating-title">Therapies: <span>35</span></div>
          <vue3starRatings
            class="star-rating"
            starSize="18"
            :showControl="false"
            v-model="rating"
          />
        </div>
        <div class="action_btn">
          <button>Leave a feedback</button>
          <button>See more</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use "@/assets/scss/colors.scss" as color;
@use "sass:color" as sasscolor;
.component.entry.therapistcard {
  width: 253px;
  height: 407px;
  background-color: color.$white-1;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0px 3px 6px color.$shadow-color;
  > .card {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 6px;
    > .card-img {
      width: 100%;
      height: 197px;

      > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    > .info {
      width: 100%;
      height: fit-content;
      padding: 7px 10px 40px 10px;
      > .row {
        display: flex;
        justify-content: space-between;
        padding-bottom: 13px;
        border-bottom: 1px solid color.$row-line;
        > .column_ {
          > .element {
            border-radius: 4px;
            padding: 3px 20px;
            font-size: 12px;
            color: color.$white-1;
            background: transparent
              linear-gradient(105deg, #66ffcc 0%, #1fb862 100%) 0% 0% no-repeat
              padding-box;
            text-align: center;
            letter-spacing: 0.8px;
          }
          > .item_name {
            margin-top: 8px;
            color: color.$thick-black;
            font-weight: 600;
            font-size: 14px;
          }
        }

        > .column {
          > .date {
            font-size: 13px;
            color: color.$row-line;
          }
        }
      }
      > .rating {
        margin-top: 7px;
        padding-bottom: 20px;
        border-bottom: 1px solid color.$row-line;
        > .rating-title {
          font-size: 14px;
        }
        :deep() {
          .star-rating {
            padding: 0;
            margin: 0;
            margin-top: 10px;

            .stars {
              margin: 0;
            }
          }
        }
      }

      > .action_btn {
        margin-top: 10px;
        display: flex;

        > * {
          font-size: 10px;
          border: 1px solid color.$border-color;
          border-radius: 6px;
          padding: 10px;
          background: color.$white-1;
          color: color.$thick-black;
          font-weight: 600;
          cursor: pointer;
          &:first-child {
            margin-right: 7px;
          }
        }
      }
    }
  }
}
</style>
