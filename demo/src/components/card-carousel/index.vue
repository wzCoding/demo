<script src="./index"></script>
<template>
    <div class="card-carousel">
        <div class="container">
            <div class="box">
                <div class="card"></div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.card-carousel {
  --card-width: 12rem;
  --card-height: 16rem;
  --card-gap: calc(var(--card-width) * 2);
  //background: #000;
  width: 100vw;
  height: 100vh;

  .container {
    width: 100%;
    height: 100%;
    perspective: 1800px;
    perspective-origin: top;
    position: relative;

    .box {
      width: var(--card-width);
      height: var(--card-height);
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: calc(var(--card-height) / -2);
      margin-left: calc(var(--card-width) / -2);
      transform-style: preserve-3d;
      //animation: boxRotate 20s linear infinite;
      &:hover {
        animation-play-state: paused;
        cursor: pointer;
      }

      .card {
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: #69c0ff;
      }

      // .card:nth-child(1) {
      //   transform: rotateY(36deg)  translateZ(var(--card-gap));
      // }

      // .card:nth-child(2) {
      //   transform: rotateY(72deg)  translateZ(var(--card-gap));
      // }

      // .card:nth-child(3) {
      //   transform: rotateY(108deg)  translateZ(var(--card-gap));
      // }

      // .card:nth-child(4) {
      //   transform: rotateY(144deg)  translateZ(var(--card-gap));
      // }

      // .card:nth-child(5) {
      //   transform: rotateY(180deg)  translateZ(var(--card-gap));
      // }

      // .card:nth-child(6) {
      //   transform: rotateY(216deg)  translateZ(var(--card-gap));
      // }

      // .card:nth-child(7) {
      //   transform: rotateY(252deg)  translateZ(var(--card-gap));
      // }

      // .card:nth-child(8) {
      //   transform: rotateY(288deg)  translateZ(var(--card-gap));
      // }

      // .card:nth-child(9) {
      //   transform: rotateY(324deg)  translateZ(var(--card-gap));
      // }

      // .card:nth-child(10) {
      //   transform: rotateY(360deg)  translateZ(var(--card-gap));
      // }

    }

    @keyframes boxRotate {
      from {
        transform: rotateY(0deg);
      }

      to {
        transform: rotateY(360deg);
      }
    }
  }
}
</style>