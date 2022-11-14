<template>
  <div class="views entry pricing">
    <div class="title">
      <h1 class="pricing">Pricing</h1>
    </div>
    <div class="high_light">
      <h1>Patient</h1>
      <p>For ever</p>
      <h1>Free</h1>

      <button class="btn">Subscribe now</button>
    </div>

    <div class="therapist_pricing">
      <div class="therapist_section">
        <h1 class="title">Therapist</h1>
        <div class="list">
          <div class="pricing">
            <h1 class="title">FREE</h1>
            <p class="info">
              Originati da un caos primordiale, i quattro elementi naturali sono
              alla base dell’ordine delle cose e con la loro interazione
              continua rappresentano gli stati dell’ esistenza, in quanto ogni
              elemento non può vivere senza l’altro. Concetto ancestrale che ci
              permette di dare un valore simbolico alla nostra esistenza.
            </p>
            <p class="price">€ 0.00</p>
            <button class="btn">Subscribe now</button>
          </div>
          <div class="pricing">
            <div class="hot">hot</div>
            <h1 class="title">GOLD</h1>
            <p class="info">
              Originati da un caos primordiale, i quattro elementi naturali sono
              alla base dell’ordine delle cose e con la loro interazione
              continua rappresentano gli stati dell’ esistenza, in quanto ogni
              elemento non può vivere senza l’altro. Concetto ancestrale che ci
              permette di dare un valore simbolico alla nostra esistenza.
            </p>
            <p class="price gold">€ 100.00</p>
            <button class="btn">Subscribe now</button>
          </div>
          <div class="pricing">
            <h1 class="title">PLATINUM</h1>
            <p class="info">
              Originati da un caos primordiale, i quattro elementi naturali sono
              alla base dell’ordine delle cose e con la loro interazione
              continua rappresentano gli stati dell’ esistenza, in quanto ogni
              elemento non può vivere senza l’altro. Concetto ancestrale che ci
              permette di dare un valore simbolico alla nostra esistenza.
            </p>
            <p class="price platinum">€ 300.00</p>
            <button class="btn">Subscribe now</button>
          </div>
        </div>
      </div>
      <div class="providers_section">
        <h1 class="title">Providers</h1>
        <div class="list">
          <div class="pricing">
            <h1 class="title">FREE</h1>
            <p class="info">
              Originati da un caos primordiale, i quattro elementi naturali sono
              alla base dell’ordine delle cose e con la loro interazione
              continua rappresentano gli stati dell’ esistenza, in quanto ogni
              elemento non può vivere senza l’altro. Concetto ancestrale che ci
              permette di dare un valore simbolico alla nostra esistenza.
            </p>
            <p class="price">€ 0.00</p>
            <button class="btn">Subscribe now</button>
          </div>
          <div class="pricing">
            <div class="hot">hot</div>
            <h1 class="title">GOLD</h1>
            <p class="info">
              Originati da un caos primordiale, i quattro elementi naturali sono
              alla base dell’ordine delle cose e con la loro interazione
              continua rappresentano gli stati dell’ esistenza, in quanto ogni
              elemento non può vivere senza l’altro. Concetto ancestrale che ci
              permette di dare un valore simbolico alla nostra esistenza.
            </p>
            <p class="price gold">€ 100.00</p>
            <button class="btn">Subscribe now</button>
          </div>
          <div class="pricing">
            <h1 class="title">PLATINUM</h1>
            <p class="info">
              Originati da un caos primordiale, i quattro elementi naturali sono
              alla base dell’ordine delle cose e con la loro interazione
              continua rappresentano gli stati dell’ esistenza, in quanto ogni
              elemento non può vivere senza l’altro. Concetto ancestrale che ci
              permette di dare un valore simbolico alla nostra esistenza.
            </p>
            <p class="price platinum">€ 300.00</p>
            <button class="btn">Subscribe now</button>
          </div>
        </div>
      </div>
    </div>
    <div class="hui_image">
      <img src="@/assets/images/jpeg/hui.jpeg" alt="" srcset="" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use "@/assets/scss/colors.scss" as color;
@use "sass:color" as sasscolor;
.views.entry.pricing {
  width: initial;
  padding-top: 20px;
  > .title {
    width: 70%;
    margin: 0 auto;
    .pricing {
      color: color.$navy-blue;
      font-weight: 900;
      font-size: 40px;
    }
  }

  > .high_light {
    width: 100%;
    height: auto;
    background-color: color.$navy-blue;
    padding: 20px 0 20px 0;
    text-align: center;
    color: color.$white-1;
    > * {
      font-weight: bold;
    }
    h1 {
      margin: 0;
    }

    > .btn {
      margin-top: 20px;
      border-style: none;
      border-radius: 6px;
      padding: 12px 36px;
      background-color: color.$main-green;
      color: color.$white-1;
      transition: 0.3s ease-in-out;
      box-shadow: 0px 3px 6px color.$shadow-color;
      color: color.$white-1;
      cursor: pointer;
      &:hover {
        box-shadow: 3px 3px 6px 0
          sasscolor.adjust(color.$thick-black, $lightness: -10%);
      }
    }
  }

  > .therapist_pricing {
    background-color: color.$green-1;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 40px;
    padding: 25px 0 40px 0;

    > .therapist_section,
    .providers_section {
      width: fit-content;
      height: fit-content;
      display: flex;
      align-items: center;
      flex-direction: column;
      > .title {
        font-weight: bold;
        color: color.$white-1;
      }

      > .list {
        display: flex;
        align-items: stretch;
        justify-content: center;
        > .pricing {
          width: 275px;
          height: auto;
          display: flex;
          flex-direction: column;
          padding: 20px 0 15px 0px;
          align-items: center;
          background-color: color.$white-1;
          justify-content: center;
          margin-right: 25px;

          position: relative;

          > .hot {
            position: absolute;
            width: 76px;
            height: 24px;
            background-color: color.$purple;
            right: 10px;
            text-align: center;
            font-size: 17px;
            font-weight: 700;
            top: 13px;
            color: color.$white-1;
            border-radius: 6px;
          }
          > .title {
            font-weight: bold;
            color: color.$navy-blue;
          }
          > .info {
            width: 60%;
            text-align: center;
          }
          > .price {
            margin-top: 10px;
            font-size: 30px;
            font-weight: bolder;

            &.gold {
              color: color.$purple;
            }

            &.platinum {
              color: color.$main-green;
            }
          }

          > .btn {
            padding: 12px 24px;
            border-radius: 6px;
            outline: none;
            border-style: none;
            background-color: color.$main-green;
            margin-top: 5px;
            cursor: pointer;
            box-shadow: 0px 3px 6px color.$shadow-color;
            color: color.$white-1;
            transition: 00.3s ease-in-out;
            &:hover {
              box-shadow: 3px 3px 6px 0
                sasscolor.adjust(color.$ash-3, $lightness: -10%);
            }
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
