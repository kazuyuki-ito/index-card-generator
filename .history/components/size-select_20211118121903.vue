<template>
    <div class="content">
        <h2>サイズを選択してください。</h2>
        <ul>
          <li>
            <button class="btn white" @click="sizeSelect('square')">
                <span>ましかく</span>
            </button>
          </li>
          <li>
            <button class="btn white" @click="sizeSelect('horizontal')">
                <span>Lサイズ（横）</span>
            </button>
          </li>
          <li>
            <button class="btn white" @click="sizeSelect('vertical')">
                <span>Lサイズ（縦）</span>
            </button>
          </li>
        </ul>
        <h2>フォントを選択してください。</h2>
        <ul>
          <li>
            <button class="btn white" @click="fontSelect('a')">
                <span>ゴシック</span>
            </button>
          </li>
          <li>
            <button class="btn white" @click="fontSelect('b')">
                <span>明朝体</span>
            </button>
          </li>
          <li>
            <button class="btn white" @click="fontSelect('c')">
                <span>ポップ体</span>
            </button>
          </li>
        </ul>
        <h2>デザインを選択してください。</h2>
        <ul>
          <li>
            <button class="btn white" @click="designSelect('a')">
                <span>ゴシック</span>
            </button>
          </li>
          <li>
            <button class="btn white" @click="designSelect('b')">
                <span>明朝体</span>
            </button>
          </li>
          <li>
            <button class="btn white" @click="designSelect('c')">
                <span>ポップ体</span>
            </button>
          </li>
        </ul>
    </div>
</template>

<script>

export default {
    methods: {
        sizeSelect: function(size){
            this.$emit('sizeSelect', size);
        },
        fontSelect: function(font){
            this.$emit('fontSelect', font);
        },
        designSelect: function(design){
            this.$emit('designSelect', design);
        },
    }
}
</script>

<style scoped>
  .content {
      width: 100%;
      padding-bottom: 40px;
  }
  h2 {
    text-align: center;
    margin-top: 40px;
  }
  ul {
    width: 60%;
    margin: 20px auto 40px;
    display: flex;
    justify-content: center;
  }
  li {
    width: 30%;
    padding-top: 15%;
    position: relative;
  }
  li .btn {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    font-size: 1.8rem;
  }
  li + li {
    margin-left: 5%;
  }
</style>

