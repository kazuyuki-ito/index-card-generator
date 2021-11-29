<template>
    <div class="content">
        <h2>デザインを選択してください。</h2>
        <ul>
          <li>
            <button class="btn white" @click="designSelect('a')">
                <span>デザインA</span>
            </button>
          </li>
          <li>
            <button class="btn white" @click="designSelect('b')">
                <span>デザインB</span>
            </button>
          </li>
          <li>
            <button class="btn white" @click="designSelect('c')">
                <span>デザインC</span>
            </button>
          </li>
        </ul>
        <button class="btn white" @click="back">戻る</button>
    </div>
</template>

<script>

export default {
    methods: {
        designSelect: function(design){
            this.$emit('designSelect', design);
        },
        back: function(){
            this.$emit('back'
        );
        }
    }
}
</script>

<style scoped>
  .content {
      width: 100%;
  }
  h2 {
    text-align: center;
    margin-top: 40px;
  }
  ul {
    width: 60%;
    margin: 20px auto 80px;
    display: flex;
    justify-content: center;
  }
  li {
    width: 30%;
    padding-top: 30%;
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

