<template>
  <div id="app">
    <div id="nav">
      <div class="header">
        <router-link to="/">
          <i class="material-icons">insert_chart_outlined</i>
          Puppy Tracker
        </router-link>
      </div>
      <div class="links">
        <router-link to="/" class="home">
          <i class="material-icons">home</i>
          Home
        </router-link>
        <router-link to="/puppies" class="main-link">
          <i class="material-icons">pets</i>
          Puppies
        </router-link>
        <router-link to="/about" class="main-link">
          <i class="material-icons">info</i>
          About
        </router-link>
      </div>
      <span class="spacer" />
      <div class="bottom">
        <a href="https://github.com/mattrobertson14/cs260-creative4" class="external" target="_blank">
          <img src="/github.svg" class="logo" />
          View GitHub Project
        </a>
      </div>
    </div>
    <div id="content">
      <router-view/>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Alegreya+Sans+SC:wght@500&display=swap');

#nav {
  box-sizing: border-box;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 250px;
  background: var(--color-primary-dark);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

#nav a {
  color: rgba(255,255,255,.8);
  display: block;
  padding: 6px 12px;
  display: flex;
  align-items: center;
  text-decoration: none;
  margin: 4px 8px;
}

#nav .main-link:hover {
  background: rgba(255,255,255,.05);
  border-radius: 8px;
}

#nav .main-link.router-link-active,
  #nav .home.router-link-exact-active {
  background: var(--color-primary);
  border-radius: 8px;
}

#nav a .material-icons, .logo {
  margin-right: 12px;
  font-size: 18px;
  height: 18px;
  width: 18px;
}

#nav .header a {
  font-family: 'Alegreya Sans SC', sans-serif;
  text-transform: small-caps;
  font-size: 24px;
  padding: 24px 12px;
  border-bottom: 1px solid rgba(255,255,255,.3);
}

#nav .header .material-icons {
  height: 36px;
  width: 36px;
  font-size: 24px;
  background: var(--color-background);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
}

.links {
  margin-top: 12px;
}

.external {
  cursor: pointer;
}

.spacer {
  flex: 1;
  border-bottom: 1px solid rgba(255,255,255,.3);
  margin: 0px 8px;
}

.bottom {
  margin: 6px 0px;
}

.logo {
  filter: invert();
}

#content {
  position: relative;
  width: calc(100vw - 250px);
  min-height: 100%;
  height: 100%;
  margin-left: 250px;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
