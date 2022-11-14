<template>
  <div class="view entry about">
    <div class="about_entry">
      <h1 class="title">About Us</h1>
      <div class="text">
        OLY ti dà la possibilità di esprimere al meglio un tuo disagio,
        permettendoti di inserire in maniera semplice e veloce i parametri
        necessari per ottenere una terapia su misura per te. Potrai comodamente
        scegliere e acquistare gli item (non per forza riconducibili a
        medicinali, ma a tutti e 4 gli elementi) consigliati per la risoluzione
        del tuo problema.
      </div>
    </div>
    <div class="profiles_section">
      <div class="list blue">
        <div class="list_section">
          <div class="image_section">
            <div class="img">
              <img src="@/assets/images/pngs/Rectangle.png" alt="" />
            </div>
          </div>
          <div class="info">
            <p class="info-title">Claudia Marinozzi</p>
            <div class="text">
              OLY ti dà la possibilità di esprimere al meglio un tuo disagio,
              permettendoti di inserire in maniera semplice e veloce i parametri
              necessari per ottenere una terapia su misura per te. Potrai
              comodamente scegliere e acquistare gli item (non per forza
              riconducibili a medicinali, ma a tutti e 4 gli elementi)
              consigliati per la risoluzione del tuo problema.
            </div>
          </div>
        </div>
      </div>
      <div class="list green">
        <div class="list_section">
          <div class="image_section">
            <div class="img">
              <img src="@/assets/images/pngs/Rectangle.png" alt="" />
            </div>
          </div>
          <div class="info">
            <p class="info-title">Giovanni G. Morra</p>
            <div class="text">
              OLY ti dà la possibilità di esprimere al meglio un tuo disagio,
              permettendoti di inserire in maniera semplice e veloce i parametri
              necessari per ottenere una terapia su misura per te. Potrai
              comodamente scegliere e acquistare gli item (non per forza
              riconducibili a medicinali, ma a tutti e 4 gli elementi)
              consigliati per la risoluzione del tuo problema.
            </div>
          </div>
        </div>
      </div>
      <div class="list light-green">
        <div class="list_section">
          <div class="image_section">
            <div class="img">
              <img src="@/assets/images/pngs/Rectangle.png" alt="" />
            </div>
          </div>
          <div class="info">
            <p class="info-title">Luigi V. Rinaldi</p>
            <div class="text">
              OLY ti dà la possibilità di esprimere al meglio un tuo disagio,
              permettendoti di inserire in maniera semplice e veloce i parametri
              necessari per ottenere una terapia su misura per te. Potrai
              comodamente scegliere e acquistare gli item (non per forza
              riconducibili a medicinali, ma a tutti e 4 gli elementi)
              consigliati per la risoluzione del tuo problema.
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hui_image">
      <img src="@/assets/images/jpeg/hui.jpeg" alt="" srcset="" />
    </div>
  </div>
  /
</template>
<style lang="scss" scoped>
@use "@/assets/scss/colors.scss" as color;
@use "sass:color" as sasscolor;
.view.entry.about {
  width: 100%;
  > .about_entry {
    padding-top: 30px;
    width: 70%;
    margin: 0 auto;

    > .title {
      color: color.$navy-blue;
      font-weight: bold;
    }
    > .text {
      font-size: 16px;
    }
  }
  > .profiles_section {
    width: 100%;
    height: initial;
    margin-bottom: 40px;

    > .list {
      display: flex;
      width: 100%;
      height: 400px;
      align-items: center;
      justify-content: center;
      margin-top: 0;

      &.blue {
        background-color: color.$navy-blue;
      }
      &.green {
        background-color: color.$green-1;
      }
      &.light-green {
        background-color: color.$green-2;
      }

      &:first-child {
        margin-top: 45px;
      }
      > .list_section {
        width: 70%;
        display: flex;

        > .image_section {
          > .img {
            width: 201px;
            height: 201px;
            overflow: hidden;
            border-radius: 100px;
            > img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
        }
        > .info {
          width: 60%;
          color: color.$white-1;
          margin-left: 30px;

          > .info-title {
            font-weight: bold;
            font-size: 30px;
          }
          > .text {
            margin-top: 20px;
            // line-height: 20px;
            font-size: 17px;
          }
        }
      }
    }
  }
  > .hui_image {
    margin: 0 auto;
    width: 70%;
  }
}
</style>
