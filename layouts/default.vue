<template>
  <div>
    <header>
      <h1>
        <nuxt-link to="/">
          <img src="/img/logo.svg" alt="">
          <span>Index Card Generator</span>
        </nuxt-link>
      </h1>
    </header>
    <main>
      <nuxt />
    </main>
    <footer>
      <p>&copy; SHIMAUMA Print, Inc. All Rights Reserved.</p>
    </footer>
  </div>
</template>

<style scoped>
header {
  padding: 12px 16px;
  border-bottom: 1px solid #d1d1d1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
header h1 {
  line-height: 1;
}
header h1 a {
  color: #000;
  display: flex;
  align-items: center;
}
header h1 img {
  width: 142px;
  height: 42px;
}
header h1 span {
  font-size: 1.4rem;
  font-weight: normal;
  margin-left: 20px;
  margin-top: 8px;
}
footer {
  background: #eee;
  padding: 16px;
  text-align: center;
  position: fixed;
  width: 100%;
  bottom: 0;
}

</style>

