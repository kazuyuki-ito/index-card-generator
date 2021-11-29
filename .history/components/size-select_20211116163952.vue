<template>
    <div>
        <h2>サイズを選択してください。</h2>
        <ul>
          <li>
            <button class="btn white"><span>ましかく</span></button>
          </li>
          <li>
            <button class="btn white"><span>Lサイズ（横）</span></button>
          </li>
          <li>
            <button class="btn white"><span>Lサイズ（縦）</span></button>
          </li>
        </ul>
    </div>
</template>

<script>

export default {
}
</script>

<style scoped>
  section {
    width: 100%;
    max-width: 960px;
    margin: 0 auto;
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

