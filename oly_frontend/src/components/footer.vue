<script setup lang="ts">
import logo from "@/components/icons/whiteLogo.vue";
import vueSvg from "../assets/svg-icon/ei_logo.svg";
</script>
<template>
  <div class="component entry footer">
    <logo class="logo" />
    <div class="section">
      <div class="section_one">
        <div class="address">
          OLY società a responsabilità limitata Società Benefit Sede legale
          Isole Tremiti (FG) - Via Traversa delle Prigioni, 6 CF/P.IVA
          04408000711
        </div>
        <div class="more-info">
          OLY è un'isola dell'archipelago di Enry's Island SpA
        </div>
        <div class="icon_div">
          <icon :data="vueSvg" class="icon" original></icon>
        </div>
      </div>
      <div class="section_two">
        <p class="newsletter_hint">
          Stay tuned with us and Subscribe our Newsletter
        </p>
        <div class="newsletter_emailbox">
          <div class="input-field">
            <font-awesome-icon icon="fa-solid fa-envelope" class="icon" />
            <input type="text" placeholder="Your email..." />
          </div>
          <button class="btn">Subscribe</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use "@/assets/scss/colors.scss" as color;
@use "sass:color" as sasscolor;
.component.entry.footer {
  width: 70%;
  margin: 0 auto;
  color: color.$white-1;

  > .logo {
    width: 164px;
  }
  > .section {
    display: flex;
    justify-items: space-between;
    > .section_one {
      width: 50%;
      > .address {
        margin-top: 15px;
        width: 80%;
        font-size: 14px;
        text-align: left;
        line-height: 20px;
        letter-spacing: 0.4px;
      }
      > .more-info {
        margin-top: 15px;
        font-size: 14px;
        text-align: left;
        line-height: 20px;
        letter-spacing: 0.4px;
      }
      > .icon_div {
        margin-top: 20px;
        > .icon {
          height: 100%;
          width: 146px;
        }
      }
    }
    > .section_two {
      width: 50%;
      > .newsletter_hint {
        font-size: 15px;
        font-weight: 600;
      }

      > .newsletter_emailbox {
        display: flex;
        align-items: center;
        margin-top: 20px;
        > .input-field {
          height: 34px;
          width: 200px;
          border-bottom-left-radius: 6px;
          border-top-left-radius: 6px;
          border: 1px solid color.$border-color;
          background-color: transparent;
          box-shadow: 0px -20px 20px #00000029;
          border: 1px solid color.$inputborder-color;
          display: flex;
          align-items: center;
          justify-content: center;

          > .icon {
            color: color.$row-line;
          }
          input {
            border-style: none;
            outline: none;
            background: transparent;
            color: color.$row-line;
            // color: transparent;
          }
        }
        > .btn {
          height: 34px;
          outline: none;
          background-color: color.$main-green;
          border-style: none;
          border-top-right-radius: 6px;
          border-bottom-right-radius: 6px;
          color: color.$white-1;
          font-weight: 600;
          padding: 0 20px;
        }
      }
    }
  }
}
</style>
