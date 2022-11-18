<template>
  <div class="component entry card">
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
        <div class="brand">
          <div class="brand-logo">
            <img src="@/assets/images/pngs/post_1.webp" alt="" />
          </div>
          <p>Brand name</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@use "@/assets/scss/colors.scss" as color;
@use "sass:color" as sasscolor;
.component.entry.card {
  width: 253px;
  height: 327px;
  background-color: color.$white-1;
  border-radius: 6px;
  overflow: hidden;
  > .card {
    width: 100%;
    height: 100%;
    object-fit: contain;
    box-shadow: 0px 3px 6px color.$shadow-color;
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
      > .brand {
        display: flex;
        align-items: center;
        margin-top: 10px;
        > .brand-logo {
          width: 40px;
          height: 40px;
          border-radius: 50px;
          overflow: hidden;

          > img {
            width: 100%;
            height: 100%;
          }
        }

        > p {
          margin-left: 20px;
          font-size: 11px;
          font-weight: 600;
          color: color.$thick-black;
        }
      }
    }
  }
}
</style>
