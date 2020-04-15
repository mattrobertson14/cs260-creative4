<template>
  <div id="app">
    <div id="appbar">
      <i class="material-icons" @click="showSidebar=true">menu</i>
      <router-link to="/" @click.native="showSidebar=false">
        Puppy Tracker
      </router-link>
    </div>
    <div id="nav" :class="showSidebar? 'show' : ''">
      <div class="header">
        <router-link to="/" @click.native="showSidebar=false">
          <i class="material-icons">insert_chart_outlined</i>
          Puppy Tracker
        </router-link>
        <i class="material-icons close" v-show="showSidebar" @click="showSidebar=false">close</i>
      </div>
      <div class="links">
        <router-link to="/" class="home main-link" @click.native="showSidebar=false">
          <i class="material-icons">home</i>
          Home
        </router-link>
        <router-link to="/puppies" class="main-link" @click.native="showSidebar=false">
          <i class="material-icons">pets</i>
          Puppies
        </router-link>
        <router-link to="/admin" class="main-link" @click.native="showSidebar=false">
          <i class="material-icons">build</i>
          Admin
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

<script>
export default {
  data() {
    return {
      showSidebar: false,
    }
  }
}
</script>

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

#nav .main-link.router-link-active:not(.home),
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

#nav .header {
  border-bottom: 1px solid rgba(255,255,255,.3);
  padding: 24px 12px;
  margin: 4px 8px;
}

#nav .header a {
  font-family: 'Alegreya Sans SC', sans-serif;
  text-transform: small-caps;
  font-size: 24px;
  padding: 0;
  margin: 0;
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
  flex: 1
}

#nav .spacer {
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

#appbar {
  display: none;
}

@media only screen and (max-width: 799px) {
  #app {
    box-sizing: border-box;
  }
  
  #nav {
    left: calc(100vw * -1);
    z-index: 100;
    height: 100%;
    width: 100%;
    transition: left .2s ease-in-out;
  }

  #nav.show {
    left: 0;
  }

  #nav .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  #nav .header i.close {
    background: none;
    color: white;
  }

  #content {
    width: 100vw;
    margin-left: 0;
    margin-top: 60px;
    padding-bottom: 64px;
  }

  #appbar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 50;
    display: flex;
    background: var(--color-primary);
    width: 100vw;
    align-items: center;
    justify-self: start;
    padding: 12px;
    height: 60px;
    box-sizing: border-box;
  }

  #appbar i {
    color: white;
  }

  #appbar a {
    display: flex;
    margin-left: 16px;
    align-items: center;
    text-decoration: none;
    color: white;
    font-size: 20px;
  }

  #appbar a i {
    background: var(--color-background);
    color: var(--color-primary);
    padding: 4px;
    font-size: 16px;
    border-radius: 12px;
    margin-right: 8px;
  }
}
</style>
